---
sidebar_position: 1
---

# Net Asset Value Calculation

At the end of every quarter (31/03, 30/06, 30/09, 31/12), the VO calculates total Net Asset Value ("NAV").

## NAV Definition

NAV is defined as:

**Assets - Liabilities**

Where:

**Assets** =
- NAV of all Insurance Partner positions
- Unallocated Assets in VO Multisig
- Value of Nexus Mutual Cover
- Any Pending Claims on the Nexus Mutual Baseline Yield Cover

**Liabilities** =
- Total Market Capitalisation of RWIV tokens
- Any Pending Bonuses
- Pre-funded Cover Fee Asset

## Calculation Outcomes

If NAV is **positive**, bonuses are distributed:
- 60% to locked users in proportion to accumulated points
- 20% to Nexus Mutual via profit sharing on the Baseline Yield Cover
- 20% to the Vault Operator

If NAV is **negative**, the VO submits a claim via Nexus Mutual Baseline Yield Cover

The Baseline Yield Cover pays through Nexus Mutual's [claims assessment](/protocol/claims-assessment) process. The VO submits a claim with a claim deposit, then a voting window opens, followed by a cooldown period and a redemption window. The assessors decide the claim: an accepted vote releases payment, and a denied vote closes the claim. This settlement lag sits inside the quarterly top-up timeline.

Note that there may be some retrospective revisions to the NAV calculations based on updated/audited results from Insurance Partners. Any impacts of those will flow through to the NAV calculations of the upcoming quarters and we do not expect to retrospectively change outcomes of previous quarters once declared.

## Individual Components (where not self-explanatory)

**Value of Nexus Mutual Cover**

Calculated as <code>Cover Amount in USDC * Annual Cost of Cover * (Cover Days Remaining / 365)</code>

Annual Cost of Cover is the annualized premium rate the Vault Operator pays for the Baseline Yield Cover. The protocol quotes the rate at each cover purchase or renewal. The vault's financial model assumes 3% per year.

**Pre-funded Cover Fee Asset**

The purpose of this item is to smooth out the impact on NAV of the NXM Grant used to pay early Baseline Yield Cover fees.
For the first six quarters (Q1 - Q6) of operating the Vault, this asset is the cumulative total of the cover fees paid using the NXM grant, denominated in USDC at the time of each Cover buy/edit.
For the following six quarters (Q7 - Q12), the asset is released in a pattern that is a mirror image of the pattern that it was accumulated in.

*Example:*

The equivalent of 1000 USDC is paid in NXM as a Baseline Yield Cover fee on day 100 of operating the Vault. The Pre-funded Cover Fee Asset increases by 1000 USDC instantly.

1000 USDC is then scheduled to be released from the Cover Fee Asset on <code>Release Day = 2 * Quarter Length * Number of Funding Quarters - Current Day = 992</code>

where:

<code>Quarter Length = 91</code>

<code>Number of Funding Quarters = 6</code>

In the example, <code>Current Day = 100</code>
