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
# Sandworm aims for AAA where possible; AA minimum for any text > 18pt.
accessibility:
  contrast-ratios:
    # Dark mode foreground/background pairs
    dark-foreground-on-surface:
      pair: "{colors.stone.025} on {colors.stone.975}"
      ratio: 17.2
      wcag: AAA
    dark-body-on-surface:
      pair: "{colors.stone.300} on {colors.stone.950}"
      ratio: 9.1
      wcag: AAA
    dark-faint-on-surface:
      pair: "{colors.stone.500} on {colors.stone.950}"
      ratio: 4.6
      wcag: AA
    dark-link-on-surface:
      pair: "{colors.sand.300} on {colors.stone.950}"
      ratio: 10.2
      wcag: AAA
    dark-magenta-emphasis:
      pair: "{colors.magenta.600} on {colors.stone.950}"
      ratio: 4.5
      wcag: AA                                           # exactly at AA threshold — be careful at small sizes
    # Light mode pairs
    light-foreground-on-surface:
      pair: "{colors.stone.900} on {colors.stone.025}"
      ratio: 15.8
      wcag: AAA
    light-body-on-surface:
      pair: "{colors.stone.700} on {colors.stone.025}"
      ratio: 8.5
      wcag: AAA
    light-magenta-emphasis:
      pair: "{colors.magenta.600} on {colors.stone.025}"
      ratio: 4.8
      wcag: AA                                           # at threshold — pair with semibold or 18pt+
    light-link-on-surface:
      pair: "{colors.sand.700} on {colors.stone.025}"
      ratio: 5.2
      wcag: AA
  notes: "Ratios approximate (computed from hex values). Magenta-600 on either surface sits right at the AA threshold — use it on font-semibold or larger text only. The sand-300 link color on dark is comfortable AAA; sand-700 on light is AA at body weights."

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
background: linear-gradient(to right, #ffb370, #f9808a, #7a5ce6);
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
