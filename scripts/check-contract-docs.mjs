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
const ALL_DOCS = path.join(ROOT, 'docs');
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
 * Constants that are private in the contract but readable through a getter
 * under a different name.
 */
const ALIASES = {
  GLOBAL_CAPACITY_RATIO: 'getGlobalCapacityRatio',
  GLOBAL_REWARDS_RATIO: 'getGlobalRewardsRatio',
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

const ANNOTATION = /<!--\s*@check\s+([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)\s*=\s*(.+?)\s*-->/g;

const annotations = [];
const walk = dir => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(p); continue; }
    if (!entry.name.endsWith('.md')) continue;
    const txt = fs.readFileSync(p, 'utf8');
    for (const m of txt.matchAll(ANNOTATION)) {
      annotations.push({
        file: path.relative(ALL_DOCS, p),
        contract: m[1],
        getter: m[2],
        raw: m[3].trim(),
        line: txt.slice(0, m.index).split('\n').length,
      });
    }
  }
};
walk(ALL_DOCS);

// ---- check 3 --------------------------------------------------------------

const provider = new ethers.JsonRpcProvider(RPC);
let verified = 0;

console.log('\nConstants quoted in the reference:');

for (const [file, pageContract] of Object.entries(PAGES)) {
  if (!fs.existsSync(path.join(DOCS, file))) continue;

  for (const c of documentedConstants(read(file))) {
    const expected = literal(c.raw);
    if (expected === null) {
      const covered = annotations.some(a => a.getter === c.name);
      if (!covered) notes.push(`${file}: ${c.name} = ${c.raw} — value form not checked`);
      continue;
    }

    const getter = ALIASES[c.name] ?? c.name;
    const candidates = gettersFor(getter);
    const contract = candidates.includes(pageContract) ? pageContract : candidates[0];
    if (!contract) {
      notes.push(`${file}: ${c.name} is private and has no getter — not checked`);
      continue;
    }

    let actual;
    try {
      const instance = new ethers.Contract(addresses[contract], abis[contract], provider);
      actual = await instance[getter]();
    } catch (err) {
      notes.push(`${file}: ${c.name} could not be read from ${contract} — ${(err.shortMessage || err.message).slice(0, 60)}`);
      continue;
    }

    verified++;
    const via = getter === c.name ? contract : `${contract}.${getter}`;
    if (BigInt(actual) === expected) {
      console.log(`  ok    ${c.name.padEnd(26)} ${String(expected).padStart(22)}  (${via})`);
    } else {
      console.log(`  FAIL  ${c.name.padEnd(26)} ${String(expected).padStart(22)}  documented, ${actual} onchain  (${via})`);
      problems.push(`${file}: ${c.name} is documented as ${c.raw} but ${contract} returns ${actual}`);
    }
  }
}

// ---- check 4: numbers stated in prose ------------------------------------
//
// Docs often state a number a reader can use rather than the constant behind
// it: "0.05% per 1% of capacity" for PRICE_BUMP_RATIO = 500. Those have no
// machine-readable link to the contract, so an annotation supplies one:
//
//   <!-- @check StakingProducts.PRICE_BUMP_RATIO = 500 -->
//
// The annotation asserts the underlying value has not moved. It does not
// verify the prose is a correct reading of that value, which stays a human
// judgement. It catches drift, not misinterpretation.

if (annotations.length) {
  console.log('\nNumbers stated in prose:');
  for (const a of annotations) {
    const expected = literal(a.raw);
    const where = `${a.file}:${a.line}`;

    if (expected === null) {
      notes.push(`${where}: @check ${a.contract}.${a.getter} = ${a.raw} — value form not understood`);
      continue;
    }
    if (!addresses[a.contract] || !abis[a.contract]) {
      problems.push(`${where}: @check names ${a.contract}, which is not deployed`);
      continue;
    }

    let actual;
    try {
      const instance = new ethers.Contract(addresses[a.contract], abis[a.contract], provider);
      actual = await instance[a.getter]();
    } catch (err) {
      notes.push(`${where}: ${a.contract}.${a.getter} could not be read — ${(err.shortMessage || err.message).slice(0, 60)}`);
      continue;
    }

    verified++;
    const label = `${a.contract}.${a.getter}`;
    if (BigInt(actual) === expected) {
      console.log(`  ok    ${label.padEnd(44)} ${String(expected).padStart(22)}  [${where}]`);
    } else {
      console.log(`  FAIL  ${label.padEnd(44)} ${String(expected).padStart(22)}  documented, ${actual} onchain  [${where}]`);
      problems.push(`${where}: ${label} is documented as ${a.raw} but returns ${actual}. The prose around this line is derived from it and needs rereading.`);
    }
  }
}

console.log(`\ndeployed contracts: ${Object.keys(addresses).length}   published ABIs: ${Object.keys(abis).length}   values verified: ${verified}`);

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
