---
name: Sandworm — Data Visualization
description: The Chroma-Charts Rakis chart palette system for Sandworm — value-count-indexed palettes (1-20 series), surface rule, and chart-type guidance.
part-of: Sandworm
status: stable   # finished 2026-06-09 — full 1-20 palette table (both surfaces) + chart-type guidance
---

> **Primitive tokens** (`{colors.*}`, `{typography.*}`, `{spacing.*}`, `{motion.*}`, `{rounded.*}`, `{elevation.*}`) are defined in the hub at [`../DESIGN.md`](../DESIGN.md). Load the hub alongside this spoke.

← Back to [Sandworm DESIGN.md](../DESIGN.md)

## Data Visualization tokens

```yaml
# Data Visualization — the Chroma-Charts Rakis palette system
# Reference implementations:
#   - projects/web/src/components/cloud/CloudMetricsCarousel.tsx (5-value, dashboards)
#   - projects/web/src/app/(main)/assessment/HexRadarChart.tsx (3-axis radar)
#   - projects/web/src/components/mdx/custom/GoogleScaleChart.tsx (theme-aware)
#   - projects/design/sandworm/components/ui/chart.tsx (shadcn ChartContainer wrapping recharts)
#
# Rakis is VALUE-COUNT-BASED. For a chart with N data series, use the N-value palette —
# each palette adjusts ALL stops when value count changes. DO NOT take "5-value plus
# one more color" — use the 6-value palette (its stops re-balance to support 6).
dataviz:
  system: "Rakis (Chroma-Charts)"
  sourceFile: "Rakis-chart-colors.css (chroma-charts project source — internal provenance; the FULL table is transcribed in per-value-palettes below, so the CSS is never required)"
  primitive: "components/ui/chart.tsx (shadcn ChartContainer + recharts)"

  # The single most important Rakis rule. Counter-intuitive but correct.
  surface-rule:
    use-on-dark: "dark-surface palette (CSS `:root` / bright variants)"
    use-on-light: "light-surface palette (CSS `.dark` / muted variants)"
    rationale: |
      Counter-intuitive but correct: dark dashboards use the BRIGHT palette because muted
      colors read muddy on dark backgrounds. Light surfaces use the MUTED palette because
      bright colors blow out on light. This inverts the naming intuition — the CSS `:root`
      block ships on DARK surfaces, the CSS `.dark` block ships on LIGHT surfaces.
    code-reference: "Rule documented inline at CloudMetricsCarousel.tsx:15-25"

  # Default 5-value palette — most common, used in CloudMetricsCarousel dashboards.
  # NOTE the off-by-one: the source CSS uses chroma-charts labels where its `magenta-700`
  # is the SAME hex as Sandworm's `magenta-600`. The tables below are already remapped to
  # Sandworm palette names; hex is the authoritative value.
  default-5-value:
    1: { token: "{colors.sand.300}", hex: "#ffb370" }
    2: { token: "{colors.red.500}", hex: "#f0566d" }
    3: { token: "{colors.magenta.600}", hex: "#a5318a" }
    4: { token: "{colors.violet.300}", hex: "#ad96f3" }
    5: { token: "{colors.teal.400}", hex: "#72b1ad" }
    notes: "Used in CloudMetricsCarousel for production-realistic SpiceDB ops dashboards (CheckPermission volume, AtLeastAsFresh ratios, latency percentiles)."

  # 3-axis radar pattern — assessment HexRadarChart.
  # These are the brand-gradient stops (sand → red → violet) used as axis colors.
  # Different from the 5-value palette — radar uses brighter "-400" stops because the
  # polygon fills are semi-transparent and need saturation to read.
  axis-3-radar:
    performance: { token: "{colors.sand.300}", hex: "#ffb370" }
    risk: { token: "{colors.red.400}", hex: "#f9808a" }
    agility: { token: "{colors.violet.400}", hex: "#9278ed" }
    source: "projects/web/src/app/(main)/assessment/HexRadarChart.tsx:37-41"
    notes: "Sand-300 / red-400 / violet-400 — distinct from the 5-value palette's red-500/violet-300. Radar canon, not dashboard canon."

  # FULL per-value palette table (1-20 series), both surfaces.
  # Machine-parsed from Rakis-chart-colors.css (2026-06-09), remapped to Sandworm token names.
  # `dark-surface` = CSS `:root` (bright), use on DARK dashboards.
  # `light-surface` = CSS `.dark` (muted), use on LIGHT pages.
  # Swap palettes by series count — do NOT append a color to a smaller palette; each set is re-balanced.
  per-value-palettes:
    "2":
      dark-surface:  [sand-300, red-500]
      light-surface: [sand-400, red-600]
    "3":
      dark-surface:  [sand-300, red-500, magenta-600]
      light-surface: [sand-400, red-600, magenta-600]
    "4":
      dark-surface:  [sand-300, red-500, magenta-600, violet-300]
      light-surface: [sand-400, red-600, magenta-600, violet-500]
    "5":
      dark-surface:  [sand-300, red-500, magenta-600, violet-300, teal-400]
      light-surface: [sand-400, red-600, magenta-600, violet-500, teal-600]
    "6":
      dark-surface:  [sand-300, red-400, red-500, magenta-600, violet-300, teal-400]
      light-surface: [sand-400, red-600, red-800, magenta-600, violet-500, teal-600]
    "7":
      dark-surface:  [sand-300, red-400, red-500, magenta-400, magenta-600, violet-300, teal-400]
      light-surface: [sand-400, red-600, red-800, magenta-500, magenta-700, violet-500, teal-600]
    "8":
      dark-surface:  [sand-200, sand-300, red-400, red-500, magenta-400, magenta-600, violet-300, teal-400]
      light-surface: [sand-400, sand-600, red-600, red-800, magenta-500, magenta-700, violet-500, teal-600]
    "9":
      dark-surface:  [sand-200, sand-300, red-400, red-500, magenta-400, magenta-600, violet-300, teal-200, teal-400]
      light-surface: [sand-400, sand-600, red-600, red-800, magenta-500, magenta-700, violet-500, teal-400, teal-600]
    "10":
      dark-surface:  [sand-200, sand-300, red-400, red-500, magenta-200, magenta-400, magenta-600, violet-300, teal-200, teal-400]
      light-surface: [sand-400, sand-600, red-600, red-800, magenta-300, magenta-500, magenta-700, violet-500, teal-400, teal-600]
    "11":
      dark-surface:  [sand-200, sand-300, red-400, red-500, magenta-200, magenta-400, magenta-600, violet-100, violet-300, teal-200, teal-400]
      light-surface: [sand-400, sand-600, red-600, red-800, magenta-300, magenta-500, magenta-700, violet-300, violet-500, teal-400, teal-600]
    "12":
      dark-surface:  [sand-200, sand-300, red-200, red-400, red-500, magenta-200, magenta-400, magenta-600, violet-100, violet-300, teal-200, teal-400]
      light-surface: [sand-400, sand-600, red-400, red-600, red-800, magenta-300, magenta-500, magenta-700, violet-300, violet-500, teal-400, teal-600]
    "13":
      dark-surface:  [sand-200, sand-300, red-200, red-400, red-500, magenta-200, magenta-400, magenta-600, violet-100, violet-300, violet-500, teal-200, teal-400]
      light-surface: [sand-400, sand-600, red-400, red-600, red-800, magenta-300, magenta-500, magenta-700, violet-300, violet-500, violet-700, teal-400, teal-600]
    "14":
      dark-surface:  [sand-200, sand-300, red-200, red-400, red-500, magenta-200, magenta-400, magenta-600, violet-100, violet-300, violet-500, teal-200, teal-400, teal-600]
      light-surface: [sand-400, sand-600, red-400, red-600, red-800, magenta-300, magenta-500, magenta-700, violet-300, violet-500, violet-700, teal-400, teal-600, teal-800]
    "15":
      dark-surface:  [sand-200, sand-300, sand-500, red-200, red-400, red-500, magenta-200, magenta-400, magenta-600, violet-100, violet-300, violet-500, teal-200, teal-400, teal-600]
      light-surface: [sand-400, sand-600, sand-800, red-400, red-600, red-800, magenta-300, magenta-500, magenta-700, violet-300, violet-500, violet-700, teal-400, teal-600, teal-800]
    "16":
      dark-surface:  [sand-200, sand-300, sand-500, red-200, red-400, red-500, magenta-200, magenta-400, magenta-600, violet-100, violet-300, violet-500, teal-200, teal-400, teal-600, stone-300]
      light-surface: [sand-400, sand-600, sand-800, red-400, red-600, red-800, magenta-300, magenta-500, magenta-700, violet-300, violet-500, violet-700, teal-400, teal-600, teal-800, stone-300]
    "17":
      dark-surface:  [sand-200, sand-300, sand-500, red-200, red-400, red-500, magenta-200, magenta-400, magenta-600, violet-100, violet-300, violet-500, teal-200, teal-400, teal-600, stone-300, stone-500]
      light-surface: [sand-400, sand-600, sand-800, red-400, red-600, red-800, magenta-300, magenta-500, magenta-700, violet-300, violet-500, violet-700, teal-400, teal-600, teal-800, stone-300, stone-500]
    "18":
      dark-surface:  [sand-200, sand-300, sand-500, red-200, red-400, red-500, magenta-200, magenta-400, magenta-600, violet-100, violet-300, violet-500, teal-200, teal-400, teal-600, stone-300, stone-500, stone-700]
      light-surface: [sand-400, sand-600, sand-800, red-400, red-600, red-800, magenta-300, magenta-500, magenta-700, violet-300, violet-500, violet-700, teal-400, teal-600, teal-800, stone-300, stone-500, stone-600]
    "19":
      dark-surface:  [sand-200, sand-300, sand-500, red-200, red-400, red-500, magenta-200, magenta-400, magenta-600, violet-100, violet-300, violet-500, teal-200, teal-400, teal-600, stone-300, stone-500, stone-700, stone-950]
      light-surface: [sand-400, sand-600, sand-800, red-400, red-600, red-800, magenta-300, magenta-500, magenta-700, violet-300, violet-500, violet-700, teal-400, teal-600, teal-800, stone-300, stone-500, stone-600, stone-800]
    "20":
      dark-surface:  [sand-200, sand-300, sand-500, red-200, red-400, red-500, magenta-200, magenta-400, magenta-600, violet-100, violet-300, violet-500, teal-200, teal-400, teal-600, stone-200, stone-300, stone-500, stone-700, stone-950]
      light-surface: [sand-400, sand-600, sand-800, red-400, red-600, red-800, magenta-300, magenta-500, magenta-700, violet-300, violet-500, violet-700, teal-400, teal-600, teal-800, stone-200, stone-300, stone-500, stone-600, stone-800]
  per-value-palettes-notes: |
    - `magenta-200` in the 10-20 dark-surface sets maps to source hex #e3bad5, which is ~1 digit off
      Sandworm magenta-200 (#e3bad6) — treat as magenta-200.
    - The 7+ dark-surface 4th-magenta stop is magenta-400 (#c270ab) — corrected 2026-06-09 from an earlier
      hand-transcription that mislabeled it magenta-500. (Hex was always right; the Sandworm name was off.)
    - Counts 16-20 extend into the stone neutrals — you've exhausted the brand hues. Avoid >12 series on a
      single chart where you can; readability collapses past that regardless of palette.

  # Chart chrome — supporting structural colors
  chrome:
    gridlineColor-dark: "{colors.stone.800}"
    gridlineColor-light: "{colors.stone.150}"
    axisLabelColor-dark: "{colors.stone.400}"
    axisLabelColor-light: "{colors.stone.500}"
    axisLineColor-dark: "{colors.stone.700}"
    axisLineColor-light: "{colors.stone.200}"
    tooltipBackground-dark: "{colors.stone.950}"
    tooltipBackground-light: "#ffffff"
    tooltipBorder-dark: "{colors.stone.700}"
    tooltipBorder-light: "{colors.stone.150}"
    legendLabelTypography: "{typography.label-caps}"

  # Defaults applied to all charts in the system
  defaults:
    fontFamily: "{typography.fontFamily.sans}"
    fontSize: "0.875rem"
    labelFontSize: "0.75rem"
    barRadius: "{rounded.base}"             # 4px — bar corners (ref updated 2026-06-11 with the corrected radius table)
    lineWidth: 2
    pointRadius: 4
    pointHoverRadius: 6
    animationDuration: "{motion.duration.base}"   # 300ms — chart-render animation

  notes: |
    DO NOT invent categorical / sequential / diverging palettes alongside Rakis — Rakis IS
    the system. (Earlier drafts of this spec had an invented 7-color sequence starting with
    magenta-600 + a status palette + intensity ramps — all wrong. Sandworm canon starts with
    sand-300, uses value-count-indexed palettes, and follows the surface-rule.) The full per-value
    table above is the source of truth; Rakis-chart-colors.css is its origin.
```

