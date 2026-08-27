---
sidebar_position: 2.5
description: How to swap ETH for NXM, or wrap NXM to wNXM, in the Nexus Mutual app.
---

# Swap NXM

The swap page in the [Nexus Mutual app](https://app.nexusmutual.io/swap) pairs ETH with NXM through the RAMM. It also wraps NXM to wNXM directly.

## What the page shows

The UI shows the **swap rate**, a **gas estimate**, the **price impact**, and the **minimum received** after slippage.

The maximum amount you can send is your balance minus the estimated gas.

## Set your slippage and deadline

You set a **slippage tolerance** and a **transaction deadline** before you swap. Slippage tolerance bounds how far the price can move against you before the swap fails. The deadline bounds how long the transaction can sit unconfirmed before it fails.

## Before you swap

The app checks the protocol-wide pause state before it lets a swap go through. Swapping resumes once the protocol is unpaused.

## Swapping ETH and NXM

A RAMM swap calls `swap` with your minimum amount out and your deadline. Buying NXM sends ETH with the transaction. See [Token Model](/protocol/nxm-token/token-model) for how the RAMM prices NXM.

## Wrapping to wNXM

You can also wrap NXM to wNXM, or unwrap wNXM back to NXM, from the same page. Wrapping calls the wNXM contract directly, instead of the RAMM. Price impact applies only to a RAMM swap.

:::caution Disclaimer for the NXM Wrapper
The Wrapped NXM token (WNXM) is NOT a wrapper created by or supported by Nexus Mutual, and it is important to understand that it operates independently. While the Foundation team endeavors to provide a safe and user-friendly User Interface (UI) for the benefit of Nexus Mutual Members, it is essential to emphasize that the underlying smart contract governing WNXM is not associated with NXM and Nexus Mutual. The smart contract was developed by a third-party and is entirely separate from Nexus Mutual. While we strive to maintain a secure environment, the DAO teams cannot give any assurances or support with regard to the actions or outcomes related to the WNXM smart contract. Please be aware that any engagement with WNXM is done at your own risk, and Nexus Mutual Members are advised to exercise caution and conduct their own due diligence when engaging with WNXM, or consult with the sources provided on this website for any inquiries related to the token.
:::

wNXM is an ERC-20 token that wraps NXM one to one, so the token can move freely across wallets and decentralised finance protocols while NXM itself only transfers between members. Unwrapping wNXM back to NXM requires a membership.

The wNXM contract can be found on Etherscan: [0x0d438F3b5175Bebc262bF23753C1E53d03432bDE](https://etherscan.io/token/0x0d438f3b5175bebc262bf23753c1e53d03432bde)

Sources for the wrapper:

* [jclancy93's crypto wrapper on GitHub](https://github.com/jclancy93/crypto-wrapper), the wrapper contract with community interfaces
* [PepperSec's Wrapped NXM on GitHub](https://github.com/peppersec/wrappedNXM)
* [Wrapped NXM on CoinGecko](https://www.coingecko.com/en/coins/wrapped-nxm)
* [Wrapped NXM on the Nexus Mutual DAO website](https://nexusmutualdao.io/wrapped-nxm)
