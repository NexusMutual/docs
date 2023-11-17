---
Sidebar_position: 4.5
---

# Governance

Nexus Mutual is a decentralized people-powered protocol that is governed by members. Through protocol governance, members can propose and vote on changes to any aspect of the protocol. These decisions determine the mutual’s future operations.

In addition, members determine how DAO treasury funds are allocated and spent. These funds are often used to fund DAO teams or grants that improve awareness and education or technical infrastructure and capabilities.

## Protocol governance power

Every member who joins Nexus Mutual has voting power equal to one vote plus the sum total of their NXM tokens, which applies to protocol governance.

<p><code>On-chain voting power = 1 + MIN (5% of NXM supply, NXM holdings)</code></p>

A single member’s voting power is capped at 5% of the total NXM supply. This is designed to prevent a large holder from having undue influence in protocol governance.

### Advisory Board

The Advisory Board is currently made up of five members of the mutual and contains members of the founding team and other experts. The goal is to have a qualified mix of individuals covering three broad skill sets of:
* Technical expertise: smart contract security and blockchain
* Technical expertise: insurance and mutuals
* General expertise: legal, regulatory, corporate governance, and business management

The Advisory Board has power in limited circumstances and is primarily there to provide qualified technical guidance to the members of the mutual on improvement proposals as well as take emergency action, should it be required. The scope of the Advisory Board’s power in governance is outlined on the [Nexus Mutual Protocol Improvement Proposals (NMPIP)](/governance/protocol-improvement-proposals) page.

#### Advisory Board Members

The Advisory Board requires three of five members to enact changes.
* [Roxana Danila](https://twitter.com/roxdanila)
* [Hugh Karp](https://twitter.com/HughKarp)
* [Rei Melbardis](https://twitter.com/Rei_Melb)
* [Nick Munoz-McDonald](https://github.com/NickErrant)
* [Graeme Thurgood](https://twitter.com/GraemeThurgood)

#### Emergency Pause Powers

In extreme situations where a vulnerability is discovered, the Advisory Board has the power to enact an emergency pause of the Ratcheting AMM (RAMM) contract or of the entire protocol. This power would only be used as a means of securing the protocol if a vulnerability was discovered that could put funds at risk.

For added security, a separate Emergency Pause multisig was created with *only* the power to pause either the RAMM contract or the entire protocol. An additional two (2) signers have been added to this multisig to have adequate coverage across time zones.

The Advisory Board members listed above are signers on this multisig, as well as:
* [BraveNewDeFi](https://twitter.com/BraveDeFi), Head of the DAO Community team
* [Shark0der](https://twitter.com/shark0der), Nexus Mutual Foundation Technical Lead

## DAO governance power

Voting power in DAO governance, which uses Snapshot, is equal to the sum total of an individual member’s NXM tokens.

## Governance proposals

Nexus Mutual members can start discussions on the [Nexus Mutual governance forum](https://forum.nexusmutual.io/), which can then be transitioned to a vote after enough time has passed. There are two different proposal types, and they focus on either the protocol or the DAO.

### Protocol improvement proposals, votes

Members can create a [Nexus Mutual Protocol Improvement Proposal (NMPIP)](/governance/protocol-improvement-proposals) to share on the forum and discuss with other members. These proposals can generally be classified in one of the two following categories.
* [Upgrades, Technical Changes, Use of Funds](/governance/protocol-improvement-proposals#upgrades-technical-changes-use-of-funds)
* [Critical Decisions](/governance/protocol-improvement-proposals#critical-decisions)

#### Protocol improvement proposal quorum parameters
* Quorum (Regular Resolutions): 15% of total NXM supply
* Quorum (Special Resolutions): 75% of total NXM supply
* Majority (Regular Resolutions): 50%+ of voting weight
* Super-majority (Special Resolutions): 75%+ of voting weight

#### Voting incentives

Voting requires members to dedicate time and attention to reviewing proposals, making decisions, and casting votes.

To encourage wider participation and reward members for their time, 100 NXM in incentives is split between the number of members who vote on a protocol improvement proposal, not the number of tokens cast in a vote. These rewards make it worthwhile for all members to participate.

#### Governance security

Members that use their NXM to vote on a protocol improvement proposal will not be able to redeem or transfer their NXM for three days after they cast their vote.

The governance restriction can be calculated as follows:

<p><code>Restriction = T + 3 days</code></p>

Where T = timestamp when vote is cast

Members can still use their NXM to stake and delegate to a staking pool and participate in claims assessment, but transfers and redemptions will not be possible for the duration of the three-day period.

### DAO proposals, votes

Members can create a [Nexus Mutual DAO Proposal (NMDP)](/governance/dao-proposals) to share on the forum and discuss with other members. These proposals can generally be classified in one of the three following categories.
* [Grant request](/governance/dao-proposals#grant-request)
* [DAO team creation request](/governance/dao-proposals#dao-team-creation-request)
* [DAO team funding request](/governance/dao-proposals#dao-team-funding-request)

### Signaling votes

These are not required but may be used to gauge sentiment as part of a protocol or DAO proposal. To gauge sentiment, someone can conduct a Snapshot vote with the title “Signaling vote: [Title of proposal]”.

These votes should be open for a minimum of three days.

Learn more about NMPPs and NMDPs in the following pages. 

***Disclaimer***: *While all care has been taken there may be some discrepancies between the Governance documentation and the functioning of the on-chain governance smart contracts. In the event a discrepancy exists in this documentation, the smart contract rules apply.*
