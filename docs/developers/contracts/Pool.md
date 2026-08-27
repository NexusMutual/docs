---
sidebar_position: 4
---

# Pool

## Overview

The `Pool` contract is a **core component** of the protocol, responsible for managing collective assets such as ETH and other ERC20 tokens. The contract maintains these assets, facilitating their swaps through either the RAMM or SwapOperator contracts. It also handles the receipt of premiums from cover purchases and disburses payouts for claims.

As a core contract it is designed for interaction by other contracts within the protocol. It integrates various contracts to manage reserve assets securely and efficiently, ensuring the system's liquidity and claim payout obligations are met.

**Note:** While the `Pool` contract provides several functions, developers are generally advised to interact with higher-level contracts like the `TokenController` for token pricing and other functionalities, as these interfaces are more stable and user-friendly.

## Key Concepts

### Assets Management

The `Pool` holds various assets, including ETH and multiple ERC20 tokens. Each asset is tracked with specific properties:

```solidity
struct Asset {
    address assetAddress;
    bool isCoverAsset;
    bool isAbandoned;
}
```

| Parameter      | Description                                              |
| -------------- | -------------------------------------------------------- |
| `assetAddress` | The address of the ERC20 token contract or ETH constant. |
| `isCoverAsset` | Indicates if the asset can be used for claim payouts.    |
| `isAbandoned`  | Marks the asset as no longer in use.                     |

### Price Oracles

Each asset has a price oracle used to value it in ETH:

```solidity
function oracles(address assetAddress) external view returns (
    address aggregator,
    uint8 aggregatorType,
    uint8 assetDecimals
);
```

| Parameter        | Description                                       |
| ---------------- | ------------------------------------------------- |
| `aggregator`     | The Chainlink aggregator for this asset.          |
| `aggregatorType` | Whether the aggregator prices the asset in ETH or USD. |
| `assetDecimals`  | The decimals of the asset.                        |

### SwapOperator

The `Pool` interacts with the `SwapOperator` contract to handle asset swaps, maintaining the desired asset allocations. While a swap is in flight, the Pool records the asset and amount that left the Pool:

```solidity
function assetInSwapOperator() external view returns (address assetAddress, uint96 amount);
```

### Minimum Capital Requirement

The `Pool` holds the Minimum Capital Requirement (MCR) calculation. The MCR is the amount of capital the mutual needs to hold against the cover it has sold, and the MCR ratio expresses the Pool's value against that requirement.

### Payouts and Claims

The `Pool` is responsible for disbursing claim payouts to policyholders. It ensures that the correct amount and asset type are sent to the claimant and may return deposit amounts to users as part of the payout process.

### Token Price Calculation

The `Pool` provides functions to calculate the internal price of the protocol's native token (`NXM`) in various assets.

## Mutative Functions

**Note:** Most mutative functions in the `Pool` contract are restricted to internal use, governance, or specific roles like the `SwapOperator`. Developers integrating with the protocol should interact with higher-level contracts or via the designated interfaces.

### `addAsset`

Adds a new asset to the `Pool` with specified swap parameters (governance only).

```solidity
function addAsset(
    address assetAddress,
    bool isCoverAsset,
    address aggregator,
    uint8 aggregatorType
) external onlyGovernor;
```

| Parameter        | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `assetAddress`   | The address of the new asset's ERC20 contract.         |
| `isCoverAsset`   | Whether the asset can be used for claim payouts.       |
| `aggregator`     | The Chainlink aggregator for this asset.               |
| `aggregatorType` | Whether the aggregator prices the asset in ETH or USD. |

### `setAssetDetails`

Updates the properties of an existing asset (governance only).

```solidity
function setAssetDetails(
    uint assetId,
    bool isCoverAsset,
    bool isAbandoned
) external onlyGovernance;
```

| Parameter      | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `assetId`      | The index of the asset in the Pool's asset array.            |
| `isCoverAsset` | Updated status of whether the asset can be used for payouts. |
| `isAbandoned`  | Marks the asset as abandoned or active.                      |

### `setAssetOracle`

Updates the price oracle for a specific asset (governance only).

```solidity
function setAssetOracle(
    address assetAddress,
    address aggregator,
    uint8 aggregatorType
) external onlyGovernor;
```

