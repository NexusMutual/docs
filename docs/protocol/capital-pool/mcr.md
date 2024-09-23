---
sidebar_position: 5.6
---

# Minimum Capital Requirement

The Minimum Capital Requirement (MCR) is an important component of the entire Nexus Mutual protocol. The MCR represents the minimum amount of funds the Mutual needs to be very confident it can pay all claims. It is represented by the following formula:

<code>MCR = f(Cover) = Total Active Cover Amount / 4.8</code>

## MCR floor

If members vote to approve NMPIP-209, the MCR Floor will be changed from 162,425 ETH to 0 ETH, which will transition the MCR to be fully driven by the Mutual's Total Active Cover Amount.

## f(Cover Amount)

Per the section above, the MCR may soon be driven by the Mutual's Total Active Cover Amount, which is the current amount of covers members are underwriting with Capital Pool assets.

IF NMPIP-209 is approved, Nexus Mutual will implement the capital model by assuming a fixed Gearing Factor applies to the active cover in ETH terms. If the full capital model (which is run off-chain) were to start producing results that are materially different to the current Gearing Factor it is anticipated that the factor will be updated via a governance action.

<code>f(Cover) = Total Active Cover Amount in ETH / Gearing Factor</code>

Gearing Factor currently = 4.8
