---
sidebar_position: 6
description: Who controls the RWI Vault, and what the contracts let each role do.
---

# Governance

The RWI Vault is a separate product from the Nexus Mutual protocol, and it is governed through its own contracts rather than through the protocol's.

Vault changes do not go through the [Nexus Mutual governance](/governance/) process. There is no proposal, no Snapshot vote and no member veto for a change to the Vault, and no Vault change is enacted through the protocol's `Governor` contract. The two systems have separate contracts, separate registries, separate membership registers and separate release cycles.

## Who can do what

Every role sits in the Vault's own [`RWIRegistry`](/rwi-vault/contracts/RWIRegistry), and the current holder of each is readable onchain.

**The Governor** is the Vault's highest authority. It can upgrade the Vault contracts, register and remove contracts, and appoint or remove emergency admins. It has no role in day-to-day operations.

The role is currently held by the Nexus Mutual Advisory Board multisig. It acts on the Vault directly, as a transaction on the Vault's own registry, and not through the [proposal and member vote process](/governance/) that governs the protocol.

**The Vault Operator** runs the Vault. It sets the [Vault Cap](/rwi-vault/depositing#vault-cap), accepts or rejects deposit requests above that cap, fulfils [withdrawals](/rwi-vault/withdrawals), proposes changes to the [Baseline Yield](/rwi-vault/yield-structure/baseline-yield/), calculates the quarterly [NAV](/rwi-vault/yield-structure/bonuses/nav-calculation) and distributes [bonuses](/rwi-vault/yield-structure/bonuses/).

**The Membership Operator** admits depositors who have completed the [approval process](/rwi-vault/approval), and removes them.

**Emergency admins** can pause the Vault. It takes two of them: one proposes a pause configuration and a different one confirms the same value, so no single admin can pause or unpause alone.

Operations and upgrades are separate roles in the registry, so the Vault Operator cannot upgrade the contracts and the Governor cannot run the Vault.

## Upgrades

The Vault contracts can be upgraded, and the Governor is the only role that can upgrade them. An upgrade takes effect as soon as it is submitted, with no waiting period.

Replacing the Governor also takes an upgrade, so only the current Governor can do it. [Contracts](/rwi-vault/contracts/) covers how that works.

## What no role can do

The contracts limit these roles as much as they grant them.

<!-- @check RWIVault.MIN_RATE_PROPOSAL_TIME = 90 days -->
<!-- @check RWIVault.MAX_APY = 1.5e18 -->

- **Nobody can move your RWIV.** There is no administrative transfer, freeze or clawback. RWIV is a plain ERC-20 and transfers are not affected by the pause switch
- **Nobody can end a lock early**, including the depositor. Locked RWIV can be withdrawn back to the depositor's wallet when the lock period is over and not before
- **The Baseline Yield cannot change without 90 days' notice**, cannot be set below a rate that would reduce the RWIV price, and cannot exceed a hard ceiling of 50% a year
- **A withdrawal queue cannot be reordered.** Requests are fulfilled in the order they were made, and the Vault Operator cannot choose to skip one
- **Deposits and withdrawals are not custody.** A pending request holds your funds in the Vault contract, and cancelling returns them to you