| Parameter        | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `assetAddress`   | The address of the asset's ERC20 contract.             |
| `aggregator`     | The Chainlink aggregator for this asset.               |
| `aggregatorType` | Whether the aggregator prices the asset in ETH or USD. |

### `transferAssetToSafe`

Transfers a specified amount of an asset from the `Pool` to the Safe multisig tracked by the `SafeTracker` contract (governance only).

```solidity
function transferAssetToSafe(
    address assetAddress,
    address safeAddress,
    uint amount
) external onlyGovernor nonReentrant;
```

| Parameter      | Description                                |
| -------------- | ------------------------------------------ |
| `assetAddress` | The address of the asset's ERC20 contract. |
| `safeAddress`  | The recipient Safe address.                |
| `amount`       | The amount to transfer.                    |

### `transferAssetToSwapOperator`

Transfers a specified amount of an asset from the Pool to the SwapOperator (SwapOperator only).

```solidity
function transferAssetToSwapOperator(
    address assetAddress,
    uint amount
) public override onlySwapOperator nonReentrant whenNotPaused;
```

| Parameter    | Description                                                           |
| ------------ | --------------------------------------------------------------------- |
| assetAddress | The address of the asset's ERC20 contract, or ETH constant for Ether. |
| amount       | The amount of the asset to transfer to the SwapOperator.              |

**Description:** Called by the SwapOperator to receive assets from the Pool for swapping purposes.

### `clearSwapAssetAmount`

Clears the record of the asset currently held by the SwapOperator, once the swap has settled (SwapOperator only).

```solidity
function clearSwapAssetAmount(address assetAddress) external onlySwapOperator;
```

| Parameter      | Description                                |
| -------------- | ------------------------------------------ |
| `assetAddress` | The address of the asset's ERC20 contract. |

### `updateMCR`

Recalculates the Minimum Capital Requirement.

```solidity
function updateMCR() external;
```

**Description:** The MCR moves gradually towards its desired value, so this is called periodically to bring the stored value up to date.

### `sendPayout`

Executes a claim payout by transferring assets to the claimant (internal only).

```solidity
function sendPayout(
    uint assetId,
    address payable payoutAddress,
    uint amount,
    uint ethDepositAmount
) external onlyInternal nonReentrant;
```

| Parameter        | Description                           |
| ---------------- | ------------------------------------- |
| assetId          | The index of the cover asset.         |
| payoutAddress    | The recipient of the payout.          |
| amount           | The amount of the asset to send.      |
| ethDepositAmount | Any additional ETH deposit to return. |

### `sendEth`

Transfers ETH to a member, typically as part of a swap for native tokens (RAMM only).

```solidity
function sendEth(address member, uint amount) external onlyRamm nonReentrant;
```

| Parameter | Description                   |
| --------- | ----------------------------- |
| `member`  | The address of the recipient. |
| `amount`  | The amount of ETH to send.    |

### `migrate`

Transfers the assets and MCR state of a previous `Pool` into this one during a contract upgrade.

```solidity
function migrate(address previousPool, address previousMCR) external;
```

| Parameter      | Description                             |
| -------------- | --------------------------------------- |
| `previousPool` | The address of the previous Pool.       |
| `previousMCR`  | The address of the previous MCR contract. |

## View Functions

### `getPoolValueInEth`

Calculates the total value of all assets held by the `Pool` in ETH.

```solidity
function getPoolValueInEth() public view returns (uint);
```

**Description:** Useful for understanding the Pool's overall value and for internal calculations like the Minimum Capital Requirement (MCR) ratio.

### `getAsset`

Fetches detailed information about a specific asset.

```solidity
function getAsset(uint assetId) external view returns (Asset memory);
```

| Parameter | Description                                       |
| --------- | ------------------------------------------------- |
| `assetId` | The index of the asset in the Pool's asset array. |

### `getAssets`

Retrieves a list of all assets managed by the `Pool`, along with their properties.

```solidity
function getAssets() external view returns (Asset[] memory);
```

### `getAssetId`

Returns the id of an asset from its address.

```solidity
function getAssetId(address assetAddress) external view returns (uint);
```

