---
sidebar_position: 3.3
---

# Token Model

The Nexus Mutual protocol has a mechanism that allows members to freely mint and redeem NXM and ensures all claims can be confidently paid should a major loss event occur. This mechanism is referred to as the Ratcheting Automated Market Maker (RAMM), a two-pool system built on top of the Capital Pool that allows members to redeem and mint NXM.

![ramm-diagram](pathname:///img/ramm-diagram.png)

To strike a balance between ETH flowing into the Capital Pool, ETH flowing out of the Capital Pool, cover being underwritten by staked NXM, Capital Pool investment allocations, and asset-liability management, the protocol uses this automated mechanism to manage the amount of capital that is provided as liquidity for NXM holders.

Members can use the crypto assets held in the Capital Pool to underwrite various cover products and/or propose and vote on Capital Pool investment allocations. For more information, see the [Staking](/staking) and [Investments](/investments) pages.

# Ratcheting Automated Market Maker (RAMM)

The RAMM model is made up of two virtual one-sided [Uniswap v2-style pools](https://docs.uniswap.org/contracts/v2/concepts/protocol-overview/how-uniswap-works), which determine the price at which the mutual is willing to buy and sell NXM in value-accretive ranges for the mutual, complemented by a price ratchet to enable price discovery.

The Below Pool and Above Pool are the two pools present in the system. These pools contain a defined amount of ETH liquidity paired with “virtual” NXM. This creates two internal pools, which have the same ETH liquidity; the NXM reserves in each pool are represented by a virtual NXM balance. The ETH and NXM balances change over time as NXM is sold and purchased.

The two pools are described below:

**Below Pool**. This pool handles swaps below the Book Value. NXM sold in this pool is burned and ETH is distributed from this pool. NXM can be swapped for ETH in this pool only at an NXM spot price less than or equal to the Book Value. NXM can only be redeemed in this pool; NXM mints occur in the Above Pool.

![below-pool](pathname:///img/below-pool.png)

**Above Pool**. This pool handles swaps above the Book Value. ETH is contributed to this pool and, in return, NXM is minted. NXM can be purchased from this pool only at an NXM spot price greater than or equal to the Book Value. NXM can only be minted in this pool; NXM redemptions occur in the Below Pool.

![above-pool](pathname:///img/above-pool.png)

## Behaviours in the pools

![ramm-pools](pathname:///img/ramm-pools.png)

| Above Pool                                                                                                                               | Below Pool                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| 1) When NXM is purchased in this pool, the price increases as the ETH liquidity increases and the virtual amount of NXM decreases.       | 5) During periods where no NXM is being redeemed for ETH, the ratchet mechanism will move the price back toward the Book Value.   |
| 2) This pool operates within the following price range: <code>[(100+ oracle buffer)% * Book Value,∞)</code>                              | 6) This is the Book Value, which the ratchet mechanism will "ratchet" up to in the absence of NXM redemptions in this pool.       |
| 3) During periods where no NXM is purchased, the ratchet mechanism will move the price back toward the Book Value.                       | 7) When NXM is redeemed in this pool, the price decreases as the ETH liquidity decreases and the virtual amount of NXM increases. |
| 4) This is the Book Value, which the ratchet mechanism will "ratchet" down to in the absence of NXM purchases in this pool.              | 8) This pool operates within the following price range: <code>(0, (100-x)% * Book Value]</code>                                   |

## How liquidity is managed within the RAMM

The Nexus Mutual protocol holds crypto assets within the Capital Pool, and the RAMM is designed to allocate a certain amount of liquidity from the Capital Pool on an ongoing basis. ETH liquidity is added to the RAMM over time when the liquidity in the RAMM is below the target liquidity value. When members contribute ETH to the Capital Pool and mint NXM, any ETH liquidity in the RAMM in excess of the target liquidity is removed from the RAMM over time.

To be sure all claims can be paid, the Minimum Capital Requirement (MCR) is the only threshold that can prevent additional liquidity from being sent to the RAMM.

The MCR is driven by the Active Cover Amount going forward. The on-chain formula for the MCR is presented below:
<code>MCR = Total Active Cover Amount / 4.8</code>

At launch, members signalled support for a target liquidity of 5,000 ETH.

### Liquidity in the Below and Above Pools

*Below Pool*

