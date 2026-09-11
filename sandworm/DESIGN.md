---
name: Sandworm
description: AuthZed's unified design system. Quiet, technical, trustworthy. Used across the marketing site, product surfaces, and brand materials.
version: 0.1
colors:
  # Brand-level semantic tokens (high-level shortcuts)
  primary: "{colors.magenta.600}"
  secondary: "{colors.teal.500}"
  accent: "{colors.sand.300}"
  highlight: "{colors.violet.500}"           # deliberately -500 (brighter, non-status accent role) — NOT the warm-gradient end-stop, which is violet-600
  alert: "{colors.red.500}"
  info: "{colors.blue.500}"
  surface: "{colors.stone.025}"
  surface-dark: "{colors.stone.975}"
  text: "{colors.stone.975}"
  text-dark: "{colors.stone.025}"

  # Full palette (7 families × 15 stops) → demoted to design/palette.md (Track B slim, 2026-06-10).
  # Token refs like {colors.sand.300} resolve against that table; the kit generator merges both files.
  # Hexes are NEVER inlined here — read design/palette.md or the generated kit for values.

  # Semantic mappings (light → dark token pairs)
  semantic:
    background: { light: "{colors.stone.025}", dark: "{colors.stone.975}" }
    foreground: { light: "{colors.stone.975}", dark: "{colors.stone.025}" }
    muted: { light: "{colors.stone.050}", dark: "{colors.stone.850}" }
    border: { light: "{colors.stone.150}", dark: "{colors.stone.700}" }   # corrected 2026-06-11 — shipped census: stone-700 (54×) / stone-800 subtle (45×); the design-system app's semantic-colors.ts ships stone-850 as its OWN quieter choice, not canon
    success: { light: "{colors.teal.050}", dark: "{colors.teal.900}" }
    warning: { light: "{colors.sand.050}", dark: "{colors.sand.900}" }
    error: { light: "{colors.red.050}", dark: "{colors.red.900}" }
    creative: { light: "{colors.violet.050}", dark: "{colors.violet.900}" }

# Gradient family — temperature matrix: 3 roles (hero / accent / brand) × 2 registers (warm / cool),
# plus spectrum + neutral specials. Redesigned 2026-06-09 (via gradient-lab).
# FORWARD-CANON: warm-hero & warm-accent match shipped code; warm-brand, the full cool register,
# spectrum and depth* diverge from or don't yet exist in the marketing site — code reconciles to these.
# Code-side reconcile list tracked internally ("gradients → code").
# VIOLET END-STOP SETTLED 2026-06-10: warm-hero ends on violet-600 (#6242e0) — matches GradientButton
# (the canonical CTA) and the shipped majority (~10 sites vs 3). The three to-violet-500 sites
# (UseCaseTree, CustomerStory, Materialize Hero) are drift → reconcile to -600.
gradients:
  # ── WARM — the default register ──
  warm-hero:                 # 3-stop · THE brand gradient (= shipped brand-warm). Hero spans, GradientButton, story halos.
    type: linear
    direction: to right
    stops:
      - { color: "{colors.sand.300}", position: 0% }
      - { color: "{colors.red.400}", position: 50% }
      - { color: "{colors.violet.600}", position: 100% }   # settled 2026-06-10 — matches GradientButton
  warm-accent:               # 2-stop · accent strips, narrower CTAs (= shipped sunset)
    type: linear
    direction: to right
    stops:
      - { color: "{colors.sand.300}", position: 0% }
      - { color: "{colors.red.500}", position: 100% }
  warm-brand:                # 4-stop · light→deep, lands on brand magenta (richer than the old 2-stop sand→magenta)
    type: linear
    direction: to right
    stops:
      - { color: "{colors.sand.100}", position: 0% }
      - { color: "{colors.sand.300}", position: 33% }
      - { color: "{colors.magenta.600}", position: 67% }
      - { color: "{colors.magenta.900}", position: 100% }

  # ── COOL — cloud / data / product surfaces, where warm over-saturates ──
  cool-hero:                 # 2-stop · the cool counterpart to warm-hero
    type: linear
    direction: to right
    stops:
      - { color: "{colors.violet.500}", position: 0% }
      - { color: "{colors.teal.400}", position: 100% }
  cool-hero-alt:             # 2-stop · softer warm↔cool blend variant
    type: linear
    direction: to right
    stops:
      - { color: "{colors.violet.500}", position: 0% }
      - { color: "{colors.red.150}", position: 100% }
  cool-accent:               # 2-stop · cool accent strips / CTAs
    type: linear
    direction: to right
    stops:
      - { color: "{colors.violet.400}", position: 0% }
      - { color: "{colors.blue.300}", position: 100% }
  cool-brand:                # 4-stop · light→deep mirror of warm-brand, lands on violet
    type: linear
    direction: to right
    stops:
      - { color: "{colors.blue.150}", position: 0% }
      - { color: "{colors.teal.300}", position: 33% }
      - { color: "{colors.violet.600}", position: 67% }
      - { color: "{colors.violet.900}", position: 100% }

  # ── SPECTRUM & NEUTRAL — specials ──
  spectrum:                  # 5-stop · full warm↔cool sweep, rare showcase / celebration moments
    type: linear
    direction: to right
    stops:
      - { color: "{colors.sand.300}", position: 0% }
      - { color: "{colors.magenta.600}", position: 25% }
      - { color: "{colors.violet.500}", position: 50% }
      - { color: "{colors.teal.400}", position: 75% }
      - { color: "{colors.blue.150}", position: 100% }
  depth:                     # 2-stop neutral · dark structural elevation washes (not brand-expressive)
    type: linear
    direction: to right
    stops:
      - { color: "{colors.stone.700}", position: 0% }
      - { color: "{colors.stone.950}", position: 100% }
  depth-light:               # 3-stop neutral · light structural washes
    type: linear
    direction: to right
    stops:
      - { color: "{colors.stone.150}", position: 0% }
      - { color: "{colors.stone.300}", position: 50% }
      - { color: "{colors.stone.600}", position: 100% }

  # Historical callout — teal that was once wrong in shipped surfaces.
  # `#497D7A` is NOT teal-500. teal-500 IS `#549693`. The wrong hex shipped briefly years ago
  # and the explicit callout persists in CLAUDE.md as a guardrail. Carried forward here.
  _historical:
    teal-wrong-hex: "#497D7A"               # NEVER use this — it's not in the palette
    teal-correct-hex: "#549693"             # teal-500 — always use this

