#!/usr/bin/env node
// Flags the headline face used below 32px. Usage: node lint-display.mjs <dir> [...]
// Looks at className / class strings that contain `font-headline` and a size under the floor.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const FLOOR = 32;
const TW = { 'text-xs': 12, 'text-sm': 14, 'text-base': 16, 'text-lg': 18, 'text-xl': 20, 'text-2xl': 24, 'text-3xl': 30 };
const EXT = new Set(['.tsx', '.jsx', '.ts', '.js', '.html', '.mdx']);
const SKIP = new Set(['node_modules', '.next', 'dist', '.git']);

function px(token) {
  // text-[28px], text-[1.5rem], with optional breakpoint prefix (min-[512px]:text-3xl)
  const t = token.split(':').pop();
  if (t in TW) return TW[t];
  const m = t.match(/^text-\[(\d*\.?\d+)(px|rem)\]$/);
  if (m) return m[2] === 'rem' ? parseFloat(m[1]) * 16 : parseFloat(m[1]);
  return null;
}

function* files(p) {
  const s = statSync(p);
  if (s.isFile()) { if (EXT.has(extname(p))) yield p; return; }
  for (const e of readdirSync(p)) if (!SKIP.has(e)) yield* files(join(p, e));
}

let hits = 0;
for (const root of process.argv.slice(2).length ? process.argv.slice(2) : ['.']) {
  for (const f of files(root)) {
    readFileSync(f, 'utf8').split('\n').forEach((line, i) => {
      for (const m of line.matchAll(/class(?:Name)?=["'`{]([^"'`}]*)/g)) {
        const toks = m[1].split(/\s+/);
        if (!toks.includes('font-headline')) continue;
        // Only unprefixed sizes set the smallest rendered size.
        const sizes = toks.filter(t => !t.includes(':')).map(px).filter(v => v !== null);
        const small = sizes.filter(v => v < FLOOR);
        if (small.length) {
          hits++;
          console.log(`${f}:${i + 1}: font-headline at ${Math.min(...small)}px (floor ${FLOOR}px). Use Inter here.`);
        }
      }
    });
  }
}
process.exit(hits ? 1 : 0);