As members redeem NXM for ETH, there will be less ETH held in the pools until more liquidity is injected to reach the target liquidity value–this happens automatically, given the system checks if the liquidity in the pools is less than the target liquidity value at each swap. The only scenario where liquidity will not be added to the pool will be when the ETH balance in the Capital Pool is less than or equal to the MCR plus the target liquidity: <code>Capital Pool < MCR + target_liq</code>

*Above Pool*

As members purchase NXM with ETH, the amount of ETH liquidity in the pools will increase. If the ETH liquidity is greater than the target liquidity, then ETH will be removed over time–this also happens automatically. The system checks if the liquidity in the pools is greater than the target liquidity value at each swap, cover buy and claim payout.

During periods where members are not redeeming NXM for ETH or contributing ETH in return for NXM, the ratchet mechanism moves the price. We’ll review that in the next section.

## How the ratchet mechanism works

The ratchet mechanism allows for price discovery over time by moving the price toward the Book Value over time in the Below Pool and/or the Above Pool. The redemption price will decrease when NXM is redeemed in the Below Pool and the minting price will increase when NXM is purchased in the Above Pool, but the ratchet mechanism moves the prices to the Book Value over time.

### Ratcheting up in the Below Pool

During periods when NXM is not being redeemed for ETH, the ratchet will move the spot price by reducing the number of NXM in the virtual pool.

In the example below, you can see a scenario where NXM is redeemed for ETH at Step 1 and Step 6.

The graph on the left shows the spot price dropping in Steps 1 and 6 when NXM is redeemed for ETH and subsequently increasing again as the ratchet moves.

In the graph on the right, you can see the amount of ETH in the pool. As NXM is redeemed for ETH, liquidity is reduced. When the liquidity in the pool is below the target (e.g., in this case, 5000 ETH is the target), more ETH is injected into the pool over time. As the pool reaches the target liquidity, no more ETH is injected into the pool.