# Elevation — Sandworm has MULTIPLE shipped lift forms, by surface (verified 2026-06-03):
#   - magenta-tinted glow (shadow-lg shadow-magenta-700/50) on story/showcase MARKETING cards
#   - neutral soft shadow (shadow-lg shadow-stone-500/10) on featured cards + light mode
#   - violet glow on the pricing OptionCard
#   - design-system base Card (components/ui/card.tsx) ships shadow-sm with NO hover lift
# Magenta glow is the signature MARKETING pattern — it is NOT the only form. Do not assume "glow only."
elevation:
  # Card-level lift on hover (the signature magenta-glow MARKETING pattern)
  card-glow-dark:
    boxShadow: "0 0 20px rgba(165, 49, 138, 0.15)"   # magenta-600 at 15% alpha
    description: "Dark-mode marketing-card hover (story/showcase). Magenta aura is the signature lift — but neutral soft shadow also ships on featured cards; pick by surface."
  card-glow-light:
    boxShadow: "0 0 20px rgba(165, 49, 138, 0.10)"   # softer on light
    description: "Light-mode card hover. Slightly softer (10% vs 15%) so it doesn't overpower the stone-025 surface."

  # Soft modal / dropdown shadow (light mode)
  shadow-1-light:
    boxShadow: "0 4px 12px rgba(12, 5, 15, 0.08)"    # stone-975 at 8%
    description: "Light-mode small lift (tooltips, popovers, small dropdowns)."
  shadow-2-light:
    boxShadow: "0 12px 32px rgba(12, 5, 15, 0.16)"   # stone-975 at 16%
    description: "Light-mode pronounced lift (modals, command palette, large dropdowns)."

  # Dark mode lift uses translucent layering + glow rather than shadow
  shadow-1-dark:
    backdropFilter: "blur(4px)"
    backgroundColor: "rgba(23, 13, 28, 0.9)"         # stone-950/90 — the canonical "lifted" dark surface
    description: "Dark-mode lift is backdrop-blur + translucent surface, NOT shadow. Same recipe as card-dark."
  shadow-2-dark:
    backdropFilter: "blur(8px)"
    backgroundColor: "rgba(12, 5, 15, 0.95)"         # stone-975/95
    boxShadow: "0 0 24px rgba(165, 49, 138, 0.10)"   # subtle magenta wash
    description: "Dark-mode modal / palette — heavier blur, deepest surface, faint magenta wash."

# Mode — explicit light/dark semantic token sets (sibling blocks, not derived from prose)
mode-dark:
  surface: "{colors.stone.975}"                     # the PAGE shell. Marketing sections alternate stone-950 / stone-900 blocks ON TOP of it (see web-ui.md) — section surfaces are not the page surface.
  surfaceElevated: "rgba(23, 13, 28, 0.9)"          # stone-950 at 90% alpha — composed value, NOT separate opacity key
  foreground: "{colors.stone.025}"
  foregroundMuted: "{colors.stone.300}"
  foregroundFaint: "{colors.stone.500}"
  border: "{colors.stone.700}"
  borderSubtle: "{colors.stone.800}"                # for section rules, faint dividers
  linkColor: "{colors.sand.300}"
  linkColor-hover: "{colors.sand.200}"

mode-light:
  surface: "{colors.stone.025}"
  surfaceElevated: "#ffffff"                         # pure white cards on stone-025 page (full opacity)
  foreground: "{colors.stone.900}"
  foregroundMuted: "{colors.stone.700}"
  foregroundFaint: "{colors.stone.500}"
  border: "{colors.stone.150}"
  borderSubtle: "{colors.stone.100}"
  linkColor: "{colors.sand.700}"                    # darker sand reads as link on light
  linkColor-hover: "{colors.magenta.600}"           # magenta hover signals brand

# Layout patterns — composition shapes that the system uses repeatedly
layouts:
  # 4/8 asymmetric grid — text-left, content-right at laptop+
  # Used on RAGDemo step 2, ValueProp restructure, IfStatementsToCheckPermission, etc.
  # The asymmetry is intentional; symmetric 6/6 reads as generic SaaS centered patterns.
  asymmetric-4-8:
    breakpoint: "{spacing.breakpoint.laptop}"        # 1024px and above
    columns: 12                                       # underlying grid
    textColumnSpan: 4                                 # text/header takes 4 cols
    contentColumnSpan: 8                              # diagram/content takes 8 cols
    gap: "{spacing.rhythm.grid-gap-loose}"            # 32px
    mobileLayout: stacked                             # below breakpoint, stack single-column
    direction: text-left-content-right                # text on left at laptop+, never swap

  # 8/4 inverse (rare — used when content needs to lead visually, text follows)
  asymmetric-8-4:
    breakpoint: "{spacing.breakpoint.laptop}"
    columns: 12
    contentColumnSpan: 8
    textColumnSpan: 4
    gap: "{spacing.rhythm.grid-gap-loose}"
    mobileLayout: stacked
    direction: content-left-text-right
    notes: "Use sparingly — left-text/right-content is the Sandworm default. Inverse signals 'this content earned the lead.'"

  # Sandworm container — the standard centered max-width wrapper
  container:
    maxWidth: "{spacing.container.maxWidth}"          # 1140px
    horizontalPadding-mobile: "{spacing.rhythm.section-horizontal-mobile}"
    horizontalPadding-desktop: "{spacing.rhythm.section-horizontal-desktop}"

# Motion — durations + easings derived from actual codebase usage frequency.
# Top values shipped: duration-200 (79×), 300 (57×), 500 (35×). ease-in-out (18×).
motion:
  duration:
    fast: 200ms        # default UI feedback (color/state changes) — 79 hits in codebase
    base: 300ms        # standard transitions (border + bg shifts) — 57 hits
    slow: 500ms        # feature lifts (card hover, gradient slide) — 35 hits, signature
    dramatic: 700ms    # page-level reveals (rare, hero)
    legato: 2000ms     # one-off careers animation — careful, almost always too long

  easing:
    standard: "ease-in-out"                              # symmetrical, default for hover toggles
    entrance: "ease-out"                                 # for elements appearing on scroll/load
    exit: "ease-in"                                      # for elements leaving (rare)
    material: "cubic-bezier(0.4, 0, 0.2, 1)"             # Material standard — the ONLY custom bezier shipped (parallax, flipbook CSS)
    # NO spring/overshoot easing ships.

  reduced-motion:
    # Honor prefers-reduced-motion: replace named easings with linear, scale all durations to base/2
    duration-scale: 0.5                                  # halve durations
    easing: "linear"                                     # remove curves
    snippet: |
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    notes: "Required for accessibility. Always include this media query in global CSS. Tokens still ship animated values; the media query disables them at the user's request."

