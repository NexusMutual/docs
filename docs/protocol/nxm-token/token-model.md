---
sidebar_position: 4.2
---

# Token model

Nexus Mutual uses a continuous token model, also referred to as a bonding curve. The bonding curve ensures that capital efficiency can be achieved, as it's extremely important for cover providers. Ultimately, underwriters live or die based on their capital efficiency.

Capital efficiency in underwriting means:
* Making sure the mutual has enough funds to confidently pay all claims; and
* Not sitting on excess capital that isn't required

The bonding curve exists to balance these two objectives. 

## Token price

The token price varies based on two primary parameters controlled by the bonding curve:
1. The funding level of the mutual; and
2. The amount of capital required to support the covers written.

### Token price formula

<code>Price = A + (MCR(eth) / C) x MCR%^4</code>

Where:
* TP = Token Price in Ether
* A and C are constant values, which were calibrated at launch
  * A = 0.01028
  * C = 5,800,000
* MCR = the value of the minimum capital requirement in ETH, which grows as the number of covers grows
* MCR% = ratio of the [capital pool](/protocol/capital-pool/) to the minimum capital requirement

The MCR(eth) floor was set through governance in October 2020 and currently stands at 162,424.73 ETH.

### Drivers of growth

The token price is controlled by the bonding curve, which reflects the two fundamental drivers of growth: funds in the capital pool and cover sales.

In the short term, the MCR(eth) value is fixed, which means that short-term NXM price movements are driven entirely by how much capital is in the capital pool. More capital means higher MCR%, which leads to a higher NXM price.

The capital pool increases when the mutual generates surplus (cover fees less claims), investment earnings grow, and/or members contribute more funds to the mutual.

In the long term, if we assume the MCR% stabilizes around a certain level, then price will be driven by MCR(eth), which is driven by active cover (i.e., adoption).

## Redemption and purchase restrictions

Several restrictions apply to the redemption and purchase of NXM tokens. Generally, these restrictions are in place to ensure the mutual always has sufficient funds to confidently pay members' claims.

### 1. MCR% related limits

* Redemptions are restricted if MCR% is less than 100%
* Purchases are restricted if MCR% is greater than 400%
* Where a transaction would result in the MCR% being outside these limits the volume of the transaction is limited

### 2. Transaction limits caps

Redemptions and purchases are limited per transaction to 5% of the MCR.

### 3. Capital pool liquidity

The capital pool must also have enough liquidity in ETH to execute on the redemption. While this is not generally expected to be an issue, this may occur temporarily if a large portion of the funds have been invested in non-ETH assets.

### 4. Redemption price

To discourage speculative buy/sell behavior, the redemption price will be set at 2.5% lower than the purchase price derived from the token model.

## New tokenomics project

DAO members are currently engaged in an ongoing project to revamp the token model, with the goals of providing better token liquidity for members and providing the protocol with a market-consistent price for NXM.

