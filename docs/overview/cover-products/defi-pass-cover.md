---
sidebar_position: 3
---

# DeFi Pass Cover

The DeFi Pass product is designed for people who are active in one network's DeFi ecosystem and regularly move their crypto assets between major protocols to get the best yields.

Instead of buying several different Protocol Covers or Bundled Protocol Covers to protect your crypto assets, you can buy one DeFi Pass for a fixed price to protect against smart contract and economic risks across several of the leading protocols within one network's ecosystem.

## Covered Risks

With a DeFi Pass, you can deposit funds in any, or all of, the designated protocols for a given network up to the aggregate value of your covered amount and enjoy all-in-one, flexible protection that safeguards your assets against the following risks:
* Smart contract exploits/hacks
* Severe oracle failure/manipulation
* Severe liquidation failure
* Governance attacks

When you purchase a DeFi Pass, you will specify the wallet address you want to purchase cover for. Your DeFi Pass Cover will only be valid for assets deployed from the designated wallet address you specified at the time of purchase.

## Covered Risks: Base DeFi Pass

When you have crypto assets deposited in Aerodrome, Arcadia, Beefy, Compound v3, ExtraFi, Moonwell, Morpho, Overnight and Uniswap v3 on Base, the Base DeFi Pass Cover provides all-in-one, flexible protection that safeguards your assets against the following risks:
* Smart contract exploits/hacks
* Severe oracle failure/manipulation
* Severe liquidation failure
* Governance attacks

To learn more about the designated protocols (i.e., the protocols included in the Base DeFi Pass) and the covered sub-protocols, see the [Base DeFi Pass Annex](https://api.nexusmutual.io/ipfs/QmVjm5qfpkJdHiLCLpR9UeYM5WWQ58SpWTH9upWowvozGK).

## DeFi Pass Cover Wording

For more information, read the full terms and conditions of [Nexus Mutual's DeFi Pass Cover](https://api.nexusmutual.io/ipfs/QmQLh2wNDD2b2RGg9rNFbyrQwxqTthrTNaTsHenZnRg6u6).

To learn about the protocols included in each DeFi Pass, you can read the Annex documentats below:
* [Base DeFi Pass Annex](https://api.nexusmutual.io/v2/ipfs/QmQLh2wNDD2b2RGg9rNFbyrQwxqTthrTNaTsHenZnRg6u6)

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

### Upfront Proof of Loss

When you hold DeFi Pass Cover and suffer a loss of funds, you can file a claim and the Claims Committee will review your claim submission to determine whether your claim is valid.

For DeFi Pass Cover claims, you provide the wallet address or addresses you want to apply to your cover in the Nexus Mutual app during the cover purchase process. If you need to edit your covered addresses to remove or add additional addresses, you can do that during the active cover period.

#### How It Works

1. In the Nexus Mutual app, choose the listing you want to purchase cover for, enter your desired Cover Amount and Cover Period.
2. You will see an **Extra Cover Info** section just below the Cover Details. Enter the wallet addresses you want your cover to apply to. This will serve as your proof of loss. If a loss occurs from a wallet that is not included in the Extra Cover Info, your coverage won't be applicable. It's important to enter all the wallets you want to be covered.
3. The **Buy / Edit** button will be disabled until you enter the wallet address(es) you want to include in your coverage, so nothing is missed.
4. Once that information has been entered, you can complete your cover purchase. The wallet addresses you share will be submitted and stored privately with the cover.
5. View your wallet address(es) information any time under the **Your Covers** section of the Nexus Mutual app and sign a message with your membership wallet to reveal the private information. 

#### Benefits for Members
* **Network support**. This feature now allows Nexus Mutual to underwrite coverage for both EVM-compatible networks and non-EVM networks like Solana.
* **This information is private by default**. Your details are stored privately in Nexus Mutual's offchain database, not on public IPFS (which only holds a reference), and are only accessible by you after you sign a message with your membership wallet to reveal or edit those addresses. Your session keeps you signed in as you go. Claims Committee members will access this private data when needed for Claims Assessment and can use that information to help you calculate your Claim Amount ahead of you filing a claim.
* **Required where it matters**. Only listings and cover products that require this information will ask for it, and only before that cover can be purchased or edited.

#### How Upfront Proof of Loss is Used by the Claims Committee

Because you provide your covered wallet addresses when you purchase cover and you can add or remove addresses before a loss event occurs, the [Claims Committee](/protocol/claims-assessment#expert-led-claim-assessment) will be able to review the onchain history associated with the covered wallet address(es) to determine:
* If funds were deposited when the loss event occurred
* If the cover was active when the loss event occurred
* If you suffered a loss of funds and, if so, the amount of funds that were lost and the eligible Claim Amount

The Claims Committee can help you prepare for claims filing during the cool-down period, so your claim can be processed as quickly as possible.

## Claim Filing Process

After a loss event occurs, you will need to wait 14 days for the cool-down period to pass. The cool-down period applies for DeFi Pass Cover claims, per the cover wording. During that time, the Claims Committee can help you prepare for claims filing. 
1. If you hold DeFi Pass Cover at the time the loss event occurs, you can submit a claim with supporting evidence. Your proof of loss has already been provided as noted above.
    * You will be able to include written details, links to supporting documentation, and/or upload screenshots or other files in the Incident Details portion of the claim submission process
2. The Claims Committee will review, discuss and vote to approve claims where proof of loss (i.e., your covered wallet address(es)) shows that you have indeed suffered a loss of funds.
    * If your claim is approved, you will be able to redeem your claim payout after the 24-hour cool-down period passes in the Your Covers menu. You can also check your Dashboard to see the status of any active claims.
    * If your claim is denied, you will be able to file another claim with more supporting evidence

For a review of the claim assessment process, see the [Claim Assessment](/protocol/claims-assessment) section.
