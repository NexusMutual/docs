---
sidebar_position: 2.5
description: Reference for the CoverProducts contract, the registry of cover products and product types.
---

# CoverProducts

## Overview

The `CoverProducts` contract holds the registry of products and product types. It stores each product's name, cover assets, allowed pools and metadata, and each product type's name, claim settings and metadata.

[Cover](/developers/contracts/Cover) reads this registry when a member buys cover. [StakingProducts](/developers/contracts/StakingProducts) reads it to validate which pools may list a product and to seed a new pool's starting prices.

The contract integrates with multiple protocol components, including:

- **Pool (`IPool`)** – Supplies the list of supported cover assets, checked against a product's `coverAssets` when it is set.
- **Cover (`ICover`)** – Supplies the default minimum price ratio, used when a product leaves its own minimum price at zero.
- **StakingProducts (`IStakingProducts`)** – Supplies the staking pool count, used to validate a product's allowed pools.

Only the Advisory Board can add or update products and product types. Reads are open to anyone.

---

## Key Concepts

### Product

A product is a coverable risk, such as a specific protocol or a category of assets.

```solidity
struct Product {
    uint16 productType;
    uint16 minPrice;
    uint144 __gap;
    uint32 coverAssets;
    uint16 initialPriceRatio;
    uint16 capacityReductionRatio;
    bool isDeprecated;
    bool useFixedPrice;
}
```

| Field                     | Description                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------ |
| `productType`              | Index of this product's product type in the product type registry.                  |
| `minPrice`                 | Product-specific minimum price ratio. A value of `0` falls back to the protocol default. |
| `__gap`                    | Reserved storage left over from a removed field.                                    |
| `coverAssets`               | A bitmap of enabled cover assets. Each bit position marks one asset as available.    |
| `initialPriceRatio`         | The starting price ratio for the product. The maximum is 100%.                      |
| `capacityReductionRatio`    | Reduces the product's effective capacity. The maximum is 100%.                      |
| `isDeprecated`              | Whether the product is deprecated. Only an active product backs new cover.          |
| `useFixedPrice`             | Whether the product uses fixed pricing instead of the dynamic pricing curve.         |

A product's name is stored separately from the struct and read through `getProductName`.

See [Pricing](/protocol/pricing) for how `initialPriceRatio` and `minPrice` shape the price a member pays for cover.

### ProductType

A product type groups products that share a claim method and claim timing.

```solidity
struct ProductType {
    ClaimMethod claimMethod;
    uint32 gracePeriod;
    uint32 assessmentCooldownPeriod;
    uint32 payoutRedemptionPeriod;
}
```

| Field                       | Description                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| `claimMethod`                | Either `IndividualClaims` or the deprecated `DeprecatedYieldTokenIncidents` method.        |
| `gracePeriod`                | Time after a cover expires during which a claim can still be submitted against it.        |
| `assessmentCooldownPeriod`   | Time after voting ends before an assessment's outcome is final. See [Assessments](/developers/contracts/Assessments). |
| `payoutRedemptionPeriod`     | Time a claimant has to redeem an accepted payout. See [Claims](/developers/contracts/Claims). |

A product type's `claimMethod` stays fixed once set. Updating an existing product type with a different claim method reverts.

For the process these settings drive, see [Claim Assessment](/protocol/claims-assessment).

### Metadata

Both products and product types keep a full history of their IPFS metadata, appending each update as a new entry.

```solidity
struct Metadata {
    string ipfsHash;
    uint timestamp;
}
```

Each update pushes a new entry, timestamped at the block it was set in. `getLatestProductMetadata` and `getLatestProductTypeMetadata` return the newest entry, and `getProductMetadata` and `getProductTypeMetadata` return the full history.

### Allowed Pools

A product can restrict which staking pools may underwrite it. With an empty allowed-pools list, every staking pool may list the product. With a populated list, only the pools on it may list the product.

See [Staking Pools](/protocol/staking/staking-pools) for how a pool manager lists a product.

---

## View Functions

### `getProductType`

