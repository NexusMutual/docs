---
sidebar_position: 5.2
---

# Nexus Mutual Protocol Improvement Proposals

An Nexus Mutual Protocol Improvement Proposal (NMPIP) is a proposal to signal or enact change to the Nexus Mutual protocol. These proposals are used to engage with the community, reach consensus, and enact proposals if approved through an on-chain vote.

Members can post, discuss, and vote on proposals that fall into one of the following categories. 

## Upgrades, technical changes, use of funds

Members can propose changes to protocol parameters and incentives, the capital model, and the pricing mechanism. When new products are developed, an NMPIP is shared, discussed, and voted on by members. All investment allocations or any use of capital pool funds require an NMPIP and vote before execution, as well.

The proposals are implemented via the governance process with the following quorum requirements:
* Regular quorum (15% of total NXM supply)
* Majority threshold (50%+ of voting weight)
* Default outcome determined by Advisory Board

### Role of Advisory Board

The Advisory Board members provide a recommended outcome for each proposal via an Advisory Board vote. If the 15% regular quorum isn’t reached, then the Advisory Board's recommendation is the default outcome.

## Critical decisions

In extreme circumstances, members can create an NMPIP and hold an on-chain vote to decide if Nexus Mutual should make changes to the Advisory Board, stop cover purchases, or wind up and shut down. 

Proposals to replace an Advisory Board member have the following quorum requirements:
* Regular quorum (15% of total NXM supply)
* Majority threshold (50%+ of voting weight)

Other proposals in this category are implemented via the governance process with the following quorum requirements:
* High quorum (75% of total NXM supply)
* Super majority (75%+ of voting weight)
* Default outcome of decline

### Role of Advisory Board

The Advisory Board whitelists critical decision proposals; however, any Advisory Board member can be replaced by another member if the membership base agrees. **Proposals to replace an Advisory Board member bypass the whitelist approach and ensure that members on a whole are in control.**

## NMPIP governance process

Any potential governance change should start as a Request for Comment (RFC) before a protocol improvement proposal is raised. Creating a Nexus Mutual Protocol Improvement Proposal (NMPIP) is the second step in the protocol governance process. Any member can start RFC discussions, create, post, and vote on NMPIPs.

### 1. Posting a RFC

Every governance discussion should start as a Request for Comment (RFC) to get feedback from the community and, if applicable, the engineering team.

RFCs should be posted for at least 12 days before they are raised as formal NMPIPs. Of course, they can be posted for longer periods, but a minimum is necessary to ensure members have adequate time to give feedback ahead of a formal proposal. This feedback can be used to revise your proposal ahead of a NMPIP posting.

The format for RFCs is an abbreviated version of the NMPIP format:

**Title**. [RFC]: [Concise title for proposal]. For example: <code>[RFC]: Invest some of the mutuals funds in LIDO stETH</code>

**Summary**. Short summary, no more than 250 words, of your proposal.

**Rationale**. Explain why your proposal is important: what problem does it solve?

**Specification**. The what and how of your proposal. What is the purpose of your proposal and how does it solve the stated problem, benefit members, or improve the protocol?

### 2. Posting an NMPIP

When you are ready to write an NMPIP, you should include the following information:

**Title**. NMPIP: [Concise title for proposal]. For example: <code>NMPIP: Invest some of the mutuals funds in LIDO stETH</code>

**Summary**. Short summary, no more than 250 words, of your proposal.

**Rationale**. Explain why your proposal is important: what problem does it solve?

**Specification**. The what and how of your proposal. What is the purpose of your proposal and how does it solve the stated problem, benefit members, or improve the protocol?

**Technical requirements**. Outline any development resources and requirements necessary for your proposal to be implemented.

**Proposal status**. Depending on what stage your proposal is in, you must include:
* **Stage**. One of the following should be added: 1) Open for Comment, 2) Closed, 3) Open for voting, 4) Accepted, or 5) Rejected.
  * If you choose to conduct a signaling vote using Snapshot, please update status to Signaling Vote and link to that vote. Signaling votes can be used but are not required.
* If it is in the open for vote stage, add the link to the on-chain proposal

Other sections may be added, but the above should be outlined in any NMPIP proposal.

### 3. Review and discussion period

An NMPIP should be open for review and comment for at least 14 days before requesting to have your proposal whitelisted by the Advisory Board.

NMPPs can be in the open for comment stage for longer periods of time, but there is a minimum to ensure review, feedback, and discussion can occur before the proposal is reviewed by the Advisory Board.

### 4. Work with Advisory Board to whitelist proposal


Members who post an NMPIP that has been active for at least 14 days can request the Advisory Board to review and whitelist a proposal on-chain.

The Advisory Board will categorize the NMPIP, assign a proposal number, and set the total NXM token rewards to be shared among those participating in the vote.

**Note**: this step does not apply to critical decision votes. 

### 5. On-chain vote

Once a vote has been whitelisted and transitioned on-chain, members can vote on the proposal. On-chain votes are open for three days before they close and the results are finalized.

#### NXM redemption, transfer lock

Members who vote will not be able to redeem or transfer their NXM tokens for a three-day period once they cast their vote. For more information, see the [governance security](/governance/#governance-security) entry.

#### Advisory Board vote

For upgrades, technical changes, use of funds votes, the Advisory Board will vote to make a recommended outcome. If the 15% quorum is not reached, the Advisory Board’s recommendation is the default outcome.

### 6. Implementation

If the majority of members vote to approve, the proposal will pass and will be implemented after a 24-hour cool-down period.

## NMPIP Template

* Title
  * Summary
  * Rationale
  * Specification
    * Technical requirements
  * Proposal status
