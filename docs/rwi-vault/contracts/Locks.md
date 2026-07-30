---
sidebar_position: 3
---

# Locks

## Overview

The `Locks` contract holds RWIV that members have committed for a fixed period, and pays out the [bonuses](/rwi-vault/yield-structure/bonuses/) that commitment earns. A member can hold any number of locks at once, each with its own amount and end date.

Locking does not change how RWIV accrues. The baseline yield is carried by the share price, so locked shares gain value exactly as unlocked ones do, and the lock is what makes a member eligible for a share of excess returns on top.

---

## Key Concepts

### Locks

```solidity
struct Lock {
  uint96 shares;
  uint32 startTime;
  uint32 period;
}
```

A lock ends at `startTime + period`, and the shares cannot be withdrawn before then. Locks are stored per member in an append-only array, so `lockId` is an index into that array and is never reused. Withdrawing zeroes the entry rather than removing it.

### Lock periods

<!-- @check Locks.MIN_LOCK_PERIOD = 30 days -->
<!-- @check Locks.MAX_LOCK_PERIOD = 732 days -->
```solidity
uint public constant MIN_LOCK_PERIOD = 30 days;
uint public constant MAX_LOCK_PERIOD = 732 days;
```

Any period between the two is accepted. The app offers a few fixed durations, but the contract does not restrict the choice to those.

### Points and bonuses

Points are calculated offchain from the locks recorded here, and the [rate they earn at](/rwi-vault/yield-structure/bonuses/#bonus-earning-rate) rises with the period committed. Bonuses are paid in USDC, straight to member addresses, and are not accrued in the contract — `addReward` transfers them in the same call.

---

## Mutative Functions

### `lockShares`

Locks RWIV the caller already holds. Transfers the shares to this contract and opens a new lock.

```solidity
function lockShares(uint shares, uint period) external;
```

The caller must be an active member and `period` must be within the bounds above.

### `lockSharesOnDeposit`

Opens a lock for shares minted straight from a deposit. Callable only by [`RWIVault`](/rwi-vault/contracts/RWIVault), which uses it for `requestDepositAndLock`.

```solidity
function lockSharesOnDeposit(uint shares, uint memberId, uint period) external;
```

### `editLock`

Adds shares to an existing lock, extends it, or both.

```solidity
function editLock(uint lockId, uint topUpShares, uint period) external;
```

| Parameter     | Description                                             |
| ------------- | ------------------------------------------------------- |
| `lockId`      | The lock to edit. Must not have ended.                   |
| `topUpShares` | Shares to add. May be zero.                              |
| `period`      | Time to add to the period. May be zero.                  |

`period` extends the lock rather than replacing it, and the check is on what remains: the time from now to the new end date must be within `MIN_LOCK_PERIOD` and `MAX_LOCK_PERIOD`. A lock with three days left cannot be topped up without also extending it past the minimum.

An ended lock cannot be edited. Withdraw it and open a new one.

### `withdrawShares`

Returns the shares from an ended lock to the member.

```solidity
function withdrawShares(uint lockId) external;
```

Reverts while the lock is still running. There is no early exit and no penalty route out.

### `addReward`

Pays bonuses. Vault Operator only.

```solidity
function addReward(
  uint[] calldata memberIds,
  uint[] calldata assetAmounts,
  address asset,
  uint totalAssetAmounts,
  uint snapshotTimestamp
) external;
```

| Parameter           | Description                                                     |
| ------------------- | --------------------------------------------------------------- |
| `memberIds`         | Who is paid.                                                     |
| `assetAmounts`      | How much each is paid, aligned with `memberIds`.                  |
| `asset`             | The asset paid in, USDC in practice.                              |
| `totalAssetAmounts` | The sum of `assetAmounts`, checked against it.                     |
| `snapshotTimestamp` | The quarter-end the distribution was calculated at, for the event. |

The amounts come from the offchain points calculation. `totalAssetAmounts` has to match their sum exactly, so a distribution that was assembled wrongly reverts rather than paying out.

---

## View Functions

```solidity
function getMemberLock(uint memberId, uint lockId) external view returns (Lock memory);
function getAllMemberLocks(uint memberId) external view returns (Lock[] memory);
```

`getAllMemberLocks` includes withdrawn locks, which read as zeroed. `getMemberLock` reverts on an id that was never issued.
