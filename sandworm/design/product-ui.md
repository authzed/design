---
name: Sandworm — Product UI
description: The product tier — AuthZed Cloud dashboard (rakis) chrome, density, semantic-token system, and the rakis↔Sandworm palette name mapping. The denser, quieter sibling of the marketing canon.
part-of: Sandworm
status: draft — ON HOLD   # held in review 2026-06-10; token/button/chart blocks RE-VERIFIED 2026-06-11 vs rakis@main cfc414b4c6 (still accurate, no material drift). Needs more refinement before advancing; do NOT treat as canon; open decision points flagged inline
---

> **Primitive tokens** (`{colors.*}`, `{typography.*}`, `{spacing.*}`, `{motion.*}`, `{rounded.*}`, `{elevation.*}`) are defined in the hub at [`../DESIGN.md`](../DESIGN.md). Load the hub alongside this spoke.

← Back to [Sandworm DESIGN.md](../DESIGN.md)

## What this spoke covers

The **product tier**: AuthZed Cloud's dashboard frontend (rakis — the `rakis/` subdir of the
`authzed/internal` repo; Next.js 15 + Tailwind v4 + shadcn new-york). Where the marketing site is
expressive (gradients, font-light, py-24 sections), the product is **dense and quiet** — same palette,
compressed rhythm, semantics-only color. This spoke documents what legitimately diverges, what's drift,
and the **name-mapping footgun** between rakis tokens and Sandworm canon.

## ⚠ The palette name offset (read this first)

Rakis ships the **same Sandworm hexes under names shifted one step**. An AI tool translating canon names
into rakis classes (or vice versa) will silently pick the wrong color. Verified mapping (2026-06-10; re-confirmed 2026-06-11 vs `cfc414b4c6` — stone ramps unchanged):

| Sandworm canon | hex | rakis token |
|---|---|---|
| `magenta-600` (brand primary) | `#a5318a` | `--magenta-700` |
| `magenta-500` | `#b35199` | `--magenta-600` |
| `magenta-400` | `#c270ab` | `--magenta-500` |
| `violet-500` | `#7a5ce6` | `--violet-600` |
| `stone-900` | `#1e1424` | `--stone-850` |
| `stone-950` | `#170d1c` | `--stone-900` |
| `stone-975` | `#0c050f` | `--stone-950` AND `--stone-975` (duplicated) |

This is the same off-by-one as the chroma-charts CSS documented in [`dataviz.md`](dataviz.md). **Hex is
authoritative; never trust a stop name across the repo boundary.** (Long-term fix candidate: re-key the
rakis ramps to canon names — tracked as a reconcile item.)

## Product-UI tokens

