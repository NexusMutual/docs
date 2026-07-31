---
sidebar_position: 8
description: The contracts behind the Real World Insurance Vault, and what an integration can and cannot rely on.
---

# Contracts

The Vault takes USDC from approved depositors and issues RWIV, a share token whose redemption value grows at a fixed rate. It is a separate system from the Nexus Mutual protocol: its own repository, [`NexusMutual/rwi-vault`](https://github.com/NexusMutual/rwi-vault), its own registry, its own [governance](/rwi-vault/governance), its own deployments package, and its own release cycle. None of the protocol's contracts are in the path of a deposit or a redemption.

- [RWIVault](/rwi-vault/contracts/RWIVault) — deposits, redemptions, share price and the base rate
- [Locks](/rwi-vault/contracts/Locks) — locking RWIV to earn bonuses
- [RWIRegistry](/rwi-vault/contracts/RWIRegistry) — members, contract addresses and the pause switch

Addresses and ABIs are published in [`@nexusmutual/rwi-vault-deployments`](https://www.npmjs.com/package/@nexusmutual/rwi-vault-deployments), versioned with the vault contracts. Core protocol addresses stay in `@nexusmutual/deployments`; the two packages do not overlap.

The contracts have been [audited](/resources/audits-and-security).

## Three contracts and a registry

`RWIRegistry` resolves every address in the system, including the roles. Each entry has an index, and every index is a single bit, so an authorisation check is a bitmask over the caller's index:

| Index                    | Value | Holder                                          |
| ------------------------ | ----- | ----------------------------------------------- |
| `C_REGISTRY`             | 1     | `RWIRegistry`                                    |
| `C_GOVERNOR`             | 2     | The Vault's [governor](/rwi-vault/governance), which upgrades contracts |
| `C_VAULT`                | 4     | `RWIVault`                                       |
| `C_LOCKS`                | 8     | `Locks`                                          |
| `A_VAULT_OPERATOR`       | 16    | Vault Operator multisig                          |
| `A_MEMBERSHIP_OPERATOR`  | 32    | The address that admits and removes depositors   |

`RWIVault` and `Locks` sit behind upgradeable proxies deployed by the registry, which owns them, so `upgradeContract` on the registry is the route to upgrading either. The registry is itself behind a proxy, owned by the governor rather than by the registry, and is upgraded through that proxy directly. Nothing in that chain has a timelock or a separate proxy admin, so an upgrade lands in the transaction the governor submits.

Reading `registry` on the vault or on `Locks` returns the registry they resolve against.

The governor's own index cannot be reassigned. It holds a plain address rather than a proxy, `removeContract` rejects that index, and `addContract` only fills an index that is empty. `transferGovernor` existed on the temporary registry implementation used during deployment and is not on the deployed one. So a new governor needs a new registry implementation, which only the current governor can ship.

## Membership

Requesting a deposit or a redemption, and locking shares, all require an active member id in `RWIRegistry`. That register belongs to the vault. It records who has passed the vault's [approval process](/rwi-vault/approval) and is unrelated to Nexus Mutual membership — being one does not make you the other.

RWIV itself carries no restriction. It is a plain ERC-20, transfers need no membership on either side, and transfers are not covered by the pause switch. So a non-member can hold RWIV and watch it accrue, but cannot mint or redeem it.

Members are addressed by id rather than by address, and a member can move to a new address with `changeMemberAddress`. Anything holding a member address across transactions should resolve it from the id each time.

## What of ERC-7540 is implemented

The vault implements the request half of the standard and none of the claim half.

| Function                                                | Status                    |
| ------------------------------------------------------- | ------------------------- |
| `requestDeposit`, `requestRedeem`                       | Implemented               |
| `pendingDepositRequest`, `pendingRedeemRequest`         | Implemented               |
| `claimableDepositRequest`, `claimableRedeemRequest`     | Reverts `NotSupported()`  |
| `deposit`, `mint`, `withdraw`, `redeem`                 | Reverts `NotSupported()`  |
| `setOperator`, `isOperator`                             | Reverts `NotSupported()`  |

There is no claim step to call. Fulfilling a deposit mints the shares to the depositor, and fulfilling a redemption sends the USDC, both in the transaction the Vault Operator submits. Nothing is ever left claimable, which is why those functions revert rather than return zero. An integration written against the standard request-then-claim sequence will not work here.

The ERC-4626 conversion and preview functions do work, and `convertToAssets` is the RWIV price. `maxDeposit` and `maxMint` return `type(uint).max` and say nothing about how much the vault will actually accept — read `assetCap` and `totalAssets` for that.

## Where the assets are

The vault holds USDC only between a deposit request and its fulfilment, and RWIV only between a redemption request and its fulfilment. Everything else sits with the Vault Operator, which invests it offchain: fulfilled deposits are transferred out to the operator, and redemptions are paid from the operator's balance.

`totalAssets()` is therefore the redemption value of all RWIV in issue — what the vault owes — and not a balance it holds. A redemption can only be fulfilled while the operator holds enough USDC to pay it, which is why withdrawals are queued rather than immediate.

## Pause

`RWIRegistry` holds one pause bitmap for the whole system.

| Flag           | Value | Stops                                              |
| -------------- | ----- | -------------------------------------------------- |
| `PAUSE_GLOBAL` | 1     | Everything pausable, whatever else is set          |
| `PAUSE_VAULT`  | 2     | Deposits, redemptions, fulfilment and cancellation |
| `PAUSE_LOCKS`  | 4     | Locking, editing a lock and withdrawing from one   |

Setting it takes two emergency admins: one calls `proposePauseConfig`, and a different one calls `confirmPauseConfig` with the same value. `isPaused(mask)` folds `PAUSE_GLOBAL` into the mask, so it answers what a caller cares about.

Views are never paused, and neither are RWIV transfers.
