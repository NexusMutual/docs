---
sidebar_position: 2.2
---

# Run a pool

Running a pool means creating a **staking pool**, choosing the listings it backs, and setting the prices and weights yourself. Other members can then delegate into it, and you earn a management fee on their rewards.

## Before you start

You need to be a [member](/overview/membership). Membership is the only requirement to create a pool. Stake into it separately, like any member, if you want exposure to its risk.

## Creating a pool

Create a pool from **your pools** under [stake](https://app.nexusmutual.io/stake), in two steps.

**Step 1** sets the pool's shape: public or private, a name of up to 80 characters, and a description of up to 500 characters. It also sets the current management fee and the maximum management fee.

**Step 2** sets the pool's initial listings, each with a target weight and a target price.

The name and description go to IPFS, and the hash goes onchain.

## The management fee

The maximum management fee stays fixed once you create the pool. The contract accepts a maximum below 100%, for an effective ceiling of 99%.

The current fee changes any time up to that maximum, and the change takes effect immediately.

## Managing listings

For each listing, you set a target weight from 0 to 1.00.

<!-- @check StakingProducts.MAX_TOTAL_WEIGHT = 2000 -->
Weights across all the pool's listings add up to at most 20.00.

You also set a target price, at most 100% and at least the listing's minimum price. Weight and price changes both take effect immediately.

## Fee and privacy

Switching a pool to private takes effect immediately. A private pool accepts deposits and extensions from you, the manager, only.

## What you earn and risk

Your fee comes off the rewards before delegators receive theirs, and you can withdraw it any time. Only the NXM you deposit yourself carries burn risk. See [Staking pools](/protocol/staking/staking-pools) and [Stake NXM](/using/stake) for the mechanics.

## Where to look

Manage your pools from **your pools** on the [stake page](https://app.nexusmutual.io/stake).
