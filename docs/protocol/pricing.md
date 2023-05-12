---
sidebar_position: 4.8
---

# Pricing

Previously, an off-chain pricing module was used for cover products. This model has been sunset and pricing has now moved on-chain, with a dynamic pricing model that determines the price of cover products.

When a cover product is added to a staking pool, the price starts at the initial price and decreases over time toward the target price set by each staking pool. The initial price for each cover product is determined by the Advisory Board and the target price is set by members running staking pools, who are referred to as staking pool managers.

With this approach, the price - per pool per risk - starts high and decreases to the minimum a staking pool is willing to accept, like a Dutch auction. This allows for price discovery; should risk be mispriced, demand at a given price will signal the willingness of members to buy cover at that price floor.

The dynamic pricing mechanism is reviewed in detail below.

## Spot price

The spot price decreases linearly from <code>bumpedPrice</code> to <code>targetPrice</code>, depending on the <code>Speed(PRICE_CHANGE_PER_DAY)</code> and the <code>time passed since the last cover buy</code>.

### Spot price formula

<p><code>spotPrice = MAX(bumpedPrice - priceDrop, targetPrice)</code></p>

Where:
* <code>bump = 0.2% addition to the base price per 1% of pool capacity used</code>
* <code>Bumped price = spotPrice + capacity% of the pool to be used / 1% x 0.2</code>
* <code>priceDrop = timeSinceLastCoverBuy * speed</code>
* <code>speed = PRICE_CHANGE_PER_DAY / 1 dayInSeconds</code>
* <code>targetPrice</code> is set by the staking pool manager and can be updated at any time

### Bumped price

The Bumped Price gets updated after each cover buy and is used to calculate the base price of the NEXT cover.

*Example*
* <code>spotPrice = 2.5%</code>
* <code>capacity % of the pool to be used = 15%</code>
* <code>bumpedPrice = 2.5 + 15% / 1% x 0.2 = 5.5 price per annum</code>

**Note**: when a cover product is first added to a staking pool, the <code>BumpedPrice</code> is equal to the <code>InitialPrice</code> set by the Advisory Board.

### Price drop

This is determined by taking the <code>timeSinceLastCoverBuy</code> and multiplying by the <code>Speed</code>, which moves at 0.5% per day. The price drop is subtracted from base price.

*Example*
* <code>speed = 0.5% per day</code>
* <code>timeSinceLastCoverBuy = 3 days</code>
* <code>priceDrop = 3 * 0.5% = 1.5%</code>

### Calculating spot price

You can see an example of the variables being used to calculate the price of an individual cover product within a staking pool:

*Example*
* <code>speed = 0.5% per day</code>
* <code>timeSinceLastCoverBuy = 3 days</code>
* <code>priceDrop = 3 * 0.5% = 1.5%</code>
* <code>bumpedPrice = 6.5%</code>
* <code>targetPrice = 4%</code>
* <code>spotPrice = MAX(6.5% - 1.5%, 3%) = 5.0%</code>

## Surge loading

When the capacity for a cover product falls between 90% to 100%, surge pricing, referred to as loading, is applied to a cover product’s price.
* If the cover product has 0% to 90% of capacity reserved for existing covers, then no loading applies
* If the cover product has 90% to 100% of capacity reserved for existing covers, then loading is applied, where loading is a linear function related to capacity used post cover purchase
  * For loading of 2% per 1% of capacity used above 90%

### Price formula including surge loading

<p><code>premium = basePremium + surgePremium</code></p>
Where:<p></p>

* <code>basePremium = cover amount * spotPrice</code>
* <p><code>surgePremium = cover amount * surgeLoading / 2</code></p>

  * Where <code>surgeLoading</code> is referred to as the surge loading factor in the examples below

*Example: capacity starts at 88% and goes to 95%*
* <code>used capacity % before = 88%</code>
* <code>used capacity % after = 95%</code>

<p><code>loading = 0.02 for every 1% of capacity over 90%</code></p>
<p><code>surge loading factor at 95% = (95% - 90%) / 1% * 0.02 = 5 * 0.02 = 0.1</code></p>

*Example: capacity starts at 91% and goes to 95%*
* <code>used capacity % before = 91%</code>
* <code>used capacity % after = 95%</code>

<p><code>surge loading factor at 95% = (95% - 90%) / 1% * 0.02 = 5 * 0.02 = 0.1</code></p>

<p><code>surge loading factor at 91% = (91% - 90%) / 1% * 0.02 = 1 * 0.02 = 0.02</code></p>

and

<p><code>premium = basePremium + surgePremium</code></p>

Where:
* <code>basePremium = cover amount * spotPrice</code>
* <p><code>surgePremium = surgePremium 90% to 95% - surgePremium 90% to 91%</code></p>
* <p><code>surgePremium 90% to 95% = amount * surge loading factor at 95% / 2 =</code></p>
* <code>surgePremium 90% to 91% = amount * surge loading factor at 91% / 2 =</code>

## Benefits

Dynamic pricing adjusts based on changes in demand and utilization. This allows for reactive pricing without the need for immediate action by staking pool managers.

The dynamic pricing model allows a staking pool to diversify risk across cover products no matter if demand is high or low. In each instance, the price will increase or decrease to reflect the market rate.

### High utilization, high price to signal demand

Should the perceived risk associated with a single cover product increase in a short period of time, the increase in cover buys will shift the cover price higher. When this happens, the mutual captures more revenue as exposure to any single risk increases. If the utilization for one cover product rises above 90%, then surge pricing is applied to the cover product’s price.

Rising prices and surge pricing can serve as a signal to staking pool managers that the risk needs to be re-evaluated to determine:
* If more staked NXM should be allocated to open up additional capacity for that cover product; or
* If the pool should reduce exposure to that risk over time by adjusting the staking parameters

### Low utilization, low price

Cover products in a staking pool with ample capacity but infrequent cover buys will decrease in price toward the target price set by the staking pool manager. If a smaller amount of staked NXM is allocated to a cover product, the target price can still be achieved, though when additional cover is purchased, the cost of cover will move up in price faster than a pool with a larger number of staked NXM allocated to the same risk.

### Managing exposure to risk

As the cost of cover increases, demand will begin to decrease once the price reaches a certain level and continues to rise. This can limit exposure to risk, while generating more revenue for the mutual and members participating as NXM stakers.

Dynamic pricing plays an important role in risk management, though it’s not the only way the protocol manages exposure to risk.
