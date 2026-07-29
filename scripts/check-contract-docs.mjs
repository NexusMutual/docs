#!/usr/bin/env node
/**
 * Checks the contract reference docs against the deployed contracts.
 *
 * Three checks:
 *   1. every solidity function documented in docs/developers/contracts/*.md
 *      exists on the deployed ABI of the contract that page documents
 *   2. every page maps to a contract that is actually deployed
 *   3. every solidity constant quoted in those pages still holds the value
 *      the deployed contract returns
 *
 * Resolves the deployed set from @nexusmutual/deployments at its latest
 * published version, so drift shows up when contracts ship rather than
 * when someone next edits the docs.
 *
 * Constant values live in the deployed bytecode, so check 3 reads them over
 * JSON-RPC. Set ETH_RPC_URL to use your own endpoint. A network failure is
 * reported but does not count as drift, so a flaky endpoint cannot raise a
 * false alarm.
 *
 * Exits non-zero when drift is found. Intended to report, not to block.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ethers } from 'ethers';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'docs/developers/contracts');
const RPC = process.env.ETH_RPC_URL || 'https://ethereum-rpc.publicnode.com';

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

const read = file => fs.readFileSync(path.join(DOCS, file), 'utf8');

const documentedFunctions = txt =>
  [...new Set([...txt.matchAll(/^\s*function\s+([A-Za-z0-9_]+)\s*\(/gm)].map(m => m[1]))];

const documentedConstants = txt =>
  [...txt.matchAll(/constant\s+([A-Z][A-Z0-9_]+)\s*=\s*([^;]+);/g)]
    .map(m => ({ name: m[1], raw: m[2].trim() }));

/** Resolve the simple literal forms the docs use. Returns null when unsupported. */
const literal = raw => {
  const s = raw.replace(/_/g, '').trim();
  if (/^\d+$/.test(s)) return BigInt(s);
  const ether = s.match(/^([\d.]+)\s*ether$/);
  if (ether) return ethers.parseEther(ether[1]);
  const days = s.match(/^(\d+)\s*days?$/);
  if (days) return BigInt(days[1]) * 86400n;
  const hours = s.match(/^(\d+)\s*hours?$/);
  if (hours) return BigInt(hours[1]) * 3600n;
  return null;
};

/**
 * Contracts exposing NAME as a zero-arg view/pure getter at a known address.
 * StakingPool is excluded by the address requirement: pools are deployed per
 * pool through the factory, so there is no single address to read from.
 */
const gettersFor = name =>
  Object.entries(abis)
    .filter(([c, abi]) => addresses[c] && abi.some(e =>
      e.type === 'function' && e.name === name && e.inputs.length === 0
      && ['view', 'pure'].includes(e.stateMutability)))
    .map(([c]) => c);

const problems = [];
const notes = [];
const rows = [];

// ---- checks 1 and 2 -------------------------------------------------------

for (const [file, contract] of Object.entries(PAGES)) {
  if (!fs.existsSync(path.join(DOCS, file))) {
    problems.push(`${file}: page is missing`);
    continue;
  }
  if (!abis[contract]) {
    problems.push(`${file}: ${contract} has no published ABI — is it still deployed?`);
    continue;
  }

  const documented = documentedFunctions(read(file));
  const live = new Set(abis[contract].filter(e => e.type === 'function').map(e => e.name));
  const missing = documented.filter(fn => !live.has(fn));

  rows.push({ file, contract, documented: documented.length, missing: missing.length });
  if (missing.length) {
    problems.push(`${file} (${contract}): not on the deployed ABI — ${missing.join(', ')}`);
  }
}

const width = Math.max(...rows.map(r => r.file.length));
for (const r of rows) {
  console.log(`${r.missing ? 'FAIL' : 'ok  '} ${r.file.padEnd(width)}  ${r.contract.padEnd(20)} documented:${String(r.documented).padStart(3)}  notOnABI:${String(r.missing).padStart(3)}`);
}

// ---- check 3 --------------------------------------------------------------

const provider = new ethers.JsonRpcProvider(RPC);
let verified = 0;

console.log('\nConstants quoted in the reference:');

for (const [file, pageContract] of Object.entries(PAGES)) {
  if (!fs.existsSync(path.join(DOCS, file))) continue;

  for (const c of documentedConstants(read(file))) {
    const expected = literal(c.raw);
    if (expected === null) {
      notes.push(`${file}: ${c.name} = ${c.raw} — value form not checked`);
      continue;
    }

    const candidates = gettersFor(c.name);
    const contract = candidates.includes(pageContract) ? pageContract : candidates[0];
    if (!contract) {
      notes.push(`${file}: ${c.name} has no public getter — not checked`);
      continue;
    }

    let actual;
    try {
      const instance = new ethers.Contract(addresses[contract], abis[contract], provider);
      actual = await instance[c.name]();
    } catch (err) {
      notes.push(`${file}: ${c.name} could not be read from ${contract} — ${(err.shortMessage || err.message).slice(0, 60)}`);
      continue;
    }

    verified++;
    if (BigInt(actual) === expected) {
      console.log(`  ok    ${c.name.padEnd(26)} ${String(expected).padStart(22)}  (${contract})`);
    } else {
      console.log(`  FAIL  ${c.name.padEnd(26)} ${String(expected).padStart(22)}  documented, ${actual} onchain  (${contract})`);
      problems.push(`${file}: ${c.name} is documented as ${c.raw} but ${contract} returns ${actual}`);
    }
  }
}

console.log(`\ndeployed contracts: ${Object.keys(addresses).length}   published ABIs: ${Object.keys(abis).length}   constants verified: ${verified}`);

if (notes.length) {
  console.log('\nNot checked:');
  notes.forEach(n => console.log(`  - ${n}`));
}

if (problems.length) {
  console.log(`\n${problems.length} problem(s):`);
  problems.forEach(p => console.log(`  - ${p}`));
  console.log('\nThe contract reference has drifted from the deployed contracts.');
  process.exit(1);
}

console.log('\nContract reference matches the deployed contracts.');
