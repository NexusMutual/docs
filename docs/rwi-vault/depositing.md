---
sidebar_position: 2
---

# Depositing USDC

[Approved](approval.md) depositors may deposit USDC into the RWI Vault smart contract. Once verified, you can connect your wallet, deposit USDC and start earning yield through the Deposit interface.

Depositing USDC requires you to submit a transaction on Ethereum. You may also be requested to approve the Vault contract to interact with your USDC ahead of depositing.

When you deposit USDC, you are calling the <code>requestDeposit()</code> function on the smart contract. If the deposit doesn’t exceed the Vault Cap, the smart contract accepts your USDC in the same transaction and you receive an amount of RWIV tokens in return based on the current exchange rate. If it would exceed the cap, the request waits for the VO.

It is also possible to deposit and immediately lock the RWIV tokens to earn bonuses. In this case, the <code>requestDepositAndLock()</code> function is called instead.

A deposit starts earning the Baseline Yield when it is accepted, not when it is submitted. While a request is waiting, the USDC sits in the Vault contract and earns nothing. You can cancel a request that hasn’t been accepted and get the USDC back.

## RWIV Token

RWIV is the deposit token of the RWI Vault.

- RWIV tokens accrue the [Baseline Yield](yield-structure/baseline-yield/baseline-yield.md) programmatically, increasing the USDC redemption value of the token
- RWIV can be locked in the Vault’s smart contracts to earn [bonuses](yield-structure/bonuses/bonuses.md)
- Unless locked, RWIV is freely transferable and deployable in other DeFi applications

## Vault Cap

The RWI Vault is subject to a Vault Cap, which limits the total USDC that can be deposited into the Vault at any given time.

Users are still able to submit a deposit request transaction even if that deposit would exceed the Vault Cap. In this scenario, the VO can approve or reject the request:

- If approved, the deposit is accepted into the Vault and RWIV tokens are issued as normal. The VO can also approve part of a request, in which case the rest is returned to the user
- If rejected, the deposit amount is returned to the user

The Vault Cap was set to 10m USDC at launch. The current cap is held onchain and can be read from the Vault contract as <code>assetCap</code>.

The Vault Operator can update the Vault Cap onchain as required. These updates are made according to the VO’s processes based on deposit demand, ability of [Insurance Partners](insurance-partners.md) to take in additional funds and interest accrued over time within the Vault.