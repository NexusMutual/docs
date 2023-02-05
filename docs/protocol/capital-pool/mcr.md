---
sidebar_position: 4.5
---

# Minimum Capital Requirement

The Minimum Capital Requirement (MCR) is used directly in the token price formula and is therefore an important component of the entire Nexus Mutual protocol. The MCR represents the minimum amount of funds the mutual needs to be very confident it can pay all claims. It is represented by the following formula:

<code>MCR = Max (MCR Floor, f(Cover Amount))</code>

## MCR floor

The long-term goal of the mutual is to have the f(Cover Amount) drive the MCR calculations but the mutual needs an MCR floor value in the early phases so that there is a critical mass of capital to enable cover growth.

## MCR floor history

**May 2019** | At launch, the MCR floor was set at 12,000 ETH, this level needed to be reached before cover purchases were enabled for the first time.

**June 2019** | Members decided to lower the MCR floor to 7,000 ETH to enable cover purchases to go live sooner.

**November 2019** | Members decided to implement a dynamic MCR floor to help meet concentrated demand on a smaller number of systems. If the mutual had excess capital (defined as having a MCR% greater than 130%) then the MCR floor value would increase by 1% per day.

**July 2020** | Members decided to increase the frequency of the MCR floor increment to 1% every 4 hours (if the MCR% was above 130%) until the MCR floor reached 100,000 ETH.

**September 2020** | 100,000 ETH MCR floor was reached and the MCR increment speed reverted back to 1% every day (if the MCR% was above 130%).

**October 2020** | Members decided to switch off the MCR floor increment, and MCR Floor currently stands at 162,424.73 ETH

## Implementation

The actual MCR value that is used in the token price model is implemented as a smoothed version of the target MCR. Where:

<code>Target MCR = Max (MCR Floor, f(Cover Amount))</code>

The actual MCR takes the existing MCR value and moves it towards the target each time someone:
* Buys NXM;
* Sells NXM; or
* A claim is paid

The actual MCR is smoothed so it doesn't cause large one-off shocks and is restricted to move a maximum of:
* 1% in any one update
* 5% maximum per day

## f(Cover Amount)

Long term, the MCR should be driven by the amount of cover the mutual has written as well as other risk factors like how well matched assets are with liabilities.

Nexus Mutual currently implements the capital model by assuming a fixed gearing factor applies to the active cover in ETH terms. This is a simplification of the full capital model, which is described in detail in the [Nexus Mutual whitepaper](https://nexusmutual.io/assets/docs/nmx_white_paperv2_3.pdf). If the full capital model (which is run off-chain) starts producing results that are materially different to the current gearing factor it is anticipated that the factor will be updated via a governance action.

<code>f(Cover Amount) = Active Cover in ETH / Gearing Factor</code>

Gearing Factor currently = 4.8
