---
name: Sandworm — Components
description: Full component token specs + per-component detail for the Sandworm design system.
part-of: Sandworm
---

> **Primitive tokens** (`{colors.*}`, `{typography.*}`, `{spacing.*}`, `{motion.*}`, `{rounded.*}`, `{elevation.*}`) are defined in the hub at [`../DESIGN.md`](../DESIGN.md). Load the hub alongside this spoke.

← Back to [Sandworm DESIGN.md](../DESIGN.md)

## Component tokens

```yaml
components:
  # All button variants share these state tokens (focus + disabled) — declared once, referenced via state-* keys
  button-states-shared:
    focusVisible:
      outline: none
      ring:
        color: "{colors.magenta.600}"
        width: 2px
        offsetWidth: 2px
        offsetColor-dark: "{colors.stone.950}"
        offsetColor-light: "{colors.stone.025}"
    disabled:
      pointerEvents: none
      opacity: 0.5

  # Primary brand button — pill, mono uppercase, gradient BORDER w/ dark fill (default)
  # Source: projects/web/src/components/ui/GradientButton.tsx
  button-primary:
    shape: pill                              # rounded-full (9999px)
    variant: outline                         # gradient border, stone-950 inner
    background: linear-gradient(to right, "{colors.sand.300}", "{colors.red.400}", "{colors.violet.600}")
    backgroundSize: "200% 200%"
    backgroundPosition: left center
    backgroundPosition-hover: right center
    transform-hover: scale(1.02)
    innerBackgroundColor: "{colors.stone.950}"
    textColor: "{colors.stone.200}"
    textColor-hover: "{colors.stone.025}"
    padding: 10px 24px
    borderWidth: 2px                         # outer wrapper p-[2px] creates the gradient border
    typography:
      fontFamily: "{typography.fontFamily.mono}"
      fontSize: 0.75rem
      fontWeight: 500
      letterSpacing: 0.1em
      textTransform: uppercase
    states: "{components.button-states-shared}"   # all buttons share focus + disabled behavior
    notes: "GradientButton outline variant. Gradient slides L→R on hover + 1.02 scale. Filled variant uses solid gradient fill w/ stone-950 text."

  # Primary filled — solid gradient fill, dark text
  button-primary-filled:
    shape: pill
    background: linear-gradient(to right, "{colors.sand.300}", "{colors.red.400}", "{colors.violet.600}")
    backgroundSize: "200% 200%"
    textColor: "{colors.stone.950}"          # dark text on warm gradient
    padding: 10px 24px
    typography: "{components.button-primary.typography}"

  # Outline button — transparent w/ stone-100 border
  button-outline:
    shape: pill
    backgroundColor: transparent
    textColor: "{colors.stone.200}"
    textColor-hover: "#ffffff"
    backgroundColor-hover: rgba(255, 255, 255, 0.1)
    borderColor: "{colors.stone.100}"
    borderWidth: 1px
    padding: 10px 24px
    typography: "{components.button-primary.typography}"

  # Subtle button — transparent w/ stone-600 border (quieter than outline)
  button-subtle:
    shape: pill
    backgroundColor: transparent
    textColor: "{colors.stone.300}"
    textColor-hover: "#ffffff"
    borderColor: "{colors.stone.600}"
    borderColor-hover: "{colors.stone.500}"
    borderWidth: 1px
    padding: 10px 24px
    typography: "{components.button-primary.typography}"

  # NOTE: There is no canonical solid-magenta button in Sandworm.
  # All primary CTAs go through `button-primary` (GradientButton). The solid-magenta-bg patterns
  # visible on HubSpot form vendor buttons and the calendly inline CTA are vendor-form drift
  # — they reflect "make the vendor button look vaguely AuthZed" patches, not canonical design.
  # If a new surface needs a solid CTA, use `button-primary-filled` (warm gradient + dark text).
  # The Button.tsx `variant="primary"` definition (magenta-600 + violet-500 border) is also
  # deprecated by this spec — never used as-defined in production.

  # Hero pattern — canonical AuthZed marketing surface opening
  # Pattern: eyebrow → h1-with-emphasis-span → subtitle. Used at top of every product/use-case page.
  # Example: 'Every authorization use case.' (font-light) + 'One system.' (font-semibold + magenta-600).
  hero:
    paddingTop: "{spacing.rhythm.hero-vertical}"
    paddingBottom: "{spacing.rhythm.section-vertical-desktop}"
    eyebrow:
      typography: "{typography.label-caps}"
      color: "{colors.stone.400}"
      marginBottom: "{spacing.rhythm.eyebrow-to-title}"
    title:
      typography: "{typography.h1}"
      marginBottom: "{spacing.6}"
    titleEmphasis:                           # the "One system." span inside the h1
      fontWeight: 600
      color: "{colors.magenta.600}"
    titleEmphasisAlt:                        # alternate brand-gradient emphasis (hero brand mark)
      fontWeight: 600
      background: linear-gradient(to right, "{colors.sand.300}", "{colors.red.400}", "{colors.violet.600}")
      backgroundClip: text                   # ⚠ REQUIRES -webkit-background-clip + -webkit-text-fill-color for Safari — accessibility.md §Gradient text fill
      textColor: transparent
    subtitle:
      typography: "{typography.body}"
      color: "{colors.stone.300}"
      maxWidth: 640px
      fontSize: 1.125rem                     # subtitle is +1 step from body
    notes: "Two emphasis modes: solid magenta-600 for in-prose emphasis, brand-gradient text-fill for hero brand marks. Use gradient sparingly — once per hero, never inside body paragraphs."

  # Standard content card (dark backdrop with magenta hover)
  card-dark:
    backgroundColor: "{mode-dark.surfaceElevated}"   # references composed rgba — no separate opacity key
    borderColor: "{colors.stone.700}"
    borderColor-hover: "rgba(165, 49, 138, 0.6)"     # magenta-600 at 60% — composed
    boxShadow-hover: "{elevation.card-glow-dark.boxShadow}"   # single source of truth — no duplication
    rounded: "{rounded.xl}"
    padding: "{spacing.rhythm.card-padding}"
    backdropFilter: blur(4px)
    transition:
      duration: "{motion.duration.slow}"
      easing: "{motion.easing.standard}"
    # Sub-elements — typography roles inside the card body
    eyebrow:
      typography: "{typography.label-caps}"
      color: "{colors.magenta.600}"          # magenta accent eyebrow (signature pattern) — ⚠ 3.1:1 on dark: DECORATIVE at this size; the title carries the meaning (accessibility.md)
      marginBottom: "{spacing.rhythm.eyebrow-to-title}"
    title:
      typography: "{typography.h3}"
      color: "{colors.stone.025}"
      marginBottom: "{spacing.rhythm.title-to-body}"
    body:
      typography: "{typography.body}"
      color: "{colors.stone.300}"
    footer:                                  # optional bottom row (link, metadata)
      typography: "{typography.caption}"
      color: "{colors.stone.500}"
      marginTop: "{spacing.4}"
      borderTop: 1px solid "{colors.stone.800}"
      paddingTop: "{spacing.3}"

  # Light-mode card — sibling to card-dark, for light surfaces (docs, marketing-light, print fallback)
  card-light:
    backgroundColor: "{mode-light.surface}"          # stone-025
    borderColor: "{mode-light.border}"               # stone-150
    borderColor-hover: "rgba(165, 49, 138, 0.4)"     # magenta-600 at 40% — composed
    boxShadow-hover: "{elevation.card-glow-light.boxShadow}"  # single source of truth
    rounded: "{rounded.xl}"
    padding: "{spacing.rhythm.card-padding}"
    transition:
      duration: "{motion.duration.slow}"
      easing: "{motion.easing.standard}"
    eyebrow:
      typography: "{typography.label-caps}"
      color: "{colors.magenta.600}"          # magenta still works on light
      marginBottom: "{spacing.rhythm.eyebrow-to-title}"
    title:
      typography: "{typography.h3}"
      color: "{colors.stone.900}"
      marginBottom: "{spacing.rhythm.title-to-body}"
    body:
      typography: "{typography.body}"
      color: "{colors.stone.700}"
    footer:
      typography: "{typography.caption}"
      color: "{colors.stone.500}"
      marginTop: "{spacing.4}"
      borderTop: 1px solid "{colors.stone.150}"
      paddingTop: "{spacing.3}"
    notes: "Use on documentation surfaces, blog index, anywhere stone-025 is the page background. Light surfaces are the minority — most product/marketing pages run dark."

  # Callout — subtle 5%/15% tints, dot+label TOP, body BELOW
  # Source: branch web-28-ai-resources → src/components/ai-authorization/Callout.tsx (UNMERGED as of 2026-06-11)
  callout-red:
    backgroundColor: "{colors.red.500}"
    backgroundOpacity: 0.05                  # /5 — VERY subtle
    borderColor: "{colors.red.500}"
    borderOpacity: 0.15                      # /15 — barely-there border
    borderWidth: 1px
    dotColor: "{colors.red.400}"             # dot uses -400, not -500
    labelColor: "{colors.red.400}"
    bodyTextColor: "{colors.stone.200}"
    rounded: "{rounded.md}"
    padding: 16px
    layout: dot-label-on-top
    labelTypography: "{typography.label-caps}"
  callout-teal:
    backgroundColor: "{colors.teal.500}"
    backgroundOpacity: 0.05
    borderColor: "{colors.teal.500}"
    borderOpacity: 0.15
    borderWidth: 1px
    dotColor: "{colors.teal.400}"
    labelColor: "{colors.teal.400}"
    bodyTextColor: "{colors.stone.200}"
    rounded: "{rounded.md}"
    padding: 16px
    layout: dot-label-on-top
  callout-violet:
    backgroundColor: "{colors.violet.500}"
    backgroundOpacity: 0.05
    borderColor: "{colors.violet.500}"
    borderOpacity: 0.20                      # violet bumped to /20 per source
    borderWidth: 1px
    dotColor: "{colors.violet.400}"
    labelColor: "{colors.violet.400}"
    bodyTextColor: "{colors.stone.200}"
    rounded: "{rounded.md}"
    padding: 16px
    layout: dot-label-on-top
  callout-stone:
    backgroundColor: "{colors.stone.900}"
    backgroundOpacity: 0.40                  # stone variant is denser (status-neutral)
    borderColor: "{colors.stone.600}"
    borderOpacity: 0.30
    borderWidth: 1px
    dotColor: "{colors.stone.400}"
    labelColor: "{colors.stone.400}"
    bodyTextColor: "{colors.stone.200}"
    rounded: "{rounded.md}"
    padding: 16px
    layout: dot-label-on-top
    notes: "Neutral aside — info without status charge."

  # Terminal window chrome (for code-as-evidence panels)
  terminal-window:
    backgroundColor: "#0F0E14"               # near-stone-975, slightly bluer for terminal feel
    chromeColors: ["{colors.red.500}", "{colors.sand.300}", "{colors.teal.500}"]
    rounded: "{rounded.lg}"

  # Section labels (mono caps) — used as structural markers above headings
  section-label:
    typography: "{typography.label-caps}"
    color: "{colors.stone.400}"               # default neutral; use magenta-600 for emphasis variant
    color-emphasis: "{colors.magenta.600}"    # emphasized variant (signals "this section matters")
    marginBottom: "{spacing.rhythm.eyebrow-to-title}"

  # Section rule — horizontal rule paired with section labels in archive/list patterns
  # Pattern: SECTION LABEL above + horizontal rule below (or sandwich w/ rules top + bottom)
  section-rule:
    color: "{colors.stone.800}"               # dark-mode rule color
    color-light: "{colors.stone.150}"         # light-mode rule color
    width: 1px
    style: solid
    # Layout variants:
    # — bottom: rule beneath label (most common, opening pattern)
    # — top: rule above label (rare; used as section closer)
    # — sandwich: rules above AND below label (used for archive separators)
    layout: bottom
    # Mono-caps "Load more" pattern uses sandwich layout w/ stone-800 rules

  # Code block (multi-line, fenced)
  code-block:
    typography: "{typography.code-block}"
    backgroundColor: "{colors.stone.900}"
    textColor: "{colors.stone.200}"
    rounded: "{rounded.lg}"
    padding: "{spacing.4} {spacing.6}"        # 16px vertical, 24px horizontal
    syntaxColors:                             # highlight.js theme alignment
      keyword: "{colors.violet.400}"
      string: "{colors.sand.300}"
      function: "{colors.teal.400}"
      comment: "{colors.stone.500}"
      number: "{colors.magenta.400}"
      operator: "{colors.stone.300}"
    notes: "Stone-900 surface (slightly lighter than card-dark to read as inset code). Inline code uses the lighter chrome on stone-900 padding."
```

