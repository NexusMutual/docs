---
sidebar_position: 4.2
---

# Token model

Nexus Mutual uses a continuous token model, also referred to as a bonding curve. The bonding curve ensures that capital efficiency can be achieved, as it's extremely important for cover providers. Ultimately, underwriters live or die based on their capital efficiency.

Capital efficiency in underwriting means:
* Making sure the mutual has enough funds to confidently pay all claims; and
* Not sitting on excess capital that isn't required

The bonding curve exists to balance these two objectives. 

## Token price

The token price varies based on two primary parameters controlled by the bonding curve:
1. The funding level of the mutual; and
2. The amount of capital required to support the covers written.

### Token price formula

<code>Price = A + (MCR(eth) / C) x MCR%^4</code>

Where:
* TP = Token Price in Ether
* A and C are constant values, which were calibrated at launch
  * A = 0.01028
  * C = 5,800,000
* MCR = the value of the minimum capital requirement in ETH, which grows as the number of covers grows
* MCR% = ratio of the [capital pool](/protocol/capital-pool/) to the minimum capital requirement

The MCR(eth) floor was set through governance in October 2020 and currently stands at 162,424.73 ETH.

### Drivers of growth

The token price is controlled by the bonding curve, which reflects the two fundamental drivers of growth: funds in the capital pool and cover sales.

In the short term, the MCR(eth) value is fixed, which means that short-term NXM price movements are driven entirely by how much capital is in the capital pool. More capital means higher MCR%, which leads to a higher NXM price.

The capital pool increases when the mutual generates surplus (cover fees less claims), investment earnings grow, and/or members contribute more funds to the mutual.

In the long term, if we assume the MCR% stabilizes around a certain level, then price will be driven by MCR(eth), which is driven by active cover (i.e., adoption).

## Redemption and purchase restrictions

Several restrictions apply to the redemption and purchase of NXM tokens. Generally, these restrictions are in place to ensure the mutual always has sufficient funds to confidently pay members' claims.

### 1. MCR% related limits

* Redemptions are restricted if MCR% is less than 100%
* Purchases are restricted if MCR% is greater than 400%
* Where a transaction would result in the MCR% being outside these limits the volume of the transaction is limited

### 2. Transaction limits caps

Redemptions and purchases are limited per transaction to 5% of the MCR.

### 3. Capital pool liquidity

The capital pool must also have enough liquidity in ETH to execute on the redemption. While this is not generally expected to be an issue, this may occur temporarily if a large portion of the funds have been invested in non-ETH assets.

### 4. Redemption price

To discourage speculative buy/sell behavior, the redemption price will be set at 2.5% lower than the purchase price derived from the token model.

## New tokenomics project

DAO members are currently engaged in an ongoing project to revamp the token model, with the goals of providing better token liquidity for members and providing the protocol with a market-consistent price for NXM.

Updates from this project, and community discussion, can be found on the [#tokenomics-revamp channel](https://discord.gg/E6zKGV4yqw) in the Nexus Mutual Discord.