![ratcheting-below](pathname:///img/ratcheting-below.png)

### Ratcheting down in the Above Pool

During periods when NXM is not being purchased with ETH, the ratchet will move the spot price by increasing the number of NXM in the virtual pool.

If someone purchases NXM, the price will increase and then, if no other NXM purchases are made, the ratchet will move the spot price back toward the Book Value in the Above Pool.

The graph on the left shows the spot price increasing in Steps 1 , 6 and 17 when NXM is purchased with ETH and subsequently decreasing again as the ratchet moves toward the Book Value.

In the graph on the right, you can see the amount of ETH in the pool. As NXM is purchased with ETH, liquidity increases. When the liquidity in the pool is above the target (e.g., in this case, 5000 ETH is the target), more ETH is removed from the pool over time. As the pool reaches the target liquidity, no more ETH is removed from the pool.

![ratcheting-above](pathname:///img/ratcheting-above.png)

# The Ratcheting AMM Whitepaper

The above is an overview of the RAMM, how the mechanism works, how liquidity is managed, and how the ratchet works. For more detailed information, please see the [Ratcheting AMM Whitepaper](link), which contains an in-depth review of the RAMM mechanism and the various parameters.

# Current Parameters

| Parameter                        | Description                                                                                                                                                                     | Proposed Value                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **liq<sub>target</sub>**         | Target ETH liquidity                                                                                                                                                            | 5,000 ETH                                       |
| **liqSpeed<sub>out</sub>**       | Max amount of ETH that is removed from the pools daily as long as *liq* > *target_liq*                                                                                          | 100 ETH                                         |
| **initialBudget**                | Amount of ETH that needs to be injected before the *liqSpeed<sub>in</sub>* and *ratchetSpeed<sub>b</sub>* parameters change from initial to long-term state                     | 43,835 ETH                                      |
| **fastLiqSpeed<sub>in</sub>**    | Initial state: max amount of ETH that is added to the pools daily. This value is active until an amount of ETH equal to *initialBudget* has been injected into the pools        | 1,500 ETH                                       |
| **liqSpeed<sub>in</sub>**        | Long-term state: max amount of ETH that is added to the pools daily. This value becomes active after an amount of ETH equal to *initialBudget* has been injected into the pools | 100 ETH                                         |
| **ratchetTarget**                | Middle value towards which the *spot* prices move                                                                                                                               | Book Value                                      |
| **oracleBuffer**                 | Margin to allow for oracle lag when calculating Book Value in ETH. Secondary function - create spread                                                                           | 1%                                              |
| **ratchetSpeed<sub>a</sub>**     | Daily decrease in *spot<sub>a</sub>* when above *ratchetTarget<sub>a</sub>*                                                                                                     | 4% of <code>ratchetTarget</code>                |
| **fastRatchetSpeed<sub>b</sub>** | Initial state: Daily increase in *spot<sub>b</sub>* when above *ratchetTarget<sub>b</sub>*                                                                                      | 50% of <code>ratchetTarget</code>               |
| **ratchetSpeed<sub>b</sub>**     | Long-term state: Daily increase in *spot<sub>b</sub>* when above *ratchetTarget<sub>b</sub>*                                                                                    | 4% of <code>ratchetTarget</code>                |


| Parameter                       | Description                                                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Book Value ("BV")**           | Capital Pool value in ETH / NXM supply                                                                                                                 |
| **liq**                         | ETH liquidity in the pools                                                                                                                             |
| **NXM<sub>a</sub>**             | Notional NXM reserve in the Above Pool                                                                                                                 |
| **k<sub>a</sub>**               | Above Pool invariant equal to *liq* * *NXM<sub>a</sub>*                                                                                                |
| **NXM<sub>b</sub>**             | Notional NXM reserve in the Below Pool                                                                                                                 |
| **k<sub>b</sub>**               | Below Pool invariant equal to *liq* * *NXM<sub>b</sub>*                                                                                                |
| **spot<sub>a</sub>**            | Current price at which members can exchange ETH for NXM. Equal to *liq* / *NXM<sub>a</sub>*                                                            |
| **spot<sub>b</sub>**            | Current price at which members can exchange NXM for ETH. Equal to *liq* / *NXM<sub>b</sub>*                                                            |
| **ratchetTarget<sub>a</sub>**   | Value towards which *spot<sub>a</sub>* moves.   Equal to *(1 + oracleBuffer)* * *ratchetTarget*                                                        |
| **ratchetTarget<sub>b</sub>**   | Value towards which *spot<sub>b</sub>* moves. Equal to *(1 - oracleBuffer)* * *ratchetTarget*                                                          |
| **twap<sub>a</sub>**            | Time-weighted average price of the Above Pool                                                                                                          |
| **twap<sub>b</sub>**            | Time-weighted average price of the Below Pool                                                                                                          |
| **cumulativePrice<sub>a</sub>** | Cumulative price of the Above Pool                                                                                                                     |
| **cumulativePrice<sub>b</sub>** | Cumulative price of the Below Pool                                                                                                                     |
| **observation**                 | A single observation contains the cumulative price for each pool and the timestamp for when the cumulative price sample was taken                      |
| **granularity**                 | Number of observations stored at one time by the twap mechanism                                                                                        |
| **obsIndex**                    | Index of the observation where each sample for the twap is stored                                                                                      |
| **periodSize**                  | Size of time period over which the twap observations are taken                                                                                         |
| **currentTimestamp**            | Timestamp of the current block, in the same units as *periodSize*                                                                                      |
| **p<sub>a</sub>**               | Above pool price allowing for the spot price, calculated as *p<sub>a</sub>* = *min*(*twap<sub>a</sub>*, *spot<sub>a</sub>*)                            |
| **p<sub>b</sub>**               | Below pool price allowing for the spot price, calculated as *p<sub>b</sub>* = *min*(*twap<sub>b</sub>*, *spot<sub>b</sub>*)                            |
| **ipFloor**                     | Used to set a floor for the internal price, expressed as a percentage of BV                                                                            |
| **ipCeil**                      | Used to set a ceiling for the internal price, expressed as a percentage of BV                                                                          |
| **Internal Price ("ip")**       | Final internal price used by the system, calculated as: *ip* = *max*(min(*p<sub>a</sub>* + *p<sub>b</sub>* – *BV*, *ipCeil* * *BV*), *ipFloor* * *BV*) |

# Additional Information

In the following sections, you will find the [history of capitalisation controls](/history-capitalisation-controls) and the [drivers of Capital Pool growth](/capital-pool) within the mutual.

The [history of capitalisation controls](protocol/nxm-token/history-capitalisation-controls) is optional: you can skip to the [drivers of Capital Pool growth](/capital-pool) section to learn about the conditions under which the Capital Pool expands and contracts.
