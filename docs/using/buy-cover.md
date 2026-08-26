---
sidebar_position: 1
---

# Buy cover

Cover protects a position against a defined risk for a set amount and period. It is bought in the [Nexus Mutual app](https://app.nexusmutual.io/cover).

## Before you start

You need to be a [member](/overview/membership), and you need the cover asset you intend to pay in.

Check that the risk you want covered has a listing. The [product index](https://nexusmutual.io/product-index) is the current list of everything the Mutual covers; the [cover products](/overview/cover-products/) pages explain what each product protects against.

## What you choose

**The listing.** The specific thing being covered, such as one protocol. Each listing is sold under a product, and the product is what sets the cover wording.

**The amount.** How much of the position you want covered. This does not have to be the whole position.

**The period.** Between 28 and 365 days. Cover starts when you buy it.

**The cover asset.** The asset the cover is denominated in and would be paid out in.

The price comes from the staking pools backing that listing, so it moves with how much of their capacity is already in use. See [Pricing](/protocol/pricing) for how that works.

## Proof of loss is collected upfront

Most cover requires you to say what is being protected at the point of purchase — typically the addresses or positions the cover applies to. This is recorded with the cover and cannot be changed afterwards.

Getting this wrong is the most common reason a claim fails. A loss on an address you did not list is not covered, however genuine the loss.

Check which details a listing requires before you buy, and check them again before you confirm.

## What you receive

Cover is held as an NFT in the address that bought it. It can be transferred or sold along with the position it protects, and whoever holds it can claim on it.

## Read the cover wording

The wording is the contract. It defines what counts as a loss, what is excluded, and what evidence you need. Every claim is assessed against it by the [Claims Committee](/protocol/claims-assessment).

Two things in it are worth knowing before you buy rather than after a loss:

- the **grace period**, which is how long after the cover expires you can still file a claim for a loss that happened while it was active. It varies by product, from a couple of weeks to several months.
- the **deductible**, where one applies. Losses below it are not claimable.

Each product's page links its wording, and the wordings are also published on IPFS.

## After buying

Your cover appears in the [app](https://app.nexusmutual.io/dashboard). If you suffer a loss, see [File a claim](/using/file-a-claim).

Cover does not renew automatically. When it expires, coverage stops. To renew it automatically instead, see [Limit orders](/using/limit-orders).
