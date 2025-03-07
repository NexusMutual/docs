---
sidebar_position: 9.1
---

# Point-of-Sale (PoS) Integrations

The Mutual now offers PoS integrations, so you can allow users to buy cover directly in your frontend. Users don't have to join the Mutual when they buy cover. They'll only need to join as a member if they suffer a loss and need to file a claim. By offering a PoS integration, you can attract more risk averse users and capture stickier TVL, as users who buy cover tend to stay deposited longer than users who do not buy cover.

Below you can find resources to add a PoS integration to your frontend. 

## Developer Resources

The `@nexusmutual/sdk` package enables easy integration with the Nexus Mutual buy cover flow.

### API Reference

**getQuoteAndBuyCoverInputs** - function to retrieve a quote and necessary inputs for buying cover.

### Getting Started

Install `@nexusmutual/sdk`:

    ❯ npm install @nexusmutual/sdk

### Example: Buying Cover (using ethers)

#### Step 1: Import the SDK and ethers

Import `@nexusmutual/sdk` along with `ethers`:

    import nexusSdk, { CoverAsset } from '@nexusmutual/sdk';
    import * as ethers from 'ethers';

#### Step 2: Initialize the ethers provider and connect the wallet

Set up the ethers provider and get the user to connect their wallet.

    const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
    const wallet: Wallet = …;

#### Step 3: Fetch a quote

Use `getQuoteAndBuyCoverInputs` to retrieve a quote for the desired cover. Provide all the necessary parameters including the product ID, cover amount (in wei), cover period (in days), cover asset (ETH, USDC or cbBTC), and the buyer’s address. See the [products.json section of the SDK](https://sdk.nexusmutual.io/data/products.json) to see the total list of individual cover products the Mutual offers.

```javascript
const response = await nexusSdk.getQuoteAndBuyCoverInputs(
  1, // product id for Bundled Protocol Cover or Protocol Cover
  ethers.utils.parseEther('10').toString(), // cover amount (in wei) denominated in the asset below
  28, // coverPeriod (in days: min 28 days, max 365 days)
  CoverAsset.ETH, // cover asset - ETH, USDC or cbBTC
  wallet.address, // coverBuyerAddress - address of the end user buying the cover, that will receive the cover NFT
);
```

#### Step 4: Display the quote information

If the quote is successfully retrieved, you can display the quote information to the user:

```json
{
  displayInfo: {
    premiumInAsset: "1000000000000000000", // integer string, smallest unit (i.e. wei)
    coverAmount: "5000000000000000000", // integer string, smallest unit (i.e. wei)
    yearlyCostPerc: 0.05, // percentage expressed as number between 0 and 1
    maxCapacity: "20000000000000000000" // integer string, smallest unit (i.e. wei)
  },
  buyCoverInput: {
    buyCoverParams: {
      coverId: 1,
      owner: "0x1234567890abcdef1234567890abcdef12345678", // Address format
      productId: 2,
      coverAsset: "ETH", // Example CoverAsset
      amount: "1000000000000000000", // integer string, smallest unit (i.e. wei)
      period: 3600, // period in seconds
      maxPremiumInAsset: "2000000000000000000", // integer string, smallest unit (i.e. wei)
      paymentAsset: 1,
      commissionRatio: 0.1, // 10%
      commissionDestination: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef", // Optional Address
      ipfsData: "QmT5NvUtoM5nXc5g5g5g5g5g5g5g5g5g5g5g5g5g5g5" // Example IPFS data
    },
    poolAllocationRequests: [
      {
        poolId: "1",
        coverAmountInAsset: "1000000000000000000", // integer string, smallest unit (i.e. wei)
        skip: false
      }
    ]
  }
}
```

#### Step 5: Buy Cover

If the quote is successfully retrieved, you can initiate the buy cover transaction:

```
if (response.result) {
  // execute buyCover
const coverBrokerContract = new ethers.Contract(
  nexusSdk.addresses.CoverBroker,
  nexusSdk.abis.CoverBroker,
  signer
);
const { buyCoverParams, poolAllocationRequests } = response.result.buyCoverInput;
const tx = await coverBrokerContract.buyCover(buyCoverParams, poolAllocationRequests);
await tx.wait();
} else if (response.error) {
  // handle error
console.error('Error message: ', response.error.message); // error message
console.error('Error data: ', response.error.data); // optional error data
}
```
### Required Terms and Conditions Language for UI Integrations

PoS integrations do require a disclaimer to let users know they'll have to become a Nexus Mutual member in order to file a claim. You can find the template below:

* By buying Nexus Mutual Bundled Protocol Cover, you agree to the [terms](link to relevant Product Type wording) and [conditions](link to any relevant schedule and/or annex document)
* By checking this box, you confirm that you do not reside in the countries listed in the [linked page](https://docs.nexusmutual.io/overview/membership/#kyc-requirements), and acknowledge that in the event of a loss, you will be required to join as a [member of Nexus Mutual](https://app.nexusmutual.io/membership) to file your claim.

#### Guidance on How to Display

When you display the option to Buy Cover in your frontend, we would like you to include the “By buying Nexus Mutual [Product Type], you agree to the [terms](link to relevant Product Type wording) and [conditions](link to any relevant schedule and/or annex document)" text below the Buy Cover option, as we do in our user interface.

Once someone clicks the Buy Cover button, they should be prompted with the second message, which they have to click to acknowledge before buying cover.

### Have Questions or Need Support?

Please reach out to us through the [Nexus Mutual Contact Form](https://nexusmutual.io/contact).
