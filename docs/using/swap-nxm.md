---
sidebar_position: 2.5
description: How to swap ETH for NXM in the Nexus Mutual app.
---

# Swap NXM

The swap page in the [Nexus Mutual app](https://app.nexusmutual.io/swap) pairs ETH with NXM through the RAMM.

## What the page shows

The UI shows the **swap rate**, a **gas estimate**, the **price impact**, and the **minimum received** after slippage.

The maximum amount you can send is your balance minus the estimated gas.

## Set your slippage and deadline

You set a **slippage tolerance** and a **transaction deadline** before you swap. Slippage tolerance bounds how far the price can move against you before the swap fails. The deadline bounds how long the transaction can sit unconfirmed before it fails.

## Swapping ETH and NXM

A RAMM swap calls `swap` with your minimum amount out and your deadline. Buying NXM sends ETH with the transaction. See [Token Model](/protocol/nxm-token/token-model) for how the RAMM prices NXM.

## Before you swap

The app checks the protocol-wide pause state before it lets a swap go through. Swapping resumes once the protocol is unpaused.
