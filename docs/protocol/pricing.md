---
sidebar_position: 5.8
---

# Pricing

Previously, an offchain pricing module was used for cover products. This model has been sunset and pricing has now moved onchain, with a dynamic pricing model that determines the price of cover products.

When a cover product is added to a staking pool, the price starts at the initial price and decreases over time toward the target price set by each staking pool. The initial price for each cover product is determined by the Advisory Board and the target price is set by members running staking pools, who are referred to as staking pool managers.

With this approach, the price - per pool per risk - starts high and decreases to the minimum a staking pool is willing to accept, like a Dutch auction. This allows for price discovery; should risk be mispriced, demand at a given price will signal the willingness of members to buy cover at that price floor.

The dynamic pricing mechanism is reviewed in detail below.

## Spot price

The spot price decreases linearly from <code>bumpedPrice</code> to <code>targetPrice</code>, depending on the <code>Speed(PRICE_CHANGE_PER_DAY)</code> and the <code>time passed since the last cover buy</code>.

### Spot price formula

<p><code>spotPrice = MAX(bumpedPrice - priceDrop, targetPrice)</code></p>

Where:
* <code>bump = 0.2% addition to the spot price per 1% of pool capacity used</code>
* <code>Bumped price = spotPrice + capacity% of the pool to be used / 1% x 0.2</code>
* <code>priceDrop = timeSinceLastCoverBuy * speed</code>
* <code>speed = PRICE_CHANGE_PER_DAY / 1 dayInSeconds</code>
* <code>targetPrice</code> is set by the staking pool manager and can be updated at any time

### Bumped price

The Bumped Price gets updated after each cover buy and is used to calculate the spot price of the NEXT cover.

*Example*
* <code>spotPrice = 2.5%</code>
* <code>capacity % of the pool to be used = 15%</code>
* <code>bumpedPrice = 2.5 + 15% / 1% x 0.2 = 5.5 price per annum</code>

**Note**: when a cover product is first added to a staking pool, the <code>BumpedPrice</code> is equal to the <code>InitialPrice</code> set by the Advisory Board.

### Price drop

This is determined by taking the <code>timeSinceLastCoverBuy</code> and multiplying by the <code>Speed</code>, which moves at 2.0% per day. The price drop is subtracted from spot price.

*Example*
* <code>speed = 2.0% per day</code>
* <code>timeSinceLastCoverBuy = 3 days</code>
* <code>priceDrop = 3 * 2.0% = 6.0%</code>

### Calculating spot price

You can see an example of the variables being used to calculate the price of an individual cover product within a staking pool:

*Example*
* <code>speed = 2.0% per day</code>
* <code>timeSinceLastCoverBuy = 3 days</code>
* <code>priceDrop = 3 * 2.0% = 6.0%</code>
* <code>bumpedPrice = 6.5%</code>
* <code>targetPrice = 4%</code>
* <code>spotPrice = MAX(6.5% - 6.0%, 3%) = 3.0%</code>

## Benefits

Dynamic pricing adjusts based on changes in demand and utilization. This allows for reactive pricing without the need for immediate action by staking pool managers.

The dynamic pricing model allows a staking pool to diversify risk across cover products no matter if demand is high or low. In each instance, the price will increase or decrease to reflect the market rate.