| Parameter      | Description                                |
| -------------- | ------------------------------------------ |
| `assetAddress` | The address of the asset's ERC20 contract. |

### `getEthForAsset` and `getAssetForEth`

Convert between an asset amount and its value in ETH, using the asset's price oracle.

```solidity
function getEthForAsset(address assetAddress, uint amount) external view returns (uint);
function getAssetForEth(address assetAddress, uint ethIn) external view returns (uint);
```

### `getMCR`

Returns the current Minimum Capital Requirement in ETH.

```solidity
function getMCR() external view returns (uint);
```

### `getInternalTokenPriceInAsset`

Calculates the internal price of the native token (`NXM`) in terms of the specified asset.

```solidity
function getInternalTokenPriceInAsset(uint assetId) public view returns (uint tokenPrice);
```

| Parameter | Description                                       |
| --------- | ------------------------------------------------- |
| `assetId` | The index of the cover asset in the assets array. |

**Recommendation:** Use `TokenController.getTokenPrice()` instead for a stable interface.

### `getInternalTokenPriceInAssetAndUpdateTwap`

Calculates the internal price of the native token in terms of a specific asset and updates the Time-Weighted Average Price (TWAP).

```solidity
function getInternalTokenPriceInAssetAndUpdateTwap(uint assetId) public returns (uint tokenPrice);
```

| Parameter | Description                                       |
| --------- | ------------------------------------------------- |
| `assetId` | The index of the cover asset in the assets array. |

**Recommendation:** Use `TokenController.getTokenPrice()` instead for a stable interface.

### `getMCRRatio`

Calculates the Minimum Capital Requirement (MCR) ratio, representing the `Pool`'s total asset value relative to the required minimum capital.

```solidity
function getMCRRatio() public view returns (uint);
```

**Description:** Useful for assessing the capital adequacy of the `Pool`.

## Events

- `Payout(address to, address assetAddress, uint amount)`: Emitted when a payout is made to a claimant.
- `AssetsTransferredToSwapOperator(address assetAddress, uint amount)`: Emitted when assets are sent to the SwapOperator for a swap.
- `AssetsTransferredToSafe(address assetAddress, uint amount)`: Emitted when assets are sent to the Safe multisig.
- `MCRUpdated(uint mcr, uint desiredMCR, uint mcrFloor, uint mcrETHWithGear, uint totalSumAssured)`: Emitted when the MCR is recalculated.

## Integration Guidelines

- **Token Pricing:** For token price information, use `TokenController.getTokenPrice()`. This provides a stable address as opposed to the `Pool` contract.
- **Asset Information:** Use the `getAssets()` and `getAsset(uint assetId)` functions to retrieve information about supported assets.
- **Proxy Contracts:** Be aware that some contracts, like the `Pool`, may not be proxies and could have their addresses changed during upgrades. Always refer to the [latest contract addresses](https://sdk.nexusmutual.io/) or use interfaces that abstract away these details.

## Frequently Asked Questions

#### How can I get the price of the native token in a specific asset?

Use the `TokenController.getTokenPrice()` function instead of calling `getInternalTokenPriceInAsset()` directly from the `Pool` contract.

#### Can I add a new asset to the Pool?

Adding new assets is restricted to the governance address. If you believe an asset should be added, consider submitting a proposal through the protocol's governance process.

#### How do I know which assets are available for claim payouts?

Use the `getAssets()` function to retrieve all assets and check the `isCoverAsset` property for each asset.

#### What happens when an asset is marked as abandoned?

An abandoned asset is no longer used by the `Pool` for any operations, including swaps and payouts. Assets may be abandoned due to deprecation or strategic shifts.

## Contact and Support

If you have questions or need assistance integrating with the `Pool` contract, please reach out through the official support channels or developer forums.

- **Developer Forums**: Join our community forums to discuss and seek help.
- **Official Support Channels**: Contact us via our official support email or join our Discord.
- **Documentation Resources**: Access tutorials and FAQs on our official website.
- **GitHub Repository**: Report issues or contribute to the codebase.

**Disclaimer:** This documentation provides a high-level overview of the `Pool` contract. Always refer to the latest contract code and official resources when developing against the protocol.
