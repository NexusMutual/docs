#!/usr/bin/env node
/**
 * Checks the contract reference docs against the deployed contracts.
 *
 * Two checks:
 *   1. every solidity function documented in docs/developers/contracts/*.md
 *      exists on the deployed ABI of the contract that page documents
 *   2. every page maps to a contract that is actually deployed
 *
 * Resolves the deployed set from @nexusmutual/deployments at its latest
 * published version, so drift shows up when contracts ship rather than
 * when someone next edits the docs.
 *
 * Exits non-zero when drift is found. Intended to report, not to block.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'docs/developers/contracts');

// doc file -> deployed contract name
const PAGES = {
  'Assessments.md': 'Assessments',
  'Claims.md': 'Claims',
  'Cover.md': 'Cover',
  'Pool.md': 'Pool',
  'Ramm.md': 'Ramm',
  'StakingPool.md': 'StakingPool',
  'StakingPoolFactory.md': 'StakingPoolFactory',
  'StakingProducts.md': 'StakingProducts',
  'TokenController.md': 'TokenController',
};

const { addresses, abis } = await import('@nexusmutual/deployments');

const documentedFunctions = file =>
  [...new Set(
    [...fs.readFileSync(path.join(DOCS, file), 'utf8')
      .matchAll(/^\s*function\s+([A-Za-z0-9_]+)\s*\(/gm)].map(m => m[1]),
  )];

const abiFunctions = name =>
  new Set((abis[name] ?? []).filter(e => e.type === 'function').map(e => e.name));

const problems = [];
const rows = [];

for (const [file, contract] of Object.entries(PAGES)) {
  if (!fs.existsSync(path.join(DOCS, file))) {
    problems.push(`${file}: page is missing`);
    continue;
  }
  if (!abis[contract]) {
    problems.push(`${file}: ${contract} has no published ABI — is it still deployed?`);
    continue;
  }

  const documented = documentedFunctions(file);
  const live = abiFunctions(contract);
  const missing = documented.filter(fn => !live.has(fn));

  rows.push({ file, contract, documented: documented.length, missing: missing.length });
  if (missing.length) {
    problems.push(`${file} (${contract}): not on the deployed ABI — ${missing.join(', ')}`);
  }
}

const width = Math.max(...rows.map(r => r.file.length));
for (const r of rows) {
  const status = r.missing ? 'FAIL' : 'ok  ';
  console.log(`${status} ${r.file.padEnd(width)}  ${r.contract.padEnd(20)} documented:${String(r.documented).padStart(3)}  notOnABI:${String(r.missing).padStart(3)}`);
}

console.log(`\ndeployed contracts: ${Object.keys(addresses).length}   published ABIs: ${Object.keys(abis).length}`);

if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  problems.forEach(p => console.log(`  - ${p}`));
  console.log('\nThe contract reference has drifted from the deployed contracts.');
  process.exit(1);
}

console.log('\nContract reference matches the deployed contracts.');
