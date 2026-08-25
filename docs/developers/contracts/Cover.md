---
sidebar_position: 2
---

# Cover

## Overview

The Cover contract manages the purchase and management of coverage within the protocol. It allows users to buy coverage for specific products and handles the allocation of coverage across various staking pools. The contract keeps track of cover data, allocations, and active covers, ensuring that coverage is properly managed over time. Passing the id of an existing cover edits that cover rather than buying a new one.

## Key Concepts

### Cover Data Structures

#### CoverData

Represents the basic information about a cover.

```solidity
struct CoverData {
    uint24 productId;
    uint8 coverAsset;
    uint96 amount;
    uint32 start;
    uint32 period;
    uint32 gracePeriod;
    uint16 rewardsRatio;
    uint16 capacityRatio;
}
```

| Parameter       | Description                                             |
| --------------- | ------------------------------------------------------- |
| `productId`     | The ID of the product being covered.                    |
| `coverAsset`    | The asset ID used for coverage (e.g., ETH).             |
| `amount`        | Coverage amount in the cover asset.                     |
| `start`         | Start timestamp of the cover.                           |
| `period`        | Duration of the cover in seconds.                       |
| `gracePeriod`   | Additional time after expiration for claim submissions. |
| `rewardsRatio`  | Rewards ratio applied to this cover.                    |
| `capacityRatio` | Capacity ratio applied to this cover.                   |

#### CoverReference

Editing a cover creates a new cover id. `CoverReference` links the ids together, so that an edited cover can be traced back to the cover it came from.

```solidity
struct CoverReference {
    uint32 originalCoverId;
    uint32 latestCoverId;
}
```

| Parameter         | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| `originalCoverId` | The cover this one was edited from. Set to 0 on the original cover.      |
| `latestCoverId`   | The most recent edit. Set on the original cover, and 0 if never edited.  |

#### PoolAllocation

Represents the allocation of coverage to a specific staking pool.

```solidity
struct PoolAllocation {
    uint40 poolId;
    uint96 coverAmountInNXM;
    uint96 premiumInNXM;
    uint24 allocationId;
}
```

| Parameter          | Description                                           |
| ------------------ | ----------------------------------------------------- |
| `poolId`           | ID of the staking pool.                               |
| `coverAmountInNXM` | Cover amount allocated to the pool in NXM tokens.     |
| `premiumInNXM`     | Premium paid for the allocation in NXM tokens.        |
| `allocationId`     | Unique identifier for the allocation within the pool. |

#### Ri, RiRequest, RiConfig

`Ri` records the reinsurance allocation the protocol holds against a cover. `RiRequest` carries a reinsurance provider's signed request to back a cover. `RiConfig` stores a reinsurance provider's premium destination and signature nonce.

```solidity
struct Ri {
    uint24 providerId;
    uint96 amount;
}

struct RiRequest {
    uint providerId;
    uint amount;
    uint premium;
    bytes signature;
    bytes data;
    uint8 dataFormat;
    uint32 deadline;
}

struct RiConfig {
    uint24 nextNonce;
    address premiumDestination;
}
```

| Parameter             | Description                                             |
| ---------------------- | -------------------------------------------------------- |
| `providerId`           | The ID of the reinsurance provider.                       |
| `amount`               | The reinsured amount.                                     |
| `premium`              | The premium the reinsurance provider charges.              |
| `signature`            | The reinsurance provider's signature over the request.    |
| `data`                 | Provider-specific data attached to the request.            |
| `dataFormat`           | The format version of `data`.                              |
| `deadline`             | The timestamp after which the signature expires.           |
| `nextNonce`            | The next nonce the provider's signature must use.          |
| `premiumDestination`   | The address that receives the reinsurance premium.         |

### Active Cover and Expiration Buckets

- **ActiveCover:** Tracks the total active cover in an asset and the last bucket update ID.
- **Expiration Buckets:** Cover amounts are tracked in weekly buckets (BUCKET_SIZE is 7 days). As covers expire, the amounts are deducted from the active cover.

### Constants

- **Commission and Ratios:**

```solidity
uint private constant COMMISSION_DENOMINATOR = 10000;
uint public constant MAX_COMMISSION_RATIO = 3000; // 30%
uint public constant GLOBAL_CAPACITY_RATIO = 20000; // 2x
uint public constant GLOBAL_REWARDS_RATIO = 5000; // 50%
uint public constant DEFAULT_MIN_PRICE_RATIO = 100; // 1%
```

