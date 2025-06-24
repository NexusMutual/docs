---
sidebar_position: 6
---

# Staking

Staking plays a critical role in the protocol, as allocating staked NXM against cover products opens up available capacity, so other members can purchase cover. Previously, any member could participate in the risk assessment process, though there were technical barriers and cost prohibitive gas fees that prevented more members from staking NXM.

In the updated staking model, members can participate in one of two roles:
* **NXM stakers**. Members who choose a fixed timeframe to delegate their staked NXM to risk experts that manage staking pools.
* **Staking pool managers**. Members with risk and pricing expertise that create and manage risk staking pools.

## Staking NXM

Members who lack the technical expertise or the time to assess risk and manage NXM stakes can choose to participate as **NXM stakers** by delegating staked NXM to one or multiple staking pools. Delegating NXM allows members to socialize gas costs and passively earn NXM rewards when people buy cover from the associated staking pool.

### Delegating staked NXM

When someone chooses to stake and delegate their NXM, they delegate both capital and voting power. Staking pool managers can use the delegated NXM stakes to allocate against cover products within the pool and use the pool’s voting power to participate in onchain governance. However, delegated NXM stakes cannot be used in the [Claims Assessment](/protocol/claims-assessment) process.

NXM stakers do not control how their NXM is allocated within a staking pool, though they can review staking pools to see which cover products are included in the pool, the staking pool manager’s record of past NXM burns, and the staking pool’s current APY.

### Staking periods

When someone decides to stake their NXM, they need to choose the length of time that their NXM will be locked in a staking pool: this is referred to as the staking period.

Members can choose to stake their NXM for as little as 30 days or as long as almost two years. There are a total of eight staking periods to choose from. Members are able to delegate their NXM to multiple staking pools and for multiple staking periods.

| Staking Period # | Days |
| :--------------: | :--: |
| 1                | 30   |
| 2                | 121  |
| 3                | 212  |
| 4                | 303  |
| 5                | 394  |
| 6                | 485  |
| 7                | 576  |
| 8                | 667  |

Each staking period will have a fixed date range, so all NXM delegated in one staking period will expire at the same time. If a member delegates their staked NXM to Staking Period #1 noted above 20 days into the 121-day period, then their staked NXM would be subject to a 101-day lockup when Staking Period #1 ends and members can withdraw their NXM.

## Tokenized staking positions

Once someone chooses their preferred staking period and stakes their NXM in one or multiple pools, their staking positions are tokenized as an NFT (ERC-721). Staked NXM cannot be withdrawn before the staking period ends, but members can always choose to sell their staking position and access liquidity before a staking period ends.

Members need to use their whitelisted address to withdraw rewards as they accrue to the tokenized staking position. However, a member can transfer their staking NFT to a non-member address for a variety of reasons (e.g, holding a staking position in an address secured by a hardware wallet). Because these NFTs are transferable, someone can switch their membership address before a staking period, or staking periods, end as the NFT can be transferred to an address and membership can then be transferred to that address.

## Rewards

When members purchase cover and pay the cover fee, 50% of the cover fee is minted in NXM rewards and distributed to stakers in the pool. Staking rewards are streamed over the course of the cover period and accrue to tokenized staking positions. These rewards do not compound to staking positions and are freely withdrawable by individual NFT owners at any time, so long as the owner is a member of the Mutual.

Tokenized staking positions accrue rewards using a time-based veToken model, where locking NXM for longer periods increases the share of cover fees a member will receive. NXM stakers who are long-term aligned receive greater rewards. Staking rewards are calculated as follows:

### Staking rewards formula

<p><code>rewardShares = stakeShares * (1 + (10% * LOCK_PERIODS_IN_A_YEAR * daysUntilStakeLockPeriodEnds / 365)</code></p>

Where:
* <code>stakeShares</code> is the amount of NXM staked in one position for a given lock period
* <code>LOCK_PERIODS_IN_A_YEAR = 4</code>

*Example*
* <code>stake = 100 NXM</code>
* <code>stakeShares = 100</code>
* <code>daysUntilStakeLockPeriodEnds = 92</code>

<code>rewardShares = 100 * (1 + 10% * 4 * 92 / 365) = 100 * (1 + 0.10) = 100 * 1.10 = 110</code>

### Incentives to stake NXM in longer term lock periods

When members stake NXM and enter into longer-term staking periods (i.e., lock periods), they receive more stake shares, which increases the share of cover fees they receive every time someone buys cover from the staking pool.

Stake shares decrease over time as a member’s staking position approaches the end of the lock period. Delegating staked NXM to a staking pool for a 728-day staking period will provide the highest share of cover fees, given the staking shares would remain high for a year before starting to diminish as the remaining lock period decreases below 365 days. You can refer to the available [staking periods](/protocol/staking/#staking-periods) in the section above.

This mechanism aligns incentives between NXM stakers, who benefit from higher staking shares for longer-term staking periods; staking pool managers, who benefit from long-term capacity that can be used to sell covers for up to 364 days; and cover buyers, who benefit from access to deep capacity for longer time periods when they decide to purchase protection.

## Risk of NXM burns

When members delegate their staked NXM to a pool, their NXM can be burned to facilitate claim payouts if members who purchased cover from the pool file successful claims.

If a claim is filed and approved by claims assessors, then the staked NXM allocated to the relevant cover product is burned proportionally across all stakers.

Each cover has reserved capacity denominated in NXM, which is used to determine the conversion rate applied to a staking pool when NXM is burned to facilitate a claim payout. The protocol also takes the global capacity factor into account.

See the following scenario for an example:
* Total cover amount is 100 ETH
* 1 NXM is equal to 0.1 ETH at the time of the cover buy
* The claim amount is equal to 50 ETH
* Global capacity factor is 2

The NXM burned to facilitate the claim payout would be as follows:
<p><code>50 (ETH) / 0.1 (ETH/NXM) / 2  = 250 NXM</code></p>

NXM stakers earn rewards but run the risk of losing their staked NXM, as NXM burns can result in a portion of a position or the whole position being burned.
