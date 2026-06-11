---
name: Sandworm — Palette
description: The full Sandworm color table — 7 families × 15 stops, HSL-derived hex. The L3 reference behind the hub's semantic tokens; the kit generator merges this file's colors with the hub frontmatter.
part-of: Sandworm
colors:
  # Full palette — 7 families × 15 stops, HSL-derived hex.
  # Demoted from the hub 2026-06-10 (Track B slim): the hub keeps semantic tokens + token-name refs;
  # this spoke + the generated kit carry the hexes. Source of truth for values:
  # projects/web/src/styles/sandworm-colors.ts (HSL strings; these hexes are the rendered form).
  stone:
    "025": "#f8f7f8"
    "050": "#e9e7e9"
    "100": "#dedddf"
    "150": "#d2cfd3"
    "200": "#c7c4ca"
    "300": "#aaa5ac"
    "400": "#8e8891"
    "500": "#79727e"
    "600": "#655d69"
    "700": "#514856"
    "800": "#3f3644"
    "850": "#2a2130"
    "900": "#1e1424"
    "950": "#170d1c"
    "975": "#0c050f"
  magenta:
    "025": "#fbf4f8"
    "050": "#f5e5ef"
    "100": "#f0dbe9"
    "150": "#e9c9de"
    "200": "#e3bad6"
    "300": "#d293bf"
    "400": "#c270ab"
    "500": "#b35199"
    "600": "#a5318a"
    "700": "#7e2a69"
    "800": "#5d224e"
    "850": "#3d1a32"
    "900": "#22111d"
    "950": "#180c15"
    "975": "#180c15"
  teal:
    "025": "#f1f8f6"
    "050": "#ebf5f2"
    "100": "#e8f2f1"
    "150": "#dbebe9"
    "200": "#cee3e1"
    "300": "#a7cdca"
    "400": "#72b1ad"
    "500": "#549693"
    "600": "#4a7d7b"
    "700": "#3f6967"
    "800": "#325250"
    "850": "#283e3d"
    "900": "#1b2726"
    "950": "#0c1311"
    "975": "#0c1311"
  sand:
    "025": "#fef4ec"
    "050": "#fef0e1"
    "100": "#ffeedb"
    "150": "#ffe2c2"
    "200": "#ffd8ad"
    "300": "#ffb370"
    "400": "#de9663"
    "500": "#bd7c56"
    "600": "#a0674b"
    "700": "#855642"
    "800": "#684336"
    "850": "#50332b"
    "900": "#34231d"
    "950": "#1e1510"
    "975": "#18100c"
  red:
    "025": "#fff5f5"
    "050": "#fff0f0"
    "100": "#ffebec"
    "150": "#ffe0e1"
    "200": "#ffd6d7"
    "300": "#ffb3b6"
    "400": "#f9808a"
    "500": "#f0566d"
    "600": "#c94559"
    "700": "#a53b4a"
    "800": "#81313c"
    "850": "#5e262c"
    "900": "#3b1b1e"
    "950": "#1b0e0f"
    "975": "#1b0e0f"
  violet:
    "025": "#f8f6fe"
    "050": "#ede8fd"
    "100": "#e2d9fc"
    "150": "#d8ccfa"
    "200": "#cebef8"
    "300": "#ad96f3"
    "400": "#9278ed"
    "500": "#7a5ce6"
    "600": "#6242e0"
    "700": "#502fb1"
    "800": "#432583"
    "850": "#2f1b50"
    "900": "#1c122b"
    "950": "#150c1d"
    "975": "#150c1d"
  blue:
    "025": "#f6fcfe"
    "050": "#e8f8fd"
    "100": "#d9f3fc"
    "150": "#cceffa"
    "200": "#beeaf8"
    "300": "#96dcf3"
    "400": "#78d0ed"
    "500": "#5cc3e6"
    "600": "#42b9e0"
    "700": "#2f91b1"
    "800": "#256c83"
    "850": "#1b4350"
    "900": "#12252b"
    "950": "#0c181d"
    "975": "#0c181d"
---

> Part of [Sandworm DESIGN.md](../DESIGN.md). The hub holds the semantic tokens and all usage rules —
> this spoke is the raw value table. Machine-readable forms: `kit/colors_and_type.css` (CSS vars),
> `kit/tailwind.tokens.json`, `kit/tokens.dtcg.json`.

← Back to [Sandworm DESIGN.md](../DESIGN.md)

## Ramp anatomy

Seven families, each on a 15-stop ramp (`025` → `975`), derived in HSL so dark-mode and contrast math
stay clean. The live source is `projects/web/src/styles/sandworm-colors.ts` (HSL strings); the hexes
here are the rendered form. The stop ladder: `025 050 100 150 200 300 400 500 600 700 800 850 900 950 975`
— note there is no `250`, and `850` exists where Tailwind has none.

**Family roles** (usage rules live in the hub):

- **stone** — the neutral spine; purple-tinted, NOT a gray. Surfaces, borders, ink.
- **magenta** — brand primary (`magenta-600`). Emphasis, wordmark, hover borders.
- **sand** — the warmth (`sand-300`). Dark-mode links, gradient origin.
- **teal** — cool tertiary (`teal-500`). Success, secondary CTAs, "allowed" in diagrams.
- **red** — alerts/denials (`red-500`); `red-400` is the warm-gradient midpoint.
- **violet** — highlight/creative (`violet-600` is the warm-gradient end-stop, settled 2026-06-10).
- **blue** — info only; the most sparingly used family.

## The 950/975 duplicates (by design)

In five families (magenta, teal, red, violet, blue) the `950` and `975` stops are **identical in the
source** — `sandworm-colors.ts` ships the same HSL/hex for both. Only **stone** and **sand** deepen
further at `975`. Don't "fix" the duplicates; they're faithful transcription (verified 2026-06-10
against the source).

## Generator note

`generate-kit.py` merges this file's `colors:` frontmatter with the hub's (hub semantic tokens +
gradients reference `{colors.family.stop}` names that resolve against this table). Regen recipe in
`kit/README.md`. If you add or change a stop here, regenerate the kit in the same commit.
