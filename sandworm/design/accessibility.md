---
name: Sandworm — Accessibility
description: Contrast ratios, focus/states, and vendor-prefix gotchas for the Sandworm design system.
part-of: Sandworm
---

> **Primitive tokens** (`{colors.*}`, `{typography.*}`, `{spacing.*}`, `{motion.*}`, `{rounded.*}`, `{elevation.*}`) are defined in the hub at [`../DESIGN.md`](../DESIGN.md). Load the hub alongside this spoke.

← Back to [Sandworm DESIGN.md](../DESIGN.md)

## Accessibility tokens

```yaml
# Accessibility — contrast ratios for key semantic pairs (WCAG 2.1)
# COMPUTED 2026-06-10 via relative-luminance math — replaces an earlier table whose values were
# estimated, not computed. Two verdicts flipped in the correction: magenta-600 and stone-500 on
# dark BOTH fail AA at body size (the old table claimed 4.5/4.6 AA; actual 3.1/4.1).
accessibility:
  contrast-ratios:
    # Dark mode foreground/background pairs
    dark-foreground-on-surface:
      pair: "{colors.stone.025} on {colors.stone.975}"
      ratio: 18.8
      wcag: AAA
    dark-body-on-surface:
      pair: "{colors.stone.300} on {colors.stone.950}"
      ratio: 7.8
      wcag: AAA
    dark-faint-on-surface:
      pair: "{colors.stone.500} on {colors.stone.950}"
      ratio: 4.1
      wcag: AA-large                                     # FAILS AA at body size — large text (18pt+/14pt bold) or non-essential metadata only
    dark-link-on-surface:
      pair: "{colors.sand.300} on {colors.stone.950}"
      ratio: 10.7
      wcag: AAA
    dark-magenta-emphasis:
      pair: "{colors.magenta.600} on {colors.stone.950}"
      ratio: 3.1
      wcag: AA-large                                     # FAILS AA at body size — see "Brand emphasis & contrast" below
    dark-magenta-accessible:
      pair: "{colors.magenta.400} on {colors.stone.950}"
      ratio: 5.6
      wcag: AA                                           # the accessible magenta for small text on dark
    dark-gradient-tail:
      pair: "{colors.violet.600} on {colors.stone.950}"
      ratio: 3.0
      wcag: AA-large                                     # warm-hero's violet tail — gradient text-fill carries the same body-size limit
    # Light mode pairs
    light-foreground-on-surface:
      pair: "{colors.stone.900} on {colors.stone.025}"
      ratio: 16.6
      wcag: AAA
    light-body-on-surface:
      pair: "{colors.stone.700} on {colors.stone.025}"
      ratio: 8.2
      wcag: AAA
    light-magenta-emphasis:
      pair: "{colors.magenta.600} on {colors.stone.025}"
      ratio: 5.8
      wcag: AA                                           # comfortably AA on light — the caveat is dark-mode-only
    light-link-on-surface:
      pair: "{colors.sand.700} on {colors.stone.025}"
      ratio: 5.8
      wcag: AA
  notes: "Computed 2026-06-10 (WCAG 2.1 relative luminance). Magenta-600 emphasis is fine on LIGHT (5.8). On DARK it is 3.1 — large-text territory only. The accessible small-text magenta on dark is magenta-400 (5.6). Sand-300 links on dark are comfortable AAA; sand-700 on light is AA at body weights. Stone-500 'faint' text on dark (4.1) is for large or non-essential metadata, never body copy."

# Vendor-prefix gotchas — Safari/iOS still requires -webkit- prefixes for some properties.
# Documenting so agents don't have to guess.
vendor-prefixes:
  background-clip-text:
    standard: "background-clip: text"
    safari: "-webkit-background-clip: text"
    safariTextFill: "-webkit-text-fill-color: transparent"
    notes: "REQUIRED for gradient text fills (the hero brand-mark pattern). Without -webkit-background-clip, Safari/iOS shows the gradient as a background instead of text fill. Always include both standard + Safari forms."

  backdrop-filter:
    standard: "backdrop-filter: blur(4px)"
    safari: "-webkit-backdrop-filter: blur(4px)"
    notes: "Card-dark / modal surfaces. Safari requires the -webkit- prefix for iOS support."
```

