---
sidebar_position: 2
---

# Audit timeline

Every security review of the Nexus Mutual smart contracts, in reverse chronological order, with the code that was reviewed and the on-chain upgrade that shipped it.

Each entry lists the governance proposal that put the audited code on Ethereum mainnet, so any release can be traced from report to proposal to deployed contract.

## 2026

### Asset oracle update — April 2026

Support for reading the rETH/ETH ratio directly from the token, ahead of the Chainlink feed's deprecation.

- **Reviewed by:** iosiro — reviewed as a change to already-audited contracts, so no standalone report was produced
- **Contracts:** `Pool.sol`, `AggregatorRETH.sol`
- **Shipped:** Governor proposal [#3](https://app.nexusmutual.io/governance/proposals/3), executed 16 April 2026

### Cover purchase signature update — January 2026

An extra `data` field and a `deadline` added to the `buyCoverWithRi` signature.

- **Reviewed by:** iosiro — reviewed as a change to already-audited contracts, so no standalone report was produced
- **Contracts:** `Cover.sol`
- **Shipped:** Governor proposal [#2](https://app.nexusmutual.io/governance/proposals/2), executed 23 February 2026

## 2025

### RI cover changes — October 2025

Support for selling cover backed by external reinsurance pools.

- **Reviewed by:** iosiro
- **Report:** [Nexus Mutual RI Cover Changes Smart Contract Audit](https://iosiro.com/audits/nexus-mutual-ri-cover-changes-smart-contract-audit)
- **Contracts:** `Cover.sol`, `Pool.sol`, `RegistryAware.sol`, `CoverNFTDescriptor.sol`
- **Shipped:** 30 October 2025, alongside the protocol upgrade

### Protocol upgrade — August to October 2025

A reimplementation of governance and claim assessment: the new `Governor` and `Registry` contracts, Assessments V3 and Claims V3.

- **Reviewed by:** iosiro
- **Report:** [Nexus Mutual Protocol Upgrade Smart Contract Audit](https://iosiro.com/audits/nexus-mutual-protocol-upgrade-smart-contract-audit)
- **Contracts:** 23 files, including `Governor.sol`, `Registry.sol`, `Assessments.sol`, `Claims.sol`, `Pool.sol`, `Ramm.sol`, `SwapOperator.sol`, `TokenController.sol`, `SafeTracker.sol`, `NXMaster.sol`
- **Shipped:** proposal [#264](https://app.nexusmutual.io/governance/proposals/v1/264), executed 29 October 2025, followed by the Registry deployment on 30 October 2025

### RWI Vault — September 2025 to March 2026

The ERC-7540 vault contracts used for real-world investments, reviewed across an initial audit and four follow-up changes.

- **Reviewed by:** iosiro
- **Report:** [Nexus Mutual RWI Vault Smart Contract Audit](https://iosiro.com/audits/nexus-mutual-rwi-vault-smart-contract-audit)
- **Repository:** `NexusMutual/rwa-vault`

### Cover edits, limit orders and staking pool fix — March 2025

Editable covers, the `LimitOrders` contract, and a fix to staking pool deposit extension.

- **Reviewed by:** iosiro
- **Report:** [Nexus Mutual Cover Edit, Limit Orders and Staking Pool Fix Smart Contract Audit](https://iosiro.com/audits/nexus-mutual-cover-edit-limit-orders-and-staking-pool-fix-smart-contract-audit)
- **Contracts:** 14 files, including `Cover.sol`, `CoverProducts.sol`, `LimitOrders.sol`, `StakingPool.sol`, `StakingProducts.sol`, `TokenController.sol`, `Assessment.sol`
- **Shipped:** proposals [#250](https://app.nexusmutual.io/governance/proposals/v1/250) and [#252](https://app.nexusmutual.io/governance/proposals/v1/252), executed 24 April 2025

### Product pricing changes — January 2025

A minimum price per product listing, removal of surge pricing, and a revised price bump ratio.

- **Reviewed by:** iosiro
- **Report:** [Nexus Mutual Product Pricing Changes Smart Contract Audit](https://iosiro.com/audits/nexus-mutual-product-pricing-changes-smart-contract-audit)
- **Contracts:** `Cover.sol`, `CoverProducts.sol`, `StakingPool.sol`, `StakingProducts.sol`
- **Shipped:** proposal [#244](https://app.nexusmutual.io/governance/proposals/v1/244), executed 17 January 2025

## 2024

### USD price feed oracle support — November 2024

Support for Chainlink USD-denominated price feeds.

- **Reviewed by:** iosiro
- **Report:** [Nexus Mutual USD Price Feed Oracle Support Audit](https://iosiro.com/audits/nexus-mutual-usd-price-feed-oracle-support-audit)
- **Contracts:** `PriceFeedOracle.sol`
- **Shipped:** proposal [#241](https://app.nexusmutual.io/governance/proposals/v1/241), executed 11 November 2024

### Long-term limit order — September 2024

Long-lived limit orders for the SwapOperator.

- **Reviewed by:** iosiro
- **Report:** [Nexus Mutual Long Term Limit Order Smart Contract Audit](https://iosiro.com/audits/nexus-mutual-long-term-limit-order-smart-contract-audit)
- **Contracts:** `Pool.sol`, `SwapOperator.sol`
- **Shipped:** proposal [#236](https://app.nexusmutual.io/governance/proposals/v1/236), executed 10 October 2024

### Staking pool fixes and NXM batch withdrawal — August 2024

Corrections to reward share accounting, prevention of deallocation when burning during the grace period, and system-wide batch withdrawal of NXM rewards.

- **Reviewed by:** iosiro
- **Report:** [Staking Pool Fixes and NXM Batch Withdrawal Changes Smart Contract Audit](https://www.iosiro.com/audits/staking-pool-fixes-and-nxm-batch-withdrawal-changes-smart-contract-audit)
- **Contracts:** `StakingPool.sol`, `StakingProducts.sol`, `Cover.sol`, `TokenController.sol`, `Assessment.sol`, `SwapOperator.sol`, `StakingExtrasLib.sol`
- **Shipped:** proposal [#235](https://app.nexusmutual.io/governance/proposals/v1/235), executed 30 August 2024

### CoverProducts refactor and total active cover fix — July 2024

Extraction of the `CoverProducts` contract to resolve contract size limits, plus a correction to active cover accounting.

- **Reviewed by:** iosiro
- **Report:** [Nexus Mutual CoverProducts Refactor and Total Active Cover Fix Smart Contract Audit](https://iosiro.com/audits/nexus-mutual-coverproducts-refactor-and-total-active-cover-fix)
- **Contracts:** `Cover.sol`, `CoverProducts.sol`, `CoverNFTDescriptor.sol`, `StakingPool.sol`, `StakingProducts.sol`, `IndividualClaims.sol`, `YieldTokenIncidents.sol`
- **Shipped:** proposals [#230](https://app.nexusmutual.io/governance/proposals/v1/230) and [#231](https://app.nexusmutual.io/governance/proposals/v1/231), executed 25 July 2024

### Swap Operator asset-to-asset — March 2024

Direct pool asset swaps through CoW Protocol.

- **Reviewed by:** iosiro
- **Report:** [Nexus Mutual Swap Operator Asset to Asset Smart Contract Audit](https://iosiro.com/audits/nexus-mutual-swap-operator-asset-to-asset-smart-contract-audit)
- **Contracts:** `SwapOperator.sol`
- **Shipped:** proposal [#216](https://app.nexusmutual.io/governance/proposals/v1/216), executed 21 May 2024

### Safe Tracker — January 2024

An ERC-20-style contract that values the assets held in the Advisory Board's Safe multisig, used at the time to manage the Mutual's Aave v3 loan.

- **Reviewed by:** iosiro
- **Report:** [Nexus Mutual Safe Tracker Smart Contract Audit](https://iosiro.com/audits/nexus-mutual-safe-tracker-smart-contract-audit)
- **Contracts:** `SafeTracker.sol`
- **Shipped:** proposal [#218](https://app.nexusmutual.io/governance/proposals/v1/218), executed 22 May 2024

## 2023

### Tokenomics — October to November 2023

The Ratcheting AMM (RAMM), which introduced continuous on-chain NXM liquidity.

- **Reviewed by:** iosiro (smart contracts) and Chaos Labs (economic design)
- **Reports:** [Nexus Mutual Tokenomics Smart Contract Audit](https://iosiro.com/audits/nexus-mutual-tokenomics-smart-contract-audit) · [Chaos Labs economic audit](https://chaoslabs.xyz/resources/chaos_labs_nexus_mutual_pt_1.pdf)
- **Contracts:** `Ramm.sol`, `Pool.sol`, `MCR.sol`, `TokenController.sol`, `Cover.sol`, `Assessment.sol`, `IndividualClaims.sol`, `YieldTokenIncidents.sol`, and the legacy Pool, Gateway and PooledStaking contracts
- **Shipped:** proposals [#210](https://app.nexusmutual.io/governance/proposals/v1/210) and [#211](https://app.nexusmutual.io/governance/proposals/v1/211), executed 21 November 2023

### V2 — November 2022 to March 2023

The full V2 protocol: the new cover, staking and assessment architecture.

- **Reviewed by:** iosiro, across two audit rounds and a final retest
- **Report:** [Nexus Mutual V2 Audit](https://gist.github.com/iosiro-security/9ab387c0f43fddfc50e3a66802d2f4f7)
- **Contracts:** all contracts under `contracts/modules`
- **Shipped:** proposals [#187](https://app.nexusmutual.io/governance/proposals/v1/187) to [#190](https://app.nexusmutual.io/governance/proposals/v1/190), executed 9 March 2023

## 2021 and earlier

### Emergency response — August 2021

A rework of the emergency pause and contract upgrade mechanics.

- **Reviewed by:** iosiro
- **Report:** [Nexus Mutual Emergency Response Smart Contract Audit](https://iosiro.com/audits/nexus-mutual-emergency-response-smart-contract-audit)
- **Shipped:** proposals [#154](https://app.nexusmutual.io/governance/proposals/v1/154) and [#155](https://app.nexusmutual.io/governance/proposals/v1/155), executed 2 September 2021

### Distributor — June 2021

The distributor contract and factory, which let a third party buy cover on behalf of its own users.

- **Reviewed by:** iosiro, following an earlier review by the G0 Group
- **Report:** [Nexus Mutual Distributor Smart Contract Audit](https://iosiro.com/audits/nexus-mutual-distributor-smart-contract-audit)

### Stacked risk, on-chain MCR and Swap Operator — May 2021

Yield token cover, the move of MCR calculation on-chain, and the introduction of the Swap Operator.

- **Reviewed by:** iosiro
- **Report:** [Nexus Mutual Stacked Risk, On-Chain MCR and Swap Operator Smart Contract Audit](https://iosiro.com/audits/nexus-mutual-stacked-risk-on-chain-mcr-and-swap-operator-smart-contract-audit)
- **Shipped:** proposals [#142](https://app.nexusmutual.io/governance/proposals/v1/142), [#143](https://app.nexusmutual.io/governance/proposals/v1/143) and [#144](https://app.nexusmutual.io/governance/proposals/v1/144), executed 26 May 2021

### Onboarding review — April 2021

iosiro's familiarisation review of the protocol at the start of the engagement, covering the smart contracts, the distributor and the pricing API. Its purpose was to onboard the auditors rather than to assess a release, and it was not published.

### Earlier audits

- **Distributor contract**, G0 Group, March 2021 — [report](/audits/G0Group-NexusMutualDistributor.pdf)
- **Claim payout contract upgrade**, G0 Group, November 2020 — [report](/audits/G0Group-Nexus_CPU.pdf)
- **Pooled staking contract**, G0 Group, June 2020 — [report](https://github.com/g0-group/Audits/blob/master/G0Group-NexusMutual2020Jun.pdf)
- **Pre-launch audit**, Solidified, April 2019 — [report](https://github.com/solidified-platform/audits/blob/master/Audit%20Report%20-%20Nexus%20Mutual%20%5B22.04.2019%5D.pdf)

## Verifying an upgrade yourself

Every upgrade listed above was executed by an on-chain governance proposal. To check one:

- Proposals up to October 2025 were executed through the `Governance` contract at `0x4A5C681dDC32acC6ccA51ac17e9d461e6be87900`. The `ActionSuccess` event carries the proposal ID, and `NXMaster` at `0x01BFd82675DBCc7762C84019cA518e701C0cD07e` emits `ContractUpgraded` for each contract that was replaced.
- From the V3 upgrade onwards, proposals are executed through the `Governor` at `0xcafea6063d4Ec6b045d9676e58897C1f0882Ca32`, which emits `ProposalExecuted`, and `Registry` at `0xcafea2c575550512582090AA06d0a069E7236b9e` emits `ContractUpgraded`.

See [Audits and security](./audits-and-security.md) for the bug bounty programme and the Mutual's wider security practices.
