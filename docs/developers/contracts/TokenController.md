---
sidebar_position: 9
---

# TokenController

## Overview

The `TokenController` contract is the **core token manager** within the protocol, governing **NXM minting, burning, and transfers**. It is **not meant to be directly integrated by users** but rather serves as an internal controller for **Governor, Staking Pools, and Cover**.

This contract enables:

- **Minting and burning NXM** for staking, rewards, and governance.
- **Managing staking pool deposits and withdrawals** to regulate staked NXM.
- **Facilitating staking pool rewards** by distributing NXM.
- **Operator-controlled transfers** for protocol-authorized token movements.

**Designed for Internal Use Only**

- 🚫 TokenController is NOT meant for direct integration by users or external contracts.
- ✅ Only protocol-approved contracts (e.g., Governor, StakingPool, Cover, Pool) can interact with it.
- ✅ Functions are restricted using access control mechanisms such as onlyContracts and onlyGovernor.

This design ensures that all NXM token movements remain securely controlled within the protocol.

## Key Concepts

### NXM Token Management

`TokenController` is the **sole authority** for NXM operations. It ensures:

- **Minting:** Only authorized contracts (e.g., Cover, Ramm) can mint NXM.
- **Burning:** NXM is burned when governance penalties, staking pool claims, or expired cover obligations occur.
- **Operator-controlled transfers:** Only designated contracts can initiate approved token movements, maintaining strict oversight over token transactions.

This **prevents unauthorized token manipulation** and maintains **strict control over token flows**.

### Staking Pool Interactions

Staking pools interact with `TokenController` through the following functions:

- **Deposit staked NXM** when users stake their tokens (`depositStakedNXM`).
- **Burn staked NXM** when cover claims are approved (`burnStakedNXM`).
- **Withdraw staked NXM and rewards** when a staking tranche expires (`withdrawNXMStakeAndRewards`).

This ensures **accurate stake tracking**, prevents premature withdrawals, and aligns rewards with active stakes.

### Governance Integration

The `Governor` contract leverages `TokenController` through:

- **Locking transfers** while a member has an open vote on a member proposal (`lockForMemberVote`).
- **Token burning** in case of governance-imposed penalties (`burnFrom`).
- **NXM transfers** for governance-related activities (`operatorTransfer`).

Each function ensures that NXM token movements remain **restricted to protocol-approved operations** and **cannot be arbitrarily accessed** by external users.

### **Locking and Unlocking Tokens**

Tokens can be locked for various reasons, restricting transfers until the conditions for unlocking are met.

| **Lock Type**       | **Purpose**                                     | **Unlock Conditions**                     |
| ------------------- | ----------------------------------------------- | ----------------------------------------- |
| **Governance Lock** | Prevents withdrawal of voting power mid-vote.   | Unlocks once the proposal is executable.  |
| **Staking Lock**    | Ensures liquidity remains available for covers. | Unlocks after the staking period expires. |

**Important:**  
If NXM is locked for **multiple reasons**, **all** unlock conditions must be met before withdrawal is allowed.

---

### **Rewards and Incentives**

`TokenController` handles multiple types of rewards distributed by the protocol:

- **Staking Rewards** – Earned by staking NXM in pools.
- **Pool Manager Rewards** – Earned by managing a staking pool.

Rewards must be **manually claimed** using the function:

```solidity
function withdrawNXM(
    StakingPoolDeposit[] calldata stakingPoolDeposits,
    StakingPoolManagerReward[] calldata stakingPoolManagerRewards
) external;
```

This ensures that users explicitly collect rewards, allowing for flexible management of their earnings.

## Mutative Functions

### `burnFrom`

Burns NXM tokens from an account.

```solidity
function burnFrom(address member, uint amount) external returns (bool);
```

| Parameter | Description                     |
| --------- | ------------------------------- |
| `member`  | Address from which to burn NXM. |
| `amount`  | Amount of NXM to burn.          |

**Usage:**

- Called by **Governor** to penalize users.
- Used by **Staking Pools** when claims are approved.

---

### `operatorTransfer`

Transfers NXM on behalf of an account, but only when authorized.

```solidity
function operatorTransfer(address from, address to, uint amount) external returns (bool);
```

| Parameter | Description                   |
| --------- | ----------------------------- |
| `from`    | Address sending the tokens.   |
| `to`      | Address receiving the tokens. |
| `amount`  | Amount of NXM to transfer.    |

