---
sidebar_position: 2
---

# Minimum Capital Requirement

The Minimum Capital Requirement (MCR) is an important component of the entire Nexus Mutual protocol. The MCR represents the minimum amount of funds the Mutual needs to be very confident it can pay all claims.

The MCR is driven by the Mutual's Total Active Cover Amount, which is the current amount of cover members are underwriting with Capital Pool assets. A fixed Gearing Factor is applied to the active cover in ETH terms:

<code>MCR = f(Cover) = Total Active Cover Amount in ETH / Gearing Factor</code>

<!-- @check Pool.GEARING_FACTOR = 48000 -->
Gearing Factor currently = 4.8

The full capital model is run offchain. If it starts producing results that are materially different to the current Gearing Factor, the factor is updated through a governance action.