- **Cover Periods:**

```solidity
uint private constant MAX_COVER_PERIOD = 365 days;
uint private constant MIN_COVER_PERIOD = 28 days;
uint private constant BUCKET_SIZE = 7 days;
```

### Allocation Units

- **Allocation Units per NXM:**

<!-- @check Cover.NXM_PER_ALLOCATION_UNIT = 0.01 ether -->

```solidity
uint private constant ALLOCATION_UNITS_PER_NXM = 100;
uint public constant NXM_PER_ALLOCATION_UNIT = ONE_NXM / ALLOCATION_UNITS_PER_NXM;
```

### Asset IDs

- **Asset Identifiers:**

```solidity
uint private constant ETH_ASSET_ID = 0;
uint private constant NXM_ASSET_ID = type(uint8).max;
```

## Mutative Functions

### `buyCover`

Allows a user to purchase cover for a specific product.

```solidity
function buyCover(
    BuyCoverParams memory params,
    PoolAllocationRequest[] memory poolAllocationRequests
) external payable onlyMember nonReentrant whenNotPaused returns (uint coverId);
```

| Parameter                | Description                                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `params`                 | Struct containing cover purchase parameters (see below).                                                    |
| `poolAllocationRequests` | Array of pool allocation requests specifying how to allocate cover amount across staking pools (see below). |

#### `BuyCoverParams` Structure:

```solidity
struct BuyCoverParams {
    uint coverId;
    address owner;
    uint24 productId;
    uint8 coverAsset;
    uint96 amount;
    uint32 period;
    uint maxPremiumInAsset;
    uint8 paymentAsset;
    uint16 commissionRatio;
    address commissionDestination;
    string ipfsData;
}
```

| Field                   | Description                                                                  |
| ----------------------- | ---------------------------------------------------------------------------- |
| `productId`             | The ID of the product to purchase cover for.                                 |
| `coverId`               | The ID of an existing cover to edit, or 0 to create a new cover.             |
| `owner`                 | The address that will own the cover NFT.                                     |
| `coverAsset`            | The asset ID used for coverage. See `Pool.getAssets` (e.g., 0 ~ ETH).        |
| `period`                | The duration of the cover in seconds.                                        |
| `amount`                | The amount of coverage in the cover asset.                                   |
| `commissionRatio`       | The commission ratio (in basis points, where 10000 = 100%).                  |
| `paymentAsset`          | The asset ID used for payment (must be coverAsset or NXM_ASSET_ID).          |
| `maxPremiumInAsset`     | The maximum premium the buyer is willing to pay in the payment asset.        |
| `commissionDestination` | The address where the commission should be sent.                             |
| `ipfsData`              | IPFS hash of additional data related to the cover (e.g., policy documents).  |

#### `PoolAllocationRequest` Structure:

```solidity
struct PoolAllocationRequest {
    uint poolId;
    uint coverAmountInAsset;
}
```