## Brand emphasis & contrast (the dark-mode caveat)

The signature emphasis devices — `font-semibold text-magenta-600` spans and the warm-hero gradient text-fill — are **display patterns, not body-text patterns, on dark surfaces**:

- **magenta-600 on stone-950 = 3.1:1** — passes only the WCAG large-text bar (≥24px regular / ≥18.66px bold). A 16px semibold emphasis span does NOT qualify as large text.
- **Gradient text-fill profile on stone-950**: sand-300 end 10.7 → red-400 mid 7.6 → **violet-600 tail 3.0**. The tail is the constraint — gradient emphasis carries the same large-text scoping as solid magenta.

Rules of thumb:

- ✅ Hero/headline emphasis (h1/h2, ≥24px) — magenta-600 and gradient text-fills are fine on dark
- ✅ Body-size emphasis on LIGHT surfaces — magenta-600 is 5.8:1, comfortably AA
- ✅ Body-size magenta accent on DARK — use `magenta-400` (5.6:1), the accessible small-text magenta
- ❌ Don't carry essential meaning in body-size magenta-600 or gradient text on dark — at those sizes it's decorative emphasis; the surrounding font-light copy must carry the content

## Accessibility — States & Focus

Every interactive element needs three states beyond the default + hover: **focus-visible**, **disabled**, and (where applicable) **active/pressed**. Sandworm tokenizes the shared focus + disabled behavior in `components.button-states-shared` and applies it to all five button variants.

**Focus ring** — visible on keyboard nav, invisible on click (the `:focus-visible` selector handles this):
- Ring color: `magenta-600` at 2px
- Ring offset: 2px
- Offset color: `stone-950` on dark, `stone-025` on light (matches surface so the ring "floats")

**Disabled state**:
- `opacity: 0.5`
- `pointer-events: none`

**Hover** is per-variant (gradient slides, scale 1.02, etc. — see each component's `*-hover` keys).

**Don't substitute** generic browser focus rings (the blue default outline) for the magenta-600 ring — that's how off-brand accessibility creeps into the system. The magenta-600 ring works on both modes because magenta-600 is a brand spine color, not a status color.

> **Keyboard accessibility is a brand requirement.** If a custom interactive element doesn't have a visible focus ring, it isn't shippable. Use `:focus-visible` (not `:focus`) so the ring only appears when needed.

## Vendor-Prefix Gotchas

Some properties need vendor prefixes for Safari/iOS support. Sandworm's relevant cases:

### Gradient text fill (`background-clip: text`)

The hero brand-mark pattern (`<em>Sandworm.</em>` with brand-gradient text fill) requires both standard AND `-webkit-` forms or Safari shows the gradient as a background block instead of clipping it to the text. Always include all three:

```css
background: linear-gradient(to right, #ffb370, #f9808a, #6242e0);
background-clip: text;
-webkit-background-clip: text;       /* Safari */
-webkit-text-fill-color: transparent; /* Safari */
color: transparent;                    /* fallback */
```

Without `-webkit-text-fill-color: transparent`, Safari may render the original text color over the clipped gradient.

### Backdrop blur (`backdrop-filter: blur(...)`)

Card-dark and modal surfaces use blur. Safari/iOS requires the `-webkit-` prefix:

```css
backdrop-filter: blur(4px);
-webkit-backdrop-filter: blur(4px);   /* Safari */
background-color: rgba(23, 13, 28, 0.9);  /* stone-950/90 fallback */
```

Always include a solid fallback background — `backdrop-filter` fails silently in browsers that don't support it.
