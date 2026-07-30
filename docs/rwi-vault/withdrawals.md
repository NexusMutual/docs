---
sidebar_position: 5
---

# Withdrawals

Withdrawals of RWIV into USDC are requested via the app by calling <code>requestRedeem()</code>.

Upon submission:

- the RWIV is transferred to the Vault contract, so it leaves your wallet and cannot be transferred or sold while the request is open
- the request enters a withdrawal queue
- all RWIV continues earning the baseline yield until processed by the Vault Operator

Withdrawals are processed by the VO on a first-in, first-out basis as liquidity becomes available. Where there isn’t enough liquidity to fill a request, it is filled as far as the liquidity goes and the remainder stays at the front of the queue. We currently expect withdrawals to take approximately 90 days and be closely linked to the redemption windows of the initial Insurance Partner.

A request that hasn’t been filled can be cancelled, and the RWIV is returned to your wallet.

Note that the typical timeline for releasing loss reserves from the insurance business backed by the RWI Vault is approximately 18-24 months. We strongly encourage depositors to have this timeframe in mind when depositing into the RWI Vault.

## Secondary Market

RWIV tokens are fungible, freely tradeable and can be used in wider DeFi applications.

As a result, there may be secondary market pools available for instant trading of RWIV.
