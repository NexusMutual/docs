#!/usr/bin/env node
/**
 * Generates the cover wordings page from the protocol's own product types.
 *
 * The wording is the legal document a claim is assessed against. Each product
 * type records the wording it is currently sold under, so that record is the
 * only safe source: the previous per-product pages hardcoded a CID, and seven
 * of nine had drifted from the one the protocol points at.
 *
 * Fetching happens here rather than at build time, so a deploy never depends
 * on the API being up. The committed page is checked against live metadata by
 * npm run check:contract-docs, which reports when a wording has moved.
 *
 *   npm run docs:wordings     refresh the page
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TARGET = path.join(ROOT, 'docs/overview/cover-products/cover-wordings.md');
const API = process.env.NEXUS_API_URL ?? 'https://api.nexusmutual.io/v2';

const [types, products] = await Promise.all([
  fetch(`${API}/product-types`).then(r => r.json()),
  fetch(`${API}/products`).then(r => r.json()),
]);

const listingsPerType = products.reduce((acc, p) => {
  const t = p.productType;
  acc[t] ??= { total: 0, active: 0 };
  acc[t].total += 1;
  if (!p.isDeprecated) acc[t].active += 1;
  return acc;
}, {});

const rows = types
  .filter(t => t.metadata && (listingsPerType[t.id]?.active ?? 0) > 0)
  .map(t => ({ name: t.name, cid: t.metadata }))
  .sort((a, b) => a.name.localeCompare(b.name));

const page = `---
sidebar_position: 3
description: The cover wording for every Nexus Mutual product, taken from what the protocol records.
---

# Cover wordings

The cover wording is the document a claim is assessed against. It defines what is covered, what is excluded, what evidence is required, and how long after a loss a claim can be filed.

Each wording below is the one the protocol currently records for that product. Read the wording for the product you hold before buying and before claiming.

${rows.map(r => `- [${r.name}](${API}/ipfs/${r.cid})`).join('\n')}
`;

fs.writeFileSync(TARGET, page);
console.log(`cover wordings: ${rows.length} products`);