Returns a product type by id.

```solidity
function getProductType(uint productTypeId) external view returns (ProductType memory);
```

### `getProductTypeName`

Returns a product type's name.

```solidity
function getProductTypeName(uint productTypeId) external view returns (string memory);
```

### `getProductTypeCount`

Returns the number of registered product types.

```solidity
function getProductTypeCount() external view returns (uint);
```

### `getProductTypes`

Returns every registered product type.

```solidity
function getProductTypes() external view returns (ProductType[] memory);
```

### `getProduct`

Returns a product by id.

```solidity
function getProduct(uint productId) external view returns (Product memory);
```

### `getProductName`

Returns a product's name.

```solidity
function getProductName(uint productId) external view returns (string memory);
```

### `getProductCount`

Returns the number of registered products.

```solidity
function getProductCount() external view returns (uint);
```

### `getProducts`

Returns every registered product.

```solidity
function getProducts() external view returns (Product[] memory);
```

### `getProductWithType`

Returns a product together with its product type.

```solidity
function getProductWithType(uint productId) external view returns (Product memory product, ProductType memory productType);
```

### `getProductTypeOf`

Returns the product type of a given product.

```solidity
function getProductTypeOf(uint productId) external view returns (ProductType memory);
```

### `getLatestProductMetadata`

Returns a product's most recent IPFS metadata entry.

```solidity
function getLatestProductMetadata(uint productId) external view returns (Metadata memory);
```

### `getLatestProductTypeMetadata`

Returns a product type's most recent IPFS metadata entry.

```solidity
function getLatestProductTypeMetadata(uint productTypeId) external view returns (Metadata memory);
```

### `getProductMetadata`

Returns the full IPFS metadata history for a product.

```solidity
function getProductMetadata(uint productId) external view returns (Metadata[] memory);
```

### `getProductTypeMetadata`

Returns the full IPFS metadata history for a product type.

```solidity
function getProductTypeMetadata(uint productTypeId) external view returns (Metadata[] memory);
```

### `getAllowedPools`

Returns the staking pool ids allowed to underwrite a product.

```solidity
function getAllowedPools(uint productId) external view returns (uint[] memory _allowedPools);
```

An empty array means every pool is allowed to underwrite the product.

### `getAllowedPoolsCount`

Returns the number of staking pools allowed to underwrite a product.

```solidity
function getAllowedPoolsCount(uint productId) external view returns (uint);
```

A count of 0 means every pool may underwrite the product.

### `getInitialPrices`

Returns the initial price ratio for each product id given.

```solidity
function getInitialPrices(uint[] calldata productIds) external view returns (uint[] memory initialPrices);
```

### `getMinPrices`

Returns the minimum price ratio for each product id given, falling back to the protocol default for a product whose own minimum price is zero.

```solidity
function getMinPrices(uint[] calldata productIds) external view returns (uint[] memory minPrices);
```

### `getCapacityReductionRatios`

Returns the capacity reduction ratio for each product id given.

```solidity
function getCapacityReductionRatios(uint[] calldata productIds) external view returns (uint[] memory capacityReductionRatios);
```

### `prepareStakingProductsParams`

Validates a set of staking product initialization params against the product registry, and fills in each product's current initial price.

```solidity
function prepareStakingProductsParams(ProductInitializationParams[] calldata params) external view returns (ProductInitializationParams[] memory validatedParams);
```

- **Behavior:**
  - Requires each product id to exist.
  - Requires each product's allowed-pools list to be empty, since an allow list can only reference pools that already exist.
  - Requires each product to still be active.
  - Overrides the `initialPrice` on each entry with the product's current `initialPriceRatio`.

**Usage:** Called by `StakingProducts` when a new staking pool is created and configured with its initial products.

### `isPoolAllowed`

Returns whether a staking pool may underwrite a product.

```solidity
function isPoolAllowed(uint productId, uint poolId) external view returns (bool);
```

Returns `true` when the product's allowed-pools list is empty.

### `requirePoolIsAllowed`