Updates from this project, and community discussion, can be found on the [#tokenomics-revamp channel](https://discord.gg/E6zKGV4yqw) in the Nexus Mutual Discord.

### Background

When Nexus Mutual launched in May 2019, the protocol used a continuous token model (i.e., bonding curve). The bonding curve serves as an integral component within the Nexus Mutual protocol. This design allows members to contribute and pool capital within one smart contract in exchange for NXM, which is used to participate within the mutual as a risk assessor or claims assessor; voter in the governance process; and as someone who buys cover to protect their assets.

Members have voted to change different bonding curve parameters over time, with members voting to switch off the MCR floor increment in October 2020 after Yan_Delphi created the [Pause Daily 1% MCR Growth proposal](https://forum.nexusmutual.io/t/pause-daily-1-mcr-growth/225) on the forum and received community comments and feedback. This proposal was transitioned to an on-chain vote, and after members cast their votes, it was approved with 1,694,351 NXM votes in favor of setting the MCR increment to 0% per day. The MCR floor remains at the 162,424.73 ETH level, as approved by members in [Proposal 103](https://app.nexusmutual.io/governance/view?proposalId=103).

Starting in December 2020, the MCR% fell below 100% and the redemption restriction prevented members from redeeming NXM for ETH. Between December 2020 and August 2021, the price of wNXM diverged from the NXM price in ETH terms, with wNXM falling below book value per NXM in August 2021—wNXM has remained below the book value per NXM since this time.

In October 2021, Muir shared the [Solving wNXM discount while maintaining reasonable MCR%](https://forum.nexusmutual.io/t/solving-wnxm-discount-while-maintaining-reasonable-mcr/683) on the governance forum. Members discussed potential solutions, with consensus that a buyback would be an effective solution. Following this discussion, Gauthier shared [Proposal: Operation TM12](https://forum.nexusmutual.io/t/proposal-operation-tm12/716), where he presented a formal proposal to allocate 8,000 ETH from the capital pool to be used to buyback wNXM with the following goals:

> Transferring these funds will add value to the mutual and its members in a number of ways:

> Providing liquidity for wNXM / ETH LP on Uniswap v3
> 
> Decrease MCR%, allowing the mutual to retain earnings and premiums
> 
> Funding new grants, encouraging growth and development
> 
> Conducting other services that would benefit the community

After considerable discussion, this proposal was transitioned to an on-chain vote, where members approved [Proposal 160](https://app.nexusmutual.io/governance/view?proposalId=160) with 1,107,957 NXM voting in support of the proposal.

### Creation of Tokenomics Working Group

After the buyback, various members voiced frustration that the 8,000 ETH hadn't closed the gap between wNXM and book value per NXM. This combined with the inability for members to redeem NXM for ETH, while the MCR% was below 100% led to a series of discussions on the Nexus Mutual governance forum and on Discord.

These discussions led to the creation of the Tokenomics Working Group, which was initially organized by Dopeee, who reached out to both vocal critics and long-term supporters of the mutual.

After receiving significant feedback from a smaller working group, Dopeee then handed the role of working group lead to Rei. Throughout Q3 and Q4 2022, the focus was on incorporating various feedback into a prospective design and modeling out extreme scenarios to fine tune the model before presenting to the community for wider feedback.

### Timeline of Progress to Date



* **August 2022**. The Tokenomics Revamp channel was created in the Nexus Mutual Discord and BraveNewDeFi posts [Rei's first summary](https://discord.com/channels/496296560624140298/1014519536218816643/1014524667140259900). Rei invites members to review his [GitHub repo](https://github.com/rmelbardis/BondingCurveNexus). Over the next two months, the members engage in in-depth discussions about the initial design.

* **October 2022**. Rei shares the [second update](https://discord.com/channels/496296560624140298/1014519536218816643/1033041913340756138) and provides an overview of the ratcheting AMM (“RAMM”) design with some options. Members again actively engage in discussion about this design and feedback is incorporated into the mechanics.

* **January 2023**. Rei shares the [Tokenomics Proposal: Replacing the Bonding Curve](https://forum.nexusmutual.io/t/tokenomics-proposal-replacing-the-bonding-curve/988) post on the forum, where the initial design for tokenomics is broadly shared with a detailed paper that outlines the various components of the tokenomics mechanism. There is considerable discussion on the forum and in the [Tokenomics Revamp Discord channel](https://discord.com/channels/496296560624140298/1014519536218816643/1066048954833321984), and an alternative proposal emerges that more closely follows the original bonding curve.

* **February 2023**. A [non-binding signaling vote](https://snapshot.org/#/community.nexusmutual.eth/proposal/0x575abc7cfc9fc68185924539a8ec1c0dcc26b12b9f2a346252125120a6382c9e) is opened for seven days, and members vote on four potential options for how members move this initiative forward. Members vote with 851k NXM (98.49%) for **Option A: Ratcheting AMM design**. 

* **March 2023**. In the next phase, a request for comments was put to members in the [RFC - Tokenomics Design Detail](https://forum.nexusmutual.io/t/request-for-comment-tokenomics-design-detail/1034) governance forum post. The intent of this post was to finalize the mechanics of the new tokenomics. Rei asked for feedback on the following mechanisms within the ratcheting AMM: currency of redemptions; buying/selling availability; TWAP for establishing system price; NXM price shock upon transition from bonding curve; oracle safety buffer; and a potential soft launch.

The tokenomics revamp project is currently in the **finalize the ratcheting AMM mechanics** phase, and the engineering team is reviewing the proposed solution and providing feedback on the suggested mechanics.

### Remaining phases to be completed

* **Developing the system.** Once the mechanism is finalized, the R&D team will work with the Engineering team to manage the development of the new tokenomics. The Engineering team will code, review, test, secure an audit, address audit comments, and provide the community with the new tokenomics code to review ahead of a formal [Protocol Improvement Proposal](https://docs.nexusmutual.io/governance/protocol-improvement-proposals).

* **Setting system parameters**. While the Engineering team develops the new tokenomics contracts, the R&D team will lead a governance discussion on the forum and work with members to determine the parameters for the system, which include: amount of initial liquidity for the ratcheting AMM; target liquidity for the ratcheting AMM in the long term; the speed of the ratchet below book value and above book value; how the TWAP is determined for cover capacity, cover pricing, and NXM rewards. This will be done in tandem with the development of the system, and after the mechanism itself is finalized.

* **On-chain governance vote**. After members have reviewed the ratcheting AMM codebase and a [Protocol Improvement Proposal](https://docs.nexusmutual.io/governance/protocol-improvement-proposals) has been posted on the forum for at least 14 days, the proposal will be transitioned to an on-chain vote, where members will decide if the ratcheting AMM should be implemented. If members were to approve the subsequent system, the next phase would occur.

* **Implementation**. The Engineering team would deploy the ratcheting AMM smart contract(s) and deprecate the bonding curve through a migration process. Once implemented, the new tokenomics would take effect with the initial parameters approved by members.
