# Net Asset Value Calculation

At the end of every quarter (31/03, 30/06, 30/09, 31/12), the VO calculates total Net Asset Value ("NAV").

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

If NAV is positive:
- Bonuses distributed 60%
- Nexus Mutual profit share 20%
- VO share 20%

If NAV is negative:
- Claim submitted via Nexus Mutual Baseline Yield Cover

Note that there may be some retrospective revisions to the NAV calculations based on updated/audited results from Insurance Partners. Any impacts of those will flow through to the NAV calculations of the upcoming quarters and we do not expect to retrospectively change outcomes of previous quarters once declared.

**Individual Components (where not self-explanatory)**

*Value of Nexus Mutual Cover*
Calculated as <code>Cover Amount in USDC * Annual Cost of Cover * (Cover Days Remaining / 365)</code>


*Pre-funded Cover Fee Asset*
The purpose of this item is to smooth out the impact on NAV of the NXM Grant used to pay early Baseline Yield Cover fees.
For the first six quarters (Q1 - Q6) of operating the Vault, this asset is the cumulative total of the cover fees paid using the NXM grant, denominated in USDC at the time of each cover buy/edit.
For the following six quarters (Q7 - Q12), the asset is released in a pattern that is a mirror image of the pattern that it was accumulated in.

Example:
The equivalent of 1000 USDC is paid in NXM as a Baseline Yield cover fee on day 100 of operating the Vault. The Pre-funded Cover Fee Asset increases by 1000 USDC instantly.
1000 USDC is then scheduled to be released from the Cover Fee Asset on
Release Day = 2 * Quarter Length * Number of Funding Quarters - Current Day = 992
where:
Quarter Length = 91
Number of Funding Quarters = 6
In the example, Current Day = 100