# Iconography — size scale (Lucide React icons by default)
icons:
  library: "Lucide React"
  sizes:
    inline: "0.875rem"   # h-3.5 — inline within text body (legacy: h-4 mentioned in prose)
    small: "1rem"        # h-4 w-4 — inline default, status badges
    default: "1.25rem"   # h-5 w-5 — list item bullets, button icons
    large: "1.5rem"      # h-6 w-6 — section accents, callout dots
    hero: "2rem"         # h-8 w-8 — hero callouts, headline-adjacent
  strokeWidth: 2         # Lucide default — code sets NO override, so shipped stroke is Lucide's 2px default
  notes: "Neither codebase sets a strokeWidth override, so icons render at Lucide's 2px default — do NOT assume 1.5 (an earlier draft claimed 1.5 'do not thicken'; ungrounded). Also: the marketing site projects/web still uses FontAwesome in several places — legacy, not canonical. Lucide React is the design-system standard; new work uses Lucide."

# Z-index — semantic layer stack (derived from codebase frequency: z-10 most common at 97 hits)
z-index:
  base: 0              # default flow
  lift: 10             # hover overlays, scroll indicators — 97 hits
  dropdown: 20         # menus, tooltips — 9 hits
  sticky: 30           # sticky headers, in-flow elevation
  nav: 50              # site navigation, announcement bar — 20 hits
  modal: 100           # modals, command palette — 3 hits (z-100)
  override: 9999       # emergency only — used once for fixed overlay on a special-case CTA
  notes: "Stick to the scale. New additions should rarely need new tiers — use one of the existing layers and adjust DOM order instead. The 9999 is documented as an escape hatch, not a tier."

# Diagrams — system / relationship / authorization-flow visual language.
# CORRECTED 2026-06-09: an earlier draft of this block ("dashed-border") claimed the connected-system
# motif was a dashed "4 4" stone connector with a magenta-active state, crediting the UseCaseTree fan.
# Ground-truthing disproved it — the UseCaseTree fan is SOLID teal, the only dashed thing that ships is
# the SpiceBox CONTAINER ("7 3"), and active state is teal/opacity, never a magenta edge.
# Full canon: design/diagrams.md.
diagrams:
  node:        { border: solid, fill-dark: "#0D0D10", icon: "Lucide 2px", label: "{typography.label-caps}" }
  container:   { border: dashed, dashArray: "7 3", strokeWidth: 1, color: "{colors.stone.700}", meaning: "scope / set / boundary" }
  connector:   { routing: orthogonal, strokeWidth: 1.5, color: "{colors.stone.400}", color-active: "{colors.teal.400}", color-denied: "{colors.red.500}" }
  checkpoint-beam: { gradient: "{gradients.warm-hero}", logomark: "saturn on stone-950 coin", threads: "teal=permit / red=deny", role: "the AuthZed authorization layer everything crosses — the signature device" }
  entity-state: { permitted: "{colors.teal.400}", denied: "{colors.red.500}", neutral: "{colors.stone.400}" }
  rule: "Solid border = node; dashed border = scope container (NOT a connector). Teal = allowed, red = denied, everywhere."
  spoke: design/diagrams.md

typography:
  # Type families
  fontFamily:
    sans: Inter, system-ui, sans-serif       # variable font via next/font
    mono: JetBrains Mono, monospace          # variable font via next/font
    mono-fallback: Roboto Mono, monospace    # legacy fallback in marketing site

  # Type scale
  h1:
    fontFamily: "{typography.fontFamily.sans}"
    fontSize: 3rem
    fontWeight: 300                          # font-light is the brand default for hero
    lineHeight: 1.1
    letterSpacing: -0.02em
  h2:
    fontFamily: "{typography.fontFamily.sans}"
    fontSize: 2.25rem
    fontWeight: 300
    lineHeight: 1.15
    letterSpacing: -0.015em
  h3:
    fontFamily: "{typography.fontFamily.sans}"
    fontSize: 1.5rem
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "{typography.fontFamily.sans}"
    fontSize: 1rem
    fontWeight: 300                          # marketing prose runs font-light
    lineHeight: 1.6
  body-emphasis:
    fontFamily: "{typography.fontFamily.sans}"
    fontSize: 1rem
    fontWeight: 600
    color: "{colors.magenta.600}"            # in-prose emphasis = magenta-600 semibold
  caption:
    fontFamily: "{typography.fontFamily.sans}"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.4
  label-caps:
    fontFamily: "{typography.fontFamily.mono}"
    fontSize: 0.75rem                        # 11px equivalent; matches blog floor
    fontWeight: 500
    letterSpacing: 0.08em
    textTransform: uppercase
  code-inline:
    fontFamily: "{typography.fontFamily.mono}"
    fontSize: 0.9em
  code-block:
    fontFamily: "{typography.fontFamily.mono}"
    fontSize: 0.875rem
    lineHeight: 1.5

rounded:
  # CORRECTED 2026-06-11 — the previous table (sm 4 / md 8 / lg 12 / xl 16) matched NEITHER shipped system.
  # Marketing (projects/web) has NO Tailwind borderRadius override → these are the STOCK Tailwind values.
  # The design-system app instead uses the shadcn calc system: --radius = 0.5rem → lg 8px / md 6px / sm 4px.
  none: 0px
  sm: 2px
  base: 4px        # Tailwind `rounded`
  md: 6px
  lg: 8px
  xl: 12px
  "2xl": 16px
  pill: 9999px
  # Marketing product cards ship rounded-xl (12px); the design-system base Card ships rounded-lg → 8px via calc.

