---
sidebar_position: 2.3
---

# Yearn yDAI Hack | February 2021

A total of $2,317,776.72 was paid out to Yearn Finance Smart Contract Cover holders. Smart Contract Cover has since been deprecated and replaced by Protocol Cover, an updated cover product that protects against more risks in DeFi.

## Overview
After this exploit occurred, claim assessors [discussed this loss event](https://discord.com/channels/496296560624140298/689385874265342056/807263979192713217) in the mutual's Discord server. Because Nexus Mutual is a discretionary mutual, members participate in the [Claims Assessment](/protocol/claims-assessment) process and review the validity of claims submitted after a loss event occurs.

Members reviewed the information available after the hack occurred and the consensus was that this was a covered event, as it met the conditions outlined in the existing cover wording at the time of the hack.

The Yearn development team worked with the mutual to provide members with a [complete list of affected addresses](https://github.com/NexusMutual/incidents/tree/master/2021-02-04-ydai-v1) for claim assessors to refer to when checking the proof of loss requirement during the claims voting process.

### Filed claims and outcomes
A total of eighteen (18) claims were filed, and those claims were reviewed and voted on by claim assessors. As stated in the section above, claim assessors had determined this was a covered event. Once it has been determined that an event is covered, claim assessors review the validity of claims to determine:
* Did the member have active cover at the time of the exploit?
* Did the member have a cover with an ID lower than lower than #2291?
  * The proof of loss requirement was implemented for cover IDs higher than #2291. Any cover IDs lower than #2291 were not subject to the proof of loss requirement.
* Did the member have a cover with an ID higher than #2291?
  * If so, then proof of loss was required for a claim to be approved.
  * If proof of loss was provided, then members were required to demonstrate a material loss of at least 20% of the cover amount.

For more information on each claim, review the sections below and the [Nexus Mutual Claims Dune dashboard](https://dune.com/nexus_mutual/claims).

#### Proof of loss
Members voted and approved [Proposal 109: Include Proof of Loss in Smart Contract Cover Wording](https://app.nexusmutual.io/governance/view?proposalId=109). After this proposal was passed, members introduced proof of loss in October 2020 which means that cover ID #2291 and above require proof of material loss per a signed message from the affected address at the time of claiming. Claimants must demonstrate a material loss of at least 20% of the cover amount.

#### Approved claims
Claim assessors reviewed and approved Claims 72–75, 77–84, 86–87, and 93. Of the 15 claims that were approved, none required proof of loss, as these covers had IDs lower than #2291. As proof of loss was not required, members could submit a claim regardless of whether or not they experienced a loss of funds due to the yDAI vault hack.

| Approved claims                                                               |                                                                               |                                                                               |                                                                               |                                                                               |
|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| [Claim 72](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=72) | [Claim 73](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=73) | [Claim 74](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=74) | [Claim 75](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=75) | [Claim 77](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=77) |
| [Claim 78](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=78) | [Claim 79](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=79) | [Claim 80](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=80) | [Claim 81](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=81) | [Claim 82](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=82) |
| [Claim 83](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=83) | [Claim 84](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=84) | [Claim 86](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=86) | [Claim 87](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=87) | [Claim 93](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=93) |

You can review a summary of each claim in the [Nexus Mutual Claims History database](https://nexusmutualdao.io/claims-history) and the [Nexus Mutual user interface](https://app.nexusmutual.io/assessment).

#### Denied claims
Claim assessors reviewed and denied Claims 76, 85, 88, and 92.

[**Claim 76 [Cover ID #2929]**](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=76). The address provided as proof of loss was not among the affected addresses and was not impacted by the yDAI vault hack. Claim assessors voted to deny this claim as no loss of funds occurred due to the hack.

[**Claim 85 [Cover ID #2458]**](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=85). The address provided as proof of loss was among the affected address but did not incur a loss of funds that met the 20% or greater criteria as specified in the cover wording. Given this, claim assessors voted to deny this claim.

[**Claim 88 [Cover ID #641]**](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=88). This claim did not require proof of loss, but claim assessors voted to deny. It’s unknown the complete rationale for the denial of this claim, but [Hugh speculated that](https://discord.com/channels/496296560624140298/689385874265342056/813389210123239455) "...I suspect voters took the view that there was no loss in this case but I can see arguments on both sides here. The claimant may resubmit one more time if they wish though. If they do so, I would encourage them to put forward arguments in this channel and as part of the claim submission."

**Claim 92 [Cover ID #3675]**. While a loss did occur, Yearn compensated this member for their loss of funds prior to this claim filing. Claim assessors reviewed and determined that no loss of funds had occurred since Yearn made the member whole through reimbursement, and assessors voted to deny this claim.

Due to a minor bug in the Nexus Mutual contracts at the time, the member who filed Claim 88 was not able to resubmit their claim again until May 2021. **When the member who held Cover ID #641 resubmitted their claim (i.e., [Claim 93](https://app.nexusmutual.io/claim-assessment/view-claim?claimId=93)), their resubmission was approved because their claim did not require proof of loss.**
