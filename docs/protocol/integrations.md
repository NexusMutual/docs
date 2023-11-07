---
sidebar_position: 4.4
---

# Integrations

The protocol now supports commission rates. When you integrate and offer your users the ability to purchase cover through your user interface (UI), you can set a commission rate for any cover purchased through your UI.

The commission ratio and commission destination address are configured in your implementation of the router contract. The commission ratio is a percentage added to the cover price, where the maximum ratio that can be applied is 25%. When someone buys cover and pays the fee through your UI, the commission ratio is applied and that amount is sent to the commission destination address in the asset that is used to pay the cover fee.

It is recommended to use a whitelisted membership address as the destination address, though it is not required. If cover buyers choose to pay the cover fee in NXM and the commission destination address is not a member, the buy cover transaction will fail.

## Commission

If you are distributing Nexus Mutual cover in your UI, you can add a commission to the existing cover price. This creates an incentive for members to make cover more accessible through third-party user interfaces.

For example: whenever someone buys cover in the Nexus Mutual UI, a 15% commission is applied, which is then directed to the [DAO treasury](https://app.safe.global/balances?safe=eth:0x586b9b2F8010b284A0197f392156f1A7Eb5e86e9).

Commissions create stronger economic incentives to expand the Mutual's distribution network.

## Selling cover to non-members

When cover is purchased, a member can specify the address owner, which is the address where the cover NFT will be minted. If you offer your users the ability to purchase cover through your user interface (UI), you can use a whitelisted address - an EOA or a smart contract - to buy the cover and mint it in a non-member's address. This functionality gives you greater flexibility if you offer and sell Nexus Mutual cover.

**Note**: while a non-member can custody the NFT, only a member can edit an existing cover or file a claim. 