spacing:
  # 4px grid
  "0": 0px
  "1": 4px
  "2": 8px
  "3": 12px
  "4": 16px
  "6": 24px
  "8": 32px
  "10": 40px
  "12": 48px
  "14": 56px
  "16": 64px
  "20": 80px
  "24": 96px
  # Breakpoints (custom — overrides Tailwind defaults)
  breakpoint:
    tablet: 640px
    laptop: 1024px
    desktop: 1280px
  # Site container
  container:
    maxWidth: 1140px                         # content-default

  # Semantic rhythm — which token for which use (the "why this number" guide)
  rhythm:
    section-vertical-mobile: "{spacing.14}"      # 56px — home-section py-14
    section-vertical-desktop: "{spacing.24}"     # 96px — home-section laptop:py-24
    section-horizontal-mobile: "{spacing.6}"     # 24px — content-section px-6
    section-horizontal-desktop: "{spacing.10}"   # 40px — content-section laptop:px-10
    card-padding: "{spacing.6}"                  # 24px — interior padding for content cards
    card-padding-dense: "{spacing.4}"            # 16px — denser card variants (callouts, list items)
    grid-gap-tight: "{spacing.2}"                # 8px — button rows, pill clusters
    grid-gap-default: "{spacing.4}"              # 16px — default card grid
    grid-gap-loose: "{spacing.8}"                # 32px — section blocks
    eyebrow-to-title: "{spacing.3}"              # 12px — gap below mono-caps eyebrow
    title-to-body: "{spacing.2}"                 # 8px — gap below h2/h3
    stack-gap: "{spacing.6}"                     # 24px — default vertical rhythm between blocks
    hero-vertical: "{spacing.20}"                # 80px — top-of-page hero block padding
---

## Overview

Sandworm is AuthZed's unified design system — named for the Arrakian creatures that move beneath the surface of everything. The brand personality is **technical, trustworthy, sharp**: a precision instrument for developers building authorization at scale, not a generic SaaS product page.

**Where most authorization and developer-infra brands reach for cold blue + slate (Auth0, Okta) or the generic SaaS purple-gradient, Sandworm is _warm-technical_** — `magenta-600` + `sand-300` over a purple-tinted near-black. The warmth is the fingerprint.

**Key Characteristics** — the fingerprint in eight lines:

- **Warm-technical, never cold-enterprise** — magenta + sand warmth over a purple-tinted stone near-black; no bank-blue, no locks.
- **Dark by default** — light mode is the deliberate minority (docs, blog index, forms, print).
- **`font-light` everything** — hero and body run weight 300; bold is reserved for `magenta-600` in-prose emphasis spans.
- **A gradient _family_, used sparingly** — the warm `sand → red → violet` 3-stop is primary; reaching for it on every CTA kills the signal.
- **4/8 asymmetric composition** — text-left / content-right; symmetric 6/6 reads as generic SaaS.
- **Restrained motion** — 200/300/500ms, `ease-in-out`, no bounce or spring. Sandworm does not overshoot.
- **Dashed = scope, solid = node** — in diagrams, dashed borders group a set/scope; solid borders are individual nodes and atomic surfaces (cards, buttons). Connectors are solid; teal = allowed, red = denied.
- **The system lives in code, not Figma** — Lucide icons at 2px; read `sandworm-colors.ts` when in doubt.

**Five principles**, in tension order:

1. **Precision over decoration.** Type, color, and motion exist to clarify the system underneath. If a flourish doesn't earn its weight by aiding comprehension, cut it.
2. **Warm authority.** The palette is dark and confident, but never cold. `sand-300` is the warmth that keeps the technical surface from reading as sterile enterprise.
3. **Developer empathy.** Copy speaks to the practitioner who already knows what authorization is. Skip the explainer paragraphs; show the code.
4. **Distinctive, not trendy.** Sandworm avoids the current generic-SaaS palette (mint+navy+gradient-hero). Magenta-600 + sand-300 + teal-500 is a fingerprint, not a trend.
5. **System-first.** A token used in three places is documented. A pattern shipped twice gets a component. Tribal knowledge is a bug.

**Anti-references** — designs that violate Sandworm: generic startup-purple-gradient SaaS, overly corporate enterprise security (think bank-blue + locks), startup-playful illustration-heavy. If a comp could be Vercel's, Auth0's, or Stripe's without modification, it isn't AuthZed.

**The system is in code, not Figma.** `projects/web/src/styles/sandworm-colors.ts` and `projects/design/sandworm/lib/semantic-colors.ts` are canonical. Figma files are partial and may be out of date. When in doubt, read the TypeScript.

> **Path conventions** — `projects/web/…` refers to the authzed.com marketing-site repo; `projects/design/sandworm/…` is THIS repo. Marketing-site paths are cited as *provenance* (where a value was verified) — those files don't ship here. The values themselves are transcribed into this spec and the generated `kit/`; you never need the other repo to apply the system.

## Deep Dives

This hub holds the primitive tokens (colors, typography, spacing, motion, etc.) and the foundational prose. Deeper, surface-specific specs live in spokes — load the relevant spoke alongside this hub:

- [`design/palette.md`](design/palette.md) — the full color table (7 families × 15 stops, hex) — token refs resolve here
- [`design/components.md`](design/components.md) — full component token specs + per-component detail
- [`design/dataviz.md`](design/dataviz.md) — Rakis chart palette system (value-count-indexed, 1-20 series)
- [`design/diagrams.md`](design/diagrams.md) — system / relationship / authorization-flow diagram language + the checkpoint beam
- [`design/logo-brand.md`](design/logo-brand.md) — logo/wordmark usage, mark colors, clear space, minimum sizes
- [`design/accessibility.md`](design/accessibility.md) — contrast ratios, focus/states, vendor-prefix gotchas
- [`design/animation.md`](design/animation.md) — motion patterns, keyframes, reduced-motion
- [`design/web-ui.md`](design/web-ui.md) — *(draft)* page-level composition for authzed.com: nav, footer, hero variants, section archetypes, use-case registry
- [`design/typography.md`](design/typography.md) — *(draft)* the type system as rules: weight pairing, the emphasis contract, display metrics, the two competing scales
- [`design/social.md`](design/social.md) — *(draft)* feed tier: organic social + paid + OG cards, canvas formats, the feed-legibility floor, logo-wall rules
- [`design/print.md`](design/print.md) — *(draft)* print artifacts: one-pagers, DocSend icon tiles, the print-media contract for generating agents
- [`design/slides.md`](design/slides.md) — *(draft)* 16:9 deck language: type scale, layout grid, the gradient agenda capsule, layout recipes

## Colors

Sandworm uses seven color families, each on a 15-stop HSL-derived ramp (`025` → `975`). **The full hex table lives in [`design/palette.md`](design/palette.md)** (demoted from this hub 2026-06-10 for progressive disclosure) and in the generated kit (`colors_and_type.css` / tokens JSON); the live source uses HSL strings (`sandworm-colors.ts`) so dark mode and accessibility math stay clean. Notable ramp quirk — five families ship identical `950`/`975` stops by design; see the palette spoke before "fixing" anything.

