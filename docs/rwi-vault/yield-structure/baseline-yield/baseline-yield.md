---
sidebar_position: 8.4.1
---

# Baseline Yield

The Baseline Yield is set at a fixed rate and automatically accrues onto each investor’s loan as represented by the redemption value of the RWIV token.

The Baseline Yield is protected by [Baseline Yield Cover](nexus-mutual-cover.md) from Nexus Mutual that steps in to fill the shortfall in the unlikely case of insufficient returns from the underlying insurance products, or any process or smart contract failures.

## Baseline Yield Setting

The yield is set at a level driven by a margin above 2-year and 5-year US Treasury yields — the driving force behind mass market insurance product returns. The VO aims to target a return ~2-3% above the monthly averages of those rates but is also entitled to respond to other macro or Insurance Partner changes.

The baseline yield can only be changed with a 90 day notice period by the VO by calling <code>proposeBaseApyChange()</code> onchain.

The current Baseline Yield can be found on the app.

## Accrual

The Baseline Yield is applied to the value of the RWIV token programmatically, compounded per second. The value can be obtained by calling the <code>convertToShares()</code> function. Simplified calculation:

<code>assetsPerShare = startAssetsPerShare * (1 + interestPerSecond) ^ secondsPassed</code>

Here, <code>startAssetsPerShare</code> and <code>secondsPassed</code> are in reference to the values as at the last block where the Baseline Yield was changed.