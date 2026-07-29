#!/usr/bin/env node
/**
 * Generates static/llms.txt from the docs tree.
 *
 * llms.txt gives an agent a map of the site. A hand-written one goes stale
 * the moment a page is added, and silently: the Crypto Cover page was absent
 * from the site for a year before anyone noticed. Deriving it from the tree
 * means a new page appears in it without anyone remembering.
 *
 * The header is authored in scripts/llms-header.md, since a summary of what
 * the Mutual is cannot be derived from a directory listing. Everything below
 * it is generated, and the structure mirrors the sidebar.
 *
 * A page's description comes from its `description` frontmatter, falling back
 * to its first sentence. Adding frontmatter improves the entry and also sets
 * the page's meta description, so it is worth doing for its own sake.
 *
 * Runs from `npm run build`, so the deployed file is always current.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'docs');
const SITE = 'https://docs.nexusmutual.io';

/** Some pages are CRLF, so normalise before any line-anchored matching. */
const read = p => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');

const splitFrontmatter = txt => {
  const m = txt.match(/^---\n(.*?)\n---\n?/s);
  if (!m) return { fm: {}, body: txt };
  const fm = Object.fromEntries(
    [...m[1].matchAll(/^([a-z_]+):\s*(.+)$/gim)]
      .map(x => [x[1], x[2].trim().replace(/^["']|["']$/g, '')]),
  );
  return { fm, body: txt.slice(m[0].length) };
};

/** First prose sentence, skipping headings, code, tables, quotes and lists. */
const firstSentence = body => {
  const t = body
    .replace(/^#.*$/gm, '')
    .replace(/<!--.*?-->/gs, '')
    .replace(/```.*?```/gs, '')
    .replace(/^import .*$/gm, '');
  for (const para of t.split('\n\n').map(s => s.trim()).filter(Boolean)) {
    if (/^([|>:*\-]|\d+[.)]|!\[|<)/.test(para)) continue;
    const s = para
      .replace(/\n/g, ' ')
      .split(/(?<=[.!?])\s/)[0]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*`]/g, '')
      .trim();
    if (s.length > 20) return s;
  }
  return '';
};

const labelFor = dir => {
  const cat = path.join(dir, '_category_.json');
  if (fs.existsSync(cat)) {
    try { return JSON.parse(fs.readFileSync(cat, 'utf8')).label; } catch {}
  }
  const name = path.basename(dir);
  const index = path.join(dir, `${name}.md`);
  if (fs.existsSync(index)) {
    const { body } = splitFrontmatter(read(index));
    const h1 = body.match(/^#\s+(.+)$/m);
    if (h1) return h1[1].trim();
  }
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
};

const visible = e => !e.name.startsWith('.');

const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).filter(visible).flatMap(e => {
  const p = path.join(dir, e.name);
  return e.isDirectory() ? walk(p) : e.name.endsWith('.md') ? [p] : [];
});

const pages = walk(DOCS).map(abs => {
  const rel = path.relative(DOCS, abs);
  const parts = rel.replace(/\.md$/, '').split(path.sep);
  const { fm, body } = splitFrontmatter(read(abs));
  const leaf = parts[parts.length - 1];
  const isIndex = parts.length > 1 && leaf === parts[parts.length - 2];
  const route = rel === 'intro.md'
    ? '/'
    : isIndex ? `/${parts.slice(0, -1).join('/')}/` : `/${parts.join('/')}`;
  return {
    rel,
    dir: path.dirname(abs),
    depth: parts.length,
    isIndex,
    route,
    title: (body.match(/^#\s+(.+)$/m) ?? [, fm.sidebar_label ?? leaf])[1].trim(),
    description: fm.description ?? firstSentence(body),
    position: Number(fm.sidebar_position ?? 99),
  };
});

const line = p => `- [${p.title}](${SITE}${p.route})${p.description ? `: ${p.description}` : ''}`;
const byPosition = (a, b) => (b.isIndex - a.isIndex) || a.position - b.position || a.rel.localeCompare(b.rel);

/** Pages that live directly in a directory, index first. */
const directChildren = dir => pages.filter(p => p.dir === dir).sort(byPosition);

const hasPages = dir => pages.some(p => p.dir === dir || p.dir.startsWith(dir + path.sep));

const subdirs = dir => fs.readdirSync(dir, { withFileTypes: true })
  .filter(e => e.isDirectory() && visible(e))
  .map(e => path.join(dir, e.name))
  .filter(hasPages)
  .sort((a, b) => {
    const ai = directChildren(a).find(p => p.isIndex)?.position ?? 99;
    const bi = directChildren(b).find(p => p.isIndex)?.position ?? 99;
    return ai - bi || a.localeCompare(b);
  });

const out = [read(path.join(ROOT, 'scripts/llms-header.md')).trim(), ''];

// Root-level pages (intro) come first.
const rootPages = pages.filter(p => p.dir === DOCS).sort(byPosition);
if (rootPages.length) out.push('## Start here', '', ...rootPages.map(line), '');

for (const section of subdirs(DOCS)) {
  out.push(`## ${labelFor(section)}`, '', ...directChildren(section).map(line), '');
  for (const sub of subdirs(section)) {
    out.push(`### ${labelFor(sub)}`, '', ...directChildren(sub).map(line), '');
    for (const deep of subdirs(sub)) {
      out.push(`#### ${labelFor(deep)}`, '', ...directChildren(deep).map(line), '');
    }
  }
}

fs.writeFileSync(path.join(ROOT, 'static/llms.txt'), out.join('\n').replace(/\n{3,}/g, '\n\n'));

const missing = pages.filter(p => !p.description).map(p => p.rel);
console.log(`llms.txt: ${pages.length} pages`);
if (missing.length) console.log(`  no description derivable: ${missing.join(', ')}`);