**Brand spine** — `magenta-600` is the AuthZed primary. It carries the wordmark, the in-prose emphasis (in prose, magenta-600 marks highlighted phrases — the one shipped instance is a `[&_strong]` rule at font-bold, not semibold, so treat this as a prose-only device and see `design/typography.md` for why it is NOT the headline-emphasis pattern), and the hover-state border on dark cards. `sand-300` is the warm counterweight; it's the link color on dark backgrounds (`text-sand-300` → hover `text-sand-200`) and the lightest piece of the brand gradient. `teal-500` is the cool tertiary — frequently used for secondary CTAs and success states. (Hex values for all tokens live in the frontmatter `colors` block — prose references token names so the two never drift.)

**The gradient family** — a temperature matrix, not one gradient: three roles (hero / accent / brand-landing) × two registers (warm / cool), plus two specials. **`warm-hero`** (`sand-300 → red-400 → violet-600`) is THE brand gradient — hero emphasis spans, GradientButton, customer-story card halos, product-page brand marks. Its cool counterpart **`cool-hero`** (`violet-500 → teal-400`) carries cloud / data / product surfaces where warm over-saturates. The matrix:

- **Hero** — `warm-hero` sand→red→violet (3-stop) · `cool-hero` violet→teal (+ `cool-hero-alt` violet→red-150, a softer blend)
- **Accent (2-stop)** — `warm-accent` sand-300→red-500 · `cool-accent` violet-400→blue-300
- **Brand-landing (4-stop, light→deep)** — `warm-brand` sand-100→sand-300→magenta-600→magenta-900 · `cool-brand` blue-150→teal-300→violet-600→violet-900
- **Specials** — `spectrum` (5-stop full warm↔cool sweep, rare showcase moments) · `depth` / `depth-light` (neutral stone washes — structural, not brand-expressive)

> **Forward-canon (2026-06-09)** — this matrix was redesigned in the gradient-lab. `warm-hero` and `warm-accent` match shipped marketing code; `warm-brand`, the full cool register, and the specials diverge from or don't yet exist in `projects/web` — the code reconciles to this spec (reconcile list tracked internally). Supersedes the old `brand-warm / brand-sunset / brand-cool / brand-warm-to-magenta / brand-warm-magenta-3stop` names. The `warm-hero` violet end-stop was settled 2026-06-10: **`violet-600`**, matching the CTA — see the drift note below.

**The brand gradient is NOT for use on every surface** — over-application kills the signal. Use the primary warm 3-stop on hero emphasis and primary CTAs; reach for the sister gradients only when their specific surface logic applies.

> **Drift note — RESOLVED (2026-06-10)**: a full `projects/web/src` grep settled the violet end-stop. `violet-600` (`#6242e0`) ships at ~10 warm-gradient sites — including `GradientButton.tsx`, the canonical CTA — vs 3 sites for `violet-500` (`UseCaseTree`, `CustomerStory`, `Materialize Hero`, all Tailwind-class form). **Canon = `violet-600`, matching the CTA.** The three `to-violet-500` sites are drift → reconcile in the gradients→code PR. Pattern worth knowing: token-class usages drifted to `-500`; hex-literal usages propagated `-600` from GradientButton. (`projects/web/CLAUDE.md` line 101 also cites an older `from-violet-400 to-teal-400` cool reversal that is not currently shipped.)

**Stone** is the neutral spine. The dark-mode default surface is `stone-950/90` (with 90% opacity to let underlying gradients breathe through), bordered with `stone-700`, hovering to `magenta-600/60`. The light-mode surface is `stone-025`.

**Semantic mappings** are the safe-to-reach-for shortcuts for status surfaces:

- **success** — teal family (`teal-050` light, `teal-900` dark)
- **warning** — sand family (`sand-050` light, `sand-900` dark)
- **error** — red family (`red-050` light, `red-900` dark)
- **creative / highlight** — violet family (used for the "this is special" non-status accent — e.g., the post-it pink for insight blocks)

**Hard rule**: never use generic Tailwind colors (`text-gray-500`, `bg-blue-600`) or arbitrary hex (`#0c0a09`, `#110f14`) for brand surfaces. The Sandworm stone scale is purple-tinted, not neutral brown; Tailwind defaults will wash color. The single canonical exception is `#0F0E14` for terminal-window backgrounds — slightly bluer than `stone-975` for terminal-chrome feel.

## Typography

Three families, all loaded via `next/font`:

- **Inter** (variable) is the sans. It carries 95% of the surface — headlines, body, UI labels.
- **JetBrains Mono** (variable) is the mono. Used for inline code, code blocks, mono-caps section labels, and terminal-window chrome.
- **Roboto Mono** is the marketing-site mono fallback. New surfaces should prefer JetBrains Mono.

**Brand weight is light.** Hero headlines run `font-light` (300) — the lightness is part of the warm-authority register. Marketing body prose also runs `font-light`. **Semibold (600) is reserved for the emphasis clause** inside otherwise-light copy. The system is a TWO-WEIGHT PAIRING, not a five-weight ramp: light sets up, semibold lands.

Shipped weight frequency in `projects/web/src` (verified 2026-09-11): `font-light` 295 · `font-semibold` 223 · `font-medium` 161 · `font-bold` 51 · `font-normal` 29 · `font-extralight` 21 · `font-extrabold` 4 · `font-thin` 2. Weights above 600 are effectively absent — treat 700+ as off-system.

**Emphasis colour — CORRECTED 2026-09-11.** An earlier draft of this block claimed `font-semibold text-magenta-600` was "the AuthZed pattern" for headline emphasis. Ground-truthing disproved it: across `projects/web/src` there are **zero** instances of solid `text-magenta-600` used as a headline emphasis span. All 12 `font-semibold` + magenta co-occurrences are eyebrows (5), gradient stops (5), or button/chip backgrounds (2). The two patterns that actually ship:

1. **Neutral semibold** (~17 uses) — the default. `font-semibold` with `text-white` / `text-stone-050` / inherited. The canonical hero is `projects/web/src/app/(main)/page.tsx:18-23`:
   `font-light "AI Moves Fast."` + `font-semibold "Permissions Must Keep Up."`
2. **Brand-gradient clip-text semibold** (~8 uses) — the expressive variant, for a hero that needs more lift. `bg-gradient-to-r from-sand-300 via-red-400 to-magenta-600 bg-clip-text font-semibold text-transparent`.

`magenta-600` + semibold IS canon — as the **eyebrow/kicker**, not headline emphasis: `text-xs`/`text-sm`, `uppercase`, `tracking-widest`, `text-magenta-600` (PressResources, Conferences, events/[slug], EventDate).