## Data Visualization

Sandworm's chart system is **Chroma-Charts Rakis** — a value-count-based palette family. Reference implementations ship in `projects/web/src/components/cloud/CloudMetricsCarousel.tsx` (5-value dashboards), `projects/web/src/app/(main)/assessment/HexRadarChart.tsx` (3-axis radar), and `projects/design/sandworm/components/ui/chart.tsx` (the shadcn ChartContainer wrapping recharts).

> **Earlier drafts of this spec invented a 7-color categorical sequence + status palette + intensity ramps.** That was wrong — Sandworm has Rakis, and Rakis IS the dataviz canon. The corrected description follows.

### How Rakis works

Rakis is **value-count-indexed**. For a chart with N data series, use the N-value palette. The palette re-balances when N changes — you do NOT take "5-value plus one more color" — you swap to the 6-value palette, which redistributes ALL stops to support 6 series.

The default and most common palette is **5-value** (dark-surface): sand-300, red-500, magenta-600, violet-300, teal-400. The full table for 2-through-20 series — for **both** dark and light surfaces — lives in the `per-value-palettes` YAML block above. When a series count changes, swap to that count's palette; never extend a smaller one by appending a color.

### The Rakis surface rule (load-bearing, counter-intuitive)

**On DARK surfaces, use the BRIGHT (`dark-surface`) palette. On LIGHT surfaces, use the MUTED (`light-surface`) palette.**

