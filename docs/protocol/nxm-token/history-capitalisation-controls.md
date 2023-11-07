---
sidebar_position: 3.4
---

# History of Capitalisation Controls

The following information below is the documentation that outlined how the original bonding curve worked; how the NXM token was priced; certain bonding curve parameters; how the Minimum Capital Requirement (MCR) was previously implemented; and the history of the MCR Floor.

## Historic token model and bonding curve documentation

Nexus Mutual used a continuous token model, also referred to as a bonding curve. The bonding curve ensured that capital efficiency could be achieved, as it's extremely important for cover providers.

Capital efficiency in underwriting means:
* Making sure the mutual has enough funds to confidently pay all claims; and
* Not sitting on excess capital that isn't required

The bonding curve existed to balance those two objectives. 

### Token price

The token price varied based on two primary parameters controlled by the bonding curve:
1. The funding level of the mutual; and
2. The amount of capital required to support the covers written.

#### Token price formula

<code>Price = A + (MCR(eth) / C) x MCR%^4</code>

Where:
* TP = Token Price in Ether
* A and C were constant values, which were calibrated at launch
  * A = 0.01028
  * C = 5,800,000
* MCR = the value of the Minimum Capital Requirement in ETH, which grows as the number of covers grows
* MCR% = ratio of the [Capital Pool](/protocol/capital-pool/) to the Minimum Capital Requirement

The MCR(eth) floor was set through governance in October 2020 and stands at 162,424.73 ETH. The DAO teams have shared NMPIP-209:Launch Tokenomics Upgrade on the Nexus Mutual governance forum, where it is proposed to remove the MCR(eth) floor.

### Redemption and purchase restrictions

Several restrictions applied to the redemption and purchase of NXM tokens. Generally, these restrictions were in place to ensure the mutual always had sufficient funds to confidently pay members' claims.

#### 1. MCR% related limits

* Redemptions were restricted if MCR% was less than 100%
* Purchases were restricted if MCR% was greater than 400%
* Where a transaction would result in the MCR% being outside these limits the volume of the transaction was limited

#### 2. Transaction limits caps

Redemptions and purchases were limited per transaction to 5% of the MCR.

#### 3. Capital pool liquidity

The capital pool also needed to have enough liquidity in ETH to execute on the redemption. While this was not generally expected to be an issue, this occured temporarily if a large portion of the funds had been invested in non-ETH assets.

#### 4. Redemption price

To discourage speculative buy/sell behavior, the redemption price was set at 2.5% lower than the purchase price derived from the token model.

## Historic Minimum Capital Requirement documentation

# Minimum Capital Requirement

The Minimum Capital Requirement (MCR) is used directly in the token price formula and is therefore an important component of the entire Nexus Mutual protocol. The MCR represents the minimum amount of funds the mutual needs to be very confident it can pay all claims. It is represented by the following formula:

<code>MCR = Max (MCR Floor, f(Cover Amount))</code>

The long-term goal of the mutual was to have the f(Cover Amount) drive the MCR calculations but the mutual needed an MCR floor value in the early phases so that there is a critical mass of capital to enable cover growth.

### MCR floor history

**May 2019** | At launch, the MCR floor was set at 12,000 ETH, this level needed to be reached before cover purchases were enabled for the first time.

**June 2019** | Members decided to lower the MCR floor to 7,000 ETH to enable cover purchases to go live sooner.

**November 2019** | Members decided to implement a dynamic MCR floor to help meet concentrated demand on a smaller number of systems. If the mutual had excess capital (defined as having a MCR% greater than 130%) then the MCR floor value would increase by 1% per day.

**July 2020** | Members decided to increase the frequency of the MCR floor increment to 1% every 4 hours (if the MCR% was above 130%) until the MCR floor reached 100,000 ETH.

**September 2020** | 100,000 ETH MCR floor was reached and the MCR increment speed reverted back to 1% every day (if the MCR% was above 130%).

**October 2020** | Members decided to switch off the MCR floor increment, and MCR Floor currently stands at 162,424.73 ETH

## Implementation

The actual MCR value that was used in the token price model was implemented as a smoothed version of the target MCR. Where:

<code>Target MCR = Max (MCR Floor, f(Cover Amount))</code>

The actual MCR took the existing MCR value and moved it towards the target each time:
* Someone minted NXM;
* Someone redeemed NXM; or
* A claim was paid to someone.

The actual MCR was smoothed so it didn't cause large one-off shocks and was restricted to move a maximum of:
* 1% in any one update
* 5% maximum per day

### f(Cover Amount)

Long term, the MCR should be driven by the amount of cover the mutual has written as well as other risk factors like how well matched assets are with liabilities.

Nexus Mutual implemented the capital model by assuming a fixed gearing factor applied to the active cover in ETH terms. This was a simplification of the full capital model, which is described in detail in the [Nexus Mutual whitepaper](https://github.com/NexusMutual/website/blob/master/assets/docs/nmx_white_paperv2_3.pdf). If the full capital model (which is run off-chain) starts producing results that are materially different to the current gearing factor it is anticipated that the factor will be updated via a governance action.

<code>f(Cover Amount) = Active Cover in ETH / Gearing Factor</code>

Gearing Factor currently = 4.8
