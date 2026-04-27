---
sidebar_position: 7
---

# FAQs

## Where does the yield come from?

The Vault Operator generates returns by providing capital to carefully selected [Insurance Partners](insurance-partners.md). The RWI Vault is launched in partnership with [Re](https://re.xyz/). Re uses this capital to underwrite large portfolios of short-tailed mass market reinsurance business - auto, property, warranty and workers compensation.

The typical timeline for release of reserves in these lines of business is 18-24 months.


## What are RWIV tokens?

The Real-World Insurance Vault (“RWIV”) token is a representation of the depositor’s loan to the Vault Operator. Each RWIV’s value relative to USDC rolls up automatically at the fixed Baseline Yield.

RWIV tokens are fully composable and can be freely used in the wider DeFi ecosystem.

Note that the actions of:

- making new deposits to the Vault,
- withdrawing USDC directly from the Vault and
- locking tokens to earn bonuses

are restricted to approved depositors who have completed KYC/KYB and Sophisticated Investor checks.


## Why would I lock my RWIV?

Locking RWIV tokens for longer periods better aligns the timelines of the depositors with the return emergence of the Vault Operator’s underlying investments. Depositors who lock their RWIV will be rewarded with points, with a higher earning rate for those locking for longer periods, up to a maximum lock duration of 2 years.

Should the underlying insurance investments generate surplus returns exceeding the Baseline Yield and cost of Nexus Mutual Cover, then 60% of this excess will be distributed as USDC on a quarterly basis, in proportion to the points accumulated by individual depositors. 

The VO will report on the additional yield to locked depositors as the bonus distributions are made.


## How long do withdrawals take?

Most withdrawals will be processed within **90 days** if the Vault Operator is required to unwind the underlying investments.

Smaller requests with immediately available liquidity will be filled within a few days.

The release of funds actively used as insurance reserves is subject to approval by the local regulators of the insurance partners. In extreme scenarios, it is possible that RWI Vault depositors will have to wait for the backed policies to expire and reserves to be released in full before liquidity is available. This process can take a year or longer.

The RWIV tokens continue to accumulate at the Baseline Yield while placed in the withdrawal queue. There is also a secondary market pool available on Uniswap v3 for instant trading of RWIV.


## What does the Nexus Mutual Cover protect against?

The Baseline Yield Cover is designed to fully protect the Baseline Yield for depositors by covering against the risk of insufficient underlying insurance returns, process failure by the VO and Vault smart contract risk.

The Baseline Yield Cover provided by Nexus Mutual pays out to the Vault Operator on a quarterly basis if the Vault does not achieve the Baseline Yield.

If the Vault’s [Net Asset Value](/rwi-vault/yield-structure/bonuses/nav-calculation) is negative at the end of a quarter, the cover will make up the difference.

## Is the Baseline Yield fixed forever?

No. The Baseline Yield can be changed onchain by the Vault Operator with a 90-day delay from submitting the change.

The Vault Operator benchmarks the yield by tracking the average of the 2- and 5-year US Treasury yields (the main drivers of mass-market insurance returns) plus a 2-3% spread. If there is a deviation of more than 1% from the previous average, the operator may change the Baseline Yield to ensure sustainability of returns. The VO also reserves the right to respond to other changing conditions.
