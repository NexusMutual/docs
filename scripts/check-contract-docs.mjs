#!/usr/bin/env node
/**
 * Checks the contract reference docs against the deployed contracts.
 *
 * Three checks:
 *   1. every solidity function documented in a contract reference page exists
 *      on the deployed ABI of the contract that page documents
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
const ALL_DOCS = path.join(ROOT, 'docs');
const RPC = process.env.ETH_RPC_URL || 'https://ethereum-rpc.publicnode.com';

// doc file -> deployed contract name. Paths are relative to docs/, because the
// RWI Vault is a separate product and its reference lives in its own section.
const PAGES = {
  'developers/contracts/Assessments.md': 'Assessments',
  'developers/contracts/Claims.md': 'Claims',
  'developers/contracts/Cover.md': 'Cover',
  'developers/contracts/CoverProducts.md': 'CoverProducts',
  'developers/contracts/Pool.md': 'Pool',
  'developers/contracts/Ramm.md': 'Ramm',
  'developers/contracts/StakingPool.md': 'StakingPool',
  'developers/contracts/StakingPoolFactory.md': 'StakingPoolFactory',
  'developers/contracts/StakingProducts.md': 'StakingProducts',
  'developers/contracts/TokenController.md': 'TokenController',
  'rwi-vault/contracts/RWIVault.md': 'RWIVault',
  'rwi-vault/contracts/Locks.md': 'Locks',
  'rwi-vault/contracts/RWIRegistry.md': 'RWIRegistry',
};

const core = await import('@nexusmutual/deployments');
const vault = await import('@nexusmutual/rwi-vault-deployments');

// The RWI Vault ships from its own repo with its own deployments package, so
// its contracts are merged in here. Annotations name a contract, not a package.
const addresses = { ...core.addresses, ...vault.addresses };
const abis = { ...core.abis, ...vault.abis };

const read = file => fs.readFileSync(path.join(ALL_DOCS, file), 'utf8');

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
  // The vault scales rates and its asset unit as powers of ten: 1e18, 1.5e18, 1e6.
  const exponent = s.match(/^([\d.]+)e(\d+)$/);
  if (exponent) return ethers.parseUnits(exponent[1], Number(exponent[2]));
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
  if (!fs.existsSync(path.join(ALL_DOCS, file))) {
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
  if (!fs.existsSync(path.join(ALL_DOCS, file))) continue;

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

// ---- check 5: worked examples --------------------------------------------
//
// Annotations assert a constant has not moved. They cannot tell whether the
// prose reads it correctly: "0.5%" where 500 basis points means 0.05% still
// passes. Running the example removes that gap, because the number comes back
// from the contract rather than from the sentence.

const { examples } = await import('./doc-examples.mjs');

/** Strings a reader might reasonably have written for this number. */
const renderings = n => [...new Set([
  String(n),
  ...[1, 2].map(d => n.toFixed(d)).filter(s => Number(s) === n),
])];

const appearsIn = (text, n) => renderings(n).some(s => text.includes(s));

if (examples.length) {
  console.log('\nWorked examples:');

  for (const ex of examples) {
    const docPath = path.join(ALL_DOCS, ex.doc);
    if (!fs.existsSync(docPath)) {
      problems.push(`${ex.doc}: page is missing, cannot run "${ex.title}"`);
      continue;
    }
    const text = fs.readFileSync(docPath, 'utf8');

    let produced;
    try {
      const bound = Object.fromEntries(Object.keys(abis)
        .filter(c => addresses[c])
        .map(c => [c, new ethers.Contract(addresses[c], abis[c], provider)]));
      produced = await ex.run(bound);
    } catch (err) {
      notes.push(`${ex.doc}: "${ex.title}" could not be run — ${(err.shortMessage || err.message).slice(0, 70)}`);
      continue;
    }

    const checks = { ...(ex.inputs ?? {}), ...produced };
    const missing = Object.entries(checks).filter(([, v]) => !appearsIn(text, v));

    verified += Object.keys(checks).length;

    if (missing.length === 0) {
      const shown = Object.entries(produced).map(([k, v]) => `${k} ${v}`).join(', ');
      console.log(`  ok    ${ex.title.padEnd(46)} ${shown}  [${ex.doc}]`);
    } else {
      console.log(`  FAIL  ${ex.title.padEnd(46)} [${ex.doc}]`);
      for (const [label, value] of missing) {
        console.log(`          ${label} is ${value} onchain, and does not appear in the page`);
      }
      problems.push(
        `${ex.doc} (${ex.section ?? ex.title}): the example does not match the contract — `
        + missing.map(([l, v]) => `${l} should be ${v}`).join('; '),
      );
    }
  }
}

// ---- check 6: cover wordings ---------------------------------------------
//
// The wording is the document a claim is assessed against. Pages used to
// hardcode its IPFS hash, and seven of nine had drifted from the one the
// protocol records. The page is generated now, so this reports when it needs
// regenerating rather than letting it silently describe superseded terms.
//
// A product type keeps its wording after its last listing is retired, so the
// page is checked against the types that still have active listings. That way
// a product that quietly stops being sold does not stay listed as available.

const WORDINGS = path.join(ALL_DOCS, 'overview/cover-products/cover-wordings.md');

if (fs.existsSync(WORDINGS)) {
  try {
    const api = process.env.NEXUS_API_URL ?? 'https://api.nexusmutual.io/v2';
    const [types, products] = await Promise.all([
      fetch(`${api}/product-types`).then(r => r.json()),
      fetch(`${api}/products`).then(r => r.json()),
    ]);

    const activeByType = products.reduce((acc, p) => {
      if (!p.isDeprecated) acc[p.productType] = (acc[p.productType] ?? 0) + 1;
      return acc;
    }, {});

    // Two product types can share a wording (Single and Multi Protocol Cover
    // do), so this keys on the type rather than the hash.
    const withMetadata = types.filter(t => t.metadata);
    const activeTypes = withMetadata.filter(t => (activeByType[t.id] ?? 0) > 0);

    const page = fs.readFileSync(WORDINGS, 'utf8');
    const documented = new Set(
      [...page.matchAll(/ipfs\/(Qm[1-9A-HJ-NP-Za-km-z]{44})/g)].map(m => m[1]),
    );
    const activeCids = new Set(activeTypes.map(t => t.metadata));

    const missing = activeTypes.filter(t => !documented.has(t.metadata));
    const stale = [...documented].filter(c => !activeCids.has(c));
    const named = stale.map(c => {
      const owner = withMetadata.find(t => t.metadata === c);
      return owner ? `${owner.name} has no active listings` : `${c} is not a wording the protocol records`;
    });

    console.log(`\nCover wordings: ${activeTypes.length} products with active listings, ${documented.size} wordings listed`);

    const issues = [
      ...missing.map(t => `${t.name} has active listings but no wording listed`),
      ...named,
    ];

    if (issues.length) {
      issues.forEach(i => console.log(`  FAIL  ${i}`));
      problems.push('overview/cover-products/cover-wordings.md is out of date — run npm run docs:wordings');
    } else {
      console.log('  ok    every product with active listings has its current wording listed');
    }
  } catch (err) {
    notes.push(`cover wordings could not be checked — ${(err.message ?? err).toString().slice(0, 60)}`);
  }
}

console.log(`\ndeployed contracts: ${Object.keys(addresses).length} (${Object.keys(core.addresses).length} core, ${Object.keys(vault.addresses).length} vault)   published ABIs: ${Object.keys(abis).length}   values verified: ${verified}`);

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
