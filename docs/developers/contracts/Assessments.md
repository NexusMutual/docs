---
sidebar_position: 1
---

# Assessments

## Overview

The `Assessments` contract manages evaluation of cover claims. Assessors are organised into groups, and each product type is assigned to the group that assesses claims for it. Assessors cast a vote for or against a claim, along with the rationale for their decision.

Assessments are started by the [Claims](/developers/contracts/Claims) contract when a claim is submitted.

For the process around claim assessment, see [Claim Assessment](/protocol/claims-assessment).

---

## Key Concepts

### Assessor Groups

Assessors are members of the mutual who have been added to one or more assessor groups. A group holds the set of assessors who vote on a given kind of claim, and each product type maps to exactly one group.

An assessor can belong to several groups, and a group's metadata is stored on IPFS.

### Assessment

An assessment records the voting on a single claim.

```solidity
struct Assessment {
    uint16 assessingGroupId;
    uint32 cooldownPeriod;
    uint32 start;
    uint32 votingEnd;
    uint8 acceptVotes;
    uint8 denyVotes;
}
```

| Field              | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| `assessingGroupId` | The group assessing this claim.                               |
| `cooldownPeriod`   | Time after voting ends before the outcome is final.           |
| `start`            | Timestamp when the assessment started.                        |
| `votingEnd`        | Timestamp when voting closes.                                 |
| `acceptVotes`      | Number of votes to accept the claim.                          |
| `denyVotes`        | Number of votes to deny the claim.                            |

Each assessor holds one vote. The voting period is a minimum of three days, and can be extended or closed early.

### Ballot

A ballot records how an assessor voted.

```solidity
struct Ballot {
    uint32 timestamp;
    bool support;
}
```

Assessors record the rationale for their decision as an IPFS hash, readable through `getBallotsMetadata`.

### Status and Outcome

```solidity
enum AssessmentStatus { VOTING, COOLDOWN, FINALIZED }
enum AssessmentOutcome { PENDING, ACCEPTED, DENIED, DRAW }
```

The outcome stays `PENDING` until the cooldown period after `votingEnd` has passed. After that, more accept votes than deny votes gives `ACCEPTED`, more deny votes gives `DENIED`, and an equal number gives `DRAW`.

The cooldown period allows a vote to be undone before the outcome becomes final.

---

## Mutative Functions

### `castVote`

Casts an assessor's vote on a claim.

```solidity
function castVote(uint claimId, bool voteSupport, bytes32 ipfsHash) external;
```

| Parameter     | Description                                            |
| ------------- | ------------------------------------------------------ |
| `claimId`     | The claim being voted on.                              |
| `voteSupport` | True to accept the claim, false to deny it.            |
| `ipfsHash`    | IPFS hash holding the rationale for the decision.      |

- **Behavior:**
  - Requires the caller to be an assessor in the group assigned to the claim's product type.
  - Requires the voting period to still be open.
  - Each assessor can vote once per claim.
  - Emits `VoteCast`.

### `startAssessment`

Starts the assessment for a claim.

```solidity
function startAssessment(uint claimId, uint productTypeId, uint cooldownPeriod) external;
```

| Parameter        | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `claimId`        | The claim to assess.                                     |
| `productTypeId`  | The product type, which selects the assessing group.     |
| `cooldownPeriod` | Time after voting ends before the outcome is final.      |

**Usage:** Called by the `Claims` contract when a claim is submitted.

### `extendVotingPeriod`

Extends the voting period on a claim.

```solidity
function extendVotingPeriod(uint claimId) external;
```

### `closeVotingEarly`

Closes voting before the voting period ends, once the outcome can no longer change.

```solidity
function closeVotingEarly(uint claimId) external;
```

### `undoVotes`

Removes an assessor's votes from the given claims.

```solidity
function undoVotes(uint assessorMemberId, uint[] calldata claimIds) external;
```

| Parameter          | Description                          |
| ------------------ | ------------------------------------ |
| `assessorMemberId` | The assessor whose votes are undone. |
| `claimIds`         | The claims to undo votes on.         |

**Usage:** Used to reverse a vote during the cooldown period, before the outcome becomes final.

### Group management

These functions are governance controlled.

```solidity
function addAssessorsToGroup(uint[] calldata assessorMemberIds, uint groupId) external;
function removeAssessorFromGroup(uint assessorMemberId, uint groupId) external;
function removeAssessorFromAllGroups(uint assessorMemberId) external;
function setGroupMetadata(uint groupId, bytes32 ipfsMetadata) external;
function setAssessingGroupIdForProductTypes(uint[] calldata productTypeIds, uint groupId) external;
```

---

## View Functions

### `getAssessment`

Returns the assessment for a claim.

```solidity
function getAssessment(uint claimId) external view returns (Assessment memory assessment);
```

### `ballotOf`

Returns an assessor's ballot on a claim.

```solidity
function ballotOf(uint claimId, uint assessorMemberId) external view returns (Ballot memory);
```

### `getBallotsMetadata`

Returns the IPFS hash holding an assessor's rationale for their vote.

```solidity
function getBallotsMetadata(uint claimId, uint assessorMemberId) external view returns (bytes32);
```

### `getAssessingGroupIdForProductType`

Returns the group that assesses claims for a product type.

```solidity
function getAssessingGroupIdForProductType(uint productTypeId) external view returns (uint assessingGroupId);
```

### Group views

```solidity
function getGroupsCount() external view returns (uint groupCount);
function getGroupAssessorCount(uint groupId) external view returns (uint assessorCount);
function getGroupAssessors(uint groupId) external view returns (uint[] memory assessorMemberIds);
function getGroupsData(uint[] calldata groupIds) external view returns (AssessmentGroupView[] memory groups);
function getGroupsForAssessor(uint assessorMemberId) external view returns (uint[] memory groupIds);
function isAssessor(uint assessorMemberId) external view returns (bool);
function isAssessorInGroup(uint assessorMemberId, uint groupId) external view returns (bool);
```

### `minVotingPeriod`

Returns the minimum voting period, in seconds.

```solidity
function minVotingPeriod() external pure returns (uint);
```

---

## Events

- **`AssessmentStarted`**: Emitted when an assessment is started for a claim.
- **`VoteCast`**: Emitted when an assessor casts a vote.
- **`VoteUndone`**: Emitted when a vote is removed.
- **`VotingEndChanged`**: Emitted when the voting period is extended or closed early.
- **`AssessorAddedToGroup`** / **`AssessorRemovedFromGroup`**: Emitted when group membership changes.
- **`GroupMetadataSet`**: Emitted when a group's IPFS metadata is set.
- **`AssessingGroupForProductTypeSet`**: Emitted when a product type is assigned to a group.

---

## Frequently Asked Questions

### Who can vote on a claim?

Assessors in the group assigned to the claim's product type. Each assessor holds one vote.

### Do assessors stake NXM to vote?

No. Voting power comes from being an assessor in the relevant group, and no NXM is staked or locked to vote.

### Can a vote be changed?

An assessor votes once per claim. A vote can be undone during the cooldown period, before the outcome becomes final.

### When is a claim outcome final?

Once the cooldown period after the voting end has passed. Until then the outcome reads as `PENDING`.

---

**Disclaimer:** This documentation provides a high-level overview of the `Assessments` contract. Always refer to the latest contract code and official resources when developing against the protocol.
