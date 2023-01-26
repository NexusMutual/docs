---
sidebar_position: 4.8
---

# Capacity

[Staking pool managers](/protocol/staking/staking-pools#staking-pool-managers) allocate staked NXM to individual products to create open capacity, which is the amount of cover that can be sold over a given period of time for a given product. Capacity is calculated as follows:

<p><code>total stake = active stake + expired stake</code></p>

Where <code>active stake</code> represents all NXM in active staking periods and expired stake represents staked NXM in staking periods that have ended and can be withdrawn by NXM stakers.

<p><code>total capacity = active stake * global capacity factor</code></p>

Where total capacity is the amount of staked NXM in active staking periods and the global capacity factor is two for all products but can be changed by the Advisory Board.

<p><code>total product capacity = total capacity * capacity reduction factor * product weight</code></p>

Where the <code>capacity reduction factor</code> is set to zero but can be adjusted up to one by the Advisory Board and <code>product weight</code> refers to the amount of staked NXM allocated to that cover product.

<p><code>total product capacity = reserved product capacity + available product capacity</code></p>

Where <code>reserved product capacity</code> is the reserved product capacity for covers that have been sold and <code>available product capacity</code> is the remaining capacity that can still be sold.

## Cover buys and reserved capacity

When someone buys cover, the protocol reserves the necessary amount of capacity within the staking pool(s) from which the cover was sourced. The protocol uses the NXM value of the cover amount at the time the cover is purchased to reserve capacity for the length of the cover period. This capacity is reserved until the cover expires, at which time the capacity becomes available again. 

## Capacity factors

Individual staking pools can determine which cover products they will allocate staked NXM against to open up capacity. The correlation risk between all staking pools needs to be managed on a global level within the protocol.

The Advisory Board can adjust two factors to adjust exposure to risk for any one product.

### Global capacity factor

At launch, the global capacity factor will be set at two for all products, which means every one NXM staked opens up two NXM worth of capacity.

### Capacity reduction factor

At launch, the capacity reduction factor will be set at zero for all products but can be increased up to a maximum of one if any one product’s active cover approaches 20% of the minimum capital requirement (MCR).