## Component detail

### Hero pattern
Every product, use-case, industry, and marketing landing page opens with the same structure: mono-caps eyebrow → font-light h1 with magenta-600 (or brand-gradient) emphasis span → font-light body subtitle (max-width ~640px).

The emphasis span is the working surface of the brand. Two modes:
- **Solid magenta-600 semibold** (default) — for in-prose emphasis, headline punchlines, comparison contrasts
- **Brand-gradient text-fill** (rare, hero-only) — used as the page's brand mark, never inside body paragraphs

Example: "Every authorization use case." (font-light) + "One system." (font-semibold + magenta-600). The contrast of weights inside a single sentence is the AuthZed headline fingerprint.

### Card sub-elements
A card-dark or card-light has four optional roles:
- **Eyebrow** — mono-caps in magenta-600 (signals "this card belongs to a category")
- **Title** — h3-weight (font-normal at 1.5rem)
- **Body** — font-light body prose, stone-300 on dark / stone-700 on light
- **Footer** — caption-weight, separated by a stone-800 top border (or stone-150 on light)

Skip eyebrow on standalone cards (e.g., testimonials, hero-adjacent CTAs). Always pair eyebrow with title — eyebrow without title reads as orphan label.

### Section labels & rules
Mono-caps section labels are structural markers — they say "you've entered a new region." Three layouts:
- **bottom-rule** (default opening pattern) — `LABEL` on top, `border-b border-stone-800` below
- **top-rule** (closer) — `border-t border-stone-800` above, `LABEL` below
- **sandwich** (archive separator) — rules above AND below the label, used in blog/learn archive lists

