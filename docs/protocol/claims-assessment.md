---
sidebar_position: 6.2
---

# Claim Assessment

When a loss event occurs, members who held active cover can submit a claim. Once a claim is submitted, members can stake NXM and participate as a claim assessor, who reviews the validity of a submitted claim. 

To date, members have approved and paid $18M+ in claims to people impacted by loss events.

Across the current - and any future - cover products, there are two different claim types.

## Claim types

### Individual claims

The individual claim process applies for the following cover products:
* [Protocol Cover](/overview/cover-products/protocol-cover)
* [Bundled Protocol Cover](/overview/cover-products/bundled-protocol-cover)
* [DeFi Pass Cover](/overview/cover-products/defi-pass-cover)
* [Native Protocol Cover](/overview/cover-products/native-protocol-cover)
* [Fund Portfolio Cover](/overview/cover-products/fund-portfolio-cover)
* [ETH Slashing Cover](/overview/cover-products/eth-slashing-cover)
* [Quota Share Cover](/overview/cover-products/quota-share-cover)

For individual claims, cover holders can submit claims with supporting proof of loss and details about their loss. These claims are reviewed by assessors on an individual basis to determine the validity of each claim that is filed.

### Group claims

The group claim process applies for our since deprecated Yield Token Cover product. For future products, a group claim can apply if a loss is assessed on a group basis. If such a loss event were to occur, the Advisory Board would trigger a group claim event through an onchain governance proposal. A group claim outcome would determines if one event was valid. These claims would not be assessed on an individual basis.

## Claim process

When a loss occurs, cover holders start the claim process and assessors get involved once a claim has been submitted.

### 1. Claim submission

Members who held active cover when the loss event took place can submit a claim through the Nexus Mutual user interface. When a claim is submitted, the cover holder will provide details related to the loss incident, the loss amount, and the supporting proof of loss.

Before a claim can be filed, the cover holder will need to make a claim deposit denominated in ETH.
* If the claim is approved, the claim deposit is refunded in the same transaction as the claim payout
* If the claim is denied, the claim deposit will not be refunded

The deposited amount is the ETH equivalent of the NXM amount distributed as claim assessment rewards, where the minimum deposit required is 0.05 ETH and the maximum amount required is an ETH deposit equivalent to 50 NXM. See the [claims assessment rewards](/protocol/claims-assessment#4-claims-assessment-rewards) section below.

Claim deposits are required to prevent people from spamming the claim process with multiple claims, as there is no limit to the number of times a claim can be submitted. As long as a cover holder provides a claim deposit, they can file a claim as many times as preferred.

### 2. Voting process

Once a claim is submitted, the voting process begins. A claim vote lasts for a minimum of three days.

#### Claim assessors

Members can stake their NXM and participate as a claim assessor. Claim assessment stakes are locked for 90 days after a member’s last vote was cast. Assessors review the incident details, proof of loss, and other supporting information to determine a claim’s validity. Members discuss submitted claims in the Nexus Mutual Discord. 

#### Outcomes

**Accept**. If a claim assessor reviews the proof of loss and supporting evidence and determines a claim is valid, they can submit their vote to approve. Once a vote to approve has been submitted, other members can submit votes to approve or deny the claim.
* A simple majority (50%+) is required to decide an assessment vote
* The assessment will last for a minimum of three days, which starts from the time the first vote to approve is submitted
* There is a 24-hour silent period, where no votes should be casted before an assessment vote closes
  * If a vote is submitted during the last 24 hours of the vote, the voting period is extended with an amount of time proportional to the voter's stake, with 24 hours representing the maximum time increase
  * This design feature prevents "rush attacks," where someone tries to overturn a claim outcome by submitting a vote at the last minute that moves the majority outcome with no time to appeal the vote

**Deny**. If claim assessors review the claim submission and determine that no loss has occurred or that the claim does not meet the terms of the cover wording, no deny vote is required unless another member submits a vote to approve.
* If a claim receives no votes and the three day period passes, the claim will be denied by default

### 3. Claim payouts

When a claim vote has closed with an accepted status, a cool-down period of one day needs to pass before the claim payout can be redeemed by the member who submitted the successful claim.

Once the cool-down period has passed, a claim vote is finalized and the member has 30 days to redeem their claim payout.

### 4. Claim assessment rewards

#### Total rewards

Members who lock their NXM and participate in the claim assessment process earn rewards for voting on claims. The total assessment reward pool is calculated using the following formula:

<p><code>totalRewardInNXM = min(maxRewardInNXM, expectedPayout * rewardRatio * coverPeriodInDays / 365)</code></p>

Where the <code>maxRewardInNXM</code> is equal to 50 NXM and the <code>rewardRatio</code> is 1.3%.

#### Individual rewards

Members that lock their NXM and participate in the claim assessment process earn a share of the total reward pool. An individual member’s share of claim assessment rewards can be calculated using the following formula:

<code>reward = totalRewardInNXM * userStakeAtVoteTime / (accepted + denied)</code>

Once you assess and vote on a claim, you will earn your share NXM rewards, which you will be able to withdraw after the vote closes and the 24-hour cool down period passes.

## Fraudulent votes

During the cool-down period, claim outcomes can be reviewed if fraudulent voting is suspected. If the Advisory Board finds a claim assessor to have voted to deny a legitimate claim or approve an illegitimate claim, then a fraud penalty can be imposed. The Advisory Board can submit a merkle-tree root hash representing the fraudulent voter and their assessment stake. The fraudulent vote is reversed and the fraudulent assessor's stake is burned.

Once the Advisory Board submits the merkle-tree root hash, anyone can process the fraud penalty. By processing the fraud penalty, a member is executing the transaction that burns the assessor’s stake and reverses their fraudulent vote.
