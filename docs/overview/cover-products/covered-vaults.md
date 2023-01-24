---
sidebar_position: 2.8
---

# Covered Vaults

**Note**: this product is still in the development phase and is not yet live.

When you deposit crypto assets into a yield aggregator or a protocol that is integrated with other DeFi protocols, your funds are exposed to a variety of risks across multiple protocols.

**Instead of buying cover separately, you can deposit crypto assets into a natively covered vault that automatically buys cover for all deposits using a portion of the yield generated from the underlying strategy.**

Covered vaults are built using the ERC-4626 token standard, which allows any other protocols to build covered vaults with their ERC-4626 yield-bearing vaults.

## ERC-4626

People create Ethereum Improvement Proposals (EIP) to establish standard practices adopted across the network. Token standards were and are created to ensure tokens are compatible with existing decentralized protocols built on the Ethereum network.

The [ERC-4626 tokenized vault standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-4626/) allows developers to build vaults on top of other protocols that use the same standard. Before this standard was established, developers needed to create custom adapters to integrate with other protocols – a complex process that is inefficient and can result in faulty integrations.

With Nexus Mutual’s Covered Vaults, protocols can build ERC-4626 compliant vaults that offer native protection against risks in multiple protocols, which includes the risk of the underlying asset depegging.

## Covered risks

This cover product will protect against a loss of value, which can be caused by many different loss events such as:
* An exploit in the protocol you deposited assets in or in one of the underlying protocols, which results in the yield-bearing token losing value
* An oracle failure, economic design failure, or governance attack in the protocol you deposited assets in or in one of the underlying protocols that results in a loss of funds, which causes the yield-bearing token to lose value
* The underlying token, or tokens, depegging in value, which causes the yield-bearing token to lose value

## Development stage

Members voted to approve a DAO treasury grant to provide funding for BootNode to enter the development phase for the Covered Vaults project. For more information about the development phase, you can read BootNode’s proposal on the Nexus Mutual governance forum: [Nexus Mutual Covered Vaults (Development Phase)](https://forum.nexusmutual.io/t/nexus-covered-vaults-development-phase/926/1)

This cover product is still in the development phase but will be available in 2023.