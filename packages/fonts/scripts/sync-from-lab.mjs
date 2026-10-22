#!/usr/bin/env node
// Pull a new build of AuthZed Display from the typeface lab into this package.
//
//   pnpm --filter @authzed/fonts sync [labVfDir]
//
// labVfDir defaults to $AUTHZED_FONT_LAB or the lab's final-v2/build/vf. It must hold
//   AuthZedDisplay[wdth,wght].ttf + .woff2   the variable font
//   statics/AuthZedDisplay-*.ttf             static cuts (Satori, libass), named inside the font
// Copies them into fonts/, rewrites the woff2 into css/display-embedded.css, and leaves
// css/display.css, tokens.json and RULES.md for a human to update (axis ranges, named widths).
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lab =
  process.argv[2] ||
  process.env.AUTHZED_FONT_LAB ||
  join(homedir(), 'claudes-fort/scratch/design-lab/authzed-typeface/final-v2/build/vf');
const vf = ['AuthZedDisplay[wdth,wght].ttf', 'AuthZedDisplay[wdth,wght].woff2'];
for (const f of vf) {
  if (!existsSync(join(lab, f))) {
    console.error(`not found: ${join(lab, f)}`);
    process.exit(1);
  }
}
mkdirSync(join(root, 'fonts'), { recursive: true });
for (const f of vf) copyFileSync(join(lab, f), join(root, 'fonts', f));
const statics = existsSync(join(lab, 'statics'))
  ? readdirSync(join(lab, 'statics')).filter((f) => /^AuthZedDisplay-.*\.ttf$/.test(f))
  : [];
for (const f of statics) copyFileSync(join(lab, 'statics', f), join(root, 'fonts', f));

const css = readFileSync(join(root, 'css', 'display.css'), 'utf8');
const b64 = readFileSync(join(root, 'fonts', vf[1])).toString('base64');
const embedded = css.replace(/url\('\.\.\/fonts\/[^']+\.woff2'\)/, `url(data:font/woff2;base64,${b64})`);
writeFileSync(join(root, 'css', 'display-embedded.css'), embedded);
console.log(`synced ${vf.length} variable + ${statics.length} static files from ${lab}`);
console.log('now update css/display.css + tokens.json + RULES.md if the axis ranges or widths changed, then add a changeset');
