---
sidebar_position: 2.2
description: How to create a staking pool, set its management fee, and price the listings it backs.
---

# Run a pool

Running a pool means creating a **staking pool**, choosing the listings it backs, and setting the prices and weights yourself. Other members can then delegate into it, and you earn a **management fee** on the pool's rewards.

## Before you start

Being a [member](/overview/membership) is the only requirement to create a pool. Stake into it separately, like any member, if you want exposure to its risk.

## Creating a pool

Create a pool from your pools on the [stake page](https://app.nexusmutual.io/stake). You set the pool's shape: public or private, a name of up to 80 characters, and a description of up to 500 characters. You also set the current management fee and the maximum management fee.

You then set the pool's initial listings, each with a target weight and a target price.

The name and description go to IPFS, and the hash goes onchain.

## The management fee

You must set the maximum management fee below 100%, and it stays fixed after creation. See [Staking pools](/protocol/staking/staking-pools).

The current fee changes any time up to that maximum, and the change takes effect immediately.

## Managing listings

You set a **target weight** per listing. [Capacity](/protocol/capacity) explains the bounds and the pool total.

You set a target price for each listing, within the bounds on [Staking pools](/protocol/staking/staking-pools), and at least the listing's minimum price where the Advisory Board set a higher one. The target price changes immediately, and the price buyers pay moves toward it over time. See [Pricing](/protocol/pricing).

## Public and private pools

You can switch a pool between public and private, see [Staking pools](/protocol/staking/staking-pools#staking-pool-managers). A private pool accepts deposits and extensions from you, the manager, only.

## What you earn

Your fee comes off the pool's rewards before delegators receive theirs, and you can withdraw it any time.

## What you risk

Burns hit your own deposit like any other stake. Your fee stays outside burns.

## Where to look

[Staking pools](/protocol/staking/staking-pools) covers running a pool in depth, [Stake NXM](/using/stake) covers delegating into one, and [Capacity](/protocol/capacity) explains how listings turn into capacity.
