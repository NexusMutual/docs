---
sidebar_position: 3
---

# Glossary

Terms used across these docs, in the sense Nexus Mutual uses them.

## Membership and governance

**Member**
Someone who has joined the Mutual. Membership requires KYC and a one-off fee, and is held by a single address. Only members can buy cover, hold NXM, stake, vote, or file a claim. See [Membership](/overview/membership).

**Discretionary mutual**
A mutual whose members share risk with each other and decide claims on their merits, rather than an insurer selling a contract that pays automatically on a defined trigger. Cover is discretionary: a claim is assessed against the cover wording by people, not settled by a formula.

**Advisory Board**
The members who raise governance proposals, perform technical upgrades when granted authority, and pause the protocol in an emergency. Members can replace an Advisory Board member through an onchain proposal. See [Governance](/governance/).

**Claims Committee**
The members who assess claims. They review the evidence, discuss the claim against the cover wording, and vote to accept or deny it, recording their reasoning. See [Claim assessment](/protocol/claims-assessment).

**Voting power**
A member's weight in a vote: their NXM balance plus one, capped at a share of total supply. Staking pool managers also vote with the NXM delegated to their pools.

## Cover

**Cover**
Protection bought against a specific risk for a set period and amount. Held as an NFT, so it can be transferred or sold with the position it protects. See [Cover](/protocol/cover).

**Cover wording**
The terms and conditions of a cover product: what is covered, what is excluded, and what counts as a loss. The Claims Committee assesses every claim against it.

**Listing**
A single thing you can buy cover on, such as one protocol or one custodian. Each listing is sold under a product.

**Product**
The kind of cover a listing is sold under. The product sets the cover wording, the grace period, and how a claim on it is assessed. Single Protocol Cover and Quota Share Cover are products.

**Cover asset**
The asset a cover is denominated in and paid out in.

**Cover period**
How long a cover runs, chosen when it is bought, within the minimum and maximum the protocol allows.

**Grace period**
A window after a cover expires during which a claim can still be filed for a loss that happened while the cover was active.

**Deductible**
An amount of loss a cover holder bears before a claim can be made. Used where small losses are expected in normal operation, such as validator penalties.

**Proof of loss**
The evidence a claimant provides. Most cover requires it upfront, recorded when the cover is bought, so the covered addresses or positions are fixed before any loss occurs.

**Quota share**
An arrangement where the Mutual takes an agreed share of another cover provider's risk, and pays that share of their claims.

**Retrocession**
Reinsurance of a reinsurer. The Mutual taking on risk that another party has already assumed.

## Staking and capacity

**Staking**
Committing NXM to back cover on chosen listings. Staked NXM earns a share of cover fees, and is burned when a claim on one of those listings is paid, so the underwriters carry the loss. The payout itself comes from the capital pool.

**Staking pool**
A pool that holds staked NXM and allocates it across listings. Each pool has a manager who chooses listings, target prices and weights.

**Staking pool manager**
The member running a pool. They decide which listings the pool backs and at what price, and vote with the pool's delegated NXM.

**Delegation**
Staking NXM into someone else's pool rather than running one. The manager decides the allocations, and the stake carries the same reward and burn exposure.

**Tranche**
The fixed period staked NXM is committed for. Stake is held per tranche and can be withdrawn once its tranche expires, or extended into a later one. See [Staking](/protocol/staking/) for the length and how tranches line up.

**Capacity**
The amount of cover that can be sold. Staked NXM opens capacity at a multiple set by the capacity factor.

**Capacity factor**
The multiple applied to staked NXM to give total capacity. Set globally and adjustable by the Advisory Board.

**Capacity reduction factor**
A per-listing reduction applied to capacity, used to limit how much of the Mutual's exposure any one listing can take.

**Weight**
The share of a pool's capacity a manager allocates to a listing. A pool can allocate across listings up to a maximum total weight, so the same stake backs several listings at once.

**Effective weight**
The greater of a listing's target weight and the weight its current allocations actually consume. A listing that fills past its target counts at what it is using, not at what the manager asked for.

## Pricing

**Target price**
The annual price a pool manager sets for a listing. Price returns to it over time when nobody is buying.

**Bumped price**
The price after a purchase pushes it up. Each cover buy raises the price in proportion to the capacity it consumes, so demand moves price.

**Spot price**
The price a cover is bought at now: the bumped price reduced by the drop that has accrued since the last purchase, and never below the target price.

**Price drop**
The rate at which price falls back toward the target price when no cover is being bought.

## Capital

**Capital pool**
The assets backing cover. Premiums flow in, claim payouts flow out, and its value against the MCR determines how well capitalised the Mutual is. See [Capital pool](/protocol/capital-pool/).

**Minimum Capital Requirement (MCR)**
The minimum the Mutual needs to hold to be confident it can pay all claims. Driven by total active cover divided by the gearing factor. See [MCR](/protocol/capital-pool/mcr).

**MCR%**
The capital pool's value as a percentage of the MCR. Above 100% means the Mutual holds more than its requirement.

**Gearing factor**
The divisor applied to total active cover to give the MCR. It expresses how much cover the Mutual is willing to write against its capital.

**Active cover**
The total amount of cover currently in force, in ETH terms.

## The NXM token

**NXM**
The membership and governance token. It is backed by the capital pool, used to stake, and used to vote. It can only be held and transferred by members.

**Book value**
The capital pool in ETH divided by NXM supply — the capital backing each token.

**Ratcheting AMM (RAMM)**
The mechanism that lets members swap between NXM and ETH, using two simulated pools whose liquidity is injected and ratcheted over time. See [Token model](/protocol/nxm-token/token-model).