This inverts naming intuition. The reason: muted colors read muddy on dark backgrounds, and bright colors blow out on light. In `Rakis-chart-colors.css` the `:root` block holds the bright pop colors that work on dark dashboards; the `.dark` block holds the deeper muted variants that hold up against light pages. Both are transcribed in the table above as `dark-surface` and `light-surface` respectively — so you never have to reach back into the CSS to find the muted set.

This rule is documented inline at `CloudMetricsCarousel.tsx:15-25` — when in doubt, read that comment block.

### Radar charts use a different palette

The assessment `HexRadarChart` uses the **3-axis radar palette** — distinct from the 5-value default:

- **Performance** — sand-300 (`#ffb370`)
- **Risk** — red-400 (`#f9808a`) ← red-400, NOT red-500
- **Agility** — violet-400 (`#9278ed`) ← violet-400, NOT violet-300

These are the brand-gradient stops applied as axis colors. Brighter "-400" stops because the polygon fills are semi-transparent and need saturation to register through the overlay. Source: `HexRadarChart.tsx:37-41`.

### Chart types

Rakis is a palette system, not a chart-type system — but here's how it maps onto the chart forms that ship (recharts via `components/ui/chart.tsx`, plus the hand-rolled radar). Pick the form by data shape, then apply the value-count palette + surface rule. The **palette, surface rule, chrome, and `defaults` values are canonical**; the per-form ratios below are recommended starting points.

