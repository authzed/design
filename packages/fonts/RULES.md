# AuthZed display type: rules for agents

Draft for `authzed/design` DESIGN.md. One face: **AuthZed Display**, variable on width (58.5-165%, `font-stretch`) and weight (300-600).

## Which face

- `--font-headline` is the only name you use. Never write `'AuthZed Display'` in a component.
- Load `css/display.css` (or the embedded variant) once per surface.
- The stack always ends in Inter, so a failed load falls back to the body face, not to Arial.

## When to use it

- Headlines only, **32px and up**: hero, section heads, 120-200px display lines, OG and social titles, posters.
- Everything else is Inter: body, nav, buttons, labels, tables, captions, eyebrows under 32px. Code stays JetBrains Mono.
- Two weights, used as a pair at the same size: **300 sets up, 600 lands.** The 600 clause owns its own line (explicit `<br>`). Weights in between (400, 500) exist for motion and fine-tuning, not as a third voice.
- Motion: the 600 clause may sweep 300 → 600 on entry (`font-variation-settings` or `font-weight` transition). Once per page, never on loop.
- Width: Normal (100%) by default. Condensed (80.5%) is for long headlines that must fit (OG titles, narrow phone heroes): step width down before stepping size down. Compressed (58.5%) is for all-caps hero lines only (tall, stacked); its lowercase is not for use. Wide (117%) and Expanded (165%) are for short lines only (a word or two). Never mix widths inside one headline. Every join carries the notch (a node + neck); at Compressed and Condensed some joins have none, by design.
- Tracking: none by default. `-0.025em` is the ceiling, on 300 only. Spacing is already tightened in the font.
- Named style **Broad Book**: width 130%, weight 370, tracking `+0.04em`, leading 0.9. The one exception to the tracking rule, for closer lines (the v2 homepage closer). Use the class `.az-display-broad-book` or the `--az-broad-book-*` custom properties; the font carries it as a named instance (`AuthZed Display Broad Book`) for Figma and Keynote.
- Gradient clip text (sand-300 → red-400 → violet-600) goes on the 600 clause only.

## How to load it, by surface

| Surface | Use |
|---|---|
| Website (Next.js) | `next/font/local` on `fonts/AuthZedDisplay[wdth,wght].woff2`, `weight: '300 600'`, `declarations: [{prop: 'font-stretch', value: '58.5% 165%'}]`, `variable: '--font-headline'`; Tailwind `fontFamily.headline: ['var(--font-headline)', 'Inter', ...]`, then `font-headline` |
| OG images (Satori / `next/og`) | The **static** TTFs `AuthZedDisplay-Light.ttf` / `-SemiBold.ttf` (or `-CompressedLight` ... `-ExpandedSemiBold`) (Satori reads neither woff2 nor variable fonts), `weight: 300` and `600` |
| Claude artifacts, Claude Design, offline HTML | `css/display-embedded.css` inlined in a `<style>` (only Google Fonts may be linked there) |
| Video (ffmpeg/libass, Puppeteer bumpers) | Install the static TTFs; libass family names are `AuthZed Display Light` / `AuthZed Display SemiBold` (`AuthZed Display Condensed Light` etc. for other widths). Puppeteer pages can use the variable woff2 |
| Figma, Keynote | Install the variable TTF (Figma: org font upload); the statics if a tool shows no weight axis |
| Google Slides | Not possible (Google Fonts only). Decks stay Inter. |

## Licensing

- AuthZed Display is a modified Inter: SIL OFL 1.1, `LICENSE.txt` ships with it. Never call it Inter ("Inter" is a Reserved Font Name). It can be hosted publicly (CDN, npm), and anyone may reuse it under OFL.

## Check

`node lint-display.mjs <dir>` flags `font-headline` set below 32px (text-xs ... text-3xl, or an explicit size under 32px / 2rem) in .tsx/.jsx/.html files.
