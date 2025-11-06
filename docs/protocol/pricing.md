---
sidebar_position: 5.8
---

# Pricing

The protocol uses two approaches to pricing:
* Dynamic pricing for public listings with variable pricing
* Fixed pricing for select public listings and private listings with a defined minimum price set by the Advisory Board to prevent a race to the bottom scenario

## Variable Pricing for Public Listings

For the majority of public listings, the protocol allows staking pool managers to set the minimum price they are willing to accept for each listing they allocate underwriting capital (i.e., staked NXM) to. When a staking pool manager first allocates staked NXM to a listing, the price starts at the initial price. The Advisory Board sets the initial price value for each listing.

After a pool manager stakes NXM on a listing for the first time, the price will start at the initial price and will decrease to the minimum price the manager sets over time. We review the formulas for this in more detail below.

The initial price plays an important role: it allows for price discovery and prevents staking pool managers from mispricing risk. If demand for cover is high, people will purchase cover at prices higher than a pool manager's minimum price. If this happens, pool managers may reassess their initial pricing for a listing.

### Managing Supply & Demand with Dynamic Pricing

Pool managers adjust the amount of NXM they stake against individual listings on a regular basis in most cases. If there is a change in the market (e.g., if there is concern about a protocol's security) and people come to the Mutual to purchase a significant amount of cover for a specific listing, staking pool managers may not be able to respond right away. This is where dynamic pricing plays an important role in managing the Mutual's exposure to risk when conditions change in a short period of time.

If people buy a significant amount of cover for a specific listing in a short period of time, the price will increase in any staking pool that underwrites cover when people purchase cover. As the price increases, more value is captured to prevent people from buying all of the Mutual's available capacity at a low price during times where a loss event seems likely. It also controls demand: if the price starts to climb, willingness to pay is likely to decrease, which gives staking pool managers enough time to respond by either allocating more staked NXM, increasing their pricing, or decreasing the amount of staked NXM if the probability of loss becomes too high.

Dynamic pricing also ensures cover purchases are spread across different underwriting pools, so no one pool manager can decrease their price and capture all of the deal flow coming through the protocol, which would create a race to the bottom for pricing among pool managers.

## Fixed Pricing

For private listings and select public listings, fixed pricing is used. Some listings require fixed pricing, like slashing cover or cover for bespoke listings (e.g., Fund Portfolio Cover listings).

To prevent a race to the bottom on pricing, the Advisory Board sets a minimum, or floor, price to ensure staking pool managers do not continue to lower the price and misprice risk just to ensure deal flow goes to their pool. Because dynamic pricing is not in effect for listings using fixed pricing, the Advisory Board establishes a minimum price any pool manager can set for a fixed price listing.

## Pricing Formulas

Below, we provide an overview of the different pricing formulas the protocol uses.

### Spot Price

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

### Price Drop

This is determined by taking the <code>timeSinceLastCoverBuy</code> and multiplying by the <code>Speed</code>, which moves at 2.0% per day. The price drop is subtracted from spot price.

*Example*
* <code>speed = 2.0% per day</code>
* <code>timeSinceLastCoverBuy = 3 days</code>
* <code>priceDrop = 3 * 2.0% = 6.0%</code>

### Calculating Spot Price

You can see an example of the variables being used to calculate the price of a cover listing within a staking pool:

*Example*
* <code>speed = 2.0% per day</code>
* <code>timeSinceLastCoverBuy = 3 days</code>
* <code>priceDrop = 3 * 2.0% = 6.0%</code>
* <code>bumpedPrice = 6.5%</code>
* <code>targetPrice = 4%</code>
* <code>spotPrice = MAX(6.5% - 6.0%, 3%) = 3.0%</code>

## Benefits

Dynamic pricing adjusts based on changes in demand and utilization. This allows for reactive pricing without the need for immediate action by staking pool managers.

The dynamic pricing model allows a staking pool to diversify risk across cover listings no matter if demand is high or low. In each instance, the price will increase or decrease to reflect the market rate.

### High Utilization, High Price to Signal Demand

Should the perceived risk associated with a single cover listing increase in a short period of time, the increase in cover buys will shift the cover price higher. When this happens, the Mutual captures more revenue as exposure to any single risk increases. 

Rising prices serve as a signal to staking pool managers that the risk needs to be re-evaluated to determine:
* If more staked NXM should be allocated to open up additional capacity for that cover listing; or
* If the pool should reduce exposure to that risk over time by adjusting the staking parameters

### Low Utilization, Low Price

Cover listings in a staking pool with ample capacity but infrequent cover buys will decrease in price toward the minimum price set by the staking pool manager. If a smaller amount of staked NXM is allocated to a cover listing, the minimum price can still be achieved, though when additional cover is purchased, the cost of cover will move up in price faster than a pool with a larger number of staked NXM allocated to the same listing.

### Managing Exposure to Risk

As the cost of cover increases, demand will begin to decrease once the price reaches a certain level and continues to rise. This can limit exposure to risk, while generating more revenue for the Mutual and members participating as NXM stakers.

Dynamic pricing plays an important role in risk management, though it’s not the only way the protocol manages exposure to risk.