**Display headline metrics.** Tight leading: `leading-none` on the homepage hero, `leading-tight` on the industry/use-case heroes. **Tracking has a ceiling, not a ban** — `tracking-tight` (-0.025em) is the largest value that ships on a light display headline (IndustryHero, UseCaseHero, AssessmentFlow); the homepage hero sets none. Both are in-system. Do NOT go past -0.025em: Inter Light is already narrow, and roughly double the shipped ceiling (-0.045em) reads as generic tech-poster rather than AuthZed. Headline case is **Title Case**. Break display headlines EXPLICITLY with `<br>`: the semibold clause must start its own line and never be split across a wrap, which auto-wrapping cannot guarantee.

**Mono-caps section labels** (`text-xs`, `letterSpacing: 0.08em`, uppercase) signal structural transitions — section titles, "Resources", "Load more". Always paired with horizontal rules in the blog/archive treatment.

**Inter for code? No.** Code is mono, even in narrative paragraphs. Pull-quoted code (`<code>useUser()</code>`) uses inline mono; full snippets use a `TerminalWindow` chrome. Don't reach for `font-mono` on narrative paragraphs — prose reads in Inter.

**Braille / ASCII art** in JetBrains Mono requires compensation: `letter-spacing: -0.2em` + `line-height: 0.95`. Without it, braille glyphs render too wide and the image fragments. (Documented recipe — used on the SpiceBox spotlight.)

## Layout

Sandworm uses a fixed-max container with custom breakpoints. The 1140px max-width is enforced on standard content surfaces.

**Custom breakpoints** (override Tailwind defaults):

- `tablet: 640px`
- `laptop: 1024px`
- `desktop: 1280px`

**Utility classes** (defined in `globals.css`):

- `content-section` — `px-6 laptop:px-10` (horizontal section padding)
- `content-default` — `max-w-desktop container mx-auto` (centered container at 1140px)
- `home-section` — `py-14 laptop:py-24` (vertical home-page section padding)

**Grid asymmetry on the marketing site**: laptop+ surfaces often use a 4/8 column split (text-left / content-right). Symmetric grids read as generic; the 4/8 asymmetry is part of the Sandworm fingerprint.

### The asymmetric 4/8 grid (worked example)

Formal token: `layouts.asymmetric-4-8`. The shape:

```
At laptop (>= 1024px):
┌──────────────────┬──────────────────────────────────────┐
│ Text column      │ Content column                       │
│ col-span-4       │ col-span-8                           │
│ (~33% width)     │ (~66% width)                         │
│                  │                                      │
│ EYEBROW          │ ┌──────────────────────────────────┐ │
│ H2 headline      │ │ Diagram / code / interactive     │ │
│ Body paragraph   │ │ Wider canvas because content     │ │
│ CTA              │ │ drives the teach.                │ │
│                  │ └──────────────────────────────────┘ │
└──────────────────┴──────────────────────────────────────┘
        ↑ Gap: 32px (grid-gap-loose)

Below laptop: stack to single column, text first, content second.
```

The text column carries the framing (eyebrow + h2 + body + CTA). The content column carries the proof — a diagram, code panel, schema, or interactive demo. Never invert (content-left / text-right) without a deliberate reason; the 8/4 inverse exists in the spec as `layouts.asymmetric-8-4` but it's reserved for cases where the content itself is the lead.

**Why 4/8 and not 6/6**: symmetric grids read as generic SaaS. The intentional asymmetry is the Sandworm fingerprint at the composition level — it signals "we made deliberate choices" before a reader has parsed a single word.

**Scroll-driven sections** (RAG demo, IfStatementsToCheckPermission, "show all with emphasis" callouts) use sticky positioning + step indicators rather than full-page parallax. Hide-then-reveal interactions (tabs, accordions) are vetoed where comparison is the teach — show all states simultaneously with dim+ring emphasis on the active one.

### Spacing Rhythm

The 4px grid is the foundation; the semantic `spacing.rhythm` tokens are the answers to "which number for which use." Reach for the rhythm token, not the raw step.

- **Section vertical** — `py-14` mobile, `py-24` laptop+ (`home-section` utility). All marketing-page sections breathe at this rhythm.
- **Section horizontal** — `px-6` mobile, `px-10` laptop+ (`content-section` utility).
- **Card padding** — `p-6` (24px) default, `p-4` (16px) for dense surfaces (callouts, list items).
- **Grid gaps** — `gap-2` (8px) for pill rows, `gap-4` (16px) for default card grids, `gap-8` (32px) for section blocks.
- **Eyebrow → title** — `mb-3` (12px) below the mono-caps eyebrow.
- **Title → body** — `mb-2` (8px) below h2/h3.
- **Stack gap** — `space-y-6` (24px) default vertical rhythm between blocks.

Following the rhythm tokens (vs ad-hoc spacing) keeps the page reading as one system across team contributions. Section padding alone carries most of the brand's "calm density" feel — generic SaaS tends toward `py-32` everywhere; Sandworm's `py-14 → py-24` is tighter and more confident.

## Light Mode

Sandworm runs dark by default — the majority of marketing surfaces, product UIs, and demos are dark. Light mode is the minority, used on:
- Documentation surfaces (`docs.authzed.com`)
- Blog index and archive pages where reading density matters
- Forms and account-management UIs
- Print/PDF artifacts (data room one-pagers, customer stories)
- Vendor surfaces that can't easily run dark (HubSpot, some Calendly embeds)

The system inverts cleanly: `stone-025` becomes the page surface, `stone-900` becomes the text, `stone-150` becomes the border. The semantic mappings (success, warning, error, creative) flip to their `*-050` light variants instead of `*-900` dark variants. Magenta accents work on both modes — no need to flip the magenta-600 emphasis pattern.

**The brand gradient stays the same on light surfaces.** Sand → red → violet reads against both stone-025 and stone-975 because all three gradient stops are in the mid-saturation band. Do NOT flip to a lighter gradient variant on light surfaces.

> **Print is a separate register — these light-mode rules do NOT carry over.** One-pagers and PDF artifacts ban the gradient and magenta emphasis entirely (ink + restraint is the print register, and the print page is pure white, not stone-025). See [`design/print.md`](design/print.md) before designing anything that goes to paper.

