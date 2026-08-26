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

## REST APIs

These are the public endpoints on the Nexus Mutual API. Full request and response schemas live in the [OpenAPI docs](https://api.nexusmutual.io/v2/api/docs/).

* `GET /v2/quote`: the premium and the pool combination for a cover purchase.
* `GET /v2/capacity`: capacity for every product.
* `GET /v2/capacity/{productId}`: capacity for one product. Pass `withPools` to split the result by pool.
* `GET /v2/capacity/pools/{poolId}`: capacity for one pool.
* `GET /v2/capacity/pools/{poolId}/products/{productId}`: capacity for one product within one pool.
* `GET /v2/pricing/products/{productId}`: each backing pool's price and the weighted average, in basis points.

### Membership

An integration needs a check against the `Registry` contract rather than a call to the API.

Call `Registry.isMember(address)` to check whether an address holds membership.

Send addresses that lack membership to [app.nexusmutual.io](https://app.nexusmutual.io/) to join. KYC and the join fee complete there.
