---
sidebar_position: 2.5
---

# Yield Token Cover

When you deposit crypto assets into a yield aggregator or a protocol that is integrated with other DeFi protocols, your funds are exposed to a variety of risks across multiple protocols.

## Covered risks

When you have crypto assets deposited into a protocol that is integrated with other DeFi protocols on the Ethereum network, Yield Token Cover protects against:
* The yield-bearing token depegging in value by more than 10% for any reason

In plain English, "face value" is what a yield-bearing token should be worth (i.e., the intended value) and the "market value" is how much it can be redeemed for or sold for.

This cover product protects against a loss of value, which can be caused by many different loss events such as:
* An exploit in the protocol you deposited assets in or in one of the underlying protocols, which results in the yield-bearing token losing more than 10% of its intended value (i.e., face value)
* An oracle failure, economic design failure, or governance attack in the protocol you deposited assets in or in one of the underlying protocols that results in a loss of funds, which causes the yield-bearing token to lose more than 10% of its intended value (i.e., face value)
* The underlying token, or tokens, depegging in value, which causes the yield-bearing token to lose more than 10% of its intended value (i.e., face value)

### Examples

Currently, there are two types of Yield Token Cover products. One that protects yield-bearing tokens that are backed by stablecoins pegged to USD and one that protects yield-bearing tokens that are backed by synthetic ETH tokens such as Lido's stETH or Synthetix' sETH.

Yield Token Cover was never offered for a UST-based yield-bearing token, but if it had, you could look at the MIM-UST pool on Curve to see an example of a yield-bearing token depegging in value after UST lost its peg.

![Curvefi Factory Pool: MIM-UST token](pathname:///img/CurveMIM-UST-Price.png)

Source: [Yield-bearing token contract viewed in Zerion](https://app.zerion.io/tokens/MIM-UST-f-0x55a8a39bc9694714e2874c1ce77aa1e599461e18)

You can determine the face value of a yield-bearing token by entering the contract address into Zerion and viewing its value in the reference currency.

For the face value of the Curve 3pool LP (3Crv) token, you can look at the median price in USD over a one year period.

![Curve 3Pool token](pathname:///img/Curve3PoolToken.png)

Source: [Yield-bearing token contract viewed in Zerion](https://app.zerion.io/tokens/3Crv-0x6c3f90f043a72fa612cbac8115ee7e52bde6e490)

## Cover wording

For more information, read the full terms and conditions of [Nexus Mutual’s Yield Token Cover](https://uploads-ssl.webflow.com/62d8193ce9880895261daf4a/63d0f475a1a2c7250a1e9697_YieldTokenCoverv1.0.pdf).

Nexus Mutual’s claims assessors use this cover wording as a reference when considering any loss event.

### Proof of loss

With Yield Token Cover, the yield-bearing token itself represents a member’s proof of loss. When group claim events are approved, members who held active Yield Token Cover when the depeg event occurred will be able to swap their yield-bearing token for 90% of the cover amount.

Members will need to have possession of the yield-bearing token in order to redeem their claim payout.

## Claim process

When a yield-bearing token depegs by more than 10%, the Advisory Board creates a group claim event, which is subject to the regular Claims Assessment process.

Unlike other cover products, Yield Token Cover is assessed on a group basis, where all covered members for a particular covered token will be assessed together for a claim event.

1. Once a Claims Assessment vote has been initiated by the Advisory Board, members review the cover wording and the loss event to determine if a claim event is valid.
2. If members vote to approve, then covered members will be able to swap their yield-bearing token for a claim payout.
  * A yield-bearing token can be swapped for 90% of the face value, according to the Yield Token Cover wording.

For a review of the claims assessment process, see the [Claims Assessment](/protocol/claims-assessment) section.