**What does flip**:
- Surface color: `stone-025` ↔ `stone-975`
- Foreground text: `stone-900` ↔ `stone-025`
- Border: `stone-150` ↔ `stone-700`
- Muted text: `stone-500` (works on both, but pair with `stone-025` body on dark / `stone-700` body on light)
- Status backgrounds: `*-050` light ↔ `*-900` dark
- Card glow: `magenta-600/40` on light ↔ `magenta-600/60` on dark (slightly softer glow on light)

**What does NOT flip**:
- Magenta emphasis color (`magenta-600` works on both)
- Brand gradient
- Sand-300 link color (works on both, though `sand-700` is a heavier light-mode link variant)
- Mono-caps eyebrow vocabulary

## Elevation & Depth

Sandworm has **multiple shipped lift forms — pick by surface**, not one rule per mode. All formalized in the `elevation` YAML block.

**Dark mode has two shipped lift forms.** The signature is a magenta-tinted glow (`shadow-lg shadow-magenta-700/50`, ≈ `0 0 20px rgba(165, 49, 138, 0.15)`) on story/showcase **marketing** cards. But a neutral soft shadow (`shadow-lg shadow-stone-500/10`) also ships on featured cards, the pricing `OptionCard` uses a violet glow, and the design-system base `Card` (`components/ui/card.tsx`) ships only `shadow-sm` with no hover lift. Magenta glow is the brand-expressive choice for hero/marketing surfaces; neutral shadow is correct for denser product chrome. Lifted dark surfaces also layer translucency: `card-dark` uses `backdrop-blur-sm` over `stone-950/90`. *(An earlier draft claimed "magenta glow, never drop-shadow" — too absolute; both ship. Verified 2026-06-03.)*

**Light mode = soft cool shadow.** Lifted surfaces on light use `0 4px 12px rgba(12, 5, 15, 0.08)` for small lift (popovers, tooltips) and `0 12px 32px rgba(12, 5, 15, 0.16)` for pronounced (modals, palette). The shadow tint is stone-975 at 8/16% — cool-purple rather than neutral gray, matching the brand stone tinting.

**Glow opacity pair** for hover states across modes:
- Dark: `magenta-600 at 15%` (formal token: `elevation.card-glow-dark`)
- Light: `magenta-600 at 10%` (formal token: `elevation.card-glow-light`) — softer because light surfaces are less forgiving

**Rotating conic-gradient borders** (the After-card on the Cloud product page) are a special-purpose elevation device — they signal "this is the answer" via animated chrome, registered via `@property --az-after-angle` in `globals.css`. Use sparingly; one per page max.

## Motion

Sandworm's motion vocabulary is precise and restrained — every transition exists to clarify a state change, not to announce itself. **Three core durations** carry 95% of motion:

- **fast (200ms)** — UI feedback (color shifts, border hover). 79 hits in codebase. The "this responded to your input" duration.
- **base (300ms)** — Standard transitions (translation + bg shifts in concert). 57 hits.
- **slow (500ms)** — Signature feature lifts (card hover w/ glow, gradient slide on buttons). 35 hits. The Sandworm "calm density" feel comes from preferring 500ms over the SaaS-typical 200ms on hover states.

**Easings**:
- `ease-in-out` is the default — symmetrical, works for hover toggles
- `ease-out` for entrance animations (elements appearing on scroll)
- `ease-in` for elements leaving (rare)
- `cubic-bezier(0.4, 0, 0.2, 1)` — Material standard, the only custom bezier shipped (parallax + flipbook CSS)

**Sandworm motion does not bounce.** No spring or overshoot easing ships — `ease-out` / `ease-in-out` only. (An earlier draft claimed `cubic-bezier(0.34, 1.56, …)` "spring-bounce" on UseCaseTree dots and a "spring-soft" on /ai-authorization; neither exists in shipped code. Verified 2026-06-03.)

**Don't reach for `duration-100` or under** — anything below 200ms reads as snap-not-glide and breaks the brand register. Don't reach for `duration-1000+` on routine hovers either — that crosses into "is something broken?" territory.

### Reduced motion

The `prefers-reduced-motion: reduce` media query is **non-optional** in Sandworm-shipped CSS:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Users with vestibular disorders or attention sensitivities depend on this. The brand-gradient slide on `GradientButton` and the magenta glow on card hover are both motion patterns that should disappear under reduced-motion. If a custom animation can't gracefully degrade, gate it explicitly with the media query.

## Shapes

**Radius scale** *(reconciled 2026-06-11)*: two shipped systems. **Marketing** (`projects/web`) has no Tailwind override — stock scale applies: `rounded-xl` = **12px** on product cards, `rounded-lg` = 8px, `rounded-md` = 6px. **The design-system app** derives from `--radius` = `0.5rem`: `lg = var(--radius)` (**8px**), `md = calc(−2px)` (6px), `sm = calc(−4px)` (4px); its base `Card` ships `rounded-lg` → 8px. **There is no single canonical card radius — match the surface.** The token scale (stock values):

- `rounded-sm` (2px) — smallest chrome
- `rounded` (4px) — input borders, badges
- `rounded-md` (6px) — buttons, callouts, inline elements
- `rounded-lg` (8px) — terminal windows, base Card
- `rounded-xl` (12px) — marketing product cards, primary content surfaces
- `rounded-2xl` (16px) — large feature surfaces, diagram group nodes
- `rounded-pill` (9999px) — pill chrome on the SpiceDB tree hub, badges

**Dashed borders** are the "scope container" motif in diagrams — they wrap a *set* of nodes (a vector-DB partition, a permission domain, a stack of related docs). Solid borders are for atomic surfaces (cards, buttons) and for individual diagram nodes; dashed borders group them. Note: connectors between nodes are **solid** (teal = allowed, red = denied), not dashed — the full diagram language, including the signature gradient **checkpoint beam**, lives in [`design/diagrams.md`](design/diagrams.md).

**Iconography**: Lucide React is the icon system. Sizes follow the `icons` token scale: `h-3.5` inline-within-text-body, `h-4 w-4` small default (status badges), `h-5 w-5` list items / button icons, `h-6 w-6` section accents.

## Components

Sandworm's canonical component patterns:

- **hero** — eyebrow → font-light h1 with magenta-600 (or brand-gradient) emphasis span → font-light subtitle
- **card-dark / card-light** — content cards with magenta-hover glow; per-mode siblings
- **GradientButton family** — sand→red→violet pill CTAs; the gradient family IS the CTA system
- **Callout** (red / teal / violet / stone) — subtle-tint dot+label+body explainer panels
- **TerminalWindow** — traffic-light dots + `#0F0E14` chrome for code-as-evidence
- **section labels & rules** — mono-caps structural markers paired with horizontal rules

