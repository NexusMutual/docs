---
sidebar_position: 1.5
description: How to place a limit order to buy cover at your price, or renew cover automatically.
---

# Place a limit order

A **limit order** buys new cover once the price falls to your maximum, or renews existing cover before it expires, from one signed instruction. A [solver](/protocol/cover#limit-orders) executes it onchain when the price condition is met.

## Before you start

You need to be a [member](/overview/membership). You need an allowance for the payment asset to the `LimitOrders` contract, except when you pay in ETH.

## Placing an order

You start a new-cover order from the buy-cover flow, or a renewal order from a cover you hold.

A new-cover order takes the same cover amount, asset, and period as a regular purchase. You also set a maximum annual price and an expiry of 1, 3, 7, or 30 days. A renewal order additionally takes a repeat count, from 1 to 11, so one order can renew the cover more than once.

Placing an order signs an EIP-712 message. Signing is gas-free. The order is stored in the order book. Review and cancel your orders from the [cover page](https://app.nexusmutual.io/cover), which lists active orders and history.

## How execution works

You pay when the order executes. Your wallet pays the cover fee plus the solver fee, and the price used stays at or below the maximum annual price you set.

## Renewing cover

A renewal order buys a new cover for the next period, with the same amount, asset, and period, at or below your maximum annual price. Your current cover runs to its own end date, and the new cover takes over from there.

<!-- @check LimitOrders.MAX_RENEWABLE_PERIOD_BEFORE_EXPIRATION = 10 days -->
A renewal executes only in the days before your current cover ends, at most 10 days before. The app sets that window to 3 days by default.

Renewal can fail when the [pool's capacity](/protocol/capacity) is full, or when the price stays above your maximum. Execution depends on the solver acting, so an order can pass its window without executing.

## Statuses and cancelling

An order carries one of four statuses: executable, completed, cancelled, or expired. An order expires once its window passes.

Cancelling an order is an onchain transaction. It costs gas only, and it is permanent.

## Where to look

[Limit orders](/protocol/cover#limit-orders) explains the solver mechanism, and [Pricing](/protocol/pricing) explains how the price moves toward your maximum.
