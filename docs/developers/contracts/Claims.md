---
sidebar_position: 3
---

# Claims

## Overview

The `Claims` contract enables cover owners to **submit claims** and **redeem payouts** if their claims are accepted. Submitting a claim starts an assessment, which is voted on in the [Assessments](/developers/contracts/Assessments) contract.

The contract integrates with multiple protocol components, including:

- **Assessments (`IAssessments`)** – Handles voting and decision-making for claims.
- **Cover (`ICover`)** – Provides cover data and burns the stake backing a cover on payout.
- **Pool (`IPool`)** – Sends the payout and returns the assessment deposit.
- **Ramm (`IRamm`)** – Updates token prices and liquidity.

---

## Key Concepts

### Claim

A claim records the payout requested against a cover.

```solidity
struct Claim {
    uint32 coverId;
    uint96 amount;
    uint8 coverAsset;
    uint32 payoutRedemptionPeriod;
    bool payoutRedeemed;
    bool depositRetrieved;
}
```

| Field                    | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `coverId`                | The cover the claim is made against.                    |
| `amount`                 | The requested payout amount, in the cover asset.        |
| `coverAsset`             | The asset the payout would be made in.                  |
| `payoutRedemptionPeriod` | How long the claimant has to redeem an accepted payout. |
| `payoutRedeemed`         | Whether the payout has been redeemed.                   |
| `depositRetrieved`       | Whether the assessment deposit has been retrieved.      |

### Assessment Deposit

Submitting a claim requires an ETH deposit:

```solidity
uint public constant CLAIM_DEPOSIT_IN_ETH = 0.05 ether;
```

The deposit is returned to the claimant once the claim is resolved. It is retrieved separately from the payout, using `retrieveDeposit`.

### Status and Outcome

An assessment moves through three statuses, and resolves to one of four outcomes.

```solidity
enum AssessmentStatus { VOTING, COOLDOWN, FINALIZED }
enum AssessmentOutcome { PENDING, ACCEPTED, DENIED, DRAW }
```

The outcome stays `PENDING` until the cooldown period after voting has passed. After that, more accept votes than deny votes gives `ACCEPTED`, more deny votes gives `DENIED`, and an equal number gives `DRAW`.

---

## Mutative Functions

### `submitClaim`

Submits a claim against a cover and starts its assessment.

```solidity
function submitClaim(
    uint32 coverId,
    uint96 requestedAmount,
    bytes32 ipfsMetadata
) external payable returns (Claim memory claim);
```

| Parameter         | Description                                               |
| ----------------- | --------------------------------------------------------- |
| `coverId`         | The cover ID to claim against.                            |
| `requestedAmount` | Amount requested for payout, in the cover asset.          |
| `ipfsMetadata`    | IPFS hash containing the claim details and proof of loss. |

- **Behavior:**
  - Requires the caller to own the cover.
  - Requires `CLAIM_DEPOSIT_IN_ETH` to be sent with the call.
  - Requires the cover to be within its cover period or grace period.
  - Starts an assessment for the claim.
  - Emits `ClaimSubmitted` and `MetadataSubmitted`.

### `redeemClaimPayout`

Pays out an accepted claim.

```solidity
function redeemClaimPayout(uint claimId) external;
```

| Parameter | Description          |
| --------- | -------------------- |
| `claimId` | The claim to redeem. |

- **Behavior:**
  - Requires the assessment to be finalized and accepted.
  - Requires the redemption period to still be open.
  - Burns the stake backing the cover and sends the payout from the Pool.
  - Emits `ClaimPayoutRedeemed`.

### `retrieveDeposit`

Returns the ETH assessment deposit to the claimant.

```solidity
function retrieveDeposit(uint claimId) external;
```

| Parameter | Description                           |
| --------- | ------------------------------------- |
| `claimId` | The claim whose deposit is retrieved. |

---

## View Functions

### `getClaim`

Returns the stored claim.

```solidity
function getClaim(uint claimId) external view returns (Claim memory);
```

### `getClaimDetails`

Returns the claim together with its cover, assessment, status, outcome and metadata, and whether the payout is currently redeemable.

```solidity
function getClaimDetails(uint claimId) external view returns (ClaimDetails memory);
```

### `getClaimsCount`

Returns the total number of claims submitted.

```solidity
function getClaimsCount() external view returns (uint);
```

### `getMemberClaims`

Returns the claim ids submitted by a member.

```solidity
function getMemberClaims(uint memberId) external view returns (uint[] memory);
```

### `lastClaimSubmissionOnCover`

Returns the most recent claim submitted against a cover.

```solidity
function lastClaimSubmissionOnCover(uint coverId) external view returns (uint claimId);
```

---

## Events

- **`ClaimSubmitted(address user, uint claimId, uint coverId, uint productId)`**: Emitted when a claim is submitted.
- **`MetadataSubmitted(uint claimId, bytes32 ipfsMetadata)`**: Emitted with the claim's IPFS metadata.
- **`ClaimPayoutRedeemed(address user, uint amount, uint claimId, uint coverId)`**: Emitted when a payout is redeemed.
- **`ClaimDepositRetrieved(uint claimId, address user)`**: Emitted when the assessment deposit is returned.

---

## Frequently Asked Questions

### Who can submit a claim?

The owner of the cover NFT. The cover must be within its cover period or its grace period.

### What happens to my deposit?

The deposit is returned once the claim is resolved. Call `retrieveDeposit` to collect it, separately from redeeming the payout.

### How long do I have to redeem an accepted payout?

The period is recorded on the claim as `payoutRedemptionPeriod`. After it passes, the payout can no longer be redeemed.

### What happens if my claim is denied?

You can submit another claim against the same cover with more supporting evidence, as long as the cover is still within its cover period or grace period.

---

**Disclaimer:** This documentation provides a high-level overview of the `Claims` contract. Always refer to the latest contract code and official resources when developing against the protocol.