Full component token specs + per-component detail → `design/components.md`.

## Do's and Don'ts

### Colors
- ✅ Use Sandworm tokens by name (`bg-stone-950`, `text-magenta-600`)
- ✅ Pair `magenta-600` emphasis with `font-light` body for the brand register
- ✅ Use `stone-950/90` (90% opacity) for dark cards to let gradients breathe through
- ❌ Never use generic Tailwind palette for brand surfaces (`text-gray-500`, `bg-purple-700`)
- ❌ Never use arbitrary hex values (`#110f14`, `#0c0a09`) — they wash purple-tinted neutral
- ❌ Don't reach for the brand gradient on every CTA — it loses signal with overuse

### Typography
- ✅ `font-light` for body and headlines
- ✅ `font-semibold text-magenta-600` for in-prose emphasis
- ✅ Mono-caps + horizontal rules for section structure
- ❌ Don't put narrative prose in `font-mono` (Inter for prose, mono for code only)
- ❌ Don't use heavy font weights for general copy — bold is for emphasis, not body

### Composition
- ✅ Show all comparison states with dim+ring active emphasis
- ✅ Use the 4/8 asymmetric grid on laptop+ to break out of generic-SaaS centered patterns
- ✅ Use dashed borders for system/graph imagery, solid for atomic surfaces
- ❌ Don't hide half the comparison behind tabs or toggles when comparison is the teach
- ❌ Don't imply backend activity that isn't happening (no fake "live" tickers)
- ❌ Don't use centered text by default — left-align unless the section is announcement-style

### Buttons & CTAs
- ✅ **All primary CTAs go through `button-primary`** (GradientButton) — the gradient family IS the CTA system
- ✅ For loud-on-dark contexts: `button-primary-filled` (solid warm gradient + dark text)
- ✅ For quieter actions: `button-outline` (stone-100 border) or `button-subtle` (stone-600 border)
- ❌ **Do NOT introduce solid-magenta buttons.** There is no canonical solid-magenta CTA in Sandworm. If vendor form constraints (HubSpot, Calendly) force a solid-bg button, that's vendor drift, not a pattern to clone onto new surfaces.
- ❌ Don't reach for `<Button variant="primary">` from `Button.tsx` — its definition (magenta + violet border + violet hover) doesn't ship as-defined, exists in code as a deprecated variant
- ❌ Don't invent new button shapes — pill for the GradientButton family, period. Adding rounded-md or rounded-lg button variants fragments the system

### Translucency
- ✅ Use translucent backgrounds OR gradient borders, not both
- ❌ Don't layer translucent backgrounds inside gradient-bordered containers — the border reads as muddy

### When in doubt
- The system is in code, not Figma. Read `sandworm-colors.ts` and `tailwind.config.ts`.
- Reference existing patterns before reinventing. If a similar surface exists, grep for it before generating.
- Sandworm is "building with the garage door open" — when you make a decision worth keeping, document it back into this file.

---

## Iteration Guide

This file is the canonical spec — AI tools and teammates design against it. Keep it trustworthy:

1. **Ground claims in shipped code.** Before adding or changing a token/rule, grep `projects/web` + `projects/design/sandworm` to confirm it actually ships. Stamp verified facts `(verified YYYY-MM-DD)`. Plans written from memory are fiction.
2. **Hex lives in `design/palette.md` + the generated kit; prose references names.** Write `magenta-600`, not `magenta-600 (#a5318a)`, in prose — so the two never drift. Token refs (`{colors.family.stop}`) resolve against the palette spoke; the kit generator merges both files. Exceptions are deliberate: drift callouts, the `#0F0E14` terminal exception, and historical wrong-hex guardrails keep their hex because the hex *is* the point.
3. **Update the spoke + this hub in the SAME commit.** When a primitive changes, the index here and the spoke move together so nothing designs against stale rules.
4. **Document rejected drift, don't bless it.** When shipped code diverges from canon (vendor magenta buttons, legacy logomark hexes), record it as drift the spec rejects — see Known Gaps — rather than silently canonizing the divergence.
5. **Keep the hub lean.** Primitives + foundational prose live here; surface-specific depth spokes out to `design/*.md`. If a section outgrows its weight, spoke it.

## Known Gaps

Open reconciliations and out-of-scope areas, tracked so they don't masquerade as settled canon:

- **Gradient violet end-stop SETTLED (2026-06-10)** — canon is `violet-600`, matching `GradientButton` and the shipped majority. Remaining work is code-side: reconcile the three `to-violet-500` sites (`UseCaseTree`, `CustomerStory`, `Materialize Hero`), and note the shipped cool gradient (`teal-300 → violet-500`, cloud pages + signup) runs the *reverse* direction of spec `cool-hero` (`violet-500 → teal-400`) — both tracked in the gradients→code reconcile (parking-lot 65).
- ~~Radius literal-px labels~~ **RESOLVED 2026-06-11** — the `rounded` block now carries the stock Tailwind values shipped by marketing, with the design-system app's shadcn calc system documented alongside. (The old table matched neither.)
- **App-tier components not promoted** — `Callout`, `TerminalWindow`, `RelationshipsTable`, `IfStatementsToCheckPermission` live in app code, not `components/ui/`. (See `design/components.md`.)
- **Logomark SVG hex drift** — shipped logo SVGs carry legacy hexes (`#A43189` / `#F0546C` / `#FFB371`) that don't match canonical tokens. Use tokens, not the SVG hexes. (See `design/logo-brand.md`.)
- **Diagram token corrected (2026-06-09)** — the old aspirational `dashed-border` token (dashed "4 4" connectors, magenta-active) never shipped; replaced with the real vocabulary (solid teal connectors, dashed "7 3" scope containers, the checkpoint beam). Canon: `design/diagrams.md`.
- **Product-tier spoke unpublished** — `design/product-ui.md` exists in-repo but is ON HOLD pending review ("do not treat as canon"); it's excluded from the Deep Dives manifest and the kit skill until promoted.
- **Voice & tone is out of scope** — brand voice/messaging lives in the separate messaging repo, not this design spec. Don't add a voice spoke here.
- **No SpiceDB / SpiceBox deviations** — if those products grow sibling palettes/voices, add `## SpiceDB` / `## SpiceBox` subsections (or split into per-product spokes).
- **`components:` token block absent** — the standard DESIGN.md-format `components` token group isn't populated; component specs live in prose + the components spoke instead. Intentional — noted so tooling that expects it doesn't read the absence as an error.