The mono-caps "Load more" affordance at the bottom of ArchiveList uses the sandwich layout with stone-800 rules. The horizontal rule is **always 1px stone-800 on dark** (or stone-150 on light) — heavier weights read as section dividers, which is a different vocabulary.

### `GradientButton` — Brand-default primary CTA
Sand→red→violet animated gradient. Used for the canonical "Sign up", "Get started" actions. Carries animated gradient shift on hover.

### `Callout` (red / teal / violet / stone variants)
Dot + label + body pattern. Lives on unmerged branch `web-28-ai-resources` (`src/components/ai-authorization/Callout.tsx`). Used for in-section explainers; dim-inactive + ring-active pattern when stacked for comparison.

### `TerminalWindow`
Red / amber / teal traffic-light dots + `#0F0E14` chrome. Used for code-as-evidence panels (before/after comparisons, schema demos). Lives on unmerged branch `web-28-ai-resources` (`src/components/ai-authorization/TerminalWindow.tsx`).

### `RelationshipsTable`
Auto-cycling row highlight + "Streaming" indicator. Honest visual motion — implies a graph being queried without implying a backend round-trip. Replaces the killed "LiveChecks" pattern (which falsely implied real-time API calls).

### `ArchiveList`
Shared blog-archive list component. Supports `isUndated` prop for non-blog usage (e.g., resources lists). Mono-caps "Load more" between horizontal rules.

### `SectionLabel`
Mono-caps section markers. Pairs with horizontal rules on archive/list surfaces.

### `Card` (shadcn primitive)
The **base** shadcn `Card` (`components/ui/card.tsx`) is plain: `rounded-lg` (8px), `border`, `shadow-sm`, **no hover lift** — verified 2026-06-03. The expressive **marketing `card-dark` composite** (a different pattern, not the base primitive) adds: `stone-950/90` bg, `stone-700` border, hover `magenta-600/60` border + magenta glow, `backdrop-blur-sm`, `rounded-xl`, `p-6`. Don't conflate the two — reach for the base Card for product/dense chrome, the composite for marketing surfaces.

### `Alert` (shadcn primitive — voice/tone usage)
Variants: `success` (teal), `warning` (sand), `error` (red), `destructive` (stone-inverted), `creative` (violet). Used in form validation and status messaging.

> TODO[design-team]: Application-tier components in `projects/web/src/components/` are not yet promoted into Sandworm's `components/ui/`. Candidates for promotion: `Callout`, `TerminalWindow`, `RelationshipsTable`, `IfStatementsToCheckPermission`. Surface them in Sandworm so they're discoverable across products, not just authzed.com.