```yaml
product-ui:
  # ── TOKEN ARCHITECTURE ── (rakis/styles/globals.css — the single source)
  architecture:
    base: "full Sandworm ramps (stone/magenta/sand/teal/red/violet) as CSS vars — same hexes as canon, offset names (see mapping)"
    exposure: "SEMANTIC ONLY — base ramps are NOT registered as Tailwind utilities; bg-magenta-600 does not exist in the product. All color flows through semantic tokens. (~290 semantic usages, 0 direct palette classes — by design.)"
    config: "Tailwind v4 CSS-first (@theme in globals.css); NO tailwind.config file"
  semantics:
    background: { light: "{colors.stone.025}", dark: "{colors.stone.975}" }
    primary: "near-black stone (NOT magenta) — product CTAs are monochrome"
    muted: { light: "{colors.stone.200}", dark: "{colors.stone.800}" }     # rakis-named; canon hexes
    status:
      success: "teal pair (bg teal-200/fg teal-800 light; inverted dark)"
      warning: "sand pair"
      error: "red pair"
      creative: "violet pair — PRODUCT-ONLY 4th status hue: modifying / provisioning / in-progress states. Candidate for canonization in the hub semantic block."
    destructive: "stone-975 MONOCHROME (not red) — see decision points"
    inputplaceholder: "dedicated pair (stone-300 light / stone-700 dark)"

  # ── DENSITY RHYTHM ── the product compression of the 4px grid
  rhythm:
    control-height: 36px         # h-9 — inputs, buttons, selects
    table-header-height: 40px    # h-10
    cell-padding: 16px           # p-4
    card-padding: 24px           # p-6 (matches marketing card-padding)
    page-margin: 24px            # m-6 — full-bleed app frame, no max-width container
    dominant-text: "text-sm (14px); text-xs for metadata"
    notes: "Same 4px grid as marketing, compressed one register: m-6 page frames where marketing runs py-14/py-24 sections. No section-scale spacing exists in product."

  # ── CHROME ──
  chrome:
    pattern: "top-bar, NO sidebar — header (h-16, border-b, bg-background) + alerts + content + footer"
    nav-left: "logomark (multi-color icon, the ONLY brand-color chrome element) + org/system switcher combobox"
    nav-right: "changelog, theme toggle, support/docs links, user menu; Sheet drawer below md"
    nav-tabs: "soft-pill links: hover:bg-muted, active bg-muted, py-2 px-4 rounded-md — capability-gated row under the main bar"
    in-page-tabs: "shadcn enclosed TabsList (bg-muted p-1, active bg-background shadow-sm)"
    breadcrumb: "minimal — back-chevron outline button + bold title; no multi-level trail"

  # ── CONTROLS ──
  buttons:   # button.tsx re-verified 2026-06-11 @ cfc414b4c6 — unchanged since the Apr scout
    shape: "rounded-md, solid, near-flat (subtle shadow-sm on default, shadow-xs on the rest) — NO pill gradient-border CTAs in product (legitimate divergence)"
    variants: "default · destructive · outline · secondary · ghost · link — NO creative button (creative is a status-pill / spinner token, never a button variant)"
    default: "bg-primary (near-black) + shadow-sm → hover INVERTS to bg-accent/accent-foreground (light)"
    destructive: "bg-destructive (monochrome stone-975) + shadow-xs — NO hover state"
    secondary: "bg-secondary + shadow-xs — NO hover state"
    outline: "border-input bg-background + shadow-xs → hover inverts to bg-accent"
    sizes: { default: "h-9 px-4 text-sm font-medium", sm: "h-8 px-3 text-xs", lg: "h-10 px-8", icon: "h-9 w-9" }
    focus: "focus-visible:ring-1 ring-ring (= stone-975 light / stone-025 dark) + outline-hidden — 1px near-black/white, NOT marketing's 2px magenta (open decision)"
  forms:
    stack: "react-hook-form + zod + shadcn form.tsx"
    input: "h-9 rounded-md border-input bg-transparent text-sm; invalid = aria-invalid:border-error + bg-warning (red border, sand-tinted fill — distinctive, on-palette)"
    error-text: "text-destructive = near-BLACK under monochrome destructive (see decision points)"

  # ── DATA DISPLAY ──
  tables: "stock shadcn density: h-10 muted-foreground headers, p-4 text-sm cells, hover:bg-muted/50, rounded-md border wrapper (tanstack table v8)"
  status-pills: "hand-rolled (no badge.tsx): rounded-full border-2 px-2 py-1 text-xs font-bold + Lucide icon; fully semantic colorways incl. creative/violet spinner states"
  metrics: "bare label (muted-foreground) + text-2xl strong value — not cards"
  charts:
    tokens: "--chart-1..20 in globals.css = the Rakis value-count pools in add-order. Verified 1-10 (canon names): sand-300, red-500, magenta-600, violet-300, teal-400, red-400, magenta-400, sand-200, teal-200, magenta-200 — exactly the Rakis 10-value dark pool. 11-20 extend into deeper stops then stones (RAKIS names — translate via the mapping table). See dataviz.md."
    primitive: "recharts via shadcn ChartContainer"
    surface-rule-inversion: "⚠ DRIFT (found 2026-06-10): the BRIGHT set sits in :root (= light theme) and the MUTED set in .dark — the OPPOSITE of the Rakis surface rule (bright-on-dark, muted-on-light; dataviz.md). Likely a verbatim paste of the chroma-charts CSS without applying the counter-intuitive inversion. Verify visually on a dark dashboard, then swap the mappings."

  # ── TYPE ──
  type:
    family: "Inter via next/font (variable) — matches canon"
    body-weight: 400              # NO font-light in product (0 occurrences) — legitimate divergence for dense small text
    weights: "font-medium for labels/buttons, semibold/bold sparingly"
    mono: "NOT LOADED — no JetBrains Mono in product; IDs use .id-text (Inter, ligatures off). DRIFT vs canon mono-for-code rule (open decision)."

  # ── MODE ──
  mode: "next-themes, default SYSTEM, class-based .dark reassigning all semantic vars; components dark-safe via semantics"
```

## Legitimate divergences (product ≠ marketing, on purpose)

These are the product register — document them, don't "fix" them toward marketing:

- **Density**: h-9 controls, p-4 cells, m-6 full-bleed frames. A dashboard at marketing rhythm would be unusable.
- **Weight-400 body at text-sm** — `font-light` at 14px on data-dense screens hurts legibility; the
  font-light rule is a display-register rule.
- **Flat monochrome buttons** — gradient-pill CTAs are a conversion device; product actions are quiet,
  frequent, and shouldn't shout.
- **Semantic-only color exposure** — the product deliberately makes raw palette classes impossible.
  This is *stronger* token discipline than the marketing site, and the spec endorses it.
- **Top-bar chrome, no sidebar** — shipped reality.

## Open decision points (flagged, not canonized)

1. **Focus ring**: product ships 1px stone ring vs canon's 2px `magenta-600` (`accessibility.md`).
   Quieter chrome is defensible, but ring widths are also inconsistent within rakis (ring-1 vs ring-2 by
   component). Needs a ruling.
