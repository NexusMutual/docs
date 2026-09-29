---
sidebar_position: 1
description: How to buy cover in the Nexus Mutual app, what you choose, what you receive, and what happens after.
---

# Buy cover

Cover protects a position against a defined risk for a set amount and period. It is bought in the [Nexus Mutual app](https://app.nexusmutual.io/cover).

## Before you start

You need to be a [member](/overview/membership), and you need the cover asset you intend to pay in.

Check that the risk you want covered has a listing. The [product index](https://nexusmutual.io/product-index) is the current list of everything the Mutual covers, and each product's [cover wording](/overview/cover-products/cover-wordings) sets out what it protects against.

## What you choose

**The listing.** The specific thing being covered, such as one protocol. Each listing belongs to a product, and the product is what sets the cover wording.

**The amount.** How much of the position you want covered. This does not have to be the whole position. Cover the value you would lose, not the gross size of the position. On a loan, that is your collateral less your debt. On a looped position, it is the capital you put in, not the multiplied total. For a complex leveraged position, [contact the team](https://nexusmutual.io/contact) before you buy.

**The period.** Between 28 and 365 days. Cover starts when you buy it. Cover cannot be cancelled or refunded. If you edit a cover later, the unused premium counts toward the new premium.

**The cover asset.** The asset the cover is denominated in and would be paid out in.

The price comes from the staking pools backing that listing, so it moves with how much of their capacity is already in use. See [Pricing](/protocol/pricing) for how that works.

You can also wait for a lower price with a limit order, see [Place a limit order](/using/limit-orders).

## Proof of loss is collected upfront

Most cover requires you to give **proof of loss** at the point of purchase: the addresses or positions the cover applies to. This is recorded with the cover. You can edit it later, see [Updating your proof of loss](#updating-your-proof-of-loss).

Getting this wrong is the most common reason a claim fails. A loss on an address you did not list is not covered, however genuine the loss.

Check which details a listing requires before you buy, and check them again before you confirm.

## What you receive

Cover is held as an NFT in the address that bought it. It can be transferred along with the position it protects, and whoever holds it can claim on it.

## Read the cover wording

The wording is the contract. It defines what counts as a loss, what is excluded, and what evidence you need. Every claim is assessed against it by the [Claims Committee](/protocol/claims-assessment).

Three things in it are worth knowing before you buy rather than after a loss:

- the **covered events and the exclusions**. Covered events name what the product pays for, such as a smart contract exploit or a depeg. Exclusions name what it does not pay for.
- the **grace period**, which is how long after the cover expires you can still file a claim for a loss that happened while it was active. Each product sets its own.
- the **deductible**, where one applies. Losses below it are not claimable.

[Cover wordings](/overview/cover-products/cover-wordings) links the wording for every product with current listings, and the wordings are also published on IPFS.

## Updating your proof of loss

You enter proof of loss when you buy cover. To change it later, open the cover you hold and sign a message with your wallet. The change is saved off-chain, and the new details replace the old ones.

Each product defines what it asks for: covered wallet addresses with a chain selector, API keys, a validator list upload, a wallet-balances upload, or free text. Some products also carry a quota share.

You can edit it while your cover is active and during the grace period that follows, up until any loss event.

The information is stored privately and offchain. Reading it back needs a wallet signature proving you own the address. The [Claims Committee](/protocol/claims-assessment) reads it to validate claims. See the FAQ's [upfront proof of loss](/resources/faq#what-is-upfront-proof-of-loss) entry, and [File a claim](/using/file-a-claim) for what happens after a loss.

## After buying

Your cover appears in the [app](https://app.nexusmutual.io/dashboard). If you suffer a loss, see [File a claim](/using/file-a-claim).

Cover runs to its end date, then stops. From a cover you hold, you can:

- **edit it** to extend the period or change the cover amount. See [Cover](/protocol/cover#flexible-coverage).
- **renew it** with a renewal order. The order buys the next cover before this one ends, as long as the price stays at or below the maximum you set. A renewal can fail, so check that the new cover appears before the old one expires.

A renewal order is a limit order started from a cover you hold. To buy new cover at a price you choose, start a limit order from the buy flow instead. See [Place a limit order](/using/limit-orders).
