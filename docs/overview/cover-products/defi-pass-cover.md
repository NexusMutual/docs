---
sidebar_position: 1.6
---

# DeFi Pass Cover

The DeFi Pass product is designed for people who are active in one network's DeFi ecosystem and regularly move their crypto assets between major protocols to get the best yields.

Instead of buying several different Protocol Covers or Bundled Protocol Covers to protect your crypto assets, you can buy one DeFi Pass for a fixed price to protect against smart contract and economic risks across several of the leading protocols within one network's ecosystem.

## Covered Risks

With a DeFi Pass, you can deposit funds in any, or all of, the designated protocols for a given network up to the aggregate value of your covered amount and enjoy all-in-one, flexibile protection that safeguards your assets against the following risks:
* Smart contract exploits/hacks
* Severe oracle failure/manipulation
* Severe liquidation failure
* Governance attacks

When you purchase a DeFi Pass, you will specify the wallet address you want to purchase cover for. Your DeFi Pass Cover will only be valid for assets deployed from the designated wallet address you specified at the time of purchase.

## Covered Risks: Base DeFi Pass

When you have crypto assets deposited in Aerodrome, Arcadia, Beefy, Compound v3, ExtraFi, Moonwell, Morpho, Overnight and Uniswap v3 on Base, the Base DeFi Pass Cover provides all-in-one, flexibile protection that safeguards your assets against the following risks:
* Smart contract exploits/hacks
* Severe oracle failure/manipulation
* Severe liquidation failure
* Governance attacks

To learn more about the designated protocols (i.e., the protocols included in the Base DeFi Pass) and the covered sub-protocols, see the [Base DeFi Pass Annex](https://api.nexusmutual.io/ipfs/QmVjm5qfpkJdHiLCLpR9UeYM5WWQ58SpWTH9upWowvozGK).

## DeFi Pass Cover Wording

For more information, read the full terms and conditions of [Nexus Mutual's DeFi Pass Cover](https://api.nexusmutual.io/ipfs/QmQLh2wNDD2b2RGg9rNFbyrQwxqTthrTNaTsHenZnRg6u6).

To learn about the protocols included in each DeFi Pass, you can read the Annex documentats below:
* [Base DeFi Pass Annex](https://api.nexusmutual.io/ipfs/QmVjm5qfpkJdHiLCLpR9UeYM5WWQ58SpWTH9upWowvozGK)

## Exposed Funds vs. Cover Amount

While the DeFi Pass allows you to cover crypto assets across multiple protocols, your Cover Amount (i.e., the amount of coverage you purchase) should be equal to or greater than your Exposed Funds (i.e., the total value of your deposits across all of the covered protocols).

If you purchase $10,000 of the Base DeFi Pass, you could deposit:
* $5,000 in Beefy Finance
* $1,000 in Extra Finance
* $1,000 in Aerodrome
* $1,000 in Morpho
* $1,000 in Compound v3
* $1,000 in Overnight

For a total of $10000 in Exposed Funds.

If your Exposed Funds balance is greater than your Cover Amount, then your potential claim payment would be reduced proportionally depending on the difference between your Exposed Funds and your Cover Amount. See the examples below to learn more.

### Example 1: Proportional Claim Amount

* **Cover Amount**: $100,000
* **Exposed Funds at the time of loss**: $200,000
  * $100,000 in Beefy
  * $50,000 in Aerodrome
  * $20,000 in Uniswap V3
  * $30,000 in Moonwell
* **Loss Amount after applying Deductible**: $50,000 due to a partial hack of Beefy

In this scenario, the Exposed Funds ($200,000) are 2x the cover amount ($100,000). Therefore, the Claim would be reduced proportionately. Since the Exposed Funds are twice the Cover Amount, the Claim would be reduced by 50%.

**Claim Amount after reduction**: <code>Loss Amount x Cover Amount / Exposed Funds = $50,000 × $100,000 / $200,000 = $25,000</code>

### Example 2: Proportional Claim Amount

* **Cover Amount**: $100,000
* **Exposed Funds at the time of loss**: $150,000
* **Loss Amount after applying the Deductible**: $60,000

The Exposed Funds ($150,000) are 1.5x the Cover Amount ($100,000). Therefore, the Claim will be reduced by 1/3.

**Claim Amount after reduction**: <code>Loss Amount x Cover Amount / Exposed Funds = $60,000 × $100,000 / $150,000 = $40,000</code>

### Proof of Loss

DeFi Pass users specify a designated wallet address for their cover and claim assessors can use the wallet address to review a DeFi Pass user's onchain activity to assess their loss after a claim is filed.

By specifying the designated wallet address at the time cover is purchased, you provide proof that you own the designated wallet address when you buy your cover. Because of this, no other onchain cryptographic evidence is required when you file a claim.

## Claim Filing Process

After a loss event occurs, you will need to wait 14 days for the cool-down period to pass. The cool-down period applies for DeFi Pass Cover claims, per the cover wording.
1. If you hold DeFi Pass Cover at the time the loss event occurs, you can submit a claim with supporting evidence, otherwise referred to as proof of loss.
    * You will be able to include written details, links to supporting documentation, and/or upload screenshots or other files in the Incident Details portion of the claim submission process
2. Claim assessors will review, discuss and vote to approve claims where proof of loss (i.e., your designated wallet address) shows that you have indeed suffered a loss of funds.
    * If your claim is approved, you will be able to redeem your claim payout after the 24-hour cool-down period passes in the Your Covers menu. You can also check your Dashboard to see the status of any active claims.
    * If your claim is denied, you will be able to file another claim with more supporting evidence

For a review of the claim assessment process, see the [Claim Assessment](/protocol/claims-assessment) section.
