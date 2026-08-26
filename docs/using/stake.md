---
sidebar_position: 2
---

# Stake NXM

Staking NXM backs cover on chosen listings. Stakers earn a share of the fees paid on cover their stake supports, and carry the losses when a claim on it is paid. Staking happens in the [Nexus Mutual app](https://app.nexusmutual.io/stake).

## Before you start

You need to be a [member](/overview/membership) and to hold NXM.

## Two ways to stake

**Delegate to a pool.** You choose a staking pool and deposit into it. The pool manager decides which listings the pool backs, at what price, and with what weight. This is how most members stake.

**Run a pool.** You create a pool, choose the listings it backs, and set the prices and weights yourself. Other members can then delegate into it. This is a risk management business, and the returns and losses follow from your own pricing.

Either way the stake is at risk in the same way. Delegating chooses who makes the decisions, not whether the risk applies.

## Staking periods

<!-- @check StakingProducts.TRANCHE_DURATION = 91 days -->
Stake is committed in fixed 91-day periods, called tranches. You choose how many consecutive tranches to stake across, up to eight, so the longest commitment is around two years.

Stake in a tranche is locked until that tranche ends. You can extend into later tranches before it expires, or withdraw once it has.

Tranches have fixed calendar boundaries, so the first one you stake into is usually shorter than 91 days.

## What you earn

Stakers receive a share of the fees paid when cover is bought on the listings their stake backs. Rewards accrue over the life of that cover rather than arriving at purchase, and pool managers take a fee on them.

Rewards are claimed rather than compounded automatically.

## What you risk

**Your stake is burned when a claim is paid** on a listing your stake was backing. This is the point of staking: underwriters carry the losses, and the payout to the cover holder comes from the capital pool.

The loss is proportional to how much of the pool's capacity was allocated to the listing that was claimed on. A pool concentrated in one listing is exposed to that listing; a pool spread across many is exposed to all of them.

Because the same stake can back several listings at once, up to the pool's maximum total weight, losses on more than one listing can compound.

Staking is not a yield product with a downside case. Deciding what to stake on is a risk decision, and it is the decision the rewards are paid for.

## Managing your deposit

The delegations screen in the app lists your deposits and lets you manage each one.

You can extend a deposit into a later tranche, or top up an existing deposit, through the app's update-deposit flow. Both actions call [`extendDeposit`](/developers/contracts/StakingPool#extenddeposit) on the `StakingPool` contract.

Your staking position is an NFT, and transferring it transfers the deposit.

## Where to look

[Staking](/protocol/staking/) covers the mechanics in depth, [Staking pools](/protocol/staking/staking-pools) covers running one, and [Capacity](/protocol/capacity) explains how staked NXM turns into cover capacity.
