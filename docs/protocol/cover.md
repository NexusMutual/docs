---
sidebar_position: 3.8
---

# Cover

Members can buy cover products to protect against any of the supported risks. Cover capacity is sourced from one or more staking pools, depending on available capacity.

To buy cover, members choose the product, cover amount in ETH, DAI or USDC, cover period length, and preferred slippage given that pricing is onchain. The cover fee can be paid in ETH, DAI, USDC or NXM.

After the cover is purchased, it is tokenized and represented as an NFT (ERC-721) that is held in the member's address.

## Tokenized cover

With tokenized cover, members can renew existing cover, file partial claims, and transfer the cover to a non-member address. Cover NFTs allow for features that were previously unavailable.

### Flexible coverage

Tokenized cover can be edited to update the covered amount and/or the cover period length. If a member buys cover for 50 ETH over a six-month period and decides to extend their cover period one month before it expires, they can edit the NFT to modify their existing cover. This flexibility allows members to easily renew or update the covered amount without buying an additional cover.

If a cover is edited, the remaining fee can be applied as a credit to the updated period, so long as the cover is sourced from the same staking pool as when it was originally purchased.

When a member buys cover, the cover fee is converted to NXM, which is valued at the spot price at the time of purchase, and this NXM is streamed to stakers within the staking pool(s) where the cover capacity was sourced. During the editing process, a new cover fee applies for the updated cover period. The credit that can be applied consists of the NXM converted from the original cover fee, so NXM price changes can impact the credit amount that can be applied when someone edits their cover NFT.

### Multi-event protection

When someone buys cover, it can offer protection for more than one loss event with partial claims functionality.

Should a member suffer a loss of funds that is less than the total covered amount, they can file a partial claim. When partial claims are approved and a member redeems their claim payment, the remaining cover amount is still active for the cover period.

*For example*: if a member holds a cover for 50 ETH with a six-month cover period and they file a claim for 25 ETH that is approved at the three-month point, their cover NFT will still provide protection for 25 ETH over the next three-month period until the cover expires. A cover holder can always update their NFT to modify the cover amount and/or period should they wish to do so.

### Transferable NFTs

Members need to use their whitelisted address to buy cover and file a claim. However, a member can transfer their cover NFT to a non-member address for a variety of reasons (e.g, holding cover in an address secured by a hardware wallet). Because cover NFTs are transferable, someone can switch their membership address before an existing cover expires, as the NFT can be transferred to an address and membership can then be transferred to that address.

This provides members with greater optionality when self-custodying their cover.