**Usage:**

- Allows **protocol-approved transfers** (e.g., reward distributions).
- Cannot be used for unrestricted user-to-user transfers.

---

### `mint`

Mints new NXM to a member.

```solidity
function mint(address member, uint amount) external;
```

| Parameter | Description                |
| --------- | -------------------------- |
| `member`  | Address receiving the NXM. |
| `amount`  | Amount of NXM to mint.     |

---

### `mintStakingPoolNXMRewards`

Mints NXM as rewards for a staking pool.

```solidity
function mintStakingPoolNXMRewards(uint amount, uint poolId) external;
```

| Parameter | Description                          |
| --------- | ------------------------------------ |
| `amount`  | Amount of NXM to mint as rewards.    |
| `poolId`  | The staking pool receiving rewards.  |

**Usage:** Called when cover is bought, to fund the rewards paid to the pools backing that cover.

---

### `depositStakedNXM`

Deposits NXM into a staking pool.

```solidity
function depositStakedNXM(address from, uint amount, uint poolId) external;
```

| Parameter | Description                       |
| --------- | --------------------------------- |
| `from`    | Address the NXM is taken from.    |
| `amount`  | Amount of NXM to stake.           |
| `poolId`  | The staking pool being staked in. |

**Usage:**

- Called by **Staking Pools** when a user stakes NXM.

---

### `burnStakedNXM`

Burns staked NXM when a cover claim is approved.

```solidity
function burnStakedNXM(uint amount, uint poolId) external;
```

| Parameter | Description                     |
| --------- | ------------------------------- |
| `amount`  | Amount of NXM to burn.          |
| `poolId`  | The staking pool being burned.  |

**Usage:**

- Ensures that claims are covered proportionally.

---

### `withdrawNXMStakeAndRewards`

Withdraws staked NXM and rewards from a staking pool.

```solidity
function withdrawNXMStakeAndRewards(
    address to,
    uint stakeToWithdraw,
    uint rewardsToWithdraw,
    uint poolId
) external;
```

| Parameter           | Description                          |
| ------------------- | ------------------------------------ |
| `to`                | Address receiving the NXM.           |
| `stakeToWithdraw`   | Amount of staked NXM to withdraw.    |
| `rewardsToWithdraw` | Amount of rewards to withdraw.       |
| `poolId`            | The staking pool being withdrawn from. |

**Usage:**

- Used when a staking tranche expires.

---

## View Functions

### `getTokenPrice`

Returns the internal NXM price in ETH. This is the recommended way to read the token price, since it gives a stable address to call.

```solidity
function getTokenPrice() external view returns (uint tokenPrice);
```

### `totalBalanceOf`

Returns a member's total NXM balance, including staked and locked amounts.

```solidity
function totalBalanceOf(address member) external view returns (uint);
```

### `getStakingPoolManager`

Returns the manager of a staking pool.

```solidity
function getStakingPoolManager(uint poolId) external view returns (address);
```

## Frequently Asked Questions

### **Who can interact with `TokenController`?**

Only **protocol-approved contracts** such as `Governor`, `StakingPool`, and `Cover` can call its functions.

---

### **How does `TokenController` prevent unauthorized transfers?**

NXM transfers are **operator-controlled**, meaning only **approved protocol contracts** can initiate token movements.

---

### **What happens if my stake is burned due to a claim?**

Your staked NXM is **permanently reduced** based on the claim payout, ensuring the pool covers losses.

---

### **Can I withdraw my locked tokens at any time?**

No. Tokens locked for governance, staking, or claims must meet their respective unlocking conditions first.

---

### **When can stakers withdraw their NXM?**

Stakers **must wait until their tranche expires** before calling `withdrawNXMStakeAndRewards`.

---

### **When can governance participants withdraw their NXM?**

Governance participants must wait until the proposal they voted on becomes executable before their tokens are unlocked.

## Contact and Support

If you have questions or need assistance integrating with the `TokenController` contract, please reach out through the official support channels or developer forums.

- **Developer Forums**: Join our community forums to discuss and seek help.
- **Official Support Channels**: Contact us via our official support email or join our Discord.
- **Documentation Resources**: Access tutorials and FAQs on our official website.
- **GitHub Repository**: Report issues or contribute to the codebase.

**Disclaimer:** This documentation provides a high-level overview of the `TokenController` contract. Always refer to the latest contract code and official resources when developing against the protocol.
