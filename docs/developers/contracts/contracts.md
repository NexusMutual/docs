---
sidebar_position: 2
---

# Contracts

The source code for the Nexus Mutual protocol is available on [GitHub](https://github.com/NexusMutual). Contract addresses and ABIs are published in the [`@nexusmutual/deployments`](https://www.npmjs.com/package/@nexusmutual/deployments) package and through our [SDK](https://sdk.nexusmutual.io/).

The core contracts can be found in the [modules folder within the Smart Contracts repo](https://github.com/NexusMutual/smart-contracts/tree/master/contracts/modules).

## Cover

The `Cover` contract manages the purchase and management of coverage within the protocol. It allows users to buy coverage for specific products and handles the allocation of coverage across various staking pools. Passing the id of an existing cover edits that cover instead of buying a new one.

## Cover Products

The `CoverProducts` contract holds the product and product type registry. It stores each product's cover assets, grace period and product type, and each product type's claim method and cover wording.

## Limit Orders

The `LimitOrders` contract executes cover purchases from signed orders. Members sign an order up front, and the order is settled later when its conditions are met, which supports limit-price and long-term cover purchases.

## Claims

The `Claims` contract enables cover owners to **submit claims** and **redeem payouts** if their claims are accepted. Submitting a claim starts an assessment, and the claimant deposits ETH which is returned when the claim is accepted.

The contract integrates with multiple protocol components, including:

- **Assessments (`IAssessments`)** – Handles voting and decision-making for claims.
- **Cover (`ICover`)** – Provides cover data.
- **Pool (`IPool`)** – Facilitates payout processing.
- **Ramm (`IRamm`)** – Updates token prices and liquidity.

## Assessments

The `Assessments` contract manages evaluation of cover claims. Assessors are organised into groups, and each product type is assigned to the group that assesses its claims. Assessors cast a vote for or against a claim, along with the rationale for their decision.

## Pool

The `Pool` contract is a **core component** of the protocol, responsible for managing collective assets such as ETH and other ERC20 tokens. The contract maintains these assets, facilitating their swaps through either the RAMM or SwapOperator contracts. It also handles the receipt of premiums from cover purchases and disburses payouts for claims. The Pool also holds the Minimum Capital Requirement (MCR) calculation.

As a core contract it is designed for interaction by other contracts within the protocol. It integrates various contracts to manage reserve assets securely and efficiently, ensuring the system's liquidity and claim payout obligations are met.

**Note:** While the `Pool` contract provides several functions, developers are generally advised to interact with higher-level contracts like the `TokenController` for token pricing and other functionalities, as these interfaces are more stable and user-friendly.

## RAMM

The `Ramm` contract is designed to allow swaps between NXM tokens and ETH. Internally it works by simulating 2 Uniswap v2 -like pools which have their liquidity adjusted using liquidity injection and a ratcheting mechanism.

## Safe Tracker

The `SafeTracker` contract reports the value of assets held in a Safe multisig controlled by the Advisory Board, so that those assets are counted in the Capital Pool. It exposes an ERC20-like balance denominated in ETH.

## Swap Operator

The `SwapOperator` contract swaps the Pool's assets through the CoW Protocol. Its address is set on the Pool through governance.

## Staking Pool

The `StakingPool` contract **manages NXM staking** and **allocates capacity** for purchased covers within the staking pool.

Each StakingPool contract represents its own distinct pool that manages the staked NXM tokens and the allocations of those staked NXM to cover products. This allows for precise management of stakes and cover allocations specific to that pool. Staking pools are deployed per pool through the `StakingPoolFactory`, so each has its own address.

When a user **stakes NXM**, the contract **mints an NFT**, which serves as a proof of stake ownership.

This contract handles:

- **NXM Staking & tracking:** Users deposit NXM, with stakes tracked over time.
- **Tranches (91-day staking periods):** Stakes are locked per tranche, determining withdrawals and staking rewards.
- **Cover Allocations:** When cover products are purchased, capacity is allocated across multiple tranches to ensure sustained coverage and balanced reward distribution.
- **Stake Management:** Users can extend stakes to future tranches or withdraw after expiration.

## Staking Pool Factory

The `StakingPoolFactory` contract is responsible for **deploying and managing staking pools** in the protocol. It uses a **beacon proxy pattern** to deploy pools efficiently while keeping gas costs low.

However, **users should not call `StakingPoolFactory.create()` directly**. Instead, staking pools are created through `StakingProducts.createStakingPool()`, which:

- Calls `StakingPoolFactory.create()` to deploy the pool.
- Assigns a pool manager.
- Configures initial products within the pool.

Only the `StakingProducts` contract has **operator permissions** to create staking pools, ensuring pools are deployed securely and with proper configuration.

## Staking Products

The `StakingProducts` contract manages cover products and their integration into staking pools. It handles **dynamic pricing, capacity allocation, and staking pool management**. This contract enables:

- **Creating and managing staking pools** (public or private).
- **Allowing pool managers to list and configure products** within their pools (e.g., target price, target weight).
- **Dynamically calculating premiums** based on capacity usage.
- **Adjusting product allocations and weights per pool** to optimize stake distribution.

## Token Controller

The `TokenController` contract is the **core token manager** within the protocol, governing **NXM minting, burning, and transfers**. It is **not meant to be directly integrated by users** but rather serves as an internal controller for **Governor, Registry, Cover, Ramm, StakingProducts, and StakingPool**.

This contract enables:

- **Minting and burning NXM** for staking, rewards, and governance.
- **Managing staking pool deposits and withdrawals** to regulate staked NXM.
- **Operator-controlled transfers** for protocol-authorized token movements.

**Designed for Internal Use Only**

- 🚫 TokenController is NOT meant for direct integration by users or external contracts.
- ✅ Only protocol-approved contracts (Governor, Registry, Cover, Ramm, StakingProducts, StakingPool) can interact with it.
- ✅ Functions are restricted using access control mechanisms such as onlyContracts and onlyGovernor.

This design ensures that all NXM token movements remain securely controlled within the protocol.

## Registry

The `Registry` contract holds the address of every protocol contract, and resolves those addresses for the rest of the system. It also holds membership records, the Advisory Board seats, and the emergency pause configuration.

## Governor

The `Governor` contract holds governance proposals and the votes cast on them. It handles Advisory Board proposals, which carry the transactions that enact a governance outcome, and member proposals, which replace an Advisory Board member. See [Governance](/governance/) for the process around these proposals.

## Vote Power

The `VotePower` contract exposes a member's voting power as an ERC20-like balance. The Nexus Mutual DAO Snapshot space reads voting power from this contract.

## Helper contracts

These contracts hold no protocol state and exist to make integration easier.

- **`CoverBroker`** lets non-members buy cover, paying in ETH or a Pool-supported ERC20. Members paying in NXM call `Cover.buyCover` directly.
- **`StakingViewer`** aggregates staking pool, token and reward data for reading.
- **`CoverViewer`** aggregates cover data for reading.

## Token contracts

- **`NXMToken`** is the mutual's membership token.
- **`CoverNFT`** represents ownership of a cover.
- **`StakingNFT`** represents ownership of a staking position.

## Legacy contracts

These contracts remain deployed to serve historical data and are not part of the current protocol flow: `NXMaster`, `Governance`, `LegacyClaimsData` and `LegacyQuotationData`.
