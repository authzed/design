# @authzed/fonts

AuthZed Display, the brand display face: a modified Inter (SIL OFL 1.1), variable on width and
weight, for headlines 32px and up. Body text stays Inter, code stays JetBrains Mono.

> **Placeholder build.** The files here are v0.3.1 (width 82-115%, weight 300-600, no join
> notches). The S5 cut with the hand-tuned join notches and the full width range (Compressed to
> Expanded) is being built in the typeface lab; `pnpm --filter @authzed/fonts sync` pulls it in
> when it lands, and the version moves to 0.4.0.

## Install

```bash
pnpm add @authzed/fonts
```

## Use

| Surface | What to load |
|---|---|
| Next.js | `next/font/local` on `@authzed/fonts/fonts/AuthZedDisplay[wdth,wght].woff2`, exposed as `--font-headline` |
| Any other site | `@authzed/fonts/display.css` (sets `--font-headline`) |
| Claude artifacts, Claude Design, offline HTML | `@authzed/fonts/display-embedded.css` inlined (font is base64 inside) |
| OG images (Satori / `next/og`) | the static TTFs in `fonts/` (Satori reads neither woff2 nor variable fonts) |
| Video (ffmpeg/libass) | install the static TTFs |
| Figma | the variable TTF (org font upload) |
| Google Slides, most email | not possible; falls back to Inter |

`tokens.json` has the stack, weights, widths and file paths for tools. `RULES.md` is the usage
guide for people and agents (when to use it, the 300 sets up / 600 lands pairing, minimum size).
`npx lint-display <dir>` flags the face used below 32px.

## Updating the font

1. Build in the typeface lab (`scratch/design-lab/authzed-typeface`, Corey's machine).
2. `pnpm --filter @authzed/fonts sync [path/to/lab/vf]` copies the variable font and statics and
   regenerates `css/display-embedded.css`.
3. Update `css/display.css`, `tokens.json` and `RULES.md` if the axis ranges or named widths changed.
4. `pnpm --filter @authzed/fonts build` (verifies every referenced file exists).
5. `pnpm changeset`, merge; the release workflow publishes to npm.

## License

SIL Open Font License 1.1 (`LICENSE.txt`). Never call it Inter: "Inter" is a Reserved Font Name.
