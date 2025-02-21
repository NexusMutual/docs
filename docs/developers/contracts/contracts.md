---
sidebar_position: 9.2
---

# Contracts

The source code for the Nexus Mutual protocol is available on [GitHub](https://github.com/NexusMutual). Contract addresses can be found in our [SDK](https://sdk.nexusmutual.io/).

The core contracts can be found in the [modules folder within the Smart Contracts repo](https://github.com/NexusMutual/smart-contracts/tree/release-candidate/contracts/modules). 
* Assessment
* Cover
* Individual Claims
* Pool
* RAMM
* Staking Pool
* Staking Pool Factory
* Staking Products
* Token Controller

## Assessment

The `Assessment` contract manages evaluation of cover claims. Members stake NXM tokens and cast votes to determine the outcome of assessments. The contract distributes rewards for benevolent participation, enforces stake lockup periods, and implements a fraud resolution process by burning tokens from fraudulent assessors.

## Cover

The `Cover` contract manages the purchase and management of coverage within the protocol. It allows users to buy coverage for specific products and handles the allocation of coverage across various staking pools. The contract keeps track of cover segments, allocations, and active covers, ensuring that coverage is properly managed over time.

## Individual Claims

The `IndividualClaims` contract enables cover owners to **submit claims** and **redeem payouts** if their claims are accepted. Claims go through a **decentralized assessment** process where members of the mutual decide the claim outcome.

The contract integrates with multiple protocol components, including:

- **Assessment (`IAssessment`)** – Handles voting and decision-making for claims.
- **Cover (`ICover`)** – Provides cover policy and segment details.
- **Staking Pools (`IPool`)** – Facilitates payout processing.
- **RAMM (`IRamm`)** – Updates token prices and liquidity.

## Pool

The `Pool` contract is a **core component** of the protocol, responsible for managing collective assets such as ETH and other ERC20 tokens. The contract maintains these assets, facilitating their swaps through either the RAMM or SwapOperator contracts. It also handles the receipt of premiums from cover purchases and disburses payouts for claims.

As a core contract it is designed for interaction by other contracts within the protocol. It integrates various contracts to manage reserve assets securely and efficiently, ensuring the system's liquidity and claim payout obligations are met.

**Note:** While the `Pool` contract provides several functions, developers are generally advised to interact with higher-level contracts like the `TokenController` for token pricing and other functionalities, as these interfaces are more stable and user-friendly.

## RAMM

The `Ramm` contract is designed to allow swaps between NXM tokens and ETH. Internally it works by simulating 2 Uniswap v2 -like pools which have their liquidity adjusted using liquidity injection and a ratcheting mechanism.

## Staking Pool

The `StakingPool` contract **manages NXM staking** and **allocates capacity** for purchased covers within the staking pool.

Each StakingPool contract represents its own distinct pool that manages the staked NXM tokens and the allocations of those staked NXM to cover products. This allows for precise management of stakes and cover allocations specific to that pool

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

The `TokenController` contract is the **core token manager** within the protocol, governing **NXM minting, burning, and transfers**. It is **not meant to be directly integrated by users** but rather serves as an internal controller for **Governance, Staking Pools, and Assessment**.

This contract enables:

- **Minting and burning NXM** for staking, rewards, and governance.
- **Managing staking pool deposits and withdrawals** to regulate staked NXM.
- **Facilitating governance and assessment rewards** by distributing NXM.
- **Operator-controlled transfers** for protocol-authorized token movements.

**Designed for Internal Use Only**

- 🚫 TokenController is NOT meant for direct integration by users or external contracts.
- ✅ Only protocol-approved contracts (e.g., Governance, StakingPool, Assessment, Pool) can interact with it.
- ✅ Functions are restricted using access control mechanisms such as onlyInternal and onlyGovernance.

This design ensures that all NXM token movements remain securely controlled within the protocol.