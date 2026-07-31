---
sidebar_position: 2
---

# RWIVault

## Overview

The `RWIVault` contract takes USDC deposits from approved depositors and issues RWIV, whose redemption value grows at a fixed per-second rate. Deposits and redemptions are asynchronous: a member submits a request, and the Vault Operator fulfils it.

Read [Contracts](/rwi-vault/contracts/) first for how the contracts fit together and which parts of ERC-7540 are implemented.

---

## Key Concepts

### Requests

A request is created by the member and closed by the Vault Operator. Deposit and redeem requests have separate id sequences, both starting at 1.

```solidity
enum RequestStatus { PENDING, FULFILLED, CANCELED }

struct DepositRequestData {
  uint96 assets;
  uint96 fulfilledAssets;
  uint32 memberId;
  uint32 lockPeriod;
  RequestStatus status;
}

struct RedeemRequestData {
  uint96 shares;
  uint96 fulfilledShares;
  uint32 memberId;
  RequestStatus status;
}
```

| Field             | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| `assets`          | USDC requested, held by the vault until the request closes.              |
| `shares`          | RWIV offered for redemption, held by the vault until the request closes.  |
| `fulfilled*`      | How much has been fulfilled so far.                                      |
| `memberId`        | The requester, recorded as an id rather than an address.                  |
| `lockPeriod`      | Non-zero when the deposit was made through `requestDepositAndLock`.       |

A request records the member id, not the address. If a member is removed from the registry while a request is open, the assets or shares go to the Vault Operator when it closes, because there is no longer an address to send them to.

### Share price

The price of RWIV is a single rate, in WAD, that compounds every second from the point it was last changed.

```solidity
uint public constant WAD = 1e18;

struct BaseRateConfig {
  uint64 startRate;
  uint64 ratePerSecond;
  uint32 activeFrom;
  uint64 proposedRate;
  uint32 proposedActivationTime;
}
```

The current rate is `startRate * ratePerSecond ^ (block.timestamp - activeFrom)`, in WAD arithmetic. `convertToAssets` multiplies shares by it, `convertToShares` divides, and both round down.

Nothing else moves the price. Deposits, redemptions and vault performance do not, which is what makes the yield fixed rather than a share of returns.

`getRatePerSecond()` returns the per-second factor. `getBaseApy()` returns the same factor compounded over 365 days, so it is a growth factor and not a percentage: `1.05e18` means 5% a year.

### Rate bounds

```solidity
uint public constant MIN_RATE_PROPOSAL_TIME = 90 days;
uint public constant MAX_APY = 1.5e18;
```

A proposed rate must be at least `WAD`, so the price can never fall, and must annualise to no more than `MAX_APY`, a ceiling of 50% a year. `MIN_RATE_PROPOSAL_TIME` is the notice a change carries: the activation time must be more than 90 days out.

### Asset cap

`assetCap` bounds `totalAssets()`, the redemption value of all RWIV in issue. A deposit request that would leave `totalAssets()` at or below the cap is fulfilled in the same transaction. One that would exceed it stays pending until the Vault Operator fulfils or cancels it, which is how the operator paces inflows against what the Insurance Partners can take.

---

## Mutative Functions

### `requestDeposit`

Submits a deposit request. Pulls the USDC immediately, and fulfils the request in the same transaction if it fits under the asset cap.

```solidity
function requestDeposit(
  uint assets,
  address controller,
  address owner
) external returns (uint requestId);
```

| Parameter    | Description                                     |
| ------------ | ----------------------------------------------- |
| `assets`     | USDC to deposit.                                |
| `controller` | Must be `msg.sender`.                           |
| `owner`      | Must be `msg.sender`.                           |

ERC-7540 allows the controller and owner to differ from the caller. This vault does not: all three must be the same address, and it must be an active member.

Shares are minted at fulfilment, at the rate current then. USDC sitting in a pending request earns nothing.

### `requestDepositAndLock`

The same as `requestDeposit`, except that on fulfilment the shares are minted to [`Locks`](/rwi-vault/contracts/Locks) and locked for `lockPeriod` instead of being sent to the depositor.

```solidity
function requestDepositAndLock(
  uint assets,
  address controller,
  address owner,
  uint lockPeriod
) external returns (uint requestId);
```

`lockPeriod` is validated when the lock is created, so a period outside the bounds `Locks` allows makes fulfilment revert rather than the request.

### `fulfillDeposit`

Fulfils a pending deposit request. Vault Operator only.

```solidity
function fulfillDeposit(uint requestId, uint assets) external;
```

