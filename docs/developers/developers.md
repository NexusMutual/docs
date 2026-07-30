---
sidebar_position: 5
---

# Developer Resources

The Nexus Mutual protocol is designed to enable easy integrations and allow developers to build on top of the protocol.

* [Contracts](/developers/contracts/) — the deployed contracts and their interfaces
* [User Flows](/developers/user-flows/cover-buyer) — how buying cover, staking, and managing a pool work end to end
* [Diagrams](/developers/Diagrams/) — contract relationships and user journeys
* [Point of Sale Integrations](/developers/pos-integrations) — sell cover from your own frontend
* [RWI Vault](/rwi-vault/contracts/) — the vault contracts, which ship separately from the protocol

## Libraries and APIs

**[`@nexusmutual/sdk`](https://github.com/NexusMutual/sdk)** wraps the buy cover flow, quoting, and cover metadata. Start here for an integration.

**[`@nexusmutual/deployments`](https://www.npmjs.com/package/@nexusmutual/deployments)** publishes the deployed addresses and ABIs, versioned with the contracts.

**[The Nexus Mutual API](https://api.nexusmutual.io/v2/api/docs/)** serves quotes, capacity, and product data. The SDK calls it for you, and you can call it directly.

**[`@nexusmutual/rwi-vault-deployments`](https://www.npmjs.com/package/@nexusmutual/rwi-vault-deployments)** publishes the addresses and ABIs for the [RWI Vault](/rwi-vault/contracts/), which is deployed and versioned on its own.
