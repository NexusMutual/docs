---
sidebar_position: 4.2
---

# Staking pools

Risk is assessed and managed in individual staking pools. Instead of having one pooled staking contract, members with risk and pricing expertise can create a staking pool, manage NXM stakes, choose the cover products they want to open capacity for, and more. Each staking pool underwrites a definite number of cover products, opens up capacity for those cover products, and carries the risk of having NXM stakes burned to facilitate claim payouts for covers sold from that pool.

## Staking pool managers

Staking pool managers are responsible for creating staking pools, determining the initial pool settings, and managing and pricing risk within the pool. Those who have an existing risk management business or specific risk and pricing expertise can create a staking pool and earn rewards for managing risk within the pool.

A manager can create a public staking pool, which accepts delegations from NXM stakers, or a private staking pool, which does not accept delegations from NXM stakers.

## Staking pool settings

Every pool has settings that are determined when the pool is created and settings that can be adjusted over time.

### Management fee

Those who decide to manage risk within a staking pool charge a management fee, which is the percentage of all rewards earned whenever someone buys cover from the pool. When a cover is sold, 50% of the cover fee flows into the pool. The management fee is charged before rewards are distributed among NXM stakers within the pool. The staking pool manager’s fee is streamed over the cover period to the manager’s staking pool NFT, from which rewards can be withdrawn at any time.

When a pool is first created, the maximum management fee needs to be set. The highest management fee that can be set for a staking pool is 100%. Once the maximum fee is set at creation, it can never be changed, though the fee can be adjusted up to the maximum.

With multiple staking pools, managers can adjust their fee to be competitive in order to attract additional NXM stakes. NXM stakers can review the current and maximum management fee charged within a pool and use that to determine where they delegate their NXM stakes.

### Capacity

Managers choose which cover products to include in their pool and how much NXM to stake against each individual product to open up capacity, or the amount of cover that can be sold over a given period of time for that product.

### Product weight

Managers can stake NXM across products with up to 20x leverage. The amount of leverage used within the pool determines the total target weight for the pool. For each individual product, the most NXM that can be staked is the balance of NXM available in the pool. 

*For example*: if a staking pool has 10,000 NXM, a manager can stake up to 10,000 NXM against a single product. If a manager uses 20x leverage, they can stake 10,000 NXM against 20 different cover products. However, a manager could stake 5,000 NXM against 40 different cover products.

In this scenario, the total target weight for the pool can be equal to or less than 20.00, with the maximum target weight for an individual product being equal to or less than 1.00.

### Product pricing

Managers also determine the target pricing for each cover product. The target price is the lowest price a staking pool manager is willing to accept for a specific cover product. The minimum target price that can be set is 1.00%, while the maximum target price that can be set is 100%.

## Rewards

When members purchase cover and pay the cover fee, 50% of the cover fee is minted in NXM rewards and is distributed within a staking pool. The staking pool’s management fee is applied before NXM rewards are distributed to NXM stakers in the pool. Staking rewards are streamed over the course of the cover period and accrue to the pool manager’s staking position. These rewards do not compound to the staking position and can be withdrawn at any time.

The formula for NXM staking rewards is provided in detail in the [Staking NXM](/protocol/staking/#staking-rewards-formula) section.

## NXM burns

When a member who purchased cover from a manager’s staking pool files a claim that is approved and paid, the staked NXM within the pool reserved for that cover product gets burned. The amount of NXM burned is the equivalent of the paid claim amount.

Each cover has reserved capacity denominated in NXM, which is used to determine the conversion rate applied to a staking pool when NXM is burned to facilitate a claim payout. The protocol also takes the global capacity factor into account.

See the following scenario for an example:
* Total cover amount is 100 ETH
* 1 NXM is equal to 0.1 ETH at the time of the cover buy
* Global capacity factor is 2 at the time of the cover buy
* The claim amount is equal to 50 ETH

The NXM burned to facilitate the claim payout would be as follows:
<p><code>50 (ETH) / 0.1 (ETH/NXM) / 2  = 250 NXM</code></p>

Depending on the selected product weight for a risk, staking pool managers earn rewards while running the risk of losing the pool’s allocated staked NXM, as NXM burns can result in a portion of the pool’s staked NXM or all of the pool’s staked NXM being burned to facilitate claim payouts.
