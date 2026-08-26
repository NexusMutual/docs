---
sidebar_position: 4
---

# Vote

Members vote on governance proposals, some on [Snapshot](https://snapshot.box/#/s:community.nexusmutual.eth) and some in the [Nexus Mutual app](https://app.nexusmutual.io/governance).

## Before you start

You need to be a [member](/overview/membership). Your NXM balance sets your voting power.

## Where each vote happens

Nexus Mutual Protocol Improvement Proposals, Nexus Mutual DAO Proposals, and signalling votes all run on Snapshot. See [Governance](/governance/) for what each type covers.

The app's [governance page](https://app.nexusmutual.io/governance) lists the onchain proposals raised on the Governor contract: Advisory Board proposals and member proposals, with filters and a legacy V1 section. Members vote on member proposals in the app, and Advisory Board seats vote on Advisory Board proposals in the app. The app links out to Snapshot and to the governance forum for the rest.

## Voting power

Your voting power equals one plus the NXM you hold.

<!-- @check Governor.VOTE_WEIGHT_CAP_PERCENTAGE = 5 -->
It is capped at 5% of the total NXM supply. The app shows this cap alongside the vote.

## Casting a vote

Cast your vote in the app as For, Against, or Abstain. The app calls the Governor contract with your choice.

Voting on a member proposal locks your NXM transfers until the proposal becomes executable.

## Reading a proposal

The app shows a proposal's phase: Voting, Timelock, Executable, Executed, or Cancelled, with a countdown to the vote deadline.

Tallies show the NXM voted For, Against, and Abstain, alongside a quorum line.

<!-- @check Governor.VOTING_PERIOD = 3 days -->
Voting runs for 3 days.

<!-- @check Governor.TIMELOCK_PERIOD = 1 days -->
A carried proposal then sits in a 24-hour timelock before it executes.

## Where to look

Vote on onchain proposals from the app's [governance page](https://app.nexusmutual.io/governance). Vote on Snapshot at the [Nexus Mutual DAO Snapshot space](https://snapshot.box/#/s:community.nexusmutual.eth). Discuss proposals on the [governance forum](https://forum.nexusmutual.io/).
