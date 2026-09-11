---
name: Sandworm — Logo & Brand Marks
description: Logo/wordmark usage, fixed mark colors, clear space, and minimum sizes for AuthZed brand marks.
part-of: Sandworm
---

> **Primitive tokens** (`{colors.*}`, `{typography.*}`, `{spacing.*}`, `{motion.*}`, `{rounded.*}`, `{elevation.*}`) are defined in the hub at [`../DESIGN.md`](../DESIGN.md). Load the hub alongside this spoke.

← Back to [Sandworm DESIGN.md](../DESIGN.md)

## Logo & Brand Mark tokens

```yaml
# Logo & brand marks — fixed assets, fixed colors, strict usage
# The mark is the load-bearing brand artifact — drift here is the most expensive kind.
# NAMING — read this before reaching for a file (clarified 2026-09-11):
#   "Wordmark" means the FULL LOCKUP (logomark + type), not the type on its own.
#   Every asset needs a -Dark or -Light suffix; the bare name does not exist on disk.
#   "-Dark" = FOR DARK SURFACES (light type, #F1F0F2). "-Light" = for light surfaces.
#   Assets live at public/ and public/Stacked/. Paths below are verified 2026-09-11.
logo:
  assets:
    # Every asset is -Dark (for DARK surfaces, light type) or -Light (for LIGHT surfaces).
    # There is no un-suffixed variant except the colour logomark. Verified 2026-09-11.
    wordmark-color-dark:    "public/AuthZed-Wordmark-Color-Dark.svg"      # full lockup, light type
    wordmark-color-light:   "public/AuthZed-Wordmark-Color-Light.svg"
    wordmark-slate-dark:    "public/AuthZed-Wordmark-Slate-Dark.svg"
    wordmark-slate-light:   "public/AuthZed-Wordmark-Slate-Light.svg"
    logomark-circle-color:  "public/AuthZed-Logomark-Circle-Color.svg"    # NOTE: no -Dark/-Light — works on both
    logomark-circle-slate-dark:  "public/AuthZed-Logomark-Circle-Slate-Dark.svg"
    logomark-circle-slate-light: "public/AuthZed-Logomark-Circle-Slate-Light.svg"
    stacked-color-dark:     "public/Stacked/AuthZed-Wordmark-Stacked-Color-Dark.svg"
    stacked-color-light:    "public/Stacked/AuthZed-Wordmark-Stacked-Color-Light.svg"
    stacked-slate-dark:     "public/Stacked/AuthZed-Wordmark-Stacked-Slate-Dark.svg"
    stacked-slate-light:    "public/Stacked/AuthZed-Wordmark-Stacked-Slate-Light.svg"
    # SpiceDB siblings — same four-way matrix, plus Stacked/
    spicedb-wordmark-color-dark:  "public/SpiceDB-Wordmark-Color-Dark.svg"
    spicedb-wordmark-color-light: "public/SpiceDB-Wordmark-Color-Light.svg"
    spicedb-wordmark-slate-dark:  "public/SpiceDB-Wordmark-Slate-Dark.svg"
    spicedb-wordmark-slate-light: "public/SpiceDB-Wordmark-Slate-Light.svg"

  # Logomark gradient — uses the canonical Sandworm palette tokens.
  # The shipped SVGs currently carry legacy near-match hexes that predate the palette
  # (#A43189 / #F0546C / #FFB371); these are un-reconciled drift, NOT an intentional
  # separate brand palette, and should be re-derived to the tokens below.
  logomark-colors:
    magenta: "{colors.magenta.600}"   # #a5318a  (legacy SVG: #A43189 — reconcile)
    coral: "{colors.red.500}"         # #f0566d  (legacy SVG: #F0546C — reconcile)
    sand: "{colors.sand.300}"         # #ffb370  (legacy SVG: #FFB371 — effectively identical)

  clearSpace:
    rule: "Minimum padding around the wordmark = height of the wordmark's 'A' letterform"
    rationale: "Ensures the mark never collides with adjacent elements; reads as deliberately placed, not crammed in."

  minimumSize:
    screen-wordmark: 80px      # below this, switch to logomark
    screen-logomark: 24px
    print-wordmark: 0.75in
    print-logomark: 0.25in
    favicon: 16px              # logomark-circle-color, minimum browser favicon

  usage:
    color-wordmark: "stone-025 OR stone-950 surfaces only"
    slate-wordmark: "busy / photographic backgrounds (single-color reads cleaner against texture)"
    color-logomark: "default standalone mark — favicons, avatars, condensed contexts"
    stacked: "square layouts (social profile images, ads requiring squared composition)"

  donts:
    - "Recolor the logomark to non-brand colors — its gradient follows the Sandworm magenta-600 / red-500 / sand-300 tokens"
    - "Apply drop shadows, glows, outlines, or any effect to the logo"
    - "Stretch, skew, rotate, or distort the wordmark"
    - "Place color wordmark on a colored background — it fights brand colors. Use slate variant on color."
    - "Recreate the logo by typing 'AuthZed' in any font — always use the SVG/PNG asset"
    - "Use the color wordmark smaller than 80px wide — switch to the logomark"
    - "Combine wordmark + logomark in close proximity (use the stacked asset instead)"
```

