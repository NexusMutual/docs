# Bonuses

RWIV tokens can be locked in the Vault smart contracts for a specified duration to earn points. Locking RWIV tokens for longer periods better aligns depositor timelines with the return emergence of the underlying investments.

If the underlying insurance investments generate returns in excess of the Baseline Yield and cost of Nexus Mutual Cover, then 60% of these excess returns will be distributed to lockers as USDC in proportion to the points they have accumulated.

Snapshots for bonus distribution are taken at the end of each calendar quarter. Points are calculated offchain. Bonuses are distributed directly to the wallets of those who have locked their tokens during each quarterly period.

## Bonus Earning Rate

The longer a depositor locks their LP tokens, the higher the proportion of bonuses that will be distributed to them. Illustrative table of ratios below for the specific durations available in the UI, but users can lock for any duration onchain.

| Lock Period | Multiplier |
|------------|------------|
| 90 days    | 1x         |
| 180 days   | 2x         |
| 360 days   | 4x         |
| 720 days   | 8x         |

The earning rate is capped at 8x. Longer lock durations than 720 days still earn the maximum rate.

Snapshots are taken quarterly, after which each depositor’s points reset to zero.

### Points Formula

For each locking segment:

<code>earning_rate = min(8, (t_unlock - t_lock) in days / 90) * LP_token_amount / 1000</code>


If there are edits to a locking position:

- Non-overlapping segments use the only earning rate during that time
- Overlapping segments use the maximum possible earning rate

With points earning rate $er_k$ corresponding to time period $t_k$ within a season:

$points = \sum_{k=1}^n er_k * t_k$