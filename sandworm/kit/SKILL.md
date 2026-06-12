---
name: Sandworm Design System
description: AuthZed's Sandworm design system. Use when designing or building any AuthZed marketing site, product UI, brand material, system diagram, or chart — generates on-brand interfaces that are technical, warm, and distinctly AuthZed (magenta-600 + sand-300 over a purple-tinted near-black, dark by default, font-light with magenta emphasis, the gradient checkpoint motif for authorization diagrams, and the Rakis value-count chart palettes). Covers color tokens, typography, layout, components, dataviz, diagrams, motion, and accessibility.
---

# Sandworm Design System

This skill makes Claude design on-brand for AuthZed. The canonical spec is the hub at **`../DESIGN.md`**
plus its spokes under **`../design/`** (this kit lives at `kit/` inside the spec directory — the whole
`sandworm/` folder ships as one bundle). The token files here are **generated from** that spec — the spec
is the source of truth, the kit is its machine-readable export.

## How to use

1. **Always read `../DESIGN.md` first** — it holds the primitive tokens (color, type, spacing, motion) and
   the foundational rules. It's the hub.
2. **Load the relevant spoke** for the surface you're designing:
   - `../design/palette.md` — the full color table (hexes; token refs resolve here)
   - `../design/components.md` — buttons, cards, callouts, terminal, section labels
   - `../design/dataviz.md` — Rakis chart palettes (value-count-indexed, 1-20 series, both surfaces)
   - `../design/diagrams.md` — nodes, scope containers, connectors, the **checkpoint beam**
   - `../design/logo-brand.md` — logo/wordmark usage, mark colors, clear space, sizes
   - `../design/accessibility.md` — contrast ratios, focus/disabled states, vendor-prefix gotchas
   - `../design/animation.md` — motion patterns, keyframes, reduced-motion
   - `../design/web-ui.md` — *(draft)* page-level composition for authzed.com
   - `../design/print.md` — *(draft)* print one-pagers, icon tiles, the print-media contract
   - `../design/slides.md` — *(draft)* 16:9 deck language: type scale, agenda capsule, layout recipes
> **Draft policy**: spokes marked *(draft)* are code-grounded but pending review — design against them,
> and verify stamped claims when the stakes are high. Spokes marked ON HOLD are internal and excluded
> from this skill entirely.

3. **Pull tokens from the kit** when you need machine-readable values:
   - `colors_and_type.css` — CSS custom properties (`var(--magenta-600)`, `var(--gradient-warm-hero)`)
   - `tailwind.tokens.json` — drop into `theme.extend`
   - `tokens.dtcg.json` — W3C DTCG format for token tooling
   - `assets/` — the brand SVGs (wordmarks, logomarks, stacked variants) under stable filenames

## The fingerprint (read before generating)

- **Warm-technical, never cold-enterprise** — magenta + sand over purple-tinted near-black; no bank-blue.
- **Dark by default**; light mode is the deliberate minority.
- **`font-light` everything**; bold is reserved for `magenta-600` in-prose emphasis.
- **A gradient family, used sparingly** — the warm `sand → red → violet` 3-stop is primary.
- **4/8 asymmetric composition**; symmetric 6/6 reads as generic SaaS.
- **Restrained motion** — 200/300/500ms, `ease-in-out`, no bounce.
- **Diagrams**: solid node, dashed scope-container, teal=allowed / red=denied connectors, and the
  gradient **checkpoint beam** as the signature "authorization happens here" device.

## Do not

- Use generic Tailwind palette (`gray-500`, `blue-600`) or arbitrary hex for brand surfaces.
- Reach for the brand gradient beyond primary actions — primary CTAs ARE `button-primary` (gradient); the overuse warning is about gradient-washing secondary buttons and decorative surfaces.
- Invent chart palettes — Rakis IS the dataviz system.
- Use dashed lines for diagram connectors — dashed = scope container only.

> Voice & tone is **out of scope** — it lives in AuthZed's separate messaging repo, not this design system.