Requires a staking pool to be allowed to underwrite every product id given.

```solidity
function requirePoolIsAllowed(uint[] calldata productIds, uint poolId) external view;
```

**Usage:** Called by `StakingProducts` before it lets a pool manager list a product.

---

## Mutative Functions

### `setProducts`

Creates new products or updates existing ones.

```solidity
function setProducts(ProductParam[] calldata productParams) external;
```

| Parameter       | Description                                                                                   |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| `productParams`  | The products to create or update, each carrying its `Product` data and allowed pools.          |

A `productId` of `type(uint256).max` creates a new product. Any other value updates the product at that id.

- **Behavior:**
  - Requires the product's `productType` to reference an existing product type.
  - Requires `coverAssets` to only include assets the Pool supports as cover assets.
  - Requires `initialPriceRatio` to be at least the applicable minimum price and at most 100%.
  - Requires `capacityReductionRatio` to be at most 100%.
  - Requires each allowed pool id to reference an existing staking pool.
  - Sets the allowed pools list to the one given, replacing it on an update.
  - Pushes a new metadata entry when `ipfsMetadata` carries a value.
  - Emits `ProductSet` for each product.
- **Access Control:** Only the Advisory Board can call this function.

### `setProductTypes`

Creates new product types or updates existing ones.

```solidity
function setProductTypes(ProductTypeParam[] calldata productTypeParams) external;
```

| Parameter            | Description                                                                          |
| --------------------- | --------------------------------------------------------------------------------------- |
| `productTypeParams`   | The product types to create or update, each carrying its `ProductType` data.          |

A `productTypeId` of `type(uint256).max` creates a new product type. Any other value updates the product type at that id.

- **Behavior:**
  - Requires `ipfsMetadata` on a new product type, since its metadata is mandatory.
  - Requires an update to keep the same `claimMethod` as the stored product type.
  - Pushes a new metadata entry when `ipfsMetadata` carries a value on an update.
  - Emits `ProductTypeSet` for each product type.
- **Access Control:** Only the Advisory Board can call this function.

### `setProductsMetadata`

Appends a new IPFS metadata entry to each product given.

```solidity
function setProductsMetadata(uint[] calldata productIds, string[] calldata ipfsMetadata) external;
```

| Parameter       | Description                                          |
| ---------------- | ------------------------------------------------------ |
| `productIds`     | The products to update.                               |
| `ipfsMetadata`   | The IPFS hash to append for each corresponding product id. |

- **Behavior:**
  - Requires `productIds` and `ipfsMetadata` to be the same length.
  - Requires each product id to exist.
- **Access Control:** Only the Advisory Board can call this function.

### `setProductTypesMetadata`

Appends a new IPFS metadata entry to each product type given.

```solidity
function setProductTypesMetadata(uint[] calldata productTypeIds, string[] calldata ipfsMetadata) external;
```

| Parameter           | Description                                              |
| -------------------- | ----------------------------------------------------------- |
| `productTypeIds`     | The product types to update.                               |
| `ipfsMetadata`       | The IPFS hash to append for each corresponding product type id. |

- **Behavior:**
  - Requires `productTypeIds` and `ipfsMetadata` to be the same length.
  - Requires each product type id to exist.
  - Requires each IPFS hash to carry a value.
- **Access Control:** Only the Advisory Board can call this function.

---

## Plumbing

### `changeDependentContractAddress`

Refreshes the addresses this contract holds for `Pool`, `Cover`, `MemberRoles` and `StakingProducts`.

```solidity
function changeDependentContractAddress() public;
```

**Usage:** Anyone can call this function. Governance upgrade transactions call it after a dependency contract is upgraded, and it reads the new addresses through the Registry.

---

## Events

- **`ProductSet(uint id)`**: Emitted when a product is created or updated.
- **`ProductTypeSet(uint id)`**: Emitted when a product type is created or updated.

---

**Disclaimer:** This documentation provides a high-level overview of the `CoverProducts` contract. Always refer to the latest contract code and official resources when developing against the protocol.
