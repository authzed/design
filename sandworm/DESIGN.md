---
name: Sandworm
description: AuthZed's unified design system. Quiet, technical, trustworthy. Used across the marketing site, product surfaces, and brand materials.
version: 0.1
colors:
  # Brand-level semantic tokens (high-level shortcuts)
  primary: "{colors.magenta.600}"
  secondary: "{colors.teal.500}"
  accent: "{colors.sand.300}"
  highlight: "{colors.violet.500}"
  alert: "{colors.red.500}"
  info: "{colors.blue.500}"
  surface: "{colors.stone.025}"
  surface-dark: "{colors.stone.975}"
  text: "{colors.stone.975}"
  text-dark: "{colors.stone.025}"

  # Full palette — 7 families × 15 stops, HSL-derived hex
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

  # Semantic mappings (light → dark token pairs)
  semantic:
    background: { light: "{colors.stone.025}", dark: "{colors.stone.975}" }
    foreground: { light: "{colors.stone.975}", dark: "{colors.stone.025}" }
    muted: { light: "{colors.stone.050}", dark: "{colors.stone.850}" }
    border: { light: "{colors.stone.150}", dark: "{colors.stone.850}" }
    success: { light: "{colors.teal.050}", dark: "{colors.teal.900}" }
    warning: { light: "{colors.sand.050}", dark: "{colors.sand.900}" }
    error: { light: "{colors.red.050}", dark: "{colors.red.900}" }
    creative: { light: "{colors.violet.050}", dark: "{colors.violet.900}" }

# Gradient family — the canonical gradient set, cross-referenced from components.
# Each gradient is a NAMED member of the family, not "the brand gradient" singular.
gradients:
  # Primary warm 3-stop — THE brand gradient. Used on hero emphasis spans, GradientButton,
  # customer-story card halos, brand mark headlines. Most-shipped form across marketing surfaces.
  brand-warm:
    type: linear
    direction: to right
    stops:
      - { color: "{colors.sand.300}", position: 0% }
      - { color: "{colors.red.400}", position: 50% }
      - { color: "{colors.violet.500}", position: 100% }

  # Warm 2-stop sunset — accent strips, narrower CTAs
  brand-sunset:
    type: linear
    direction: to right
    stops:
      - { color: "{colors.sand.300}", position: 0% }
      - { color: "{colors.red.500}", position: 100% }

  # Cool 2-stop — Cloud product page hero, surfaces where warm would over-saturate
  brand-cool:
    type: linear
    direction: to right
    stops:
      - { color: "{colors.teal.300}", position: 0% }
      - { color: "{colors.violet.500}", position: 100% }
    notes: "Used on /products/authzed-cloud hero. CLAUDE.md line 101 cites an older `from-violet-400 to-teal-400` reversal — that form is not currently shipped; treat this teal-300 → violet-500 as canonical."

  # Sand to magenta — careers page underlines, transitions landing on brand primary
  brand-warm-to-magenta:
    type: linear
    direction: to right
    stops:
      - { color: "{colors.sand.300}", position: 0% }
      - { color: "{colors.magenta.600}", position: 100% }

  # Warm-to-magenta 3-stop — Newsletter, careers variants
  brand-warm-magenta-3stop:
    type: linear
    direction: to right
    stops:
      - { color: "{colors.sand.300}", position: 0% }
      - { color: "{colors.red.400}", position: 50% }
      - { color: "{colors.magenta.500}", position: 100% }   # newsletter uses -500; careers uses -600

  # Historical callout — teal that was once wrong in shipped surfaces.
  # `#497D7A` is NOT teal-500. teal-500 IS `#549693`. The wrong hex shipped briefly years ago
  # and the explicit callout persists in CLAUDE.md as a guardrail. Documenting here so the
  # spec carries the warning forward.
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

# Mode — explicit light/dark semantic token sets (sibling siblings, not derived from prose)
mode-dark:
  surface: "{colors.stone.975}"
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

# Dashed-border system — used for graph/system imagery
# Note: shipped use is primarily SVG (stroke-dasharray on connecting lines + paths in UseCaseTree fan)
# but the visual vocabulary also applies to CSS borders on "system map" containers.
dashed-border:
  cssBorder:
    style: dashed
    width: 1px
    color: "{colors.stone.700}"                          # dark mode
    color-light: "{colors.stone.150}"                    # light mode
  svgStroke:
    dashArray: "4 4"                                     # 4px on, 4px off — UseCaseTree fan
    strokeWidth: 1
    strokeColor: "{colors.stone.500}"
    strokeColor-active: "{colors.magenta.600}"           # when hovering an attached node
  notes: "Visual language for 'these are nodes in a graph / connected system'. Solid borders = atomic surfaces (cards, buttons); dashed borders = systems (Use Case Tree, schema graphs, relationship diagrams)."

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
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 9999px
  # Cards default to xl ("rounded-xl" in Tailwind)

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

**Five principles**, in tension order:

1. **Precision over decoration.** Type, color, and motion exist to clarify the system underneath. If a flourish doesn't earn its weight by aiding comprehension, cut it.
2. **Warm authority.** The palette is dark and confident, but never cold. Sand-300 (#ffb370) is the warmth that keeps the technical surface from reading as sterile enterprise.
3. **Developer empathy.** Copy speaks to the practitioner who already knows what authorization is. Skip the explainer paragraphs; show the code.
4. **Distinctive, not trendy.** Sandworm avoids the current generic-SaaS palette (mint+navy+gradient-hero). Magenta-600 + sand-300 + teal-500 is a fingerprint, not a trend.
5. **System-first.** A token used in three places is documented. A pattern shipped twice gets a component. Tribal knowledge is a bug.

**Anti-references** — designs that violate Sandworm: generic startup-purple-gradient SaaS, overly corporate enterprise security (think bank-blue + locks), startup-playful illustration-heavy. If a comp could be Vercel's, Auth0's, or Stripe's without modification, it isn't AuthZed.

**The system is in code, not Figma.** `projects/web/src/styles/sandworm-colors.ts` and `projects/design/sandworm/lib/semantic-colors.ts` are canonical. Figma files are partial and may be out of date. When in doubt, read the TypeScript.

## Deep Dives

This hub holds the primitive tokens (colors, typography, spacing, motion, etc.) and the foundational prose. Deeper, surface-specific specs live in spokes — load the relevant spoke alongside this hub:

- [`design/components.md`](design/components.md) — full component token specs + per-component detail
- [`design/dataviz.md`](design/dataviz.md) — Rakis chart palette system
- [`design/logo-brand.md`](design/logo-brand.md) — logo/wordmark usage, mark colors, clear space, minimum sizes
- [`design/accessibility.md`](design/accessibility.md) — contrast ratios, focus/states, vendor-prefix gotchas
- [`design/animation.md`](design/animation.md) — motion patterns, keyframes, reduced-motion

## Colors

Sandworm uses seven color families, each on a 15-stop HSL-derived ramp (`025` → `975`). Hex values in the YAML are the rendered form; the live source uses HSL strings so dark mode and accessibility math stay clean.

**Brand spine** — `magenta-600` (`#a5318a`) is the AuthZed primary. It carries the wordmark, the in-prose emphasis (font-semibold + magenta-600 is the established pattern for highlighted phrases inside body copy), and the hover-state border on dark cards. `sand-300` (`#ffb370`) is the warm counterweight; it's the link color on dark backgrounds (`text-sand-300` → hover `text-sand-200`) and the lightest piece of the brand gradient. `teal-500` (`#549693`) is the cool tertiary — frequently used for secondary CTAs and success states.

**The brand gradient family** — Sandworm has a family of canonical gradients, not one. The PRIMARY warm 3-stop is `sand-300 (#ffb370) → red-400 (#f9808a) → violet` — where the violet end-stop ships as **both** `violet-500 (#7a5ce6)` and `violet-600 (#6242e0)` depending on surface (unresolved — see drift note below). This is the gradient on hero emphasis spans, customer story card halos, the homepage UseCaseTree gradient text, and product-page brand marks (UseCaseTree, CustomerStory, Materialize Hero, AI Authorization, etc.). Sister gradients used on specific surfaces:

- **Warm 2-stop sunset** — `sand-300 → red-500` (accent strips, narrower CTAs)
- **Cool 2-stop** — `teal-300 → violet-500` (Cloud product page hero — the alternative "cool" register when warm would over-saturate)
- **Sand to magenta** — `sand-300 → magenta-600` (careers page section underlines, transitions that need to land on the brand primary)

**The brand gradient is NOT for use on every surface** — over-application kills the signal. Use the primary warm 3-stop on hero emphasis and primary CTAs; reach for the sister gradients only when their specific surface logic applies.

> **Drift note — UNRESOLVED (2026-06-03)**: the violet end-stop ships as both `violet-500` (`#7a5ce6`) and `violet-600` (`#6242e0`) depending on surface. A 2026-06-03 source check found `#6242e0` (violet-600) in `UseCaseTree`, `globals.css:197`, **and** `GradientButton.tsx` — so violet-600 may be the *majority* form, not a GradientButton-only outlier as the prior (2026-05-28) draft assumed. **Do NOT canonize -500 vs -600 until a full repo grep settles which dominates.** Flagged for a follow-up reconciliation PR. (`projects/web/CLAUDE.md` line 101 also cites an older `from-violet-400 to-teal-400` cool reversal that is not currently shipped.)

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

**Brand weight is light.** Hero headlines run `font-light` (300) — the lightness is part of the warm-authority register. Marketing body prose also runs `font-light`. **Bold weight is reserved for emphasis spans** inside otherwise-light copy — `font-semibold text-magenta-600` is the AuthZed pattern (e.g., headline structure: `font-light "Every authorization use case."` + `font-semibold text-magenta-600 "One system."`).

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

**Radius scale**: the design system's `--radius` default is `0.5rem` (**8px**), and the shadcn-style scale derives from it (`lg = var(--radius)`, `md = calc(--radius − 2px)`, `sm = calc(--radius − 4px)`). The design-system `Card` ships `rounded-lg` (8px); marketing product cards often reach for a larger radius (`rounded-xl`). **There is no single canonical card radius — match the surface.** *(The literal-px labels below are the legacy Tailwind-scale framing from an earlier draft and don't all match the shadcn calc system; reconcile before canonizing. Verified default = 8px, 2026-06-03.)* The scale:

- `rounded-sm` (4px) — small chrome (input borders, badges)
- `rounded-md` (8px) — buttons, inline elements
- `rounded-lg` (12px) — callouts, terminal windows
- `rounded-xl` (16px) — marketing product cards, primary content surfaces
- `rounded-pill` (9999px) — pill chrome on the SpiceDB tree hub, badges

**Dashed borders** are the "connected system" motif — used on the use-case tree (Cyera-inspired hub + dashed-line fan, rounded corners), the relationship graph patterns, and any surface where the visual implication is "these are nodes in a graph". Solid borders are for atomic surfaces (cards, buttons); dashed borders are for systems.

**Iconography**: Lucide React is the icon system. Sizes default to `h-4 w-4` for inline, `h-5 w-5` for list items, `h-6 w-6` for section accents.

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

> TODO[brand]: This DESIGN.md doesn't cover SpiceDB-specific or SpiceBox-specific deviations. If those products end up with sibling palettes/voices, add them as `## SpiceDB` / `## SpiceBox` subsections (or split into per-product spokes).
