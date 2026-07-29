---
sidebar_position: 3
---

# File a claim

A claim is filed against cover you hold, in the [Nexus Mutual app](https://app.nexusmutual.io/claims). The [Claims Committee](/protocol/claims-assessment) assesses it against the cover wording and votes on the outcome.

## Before you start

You must hold the cover and be a [member](/overview/membership). If you bought cover without joining, you need to join before you can claim.

Check two things first:

- **the grace period has not passed.** You can claim after cover expires, but only within the grace period set by the product. It varies, from a couple of weeks to several months.
- **the loss meets the cover wording.** The wording defines what counts as a loss and what is excluded. If there is a deductible, losses below it are not claimable.

The Claims Committee can help you check both, and calculate the loss, before you file. Reach them through the in-app chat or the [contact form](https://nexusmutual.io/contact). Doing this first is worth it.

## The deposit

<!-- @check Claims.CLAIM_DEPOSIT_IN_ETH = 0.05 ether -->
Filing requires a deposit of 0.05 ETH, submitted with the claim.

- **Claim accepted** — the deposit is returned along with the payout.
- **Claim assessed as a draw** — the deposit can be retrieved.
- **Claim denied** — the deposit is not returned.

It exists to make frivolous claims cost something. It is not a fee on genuine claims.

## What you submit

**Incident details.** What happened, when, and where. Links to the transactions, a post-mortem, or anything else that establishes the event.

**Proof of loss.** For most cover this was recorded when you bought it — the addresses or positions the cover applies to. Where it was not, you provide it now.

**The amount.** What you are claiming, after any deductible. It cannot exceed the cover amount.

You review everything before it goes onchain.

## What happens next

The Claims Committee reviews the claim and votes. Voting stays open for **at least 72 hours**, and assessors record the reasoning behind their vote, which you can read once voting closes.

A **24-hour cooldown** follows, during which the Advisory Board can act if a vote was fraudulent.

If the claim is accepted you have **30 days** to redeem the payout. It is paid in the cover asset, from the capital pool, and the stake backing that cover is burned.

## If your claim is denied

You can file again. A denied claim is usually a claim the evidence did not establish, so another submission is worth making only with something the first one lacked — a clearer link between the loss and the covered position, or evidence of the amount.

The reasoning recorded by the assessors tells you what was missing.

## Where to look

[Claim assessment](/protocol/claims-assessment) covers the process and who assesses claims. [Claims history](/overview/claims-history/) has every past claim, including the denied ones and why.