## Logo & Brand Marks

The logo is the most load-bearing single artifact in the brand. Drift here costs more than drift anywhere else — recoloring a button gradient is recoverable; recoloring a logomark in customer-facing material is not.

**Canonical assets** live at `projects/web/public/assets/brand/` and `projects/design/sandworm/public/` (synchronized). Five variants matter:

1. **Wordmark — Color** — default for color-permitting surfaces (white or dark backgrounds)
2. **Wordmark — Slate** — single-color version for busy / photographic / colored backgrounds
3. **Logomark (circle) — Color** — standalone mark; default favicon, avatar, condensed contexts
4. **Logomark (circle) — Slate** — single-color logomark for the same constraints as slate wordmark
5. **Stacked** — wordmark above logomark for squared social profile / ad layouts

The SpiceDB sibling has its own Color and Dark wordmark variants under the same path.

### Logomark colors = canonical Sandworm palette

The logomark gradient uses the **canonical Sandworm palette tokens** — magenta-600, red-500, sand-300:

- Magenta: `magenta-600` (`#a5318a`)
- Coral: `red-500` (`#f0566d`)
- Sand: `sand-300` (`#ffb370`)

The shipped SVG assets still carry legacy near-match hexes (`#A43189` / `#F0546C` / `#FFB371`) that predate the current palette. These are **not** an intentional separate brand palette — they're un-reconciled drift and should be re-derived to the tokens above. **Use the Sandworm tokens.**

> TODO[brand]: reconcile the logomark SVG gradient stops to `magenta-600` / `red-500` / `sand-300` (currently `#A43189` / `#F0546C` / `#FFB371`).

### Clear space and minimum sizes

- **Clear space** = the height of the wordmark's "A" letterform on all sides of the wordmark. Same rule for the logomark, using its own height as the reference.
- **Wordmark minimum**: 80px on screen, 0.75 inch in print. Smaller than that, switch to the logomark.
- **Logomark minimum**: 24px on screen, 0.25 inch in print. Below 24px, use the simplified favicon variant.

### Do's and don'ts

- ✅ Color wordmark on stone-025 OR stone-950 (the two canonical surfaces)
- ✅ Slate wordmark on busy / photographic / colored backgrounds where color would compete
- ✅ Stacked wordmark for squared compositions (social profiles, ads)
- ❌ Never recolor the logomark off-brand — it uses the Sandworm magenta-600 / red-500 / sand-300 gradient
- ❌ Never apply effects (shadow, glow, outline) — the mark stands on its own
- ❌ Never stretch, skew, rotate, or distort the wordmark
- ❌ Never place the color wordmark on a colored background — use slate instead
- ❌ Never recreate the logo by typing "AuthZed" in any font — always use the SVG asset
- ❌ Never use color wordmark below 80px — switch to logomark
- ❌ Don't combine wordmark + logomark in close proximity — use the stacked asset instead
