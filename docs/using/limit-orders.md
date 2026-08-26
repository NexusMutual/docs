---
sidebar_position: 1.5
---

# Limit orders

A **limit order** buys new cover once the premium falls to your maximum, or renews existing cover before it expires, from one signed instruction. A solver executes it onchain when the price condition is met.

## Before you start

You need to be a [member](/overview/membership). You need an allowance for the payment asset to the LimitOrders contract, except when you pay in ETH.

## Placing an order

Start from two places in the [app](https://app.nexusmutual.io/cover). Use **Place Limit Order** on the buy-cover flow for new cover, or **Set Renewal Order** on an existing cover to renew it.

A new-cover order takes the same cover amount, asset, and period as a regular purchase. You also set a maximum annual fee and an expiry of 1, 3, 7, or 30 days. A renewal order additionally takes a repeat count, from 1 to 11, so one order can renew the cover more than once.

Placing an order signs an EIP-712 message. Signing is gas-free. The order is stored in the order book, and you pay only when it executes.

## How execution works

A solver executes your order once the current premium plus the solver's fee is at or below your maximum, inside the order's window. Your wallet pays the actual premium plus the fee at that moment. Any surplus between your maximum and the actual cost returns to you.

## Renewing cover

<!-- @check LimitOrders.MAX_RENEWABLE_PERIOD_BEFORE_EXPIRATION = 10 days -->
A renewal order can execute at most 10 days before your current cover expires. The app sets the window to 3 days before expiry by default.

Renewal can fail when the pool's capacity is full, or when the price stays above your maximum.

## Statuses and cancelling

An order carries one of these statuses: executable, completed, or cancelled. It becomes expired once its window passes.

Cancelling an order is an onchain transaction. It costs gas only, and it is permanent.

## Where to look

Find your orders in two places: the **Your orders** section on the cover page, and the **Limit Orders** tab on the [stake page](https://app.nexusmutual.io/stake), which lists active orders and history.
