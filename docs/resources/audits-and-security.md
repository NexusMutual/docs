---
sidebar_position: 5.1
---

# Audits and Security

Review Nexus Mutual's audits, bug bounties, and initiatives to strengthen our protocol's security.

## Audits

Below are a list of audits conducted on Nexus Mutual's smart contracts in order of newest to oldest. You can also review [Nexus Mutual's GitHub](https://github.com/NexusMutual/smart-contracts) where these reports are hosted.

### iosiro audit | October 2023

[iosiro](https://iosiro.com/) was commissioned by Nexus Mutual to conduct an audit on the Ratcheting AMM (RAMM) contracts.
* [Nexus Mutual RAMM Audit | Preliminary Draft](https://gist.github.com/iosiro-security/90e2aab047eff89cbb9e89c8b06e6876#file-0_iosiro-nexus-mutual-tokenomics-draft-report-md)

*When iosiro provides a finalised audit report, this page will be updated with that report.*

### Chaos Labs economic audit | October 2023

[Chaos Labs](https://chaoslabs.xyz/) was commissioned by the Foundation to conduct an economic audit of the Ratcheting AMM (RAMM) design and mechanism. The [initial announcement](https://forum.nexusmutual.io/t/nexus-mutual-partners-with-chaos-labs-for-economic-audit-of-ramm-mechanism-design/1206?u=bravenewdefi) was made on the Nexus Mutual governance forum.
* [Chaos Labs economic audit report for the RAMM](https://chaoslabs.xyz/resources/chaos_labs_nexus_mutual_pt_1.pdf)


### iosiro audits | November - December 2022, February - March 2023

[iosiro](https://iosiro.com/) was commissioned by Nexus Mutual to conduct an audit on all contracts under the <code>contracts/modules</code> folder.
* [Nexus Mutual V2 Audit](https://gist.github.com/iosiro-security/9ab387c0f43fddfc50e3a66802d2f4f7)

### iosiro audits | May 2021 & June 2021

[iosiro](https://iosiro.com/) was commissioned by Nexus Mutual to conduct a smart contract audit on:
* [The stacked risk, on-chain MCR, and swap operator contracts](https://iosiro.com/audits/nexus-mutual-stacked-risk-on-chain-mcr-and-swap-operator-smart-contract-audit)
* [The distributor smart contract](https://iosiro.com/audits/nexus-mutual-distributor-smart-contract-audit)
* [The emergency response smart contract](https://iosiro.com/audits/nexus-mutual-emergency-response-smart-contract-audit)

### G0 Group audits | June 2020, November 2020, & March 2021

The [G0 Group](https://github.com/g0-group) was commissioned by Nexus Mutual to conduct a smart contract audit on:
* [The pooled staking contract](https://github.com/g0-group/Audits/blob/master/G0Group-NexusMutual2020Jun.pdf)
* [The claim payout contract upgrade](https://nexusmutual.io/pages/G0Group-Nexus_CPU.pdf)
* [The distributor contract](https://nexusmutual.io/pages/G0Group-NexusMutualDistributor.pdf)

### Solidified audit | April 2019

[Solidified](https://solidified.io/) was commissioned by Nexus Mutual to conduct a smart contract audit on the smart contracts and associated components. 
* [Audit conducted before Ethereum mainnet launch audit](https://github.com/solidified-platform/audits/blob/master/Audit%20Report%20-%20Nexus%20Mutual%20%5B22.04.2019%5D.pdf)

## Security

Nexus Mutual works to ensure the smart contract system is safe and secure. Regular audits are an important part of maintaining the security of the smart contract system, but there are other approaches the mutual takes to keep the protocol secure.

### Security for RAMM launch

Pending a successful on-chain governance vote, the RAMM will launch in late November. At launch, the Engineering team will employ the following security measures to ensure the launch is closely monitored:
* **Implementing circuit breakers in RAMM contract.** The RAMM contract will be deployed with circuit breakers in the code, which will limit the maximum amount of ETH that can be withdrawn and the maximum amount of NXM that can be minted via capital contributions over a defined period of time. The limits will be progressively raised over time, after careful monitoring of the system.
* **Active smart contract monitoring with Tenderly alerts**. The Engineering team uses Tenderly alerts to monitor for certain events within the protocol. At launch, the Engineering team will have enhanced monitoring in place for the RAMM contracts and any associated events within the protocol to ensure they can closely monitor the smart contracts.
* **Emergency pause functionality for RAMM contract**. The [Advisory Board](/governance/#advisory-board) has the power to enact an emergency pause on the RAMM contract should any malicious activity take place, which will prevent any minting or redeeming from occurring that would result in a loss of value for members. This power would only be used in an extreme situation and serves as a last resort.

### Bug bounty program

Nexus Mutual works with [Immunefi](https://immunefi.com/) to manage a bug bounty program. On Immunefi, hackers secure DeFi contracts, save funds from theft, and get paid for responsibly disclosing vulnerabilities. We are able to secure the Nexus Mutual protocol through this program with Immunefi.

Through this program, whitehat hackers are incentivized to disclose vulnerabilities in the mutual's smart contract system in exchange for payouts equal to the level of severity.

**Smart Contracts and Blockchain**
* **Critical** | Up to $50,000 USD
* **High** | Up to $25,000 USD
* **Medium** | Up to $10,000 USD
* **Low** | Up to $2,000 USD

**Note**: Bounties listed in USD but paid out in stablecoins.

[Check out the bug bounty program on Immunefi for more details.](https://immunefi.com/bounty/nexusmutual/)
