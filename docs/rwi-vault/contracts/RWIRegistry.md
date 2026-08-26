---
sidebar_position: 4
---

# RWIRegistry

## Overview

The `RWIRegistry` contract is the vault system's address book, member register and pause switch. `RWIVault` and `Locks` resolve every address they need through it, and check every permission against it.

It is the vault's own registry and holds no relationship to the core protocol's `Registry`. A Nexus Mutual member is not a vault member, and the reverse is equally true.

---

## Key Concepts

### Contract indexes

Every contract and role in the system has an index, and each index is a single bit. Authorisation is a bitmask, so one check can admit several callers.

```solidity
struct Contract {
  address payable addr;
  bool isProxy;
}
```

| Index                   | Value | Holder                                        |
| ----------------------- | ----- | --------------------------------------------- |
| `C_REGISTRY`            | 1     | This contract                                  |
| `C_GOVERNOR`            | 2     | Governor, which upgrades the contracts          |
| `C_VAULT`               | 4     | `RWIVault`                                     |
| `C_LOCKS`               | 8     | `Locks`                                        |
| `A_VAULT_OPERATOR`      | 16    | Vault Operator multisig                        |
| `A_MEMBERSHIP_OPERATOR` | 32    | The address that admits and removes depositors  |

Indexes marked `isProxy` were deployed by this contract and are upgraded through it.

### Members

Members are recorded by id in both directions: id to address, and address to id. Ids are issued in sequence and are never reused, including after a member is removed, so an id is a stable reference to a depositor across address changes.

A member id of zero means not a member. That is the value the vault's own checks look for, so an address that has never been admitted and one that has been removed are treated the same way.

### Pause

```solidity
struct SystemPause {
  uint48 config;
  uint48 proposedConfig;
  address proposer;
}
```

`config` is a bitmap of what is paused.

| Flag           | Value | Stops                                              |
| -------------- | ----- | -------------------------------------------------- |
| `PAUSE_GLOBAL` | 1     | Everything pausable, whatever else is set          |
| `PAUSE_VAULT`  | 2     | Deposits, redemptions, fulfilment and cancellation |
| `PAUSE_LOCKS`  | 4     | Locking, editing a lock and withdrawing from one   |

Changing it takes two emergency admins. Views are never paused, and neither are RWIV transfers.

---

## Mutative Functions

### `addMember`

Admits a depositor, issuing the next member id. Membership Operator only.

```solidity
function addMember(address member) external;
```

Called once the depositor has completed the vault's [approval process](/rwi-vault/approval). Reverts if the address is already a member.

### `changeMemberAddress`

Moves the caller's member id to a new address. The member calls this themselves, from the address currently registered.

```solidity
function changeMemberAddress(address newAddress) external;
```

The id, and so everything recorded against it — open requests, locks — carries over. RWIV does not: it is a token balance and has to be transferred separately.

### `removeMember`

Removes a member. Callable by the member or the Membership Operator.

```solidity
function removeMember(uint memberId) external;
```

The id is retired rather than freed. Anything open against it, such as a pending request, resolves to the Vault Operator afterwards, because there is no longer an address to pay.

A member can call `removeMember` on themself, making self-removal immediate. Removal leaves RWIV untouched: the token is a plain ERC-20 balance that stays in the member's wallet and remains transferable. Removal revokes membership-only actions such as new deposits, direct withdrawals and locking, listed in the [FAQs](/rwi-vault/faqs). A removed member returns through the standard approval process and a fresh `addMember` call, which issues a new member id, because ids stay unique for the life of the registry.

### `proposePauseConfig` and `confirmPauseConfig`

Set the pause bitmap. Emergency admins only, and the proposer cannot confirm their own proposal, so it takes two of them.

```solidity
function proposePauseConfig(uint config) external;
function confirmPauseConfig(uint config) external;
```

`confirmPauseConfig` takes the value again and reverts unless it matches what was proposed.

### `setEmergencyAdmin`

Grants or revokes emergency admin. Governor only.

```solidity
function setEmergencyAdmin(address _emergencyAdmin, bool enabled) external;
```

### Contract management

Governor only. `deployContract` puts an implementation behind a new proxy, at an address determined by the salt, `addContract` registers an address that already exists, and `upgradeContract` points an existing proxy at a new implementation. An index can only be filled while it is empty, and the Governor's own index cannot be removed.

```solidity
function deployContract(uint index, bytes32 salt, address implementation) external;
function addContract(uint index, address contractAddress, bool isProxy) external;
function upgradeContract(uint index, address implementation) external;
function removeContract(uint index) external;
```

---

## View Functions

### Members

```solidity
function isMember(address member) external view returns (bool);
function getMemberId(address member) external view returns (uint);
function getMemberAddress(uint memberId) external view returns (address);
function getMemberCount() external view returns (uint);
function getLastMemberId() external view returns (uint);
```

`getMemberCount` is how many members there are now; `getLastMemberId` is the highest id issued. They diverge once anyone has been removed.

### Addresses

```solidity
function getContractAddressByIndex(uint index) external view returns (address payable);
function getContractIndexByAddress(address contractAddress) external view returns (uint);
function getContracts(uint[] memory indexes) external view returns (Contract[] memory);
function isProxyContract(uint index) external view returns (bool);
function isValidContractIndex(uint index) external pure returns (bool);
```

These revert rather than returning zero when the index or address is not registered, and `isValidContractIndex` rejects anything that is not a single bit. One consequence is worth knowing: because the authorisation checks look a caller up here, an unauthorised call from an unregistered address fails with `ContractDoesNotExist` from the registry rather than `Unauthorized` from the contract being called.

### Pause

```solidity
function getPauseConfig() external view returns (uint config);
function getSystemPause() external view returns (SystemPause memory);
function isPaused(uint mask) external view returns (bool);
function isEmergencyAdmin(address member) external view returns (bool);
```

`isPaused` folds `PAUSE_GLOBAL` into the mask, so it answers the question a caller actually has. `getSystemPause` is the one place to see a proposed change that has not been confirmed.