- **Line / area (time series)** — the default dashboard form (CloudMetricsCarousel). One series per metric; use the N-value palette for N lines. `lineWidth: 2`, `pointRadius: 4` (from `defaults`). For area fills, drop the series color to a low alpha so overlapping bands stay legible. Keep gridlines whisper-quiet (stone-800 dark / stone-150 light) so they never compete with the data.
- **Bar / stacked bar (categorical)** — `barRadius: {rounded.sm}` (4px). Grouped bars index the value palette across groups; stacked bars index it across stack segments. Keep stacks to ~6-7 segments — past that, re-cut the data rather than reaching for a 12-color palette.
- **Donut / pie (part-to-whole)** — value-count palette by slice count. Cap at ~5-6 slices and roll the tail into a single stone-400 "Other". Pie is the weakest form here — prefer a stacked bar unless part-to-whole *is* the story.
- **Radar (multi-axis profile)** — the HexRadarChart pattern. Uses the dedicated 3-axis radar palette (sand-300 / red-400 / violet-400), NOT the 5-value default — the brighter -400 stops read through the semi-transparent polygon fills. One palette per overlaid profile.
- **Scatter / bubble** — single-series uses sand-300 (dark) / sand-400 (light); multi-series uses the value palette. Lower point opacity so dense clusters show density.
- **Single big number / sparkline** — no palette needed; the number takes the foreground (stone-025 dark / stone-900 light), the sparkline takes sand-300 (dark) / sand-400 (light).

**Across every type**: legends use `{typography.label-caps}` (mono-caps — "this is structural metadata, not content"), render animation runs at `{motion.duration.base}` (300ms), and the surface rule is non-negotiable — bright palette on dark, muted on light.

### Chart chrome

Gridlines, axes, labels, and tooltips use the stone scale. Two rules:

- **Gridlines must whisper, not shout** — stone-800 on dark, stone-150 on light. If gridlines compete with the data series, lighten them further.
- **Legends use the mono-caps label style** (same as section labels) — signals "this is structural metadata, not content."

### Don't invent

The strongest dataviz guidance in this spec: **do not invent new palettes alongside Rakis**. No "categorical sequence starting with magenta-600." No "alert series at position 6." No diverging cool-warm palette. If a chart needs a treatment Rakis doesn't cover, surface it as a gap to fix in the canonical CSS (`Rakis-chart-colors.css`), not as a parallel system in the consuming component.
