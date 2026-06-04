---
name: Sandworm — Data Visualization
description: The Chroma-Charts Rakis chart palette system for Sandworm.
part-of: Sandworm
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
  sourceFile: "BigBrain 11.02 / Rakis-chart-colors.css"
  primitive: "components/ui/chart.tsx (shadcn ChartContainer + recharts)"

  # The single most important Rakis rule. Counter-intuitive but correct.
  surface-rule:
    use-on-dark: "root-block-bright-variants"     # `:root` block — bright values that pop
    use-on-light: "dark-block-muted-variants"     # `.dark` block — darker muted values
    rationale: |
      Counter-intuitive but correct: dark dashboards use the BRIGHT (`:root`) palette because
      muted colors read muddy on dark backgrounds. Light surfaces use the muted (`.dark`)
      palette because bright colors blow out on light. This inverts the naming intuition —
      the `:root` block ships on DARK surfaces, the `.dark` block ships on LIGHT surfaces.
    code-reference: "Rule documented inline at CloudMetricsCarousel.tsx:15-25"

  # Default 5-value palette — most common, used in CloudMetricsCarousel dashboards
  # Sandworm-native names (chroma-charts file has off-by-one labels with same hex —
  # the file's `magenta-700` is the same hex as Sandworm's `magenta-600`, etc.
  # CloudMetricsCarousel comment block explains the mapping)
  default-5-value:
    1: { token: "{colors.sand.300}", hex: "#ffb370" }
    2: { token: "{colors.red.500}", hex: "#f0566d" }
    3: { token: "{colors.magenta.600}", hex: "#a5318a" }
    4: { token: "{colors.violet.300}", hex: "#ad96f3" }
    5: { token: "{colors.teal.400}", hex: "#72b1ad" }
    notes: "Used in CloudMetricsCarousel for production-realistic SpiceDB ops dashboards (CheckPermission volume, AtLeastAsFresh ratios, latency percentiles)."

  # 3-axis radar pattern — assessment HexRadarChart
  # These are the brand-gradient stops (sand → red → violet) used as axis colors.
  # Different from the 5-value palette — radar uses brighter "-400" stops because
  # the polygon fills are semi-transparent and need saturation to read.
  axis-3-radar:
    performance: { token: "{colors.sand.300}", hex: "#ffb370" }
    risk: { token: "{colors.red.400}", hex: "#f9808a" }
    agility: { token: "{colors.violet.400}", hex: "#9278ed" }
    source: "projects/web/src/app/(main)/assessment/HexRadarChart.tsx:37-41"
    notes: "Sand-300 / red-400 / violet-400 — distinct from the 5-value palette's red-500/violet-300. Radar canon, not dashboard canon."

  # Per-value palette scale — full table in Rakis-chart-colors.css (palettes for 2-20 values)
  # The most common counts:
  per-value-palettes:
    "2": ["{colors.sand.300}", "{colors.red.500}"]
    "3": ["{colors.sand.300}", "{colors.red.500}", "{colors.magenta.600}"]
    "4": ["{colors.sand.300}", "{colors.red.500}", "{colors.magenta.600}", "{colors.violet.300}"]
    "5": ["{colors.sand.300}", "{colors.red.500}", "{colors.magenta.600}", "{colors.violet.300}", "{colors.teal.400}"]
    "6": ["{colors.sand.300}", "{colors.red.400}", "{colors.red.500}", "{colors.magenta.600}", "{colors.violet.300}", "{colors.teal.400}"]
    "7": ["{colors.sand.300}", "{colors.red.400}", "{colors.red.500}", "{colors.magenta.500}", "{colors.magenta.600}", "{colors.violet.300}", "{colors.teal.400}"]
    # 8 through 20 — see source file. Each adds stops by expanding the palette, not appending.
    notes: "When data-series count changes, swap palettes — DON'T extend by appending. Each palette is a re-balanced set."

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
    barRadius: "{rounded.sm}"               # 4px — bar corners
    lineWidth: 2
    pointRadius: 4
    pointHoverRadius: 6
    animationDuration: "{motion.duration.base}"   # 300ms — chart-render animation

  notes: |
    DO NOT invent categorical / sequential / diverging palettes alongside Rakis — Rakis IS
    the system. (Earlier drafts of this spec had an invented 7-color sequence starting with
    magenta-600 + a status palette + intensity ramps — all wrong. Sandworm canon starts with
    sand-300, uses value-count-indexed palettes, and follows the surface-rule.) Read
    Rakis-chart-colors.css for the full per-value table.
```

## Data Visualization

Sandworm's chart system is **Chroma-Charts Rakis** — a value-count-based palette family. Reference implementations ship in `projects/web/src/components/cloud/CloudMetricsCarousel.tsx` (5-value dashboards), `projects/web/src/app/(main)/assessment/HexRadarChart.tsx` (3-axis radar), and `projects/design/sandworm/components/ui/chart.tsx` (the shadcn ChartContainer wrapping recharts).

> **Earlier drafts of this spec invented a 7-color categorical sequence + status palette + intensity ramps.** That was wrong — Sandworm has Rakis, and Rakis IS the dataviz canon. The corrected description follows.

### How Rakis works

Rakis is **value-count-indexed**. For a chart with N data series, use the N-value palette. The palette re-balances when N changes — you do NOT take "5-value plus one more color" — you swap to the 6-value palette, which redistributes ALL stops to support 6 series.

The default and most common palette is **5-value**:

1. **Sand 300** — `#ffb370`
2. **Red 500** — `#f0566d`
3. **Magenta 600** — `#a5318a`
4. **Violet 300** — `#ad96f3`
5. **Teal 400** — `#72b1ad`

For other counts, see the per-value-palettes YAML table or the source CSS file (which carries the full 2-through-20 value range).

### The Rakis surface rule (load-bearing, counter-intuitive)

**On DARK surfaces, use the BRIGHT (`:root`) variants. On LIGHT surfaces, use the MUTED (`.dark`) variants.**

This inverts naming intuition. The reason: muted colors read muddy on dark backgrounds, and bright colors blow out on light. The `:root` block in `Rakis-chart-colors.css` has the bright pop colors that work on dark dashboards; the `.dark` block has the deeper muted variants that hold up against light pages.

This rule is documented inline at `CloudMetricsCarousel.tsx:15-25` — when in doubt, read that comment block.

### Radar charts use a different palette

The assessment `HexRadarChart` uses the **3-axis radar palette** — distinct from the 5-value default:

- **Performance** — sand-300 (`#ffb370`)
- **Risk** — red-400 (`#f9808a`) ← red-400, NOT red-500
- **Agility** — violet-400 (`#9278ed`) ← violet-400, NOT violet-300

These are the brand-gradient stops applied as axis colors. Brighter "-400" stops because the polygon fills are semi-transparent and need saturation to register through the overlay. Source: `HexRadarChart.tsx:37-41`.

### Chart chrome

Gridlines, axes, labels, and tooltips use the stone scale. Two rules:

- **Gridlines must whisper, not shout** — stone-800 on dark, stone-150 on light. If gridlines compete with the data series, lighten them further.
- **Legends use the mono-caps label style** (same as section labels) — signals "this is structural metadata, not content."

### Don't invent

The strongest dataviz guidance in this spec: **do not invent new palettes alongside Rakis**. No "categorical sequence starting with magenta-600." No "alert series at position 6." No diverging cool-warm palette. If a chart needs a treatment Rakis doesn't cover, surface it as a gap to fix in the canonical CSS, not as a parallel system in the consuming component.
