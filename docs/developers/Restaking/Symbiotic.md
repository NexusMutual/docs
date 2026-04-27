---
sidebar_position: 1
---

# Symbiotic Vault Onboarding

## Overview

A Symbiotic vault can be onboarded to the **Nexus Mutual Network** so that its delegated stake can be used to help back Nexus Mutual covers.

In return, the vault can earn **rewards funded by cover fees**. Rewards are **distributed weekly throughout the lifetime of the cover**, as long as the vault remains eligible and slashable for the Nexus Mutual Network.

This guide covers the **Nexus Mutual-specific requirements** for joining the Nexus Mutual Network.

For the general Symbiotic deployment flow, refer to Symbiotic’s curator docs:

- [Deploy Vault](https://docs.symbiotic.fi/integrate/curators/deploy-vault)
- [Curator docs](https://docs.symbiotic.fi/integrate/curators)
- [Manage Allocations](https://docs.symbiotic.fi/integrate/curators/manage-allocations)
- [Rewards](https://docs.symbiotic.fi/learn/core-concepts/rewards)

---

## 1. Nexus Mutual requirements

Your vault must satisfy the following requirements to join the Nexus Mutual Network.

### Supported collateral

- Currently supported collateral assets (`wstETH`, `stETH`, `rETH`, `cbBTC`)
- If you want to join using another collateral asset, please contact the Nexus team.

### Epoch duration

- **70 day epoch duration**

### Slasher

- **InstantSlasher** (i.e. `SLASHER_INDEX = 0`)
- **No veto slasher**

### Delegator

- **OperatorSpecificDelegator** (i.e. `DELEGATOR_INDEX = 2`)

### BurnerRouter

Your BurnerRouter must:

- be **owned by the curator**
- use a delay of **140 days + 1 second** (`12,096,001` seconds)
- set the correct Nexus Mutual network / receiver:
  - network `0xF99aA6479Eb153dcA93fd243A06caCD11f3268f9`
  - receiver `0x5633Ff9970c9B8F926f017038bdd437988f455F0`

### Nexus Mutual addresses

- Nexus Mutual network address `0xF99aA6479Eb153dcA93fd243A06caCD11f3268f9`
- Nexus Mutual operator address `0xF99aA6479Eb153dcA93fd243A06caCD11f3268f9`
- Nexus Mutual slash receiver address `0x5633Ff9970c9B8F926f017038bdd437988f455F0`
- Nexus Mutual subnetwork 1 id `0xf99aa6479eb153dca93fd243a06cacd11f3268f9000000000000000000000001`

---

## 2. Deploy the BurnerRouter

Follow Symbiotic’s curator [BurnerRouter docs](https://docs.symbiotic.fi/integrate/curators/deploy-vault#1-burner-router) for the BurnerRouter deployment flow


### Nexus Mutual-specific BurnerRouter values

When deploying the BurnerRouter, use:

```bash
OWNER=<your_curator_owner_address>
COLLATERAL=<your_vault_collateral_address>
DELAY=12096001
GLOBAL_RECEIVER=0x0000000000000000000000000000000000000000
NETWORK_RECEIVERS=[(0xF99aA6479Eb153dcA93fd243A06caCD11f3268f9,0x5633Ff9970c9B8F926f017038bdd437988f455F0)]
```

### Important

The BurnerRouter must remain correctly configured for Nexus Mutual. If the Nexus Mutual slash receiver is changed, the vault may become ineligible for Nexus Mutual rewards and capacity allocation.

---

## 3. Deploy the Vault, Delegator, and Slasher

Symbiotic supports creating a vault through the UI at [create vault](https://app.symbiotic.fi/create)

For the full deployment flow and parameter descriptions, refer to [core modules](https://docs.symbiotic.fi/integrate/curators/deploy-vault#2-core-modules)

### Nexus Mutual-specific values

When configuring the core components, use:

```bash
EPOCH_DURATION = 70 days // 6048000 seconds
DELEGATOR_INDEX = 2 // OperatorSpecificDelegator
OPERATOR = 0xF99aA6479Eb153dcA93fd243A06caCD11f3268f9
WITH_SLASHER = true
SLASHER_INDEX = 0 // InstantSlasher
BURNER = <the BurnerRouter deployed in step 2>
```
---

## 4. Configure delegation to Nexus

Follow Symbiotic’s allocation guide at [Manage Allocations](https://docs.symbiotic.fi/integrate/curators/manage-allocations)

For Nexus Mutual, use **`setNetworkLimit(...)` only**.

Because Nexus Mutual currently supports **OperatorSpecificDelegator**, you can ignore:

- `setOperatorNetworkShares(...)`
- `setOperatorNetworkLimit(...)`

Use these values for Nexus Mutual:

- **Function:** `setNetworkLimit(bytes32 subnetwork, uint256 amount)`
- **subnetwork:** `0xf99aa6479eb153dca93fd243a06cacd11f3268f9000000000000000000000001`
- **amount:** `<STAKE_VALUE>`

---

## 5. Send vault details to Nexus Mutual

Once your vault is configured, please send the following details to the Nexus Mutual team:

- **vault address**
- **delegator address**
- **slasher address**
- **BurnerRouter address**
- **collateral asset**

---

## 6. Receiving rewards

If your vault remains eligible and slashable for Nexus Mutual, it can receive Nexus Mutual rewards.

For Nexus Mutual, rewards are:

- **distributed weekly**
- throughout the **lifetime of the cover**
- funded by **cover fees**

For the general Symbiotic rewards flow, refer to [Rewards](https://docs.symbiotic.fi/learn/core-concepts/rewards)

---

## 7. Collecting rewards

For the exact process of collecting rewards through Symbiotic’s rewards system, refer to Symbiotic’s curator docs:

- [Curator docs](https://docs.symbiotic.fi/integrate/curators)
- [Rewards](https://docs.symbiotic.fi/learn/core-concepts/rewards)

---

## Summary checklist

Before sending your vault details to Nexus, confirm:

- [ ] collateral is supported by Nexus Mutual
- [ ] epoch duration is **70 days**
- [ ] slasher is **InstantSlasher**
- [ ] delegator is **OperatorSpecificDelegator**
- [ ] delegator operator is set to the Nexus Mutual operator
- [ ] BurnerRouter is owned by the curator
- [ ] BurnerRouter delay is `12,096,001`
- [ ] BurnerRouter `networkReceiver` is set to the Nexus Mutual slash receiver
- [ ] `setNetworkLimit(...)` is configured for the Nexus Mutual subnetwork id
