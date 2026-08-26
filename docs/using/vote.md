---
sidebar_position: 4
description: How to vote on Nexus Mutual governance proposals, on Snapshot and onchain in the app.
---

# Vote on proposals

Members vote on governance proposals, some on [Snapshot](https://snapshot.box/#/s:community.nexusmutual.eth) and some in the [Nexus Mutual app](https://app.nexusmutual.io/governance).

## Before you start

You need to be a [member](/overview/membership). Your NXM balance sets your voting power.

## Where each vote happens

Nexus Mutual Protocol Improvement Proposals, Nexus Mutual DAO Proposals, and signalling votes all run on Snapshot. Advisory Board proposals also go to Snapshot, where members vote to reject the default outcome. The default passes when the 15% rejection quorum stays unmet. See [Governance](/governance/) for what each type covers.

The app's governance page lists the onchain proposals raised on the `Governor` contract: Advisory Board proposals and [member proposals](/governance/#member-proposals), with filters and a legacy V1 section. Members vote on member proposals in the app. Advisory Board members vote on Advisory Board proposals in the app. The app links out to Snapshot and to the governance forum for the rest.

## Voting power

Your voting power equals one plus the NXM you hold. NXM you have delegated to a staking pool votes with that pool's manager.

<!-- @check Governor.VOTE_WEIGHT_CAP_PERCENTAGE = 5 -->
It is capped at 5% of the total NXM supply, on Snapshot and onchain alike. The app shows this cap alongside the vote.

## Casting a vote

Cast your vote from a proposal in the app: for, against, or abstain. The app calls the `Governor` contract with your choice.

Voting on a member proposal locks your NXM transfers until the proposal becomes executable.

## Reading a proposal

The app shows a proposal's phase: voting, timelock, executable, executed, defeated, or cancelled, with a countdown to the vote deadline.

[Member proposals](/governance/#replacing-advisory-board-members) tally NXM voting power, and need 15% of the NXM supply to participate for the vote to count. Advisory Board proposals tally one vote per Advisory Board member.

<!-- @check Governor.VOTING_PERIOD = 3 days -->
Voting opens four hours after the proposal is published, and runs for 3 days. An Advisory Board proposal closes as soon as three Advisory Board members vote in favour.

<!-- @check Governor.TIMELOCK_PERIOD = 1 days -->
A carried proposal then sits in a 24-hour timelock before it executes.

## Where to look

[Governance](/governance/) covers the proposal types, the Advisory Board, and the process in depth.
