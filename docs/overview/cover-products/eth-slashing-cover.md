---
sidebar_position: 1.9
---

# Slashing Cover

Organizations that run validators on Proof-of-Stake (PoS) networks and help secure these networks are exposed to slashing risks, which can be caused by improper actions such as double-signing, surround voting, downtime, and infrastructure and setup failure.

## Covered risks

When you run validators and have active Slashing Cover, you are protected against losses that occur during the cover period where one or more of the covered validators incur penalties greater than the deductible in any continuous 40 day period.

Nexus Mutual offers various slashing products:
* [ETH Slashing Cover](https://api.nexusmutual.io/ipfs/QmWepFbtMYSzJt22ddF1CK9PwbrYgiLk9qJjryDrgpGuus)
* [ETH Slashing Umbrella Cover](https://api.nexusmutual.io/ipfs/QmQx2H9A51SARNc4W8Ta2D2woXv2ebkUGZMC5HZoQW8TUX)
* [Part D: Slashing Cover under the Crypto Cover wording](https://api.nexusmutual.io/ipfs/Qmas9sr9BA9DmdgbHpyTmYUwvv2Kxyc1upDEarEerti2hs)

Nexus Mutual’s claim assessors use these cover wording documents as a north star when considering any claim.

### Proof of loss

When an organization purchases Slashing Cover, they provide the validator numbers they want covered in a csv file and that list is stored on IPFS.

If a validator, or validators, suffer penalties, they will provide the list of impacted validators and the corresponding loss for each validator.

## Claims process

After a validator, or validators, suffer a loss, your organization can contact the product team, who can assist in calculating the loss amount(s).
1. Once the losses have been calculated, your organization can file a claim in the Nexus Mutual user interface after the cool-down period passes.
2. You will submit a calculation of losses by providing a file of impacted validators and their losses by slot/epoch.
    * This should equal the claim amount being requested after the deductible is accounted for.
3. Claim assessors can then reference this information against [beaconcha.in](https://beaconcha.in/) or [rated.network](https://www.rated.network/?network=mainnet&view=pool) to verify the loss calculations.
    * If your claim is approved, you will be able to redeem your claim payout after the 24-hour post-claim period passes in the Your Covers menu. You can also check your Dashboard to see the status of any active claims.
    * If your claim is denied, you will be able to file another claim with more supporting evidence.

For a review of the Claims 
assessment process, see the [Claims Assessment](/protocol/claims-assessment) section.

## Get a quote

Organizations interested in protecting their validators can [fill out this contact form](https://nexusmutual.io/contact) and the business development team will contact you to explore tailored cover options and pricing.