To retrieve data to construct `PoolAllocationRequest`, call the `/quote` endpoint of the cover-router API service: [API Documentation](https://api.nexusmutual.io/v2/api/docs/#/Quote/get_v2_quote).

| Field                | Description                                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `poolId`             | ID of the staking pool to allocate cover to.                   |
| `coverAmountInAsset` | Amount of coverage to allocate to the pool in the cover asset. |

**Returns:** The coverId of the purchased cover. Editing a cover returns a new coverId.

**Description:** Purchases new cover or edits an existing one. Validates input parameters (e.g., cover period, commission ratio), allocates cover amounts across specified staking pools, calculates premiums and commissions, and mints a new Cover NFT. Editing requires the caller to own the cover or be approved for it.

### `buyCoverWithRi`

Purchases cover backed by a reinsurance provider's signed request.

```solidity
function buyCoverWithRi(
    BuyCoverParams memory params,
    PoolAllocationRequest[] memory poolAllocationRequests,
    RiRequest memory riRequest
) external payable returns (uint coverId);
```

| Parameter                | Description                                                    |
| ------------------------ | ---------------------------------------------------------------- |
| `params`                 | Struct containing cover purchase parameters (see above).          |
| `poolAllocationRequests` | Array of pool allocation requests for the cover amount (see above). |
| `riRequest`              | The reinsurance provider's signed request backing the cover.      |

**Returns:** The coverId of the purchased cover.

**Description:** Validates the reinsurance provider's signature and deadline, buys or edits the cover, and records the reinsurance allocation against the cover. The payment asset must match the cover asset.

### `expireCover`

Expires a cover that has reached its expiration time.

```solidity
function expireCover(uint coverId) external;
```

| Parameter | Description                    |
| --------- | ------------------------------ |
| `coverId` | The ID of the cover to expire. |

**Description:** Checks if the cover has expired, deallocates cover amounts from staking pools, and updates active cover amounts and expiration buckets. Reverts if the cover has not yet expired.

**Usage:** Called when a cover has expired to clean up allocations and update cover data. Only callable after the cover's expiration time.

### `burnStake`

Burns stake from staking pools when a claim is approved.

```solidity
function burnStake(
    uint coverId,
    uint payoutAmountInAsset
) external returns (address);
```

| Parameter             | Description                                                  |
| --------------------- | ------------------------------------------------------------ |
| `coverId`             | The ID of the cover associated with the claim.               |
| `payoutAmountInAsset` | The amount to be paid out for the claim, in the cover asset. |

**Returns:** The owner address of the cover NFT.

**Description:** Calculates the proportion of stake to burn based on the payout amount, calls burnStake on the relevant staking pools, adjusts active cover amounts and expiration buckets, and returns the owner of the cover NFT.

**Usage:** Called internally when a claim is approved. Ensures that staking pools bear the appropriate loss.

### `updateTotalActiveCoverAmount`

Updates the total active cover amount for a specific asset.

```solidity
function updateTotalActiveCoverAmount(uint coverAsset) public;
```

| Parameter    | Description                                                                    |
| ------------ | ------------------------------------------------------------------------------ |
| `coverAsset` | The asset ID for which to update the active cover amount. See `Pool.getAssets` |

**Description:** Processes expired covers and updates active cover amounts. Adjusts the active cover expiration buckets. Can be called to manually trigger an update of active cover amounts. Typically used internally when buying or expiring covers.

**Usage:** Can be called to manually trigger an update of active cover amounts. Typically used internally when buying or expiring covers.

## View Functions

### `getCoverData`

Retrieves the cover data for a specific cover ID.

```solidity
function getCoverData(uint coverId) external view returns (CoverData memory);
```

| Parameter | Description          |
| --------- | -------------------- |
| `coverId` | The ID of the cover. |

**Description:** Returns the CoverData struct associated with the given cover ID, covering the product, asset, amount and period.

### `getCoverReference`

Returns the ids linking an edited cover to the cover it came from.

```solidity
function getCoverReference(uint coverId) external view returns (CoverReference memory);
```

| Parameter | Description          |
| --------- | -------------------- |
| `coverId` | The ID of the cover. |

### `getLatestEditCoverData`

Returns the cover data of the most recent edit of a cover.

```solidity
function getLatestEditCoverData(uint coverId) external view returns (CoverData memory);
```

| Parameter | Description                   |
| --------- | ----------------------------- |
| `coverId` | The ID of the original cover. |

### `getPoolAllocations`

Returns how a cover is allocated across staking pools.

```solidity
function getPoolAllocations(uint coverId) external view returns (PoolAllocation[] memory);
```

| Parameter | Description          |
| --------- | -------------------- |
| `coverId` | The ID of the cover. |

### `getCoverRi`

Returns the reinsurance allocation recorded against a cover.

```solidity
function getCoverRi(uint coverId) external view returns (Ri memory);
```

| Parameter | Description          |
| --------- | -------------------- |
| `coverId` | The ID of the cover. |

### `getCoverDataWithRi`

Returns a cover's data together with its reinsurance allocation.

```solidity
function getCoverDataWithRi(uint coverId) external view returns (CoverData memory, Ri memory);
```

| Parameter | Description          |
| --------- | -------------------- |
| `coverId` | The ID of the cover. |

### `getCoverDataWithReference`

Returns a cover's data together with the ids linking it to its edit history.

```solidity
function getCoverDataWithReference(uint coverId) external view returns (CoverData memory, CoverReference memory);
```

| Parameter | Description          |
| --------- | -------------------- |
| `coverId` | The ID of the cover. |

### `getRiProviderConfig`

Returns a reinsurance provider's premium destination and next signature nonce.

```solidity
function getRiProviderConfig(uint providerId) external view returns (RiConfig memory);
```

| Parameter    | Description                          |
| ------------ | ------------------------------------- |
| `providerId` | The ID of the reinsurance provider.   |

### `getCoverMetadata`

Returns the IPFS metadata recorded against a cover.

```solidity
function getCoverMetadata(uint coverId) external view returns (string memory);
```

### `getCoverDataCount`

Returns the total number of covers created.

```solidity
function getCoverDataCount() external view returns (uint);
```

### `totalActiveCoverInAsset`

Returns the total active cover amount for a specific asset.

```solidity
function totalActiveCoverInAsset(uint assetId) public view returns (uint);
```

| Parameter | Description          |
| --------- | -------------------- |
| `assetId` | The ID of the asset. |

**Description:** Retrieves the total amount of active cover in the specified asset. Useful for assessing the exposure of the protocol in a particular asset.

### `getGlobalCapacityRatio`

Returns the `GLOBAL_CAPACITY_RATIO` constant

```solidity
function getGlobalCapacityRatio() external pure returns (uint);
```

**Description:** Provides the capacity ratio used in cover calculations.

### `getGlobalRewardsRatio`

Returns the `GLOBAL_REWARDS_RATIO` constant

```solidity
function getGlobalRewardsRatio() external pure returns (uint);
```

### `getDefaultMinPriceRatio`

Returns the `DEFAULT_MIN_PRICE_RATIO` constant.

```solidity
function getDefaultMinPriceRatio() external pure returns (uint);
```

### `getGlobalCapacityAndPriceRatios`

Returns both the `GLOBAL_CAPACITY_RATIO` and the `DEFAULT_MIN_PRICE_RATIO` constants in a single call.

```solidity
function getGlobalCapacityAndPriceRatios() external view returns (
    uint _globalCapacityRatio,
    uint _defaultMinPriceRatio
);
```

## Integration Guidelines

- **Buying Cover:** Use the `buyCover` function with appropriate parameters to purchase coverage. Ensure that you handle the premium payment and any commissions.
- **Following Cover Edits:** Editing a cover creates a new cover id. Use `getCoverReference` to move between the original cover and its latest edit, and `getLatestEditCoverData` to read the current state of an edited cover.
- **Staking Pools Allocation:** To retrieve data to construct `PoolAllocationRequest`, call the `/quote` endpoint of the cover-router API service: [API Documentation](https://api.nexusmutual.io/v2/api/docs/#/Quote/get_v2_quote).
- **Asset IDs:** Be aware of the asset IDs used within the protocol, such as `ETH_ASSET_ID` and `NXM_ASSET_ID`.
- **Premium Payments:** Premiums can be paid in NXM or the cover asset. Ensure you handle token transfers and approvals appropriately.
- **Commission Handling:** If a commission is involved, specify the commissionRatio and commissionDestination in the BuyCoverParams.

## Frequently Asked Questions

### How do I purchase cover for a product?

Use the buyCover function, providing the necessary parameters and allocation requests. Ensure that you have the required funds and have approved token transfers if paying with an ERC20 asset.

### Can I extend or modify an existing cover?

Yes. Pass the id of the cover you want to edit as `coverId` in `BuyCoverParams`, and leave it as `0` to buy a new cover. The caller must own the cover or be approved for it. Editing produces a new cover id, with the original linked to the latest edit.

### How is the premium calculated?

Premiums are calculated based on the cover amount, period, and allocations to staking pools. The premium may also include commissions if specified.

### What happens when a cover expires?

When a cover expires, you can call the expireCover function to deallocate cover amounts from staking pools and update active cover data.

### How are claims processed?

When a claim is approved, the burnStake function is called internally to burn the appropriate amount of stake from the staking pools and update cover data.

## Contact and Support

If you have questions or need assistance integrating with the `Cover` contract, please reach out through the official support channels or developer forums.

- **Developer Forums**: Join our community forums to discuss and seek help.
- **Official Support Channels**: Contact us via our official support email or join our Discord.
- **Documentation Resources**: Access tutorials and FAQs on our official website.
- **GitHub Repository**: Report issues or contribute to the codebase.

**Disclaimer:** This documentation provides a high-level overview of the `Cover` contract. Always refer to the latest contract code and official resources when developing against the protocol.
