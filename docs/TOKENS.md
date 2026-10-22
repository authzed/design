# @authzed/tokens (plan)

## Why

Sandworm's colors and type live in three places today: `sandworm/kit/colors_and_type.css`
(generated from DESIGN.md v0.1, hex), `sandworm/app/globals.css` (HSL triplets for shadcn), and two
Tailwind configs (`tailwind.config.js` and `.ts`). authzed/web keeps its own copy of all of it. Each
copy drifts.

## What ships

```
packages/tokens/
├── src/tokens.json        # the one source: color families x stops, semantic roles, type scale, spacing, radii
├── dist/tokens.css        # :root custom properties (hex) + [data-theme=dark] overrides
├── dist/tokens.hsl.css    # the HSL-triplet form shadcn components expect
├── dist/tailwind-preset.js
└── dist/tokens.json       # resolved values for tools (OG, video, Figma plugins, agents)
```

- Build: a small script (or Style Dictionary) turns `src/tokens.json` into the dist files.
- Sandworm imports `@authzed/tokens` instead of its kit CSS and globals; its color and typography
  pages render from the package, so the docs show exactly what ships.
- Type tokens reference `@authzed/fonts` (`--font-headline`) rather than naming files.

## Steps

1. Diff `kit/colors_and_type.css`, `globals.css` and both Tailwind configs; settle one canonical
   value per token (DESIGN.md v0.2 wins where they disagree; list every disagreement in the PR).
2. Write `src/tokens.json` + the build script; snapshot-test the generated CSS against today's kit
   CSS so nothing shifts by accident.
3. Switch Sandworm to the package; delete the duplicate Tailwind config.
4. Publish; then authzed/web swaps its copy for the package (separate PR there).

Estimate: about a day for 1-3.
