# Withdrawals

Withdrawals of RWIV into USDC are requested via the app by calling <code>requestRedeem()</code>.

Upon submission:

- the request enters a withdrawal queue
- all RWIV continues earning the baseline yield until processed by the Vault Operator

Withdrawals are processed by the VO on a first-in, first-out basis as liquidity becomes available. We currently expect withdrawals to take approximately 90 days and be closely linked to the redemption windows of the initial Insurance Partner.

Note that the typical timeline for releasing loss reserves from the insurance business backed by the RWI Vault is approximately 18-24 months. We strongly encourage depositors to have this timeframe in mind when depositing into the RWI Vault.

## Secondary Market

RWIV tokens are fungible, freely tradeable and can be used in wider DeFi applications.

The Nexus Mutual Community Fund has created a Uniswap v3 pool where secondary market liquidity may be available.