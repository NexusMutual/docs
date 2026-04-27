---
sidebar_position: 8.4.1.1
---

# Nexus Mutual Cover

The Nexus Mutual Baseline Yield Cover is designed to pay out in case the Vault is unable to meet the Baseline Yield.

The Cover protects the Vault Operator against any reason why the Vault wouldn’t be able to meet its liabilities, including:
* Technical and economic failures in the Vault smart contracts
* Operational failures by the VO
* Insufficient returns from the underlying insurance investments

## Cover Buying Process

The VO is responsible for maintaining an appropriate level of Nexus Mutual Cover to protect the Baseline Yield. The VO will interact with the Nexus Mutual protocol to buy, renew and edit Cover on behalf of the Vault. 

The Cover Amount is always the current total asset value in the Vault, rolled forward at the baseline yield to the expiry date. The expiry date is either:
* the end of the current calendar quarter, or,
* if fewer than 60 days remain to the end of the current calendar quarter, then the expiry date should be the end of the next calendar quarter.

The VO aims to edit the Cover as required within 2 business days of any changes to the Vault such as fresh deposits or filled withdrawal requests.

### Grant

For the first 6 quarters of operations, the VO has secured a 9000 NXM grant to spend on Baseline Yield Cover fees to minimise the need to withdraw deposited funds from Insurance Partners in the early part of running the Vault.