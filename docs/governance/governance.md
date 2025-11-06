---
Sidebar_position: 8
---

# Governance

Nexus Mutual is an onchain discretionary mutual governed by its members. The Mutual uses an optimistic governance model where the Advisory Board (AB) creates a proposal and sets the default outcome.

The AB creates a proposal in parallel on the [Nexus Mutual DAO Snapshot space](https://snapshot.box/#/s:community.nexusmutual.eth), where Nexus Mutual members can vote to reject the default outcome. If Nexus Mutual members vote and meet the quorum for rejection, the AB's default outcome is rejected and the proposal does not move forward.

## The Advisory Board

The Advisory Board (AB) puts forward governance proposals and recommends a default outcome. There are five (5) subject matter experts that sit on the AB, who bring expertise across three broad skill sets:
* Technical expertise: smart contract security and blockchain
* Technical expertise: insurance and mutuals
* General expertise: legal, regulatory, corporate governance, and business management

The current AB members are:
* [Roxana Danila](https://twitter.com/roxdanila)
* [Hugh Karp](https://twitter.com/HughKarp)
* [Rei Melbardis](https://twitter.com/Rei_Melb)
* [Lee McClelland](https://www.linkedin.com/in/lee-j-mcclelland/)
* [Graeme Thurgood](https://twitter.com/GraemeThurgood)

### The Role of the Advisory Board

The Advisory Board has power in limited circumstances and is primarily there to provide qualified technical guidance to Mutual members on proposals, prevent fraud from occurring within the Mutual, perform technical upgrades when granted authority by members, and take emergency action to pause the protocol, should it be required.

For governance votes, the AB recommends a default outcome and Nexus Mutual members may vote in the Nexus Mutual DAO Snapshot space to reject that default outcome.
* If Nexus Mutual members vote to deny a proposal and quorum is reached, the proposal does not move forward and the AB's default outcome is discarded.
* If Nexus Mutual members vote to deny a proposal and quorum is not reached, the proposal moves forward and the AB's default outcome is accepted.

### Emergency Pause Powers

In extreme situations where a vulnerability is discovered, the Advisory Board has the power to enact an emergency pause of the Ratcheting AMM (RAMM) contract or of the entire protocol. This power would only be used as a means of securing the protocol if a vulnerability was discovered that could put funds at risk.

For added security, an Emergency Pause Safe multisig was created. The Emergency Pause Safe multisig's only power is to pause either the RAMM contract or the entire protocol if a vulnerability is discovered or exploited.

### Replacing Advisory Board Members

Ultimately, AB members serve at the discretion of Nexus Mutual members. Should members decide an AB member needs to be replaced, Nexus Mutual members can raise a proposal onchain to replace an AB member without interference from existing AB members.

Any Nexus Mutual member can raise a proposal to raise an AB member, with the following requirements:
* The member who raises the proposal must have a minimum of 100 NXM tokens in order to put the proposal onchain; and
* At least 15% of the total NXM token supply must participate in the vote.

If a proposal to replace an AB member receives a majority of the votes to approve and quorum is met, the proposal will pass.

## Voting Power

Every member who joins Nexus Mutual has voting power equal to one vote plus the sum total of their NXM tokens.

### Quorum for Rejection

To defeat a proposal, members must vote with at least 15% of the NXM token supply to deny the default outcome recommended by the AB.


## Governance Proposal Timelines, Types

When governance proposals go to vote, there is a standard timeframe for the voting period:
1. **Proposal is created**. The vote is put onchain and on the Nexus Mutual DAO Snapshot space for voting.
2. **Proposal is open for voting**. All governance proposals have a three (3) day voting period.
3. **Post-vote timelock period**. Once the voting period closes, a proposal is subject to a 24-hour timelock period where no action can take place until the timelock period passes.
4. **Proposal outcome**. If a proposal succeeds, it can be executed after the timelock period ends. If a proposal is defeated, no action is taken after the timelock period ends.

This applies to all of the governance proposal types outlined below.

### Nexus Mutual Protocol Improvement Proposals (NMPIP)

A Nexus Mutual Protocol Improvement Proposal (NMPIP) is a proposal to signal or enact a change to the Nexus Mutual protocol. These proposals are used to engage with the community, reach consensus, and enact proposals if approved through a vote.

Members can post and discuss proposals on the Nexus Mutual governance forum. [All proposals need to follow the guidelines outlined in the Nexus Mutual Protocol Improvement Proposal (NMPIP) framework post on the forum](https://forum.nexusmutual.io/t/about-the-nexus-mutual-protocol-improvement-proposals-category/27).

Once an NMPIP has gone through the discussion process, it will be put to a vote on the [Nexus Mutual DAO Snapshot space](https://snapshot.box/#/s:community.nexusmutual.eth). All Nexus Mutual members can vote and enjoy gas-less voting on Snapshot.

The default outcome will be **approve** unless Nexus Mutual members vote to deny and meet quorum.

#### Capital Pool Investments

Nexus Mutual invests the idle assets held in the [Capital Pool](https://dune.com/nexus_mutual/capital-pool-and-ownership) at the discretion of its members. Any potential investment of Capital Pool funds must first go through the NMPIP process before a vote on an investment allocation can be made.

Anyone interested in putting forward a proposal to allocate a portion of Nexus Mutual's Capital Pool to an investment must follow the [Investment Proposal Template](https://forum.nexusmutual.io/t/investment-proposal-template/1096/1) that was developed by the Investment Committee.

For examples of past investment allocations, see the [Investments](/protocol/capital-pool/investments) section of the documentation.

### Nexus Mutual DAO Proposals (NMDP)

A Nexus Mutual DAO Proposal (NMDP) is a proposal that is used to propose DAO treasury management strategies, submit a grant request for funding, create a new DAO team, or request a renewal and funding for an existing DAO team. These proposals are used to engage with the community, reach consensus, manage the DAO treasury, and distribute funding from the DAO treasury to fund projects and teams.

Members can post and discuss proposals on the Nexus Mutual governance forum. [All proposals need to follow the guidelines outlined in the Nexus Mutual DAO Proposal (NMDP) framework post on the forum](https://forum.nexusmutual.io/t/about-the-nexus-mutual-dao-proposals-category/450).

Once an NMDP has gone through the discussion process, it will be put to a vote on the [Nexus Mutual DAO Snapshot space](https://snapshot.box/#/s:community.nexusmutual.eth). All Nexus Mutual members can vote and enjoy gas-less voting on Snapshot.

The default outcome will be **approve** unless Nexus Mutual members vote to deny and meet quorum.

#### DAO Treasury Management

In September 2024, Nexus Mutual members voted to approve [kpk's (formerly karpatkey) proposal to manage the Nexus Mutual DAO treasury](https://forum.nexusmutual.io/t/nmdp-8-establish-karpatkey-as-the-treasury-manager-for-nexus-mutual-dao/1511), the pool of funds set aside to fund DAO-based initiatives.

Since that time, kpk has provided [treasury updates](https://forum.nexusmutual.io/t/nexus-mutual-dao-treasury-updates-karpatkey/1572) on the governance forum. They also track the [Mutual's DAO treasury performance](https://reports.karpatkey.com/nexus-mutual?month=9&year=2025&currency=USD) on the kpk website.

#### DAO Team Funding Requests

Those who want to put their talents and skills to work for the DAO can contribute to an existing team or establish a new team that can serve the DAO for the long-term and provide a necessary function that is not being fulfilled within the DAO. For information on the existing teams, see the [latest DAO team funding request](https://forum.nexusmutual.io/c/governance-discussions/dao-team-funding/15) on the governance forum.

Anyone interested in starting a new DAO team can reach out through the [Nexus Mutual Contact Form](https://nexusmutual.io/contact) and BraveNewDeFi will respond promptly. Of course, anyone can put forward an RFC on the governance forum, but the existing DAO team members are happy to provide feedback and support to anyone interested in working for the DAO.

### Signalling Votes


While not required, signalling votes are a helpful way to gauge support for an RFC, NMDP or NMPIP before it goes to a formal vote. Anyone interested in gauging support for a proposal can reach out to [BraveNewDeFi](https://t.me/BraveNewDeFi), who can help create the signalling vote on the [Nexus Mutual DAO Snapshot space](https://snapshot.box/#/s:community.nexusmutual.eth).

***Disclaimer***: While all care has been taken, there may be some discrepancies between the governance documentation and the functioning of the onchain governance smart contracts. In the event a discrepancy exists in this documentation, the smart contract rules apply.