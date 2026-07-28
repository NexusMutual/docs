/**
 * Worked examples from the docs, executed against the deployed contracts.
 *
 * A fixture encodes the inputs of an example and how to render its result.
 * It never encodes the answer. The answer comes back from the contract, and
 * the check asserts that number appears in the doc. A page therefore cannot
 * state a figure the contract does not produce, which catches a misreading
 * of a constant as well as a change to it.
 *
 * Inputs are asserted against the doc too, so a fixture cannot quietly drift
 * away from the example it claims to check.
 */

/** Render a value held against TARGET_PRICE_DENOMINATOR as a percentage. */
export const asPercent = raw => Number(raw) / 100;

/** Render a duration in seconds as whole days. */
export const asDays = raw => Number(raw) / 86400;

export const examples = [
  {
    doc: 'protocol/pricing.md',
    title: 'Bumped price after a cover buy',
    section: 'Bumped price',
    // The example states a spot price and the share of capacity being used.
    inputs: {
      'spot price (%)': 2.5,
      'capacity used (%)': 15,
    },
    async run({ StakingProducts }) {
      const T = 1800000000n;
      const product = {
        lastEffectiveWeight: 0,
        targetWeight: 100,
        targetPrice: 250n,           // 2.5%
        bumpedPrice: 250n,           // 2.5%, the spot price above
        bumpedPriceUpdateTime: T,
      };
      const [, updated] = await StakingProducts.calculatePremium(
        product,
        365n * 86400n,               // period
        1500n,                       // cover amount, 15% of the capacity below
        10000n,                      // total capacity in allocation units
        250n,                        // target price
        T,                           // no time has passed, so no price drop
        10n ** 16n,                  // NXM per allocation unit
        10000n,                      // TARGET_PRICE_DENOMINATOR
      );
      return { 'bumped price (%)': asPercent(updated.bumpedPrice) };
    },
  },

  {
    doc: 'protocol/pricing.md',
    title: 'Price drop over three days',
    section: 'Price Drop',
    inputs: {
      'days since the last cover buy': 3,
    },
    async run({ StakingProducts }) {
      const T = 1800000000n;
      // With a target price of zero the whole drop is visible.
      const dropped = await StakingProducts.getBasePrice(650n, T, 0n, T + 3n * 86400n);
      return { 'price drop (%)': asPercent(650n - dropped) };
    },
  },

  {
    doc: 'protocol/pricing.md',
    title: 'Spot price falls back to the target price',
    section: 'Calculating Spot Price',
    inputs: {
      'bumped price (%)': 6.5,
      'target price (%)': 4,
    },
    async run({ StakingProducts }) {
      const T = 1800000000n;
      const base = await StakingProducts.getBasePrice(650n, T, 400n, T + 3n * 86400n);
      return { 'spot price (%)': asPercent(base) };
    },
  },
];