`assets` may be less than the amount requested. The difference is returned to the depositor and the request closes as `FULFILLED` regardless, so a request is fulfilled at most once and a partial fulfilment is final.

Fulfilment mints `convertToShares(assets)` to the depositor and transfers the USDC to the Vault Operator.

### `cancelDepositRequest`

Cancels a pending deposit request and returns the USDC that has not been fulfilled. Callable by the depositor or the Vault Operator.

```solidity
function cancelDepositRequest(uint requestId) external;
```

### `requestRedeem`

Submits a redemption request, transferring the RWIV to the vault. The shares leave the member's wallet at this point and cannot be transferred or sold while the request is open.

```solidity
function requestRedeem(
  uint shares,
  address controller,
  address owner
) external returns (uint requestId);
```

As with `requestDeposit`, the controller and owner must both be `msg.sender`, and it must be an active member.

Shares in the queue keep accruing. The payout is computed at the rate when the request is fulfilled, not when it was submitted.

### `fulfillRedeems`

Pays out redemption requests in id order. Vault Operator only.

```solidity
function fulfillRedeems(uint maxRequestId, uint maxTotalAssets) external;
```

| Parameter        | Description                                                    |
| ---------------- | -------------------------------------------------------------- |
| `maxRequestId`   | The last request id to consider. Must have been issued.         |
| `maxTotalAssets` | The most USDC to pay across this call.                          |

The walk starts at the first request that has not been fulfilled and pays `convertToAssets` on each until `maxTotalAssets` runs out. A request that cannot be paid in full is filled as far as the remaining budget allows, keeps `PENDING` status, and stops the walk — so the queue is strictly first in, first out, and cannot be reordered by choosing arguments.

The USDC comes from the Vault Operator's balance, not from the vault, so a call only succeeds while the operator holds enough to cover it.

### `cancelRedeemRequest`

Cancels a pending redemption request and returns the RWIV that has not been fulfilled. Callable by the member or the Vault Operator.

```solidity
function cancelRedeemRequest(uint requestId) external;
```

### `proposeBaseRateChange`

Proposes a new base rate. Vault Operator only.

```solidity
function proposeBaseRateChange(uint proposalRate, uint proposalActivationTime) external;
```

| Parameter                | Description                                                        |
| ------------------------ | ------------------------------------------------------------------ |
| `proposalRate`           | The new per-second rate, in WAD. At least `WAD`.                   |
| `proposalActivationTime` | When it may be executed. More than `MIN_RATE_PROPOSAL_TIME` away.  |

There is one proposal slot. Proposing again overwrites what is in it, including its activation time.

### `executeBaseRateChange`

Applies a proposal once its activation time has passed. Anyone can call it — the notice period is the control, not the caller.

```solidity
function executeBaseRateChange() external;
```

The rate reached so far becomes the new `startRate`, so the price is continuous across the change and no accrual is lost or repeated.

### `setAssetCap`

Sets the asset cap. Vault Operator only.

```solidity
function setAssetCap(uint newAssetCap) external;
```

---

## View Functions

### Requests

```solidity
function getDepositRequests(uint[] calldata requestIds) external view returns (DepositRequestData[] memory);
function getRedeemRequests(uint[] calldata requestIds) external view returns (RedeemRequestData[] memory);
function pendingDepositRequest(uint requestId, address controller) external view returns (uint assets);
function pendingRedeemRequest(uint requestId, address controller) external view returns (uint shares);
```

Unknown ids read as a zeroed struct rather than reverting, and `PENDING` is zero — so a request that does not exist looks pending. Check that `assets` or `shares` is non-zero before reading `status`.

The `pending*` functions ignore the `controller` argument, which is there for ERC-7540 compatibility. A request id alone identifies a request.

### Rate

```solidity
function getBaseApy() external view returns (uint);
function getRatePerSecond() external view returns (uint);
function getBaseRateConfig() external view returns (BaseRateConfig memory);
```

`getBaseRateConfig` is the one place to read a pending change from, through its `proposedRate` and `proposedActivationTime`.

### Value

```solidity
function convertToAssets(uint shares) external view returns (uint);
function convertToShares(uint assets) external view returns (uint);
function totalAssets() external view returns (uint);
function assetCap() external view returns (uint);
```

`convertToAssets(ASSET_UNIT)` is the RWIV price in USDC. RWIV uses the same decimals as the asset:

<!-- @check RWIVault.ASSET_UNIT = 1e6 -->
```solidity
address public immutable asset;         // USDC
uint8 public immutable assetDecimals;   // 6
uint public immutable ASSET_UNIT;       // 1e6
```
