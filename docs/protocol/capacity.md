---
sidebar_position: 5
---

# Capacity

[Staking pool managers](/protocol/staking/staking-pools#staking-pool-managers) allocate staked NXM to individual listings to create available capacity, which is the amount of cover that can be sold over a given period of time for a given listing. Capacity is calculated as follows:

<!-- @check Cover.getGlobalCapacityRatio = 20000 -->
A tranche's capacity equals the tranche's stake, multiplied by the global capacity ratio of 2.0, multiplied by one minus the product's capacity reduction ratio, multiplied by the product's target weight. Most products keep the reduction ratio at zero, so the factor stays at one. A product's capacity in a pool sums its usable tranche capacities and subtracts active allocations. Total product capacity sums that figure over every pool that lists the product.

<!-- @check StakingProducts.MAX_TOTAL_WEIGHT = 2000 -->
Product weight is the target-weight ratio a pool manager sets for a product, from 0 to 1.00 per product. A pool's total target weight across its products is capped at 20.00.

## Cover Buys and Reserved Capacity

When someone buys cover, the protocol reserves the necessary amount of capacity within the staking pool(s) from which the cover was sourced. The protocol uses the NXM value of the cover amount at the time the cover is purchased to reserve capacity for the length of the cover period. This capacity is reserved until the cover expires, at which time the capacity becomes available again. 

## Capacity Factors

Individual staking pools can determine which cover listings they allocate staked NXM against to open up capacity. The correlation risk between all staking pools needs to be managed on a global level within the protocol.

The Advisory Board can adjust two factors to adjust exposure to risk for any one product.

### Global Capacity Factor

<!-- @check Cover.getGlobalCapacityRatio = 20000 -->
The global capacity factor is set at two for all listings, which means every one NXM staked opens up two NXM worth of capacity.

### Capacity Reduction Factor

The capacity reduction factor is set at zero for all products but can be increased up to a maximum of one if any one listing's active cover approaches 20% of the minimum capital requirement (MCR).