# Nexus Mutual documentation

The source of [docs.nexusmutual.io](https://docs.nexusmutual.io/) — the member and developer documentation for the Nexus Mutual protocol. Built with [Docusaurus](https://docusaurus.io/).

## Running it locally

Node 22.14 (see `.node-version`) and npm.

```bash
npm install
npm start
```

`npm start` opens the site at `localhost:3000` and reloads as you edit. To check what actually ships, build it and serve the output:

```bash
npm run build
npm run serve
```

The build fails on a broken internal link, so it catches more than `npm start` does. Run it before opening a pull request.

## Where the content lives

Every page is a Markdown file under `docs/`:

| Directory | What it covers |
| --- | --- |
| `overview/` | Membership, cover products, claims history |
| `protocol/` | Cover, staking, pricing, capital pool, claim assessment |
| `governance/` | How proposals work, the Advisory Board, the DAO |
| `developers/` | Contract reference, integration guides, diagrams |
| `rwi-vault/` | The Real-World Insurance Vault |
| `resources/` | Audits, security, FAQ |

The sidebar is generated from the directory tree. A new page needs `sidebar_position` in its frontmatter to sit in the right place, and a `_category_.json` gives a subdirectory its label.

Diagrams are [Mermaid](https://mermaid.js.org/) in a `mermaid` fenced block and render natively.

## Keeping the docs true to the contracts

The contract reference and the protocol numbers are checked against the deployed contracts:

```bash
npm run check:contract-docs
```

It verifies three things:

- every solidity function documented under `docs/developers/contracts/` exists on the deployed contract's ABI
- every constant quoted there still holds the value the contract returns
- the worked examples reproduce when run against the contract's own functions

Numbers written in prose are tied to their source with an annotation, which does not render:

```markdown
<!-- @check StakingProducts.PRICE_BUMP_RATIO = 500 -->
* bump = 0.05% addition to the spot price per 1% of pool capacity used
```

If you change a number that carries one of these, update the annotation to match, or the check will report the page and line.

Constant values live in the deployed bytecode, so the check reads them over JSON-RPC. Set `ETH_RPC_URL` to use your own endpoint; it falls back to a public one.

## Checks on a pull request

**Build** runs `npm ci` and `npm run build`. A failure here belongs to this repository and blocks the merge.

**Contract docs drift** runs the check above on every pull request and again weekly. It reports without blocking, because it fails when contracts change rather than when the docs do. Drift found on a scheduled run opens a single tracking issue and updates that same issue until the reference matches again.

## How it deploys

Cloudflare builds and publishes `master` to [docs.nexusmutual.io](https://docs.nexusmutual.io/). Merging is all it takes — there is no deploy step to run, and the site is not served from GitHub Pages.
