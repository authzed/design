#!/usr/bin/env node
// Fails if anything tokens.json or the CSS points at is missing, so a release never ships a
// stylesheet that references a font that isn't in the package.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(join(root, 'tokens.json'), 'utf8'));
const paths = [];
const walk = (v) => {
  if (typeof v === 'string' && v.startsWith('fonts/')) paths.push(v);
  else if (v && typeof v === 'object') Object.values(v).forEach(walk);
};
walk(tokens.files);
const css = readFileSync(join(root, 'css', 'display.css'), 'utf8');
for (const m of css.matchAll(/url\('\.\.\/(fonts\/[^']+)'\)/g)) paths.push(m[1]);
if (!readFileSync(join(root, 'css', 'display-embedded.css'), 'utf8').includes('data:font/woff2;base64,')) {
  console.error('css/display-embedded.css has no embedded woff2');
  process.exit(1);
}
const missing = [...new Set(paths)].filter((p) => !existsSync(join(root, p)));
if (missing.length) {
  console.error('missing font files:\n  ' + missing.join('\n  '));
  process.exit(1);
}
console.log(`@authzed/fonts: ${new Set(paths).size} font files present, embedded CSS ok`);