2. **Monochrome `--destructive`** (stone-975, not red): makes destructive buttons AND form-error text
   near-black. Error *chips* use red properly. Intentional quietness or accident? Form errors in black is
   probably a bug-shaped consequence.
3. **Zero magenta in interactive elements** — the brand primary appears only in the logo and chart
   tokens. Is the product deliberately brand-neutral chrome, or under-branded? (DES-55's "Cloud doesn't
   read as AuthZed" complaint is adjacent evidence for under-branded.)
4. **Two tab grammars** (soft-pill nav links vs enclosed shadcn tabs) — both shipped; pick one per level
   and write it down.
5. **No mono font** for IDs/code surfaces vs canon's JetBrains Mono rule — `.id-text` (Inter,
   ligatures-off) is a workaround, not a decision.
6. **`--creative` violet status hue** — product-only; promote to the hub's semantic block?

## Drift register (fix toward spec)

Bounded list, mostly covered by an un-merged WIP token-migration branch (1 commit, 11 files):

- `text-blue-600` link pattern (`components/ui/Link.tsx`, fgam files, signin) — generic blue in a no-blue palette
- `bg-gray-200/300` skeletons (`SupportPlanSelector`, `RegionReplicaConfig`, `Changelog`) → `bg-muted` / Skeleton
- Raw red/yellow alert colorways (`ResourceMonitoringBanner`, `SupportPlanSelector`) → `bg-error` / `bg-warning`
- Destructive toast raw reds (`shadcn/ui/toast.tsx:70`)
- **Chart hardcodes (NOT covered by the WIP branch — biggest remaining off-brand surface)**:
  `PermissionSystemMetrics.tsx:42-58` (generic green/gray/amber/red), `insights/ApiShapeTracker.tsx:7-20`
  (entire generic Tailwind palettes), `insights/PermissionSystemInsights.tsx:176` (raw red→green scale —
  also a red/green-only accessibility risk). All should route through `--chart-*` / `dataviz.md`.
- Fragile: `ClusterStatusIndicator` builds classes as `` `bg-${severity}` `` — survives only because the
  classes appear statically elsewhere; rewrite to a static map.
- **Chart surface-rule inversion** (`globals.css` chart blocks): bright palette in `:root`/light, muted in
  `.dark` — inverted vs the Rakis rule. Charts read muddy on dark dashboards, blown-out on light. Swap the
  two mappings (verify visually first).

## Do / Don't

- ✅ Color through semantic tokens only — `bg-muted`, `text-muted-foreground`, `bg-success`; never raw ramps
- ✅ Match the density rhythm: h-9 controls, p-4 cells, p-6 cards, m-6 frames, text-sm body
- ✅ Use the `--chart-*` tokens for every chart series (they ARE the Rakis palettes) — **but verify the surface-rule swap first: as of 2026-06-10 the `:root`/`.dark` chart mappings are INVERTED (see drift register)**
- ✅ Status language: success=teal, warning=sand, error=red, creative/violet=in-progress — pills + chips
- ❌ Never translate stop names across the repo boundary without the mapping table — hex is authoritative
- ❌ No gradient-pill CTAs, no font-light body, no marketing section rhythm in product surfaces
- ❌ No generic Tailwind grays/blues/greens — the drift register is the cautionary list
- ❌ Don't hardcode chart hexes in components — that's how the insights pages went off-brand

## Grounding

**Re-verified 2026-06-11** vs `authzed/internal` → `rakis/` @ `main` (`cfc414b4c6`, 2026-06-11) via `gh api`. Still accurate, no material drift: the name-offset table (stone ramps unchanged), the `buttons:` block (`button.tsx` byte-stable — 6 variants, h-9/8/10 sizes, `ring-1`, monochrome `primary`+`destructive`), the semantic-token map, and the `--chart-1..20` surface-rule inversion all hold against the newer SHA. **NOT re-scouted this pass** (carried forward from the 2026-04-29 scout below): chrome components, forms/tables detail, and the file-level drift-register items.

Originally scouted 2026-06-10 from `authzed/internal` → `rakis/` @ `main` (`f3fa01ed6`, 2026-04-29). Key files: `styles/globals.css` (token source), `components/shadcn/ui/*` (30 primitives),
`components/rakis/*` (~85 product components), `app/app.tsx` + `Nav.tsx` + `Footer.tsx` (chrome),
`PermissionSystemNavTabs.tsx` (pill tabs), `PermissionSystemMetrics.tsx` (charts: on-brand tokens AND
drift hexes). Prior audits: `notes/research/rakis-sandworm-token-analysis-2026-03-18.md`,
`rakis-ui-audit-baseline-2026-03-18.md`, memory `65.06`. A WIP semantic-token-migration branch exists covering most of the drift register.
