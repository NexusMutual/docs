---
sidebar_position: 4
description: "How to vote on Nexus Mutual proposals: on Snapshot for every proposal, and in the app to replace an Advisory Board member."
---

# Vote on proposals

Members vote on [Snapshot](https://snapshot.box/#/s:community.nexusmutual.eth). The Advisory Board then implements the outcome onchain. One kind of proposal runs onchain among members: replacing an Advisory Board member.

## Before you start

You need to be a [member](/overview/membership). Your NXM holding sets your voting power, see [Voting power](#voting-power).

## Vote on Snapshot

Every governance proposal goes to the [Nexus Mutual DAO Snapshot space](https://snapshot.box/#/s:community.nexusmutual.eth): Nexus Mutual Protocol Improvement Proposals, Nexus Mutual DAO Proposals, signalling votes, and Advisory Board proposals. You vote there with your voting power, gas-free. See [Governance](/governance/) for what each type covers.

For an Advisory Board proposal, the Advisory Board recommends a default outcome. Your vote supports or rejects it. The default passes when the 15% rejection quorum stays unmet.

After Snapshot closes, the Advisory Board members cast their onchain votes to match the outcome, and the `Governor` contract executes the proposal after the timelock. You can follow those onchain votes on the app's governance page.

## Replace an Advisory Board member onchain

A [member proposal](/governance/#member-proposals) swaps one Advisory Board seat, and it runs onchain among members.

<!-- @check Governor.PROPOSAL_THRESHOLD = 100 ether -->
Any member holding more than 100 NXM can raise one.

Cast your vote from the proposal in the [app](https://app.nexusmutual.io/governance): for, against, or abstain. The app calls the `Governor` contract with your choice. Your vote locks your NXM transfers until the proposal becomes executable. [Member proposals](/governance/#replacing-advisory-board-members) tally NXM voting power and need 15% of the NXM supply to participate for the vote to count.

## Voting power

Your voting power equals one plus the NXM you hold. NXM you have delegated to a staking pool votes with that pool's manager.

<!-- @check Governor.VOTE_WEIGHT_CAP_PERCENTAGE = 5 -->
It is capped at 5% of the total NXM supply, on Snapshot and onchain alike. The app shows this cap alongside the vote.

## Reading a proposal in the app

The app shows a proposal's phase: voting, timelock, executable, executed, defeated, or cancelled, with a countdown to the vote deadline.

<!-- @check Governor.VOTING_PERIOD = 3 days -->
Voting opens four hours after the proposal is published, and runs for 3 days. An Advisory Board proposal closes as soon as three Advisory Board members vote in favour. Advisory Board proposals tally one vote per Advisory Board member.

<!-- @check Governor.TIMELOCK_PERIOD = 1 days -->
A carried proposal then sits in a 24-hour timelock before it executes.

## Where to look

[Governance](/governance/) covers the proposal types, the Advisory Board, and the process in depth. Discuss proposals on the [governance forum](https://forum.nexusmutual.io/).
