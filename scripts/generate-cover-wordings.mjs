#!/usr/bin/env node
/**
 * Generates the cover wordings and listings page from the Nexus Mutual API.
 *
 * The wording is the legal document a claim is assessed against. Each product
 * type records the wording it is currently offered under, so that record is
 * the only safe source: the previous per-product pages hardcoded a CID, and
 * seven of nine had drifted from the one the protocol points at. The listings
 * come from the same API, so the docs no longer depend on an external index.
 *
 * Fetching happens here rather than at build time, so a deploy never depends
 * on the API being up. The committed page is checked against the API by
 * npm run check:contract-docs, and the Cover products refresh workflow runs
 * this script daily and opens a pull request when the page changes.
 *
 *   npm run docs:wordings     refresh the page
 */

import fs from 'node:fs';
import { PAGE, loadCoverProducts, renderPage } from './cover-products.mjs';

const groups = await loadCoverProducts();
fs.writeFileSync(PAGE, renderPage(groups));

const listings = groups.reduce((n, g) => n + g.listings.length, 0);
console.log(`cover wordings and listings: ${groups.length} products, ${listings} listings`);

for (const g of groups.filter(g => !g.cid)) {
  console.warn(`warning: ${g.name} has current listings but no wording recorded`);
}
