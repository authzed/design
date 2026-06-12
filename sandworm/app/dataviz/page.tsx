"use client";

import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { usePageStatus } from "@/hooks/use-page-status";

// ---------------------------------------------------------------------------
// Palette data — transcribed verbatim from design/dataviz.md (2026-06-09)
// per-value-palettes, both surfaces.
// Token format: hsl(var(--<family>-<stop>))
// ---------------------------------------------------------------------------

type SwatchEntry = { token: string; label: string };

function tokenVar(t: string): string {
  // "sand-300" → "hsl(var(--sand-300))"
  return `hsl(var(--${t}))`;
}

// Per-value palette table: series count → { dark, light }
const perValuePalettes: Record<number, { dark: string[]; light: string[] }> = {
  2:  { dark:  ["sand-300","red-500"],
        light: ["sand-400","red-600"] },
  3:  { dark:  ["sand-300","red-500","magenta-600"],
        light: ["sand-400","red-600","magenta-600"] },
  4:  { dark:  ["sand-300","red-500","magenta-600","violet-300"],
        light: ["sand-400","red-600","magenta-600","violet-500"] },
  5:  { dark:  ["sand-300","red-500","magenta-600","violet-300","teal-400"],
        light: ["sand-400","red-600","magenta-600","violet-500","teal-600"] },
  6:  { dark:  ["sand-300","red-400","red-500","magenta-600","violet-300","teal-400"],
        light: ["sand-400","red-600","red-800","magenta-600","violet-500","teal-600"] },
  7:  { dark:  ["sand-300","red-400","red-500","magenta-400","magenta-600","violet-300","teal-400"],
        light: ["sand-400","red-600","red-800","magenta-500","magenta-700","violet-500","teal-600"] },
};

// Full categorical sequence for "all stops" display (dark-surface 7-value, authoritative order)
// and its light-surface counterpart — used in the "Categorical Palette" section.
const categoricalDark: SwatchEntry[] = [
  { token: "sand-300",    label: "sand-300" },
  { token: "red-500",     label: "red-500" },
  { token: "magenta-600", label: "magenta-600" },
  { token: "violet-300",  label: "violet-300" },
  { token: "teal-400",    label: "teal-400" },
  { token: "red-400",     label: "red-400" },
  { token: "magenta-400", label: "magenta-400" },
];

const categoricalLight: SwatchEntry[] = [
  { token: "sand-400",    label: "sand-400" },
  { token: "red-600",     label: "red-600" },
  { token: "magenta-600", label: "magenta-600" },
  { token: "violet-500",  label: "violet-500" },
  { token: "teal-600",    label: "teal-600" },
  { token: "red-800",     label: "red-800" },
  { token: "magenta-700", label: "magenta-700" },
];

// Radar palette (3-axis)
const radarSwatches: (SwatchEntry & { axis: string })[] = [
  { axis: "Performance", token: "sand-300",    label: "sand-300" },
  { axis: "Risk",        token: "red-400",     label: "red-400" },
  { axis: "Agility",     token: "violet-400",  label: "violet-400" },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SwatchChip({ token, label }: SwatchEntry) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="h-12 w-12 rounded-md border border-border/30 shrink-0"
        style={{ backgroundColor: tokenVar(token) }}
        aria-label={token}
      />
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

function SwatchRow({ entries }: { entries: SwatchEntry[] }) {
  return (
    <div className="flex flex-wrap gap-4">
      {entries.map((e) => (
        <SwatchChip key={e.token + e.label} token={e.token} label={e.label} />
      ))}
    </div>
  );
}

function SeriesGroup({
  count,
  dark,
  light,
}: {
  count: number;
  dark: string[];
  light: string[];
}) {
  return (
    <Card className="p-6 space-y-5">
      <h3 className="text-base font-semibold">
        {count}-series chart
      </h3>

      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Dark surface — bright palette
        </p>
        <div className="flex flex-wrap gap-4">
          {dark.map((t, i) => (
            <SwatchChip key={`d-${i}-${t}`} token={t} label={t} />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Light surface — muted palette
        </p>
        <div className="flex flex-wrap gap-4">
          {light.map((t, i) => (
            <SwatchChip key={`l-${i}-${t}`} token={t} label={t} />
          ))}
        </div>
      </div>
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DatavizPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Data Visualization</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground mt-2">
          Sandworm&apos;s chart palette system — <strong>Chroma-Charts Rakis</strong>. Value-count-indexed,
          surface-aware, re-balanced at every series count.
        </p>
      </div>

      {/* Surface Rule callout */}
      <section>
        <Card className="p-6 border-2 border-border">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
            The Rakis surface rule
          </p>
          <p className="text-2xl font-semibold mb-2">
            Bright palette on dark. Muted palette on light.
          </p>
          <p className="text-muted-foreground">
            Counter-intuitive but correct. Muted colors read muddy on dark backgrounds;
            bright colors blow out on light pages. The CSS <code className="font-mono text-sm">:root</code> block
            ships the bright variants for dark dashboards; the <code className="font-mono text-sm">.dark</code> block
            ships the muted variants for light pages. Never swap them.
          </p>
        </Card>
      </section>

      {/* Categorical palette — both surfaces */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Categorical Palette</h2>
        <p className="text-muted-foreground mb-6">
          The first 7 stops of the Rakis sequence, shown for each surface. The default 5-value
          dashboard palette uses stops 1–5.
        </p>

        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Dark surface — bright palette (1 → 7)
            </p>
            <SwatchRow entries={categoricalDark} />
          </Card>

          <Card className="p-6 space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Light surface — muted palette (1 → 7)
            </p>
            <SwatchRow entries={categoricalLight} />
          </Card>
        </div>
      </section>

      {/* Value-count palettes */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Value-Count Palettes</h2>
        <p className="text-muted-foreground mb-6">
          Pick the palette for your exact series count — do not extend a smaller one by appending
          a color. Each count re-balances <em>all</em> stops.
        </p>

        <div className="space-y-6">
          {([2, 3, 4, 5, 6, 7] as const).map((n) => (
            <SeriesGroup
              key={n}
              count={n}
              dark={perValuePalettes[n].dark}
              light={perValuePalettes[n].light}
            />
          ))}
        </div>
      </section>

      {/* Radar palette */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">Radar Chart Palette</h2>
        <p className="text-muted-foreground mb-6">
          The 3-axis radar (HexRadarChart) uses a distinct palette from the dashboard canon —
          brighter <code className="font-mono text-sm">-400</code> stops because the polygon fills
          are semi-transparent and need saturation to register.
        </p>

        <Card className="p-6">
          <div className="flex flex-wrap gap-8">
            {radarSwatches.map((s) => (
              <div key={s.axis} className="flex flex-col items-center gap-2">
                <div
                  className="h-14 w-14 rounded-md border border-border/30"
                  style={{ backgroundColor: tokenVar(s.token) }}
                  aria-label={s.token}
                />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </span>
                <span className="text-sm font-medium">{s.axis}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Source: <code className="font-mono">HexRadarChart.tsx:37-41</code> — sand-300 / red-400 / violet-400.
            Not interchangeable with the 5-value dashboard palette (which uses red-500 / violet-300).
          </p>
        </Card>
      </section>

      {/* Chart-type guidance */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Chart-Type Guidance</h2>
        <p className="text-muted-foreground mb-6">
          Rakis is a palette system — pick the chart form by data shape, then apply the
          value-count palette and surface rule.
        </p>

        <div className="space-y-4">
          <Card className="p-6 space-y-2">
            <h3 className="font-semibold">Line / Area — time series</h3>
            <p className="text-sm text-muted-foreground">
              Default dashboard form (CloudMetricsCarousel). One series per metric; use the
              N-value palette for N lines. <code className="font-mono text-xs">lineWidth: 2</code>,{" "}
              <code className="font-mono text-xs">pointRadius: 4</code>. For area fills, drop the
              series color to a low alpha so overlapping bands stay legible. Gridlines whisper-quiet:
              stone-800 on dark / stone-150 on light.
            </p>
          </Card>

          <Card className="p-6 space-y-2">
            <h3 className="font-semibold">Bar / Stacked Bar — categorical</h3>
            <p className="text-sm text-muted-foreground">
              <code className="font-mono text-xs">barRadius: 4px</code>. Grouped bars index the
              value palette across groups; stacked bars index it across stack segments. Keep stacks
              to ~6–7 segments — past that, re-cut the data rather than reaching for a 12-color palette.
            </p>
          </Card>

          <Card className="p-6 space-y-2">
            <h3 className="font-semibold">Donut / Pie — part-to-whole</h3>
            <p className="text-sm text-muted-foreground">
              Value-count palette by slice count. Cap at ~5–6 slices; roll the tail into a single
              stone-400 &quot;Other.&quot; Prefer a stacked bar unless part-to-whole is explicitly the story.
            </p>
          </Card>

          <Card className="p-6 space-y-2">
            <h3 className="font-semibold">Radar — multi-axis profile</h3>
            <p className="text-sm text-muted-foreground">
              Use the dedicated 3-axis radar palette (sand-300 / red-400 / violet-400), not the
              5-value default. One palette per overlaid profile.
            </p>
          </Card>

          <Card className="p-6 space-y-2">
            <h3 className="font-semibold">Scatter / Bubble</h3>
            <p className="text-sm text-muted-foreground">
              Single-series: sand-300 (dark) / sand-400 (light). Multi-series: value-count palette.
              Lower point opacity on dense clusters to surface density.
            </p>
          </Card>

          <Card className="p-6 space-y-2">
            <h3 className="font-semibold">Single Big Number / Sparkline</h3>
            <p className="text-sm text-muted-foreground">
              No palette needed for the number itself (stone-025 dark / stone-900 light). The
              sparkline takes sand-300 (dark) / sand-400 (light).
            </p>
          </Card>
        </div>
      </section>

      {/* Chart chrome */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Chart Chrome</h2>
        <p className="text-muted-foreground mb-4">
          Gridlines, axes, labels, and tooltips use the stone scale. Two rules: gridlines must
          whisper (stone-800 dark / stone-150 light), and legends use the mono-caps label style —
          signals &quot;this is structural metadata, not content.&quot;
        </p>

        <Card className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Dark surface
              </p>
              <div className="space-y-2">
                {[
                  { role: "Gridline",        token: "stone-800" },
                  { role: "Axis label",      token: "stone-400" },
                  { role: "Axis line",       token: "stone-700" },
                  { role: "Tooltip bg",      token: "stone-950" },
                  { role: "Tooltip border",  token: "stone-700" },
                ].map(({ role, token }) => (
                  <div key={role} className="flex items-center gap-3">
                    <div
                      className="h-6 w-6 rounded border border-border/30 shrink-0"
                      style={{ backgroundColor: tokenVar(token) }}
                    />
                    <span className="text-sm text-muted-foreground">{role}</span>
                    <span className="font-mono text-xs text-muted-foreground ml-auto">{token}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Light surface
              </p>
              <div className="space-y-2">
                {[
                  { role: "Gridline",        token: "stone-150" },
                  { role: "Axis label",      token: "stone-500" },
                  { role: "Axis line",       token: "stone-200" },
                  { role: "Tooltip bg",      token: "white" },
                  { role: "Tooltip border",  token: "stone-150" },
                ].map(({ role, token }) => (
                  <div key={role} className="flex items-center gap-3">
                    <div
                      className="h-6 w-6 rounded border border-border/30 shrink-0"
                      style={{ backgroundColor: token === "white" ? "#ffffff" : tokenVar(token) }}
                    />
                    <span className="text-sm text-muted-foreground">{role}</span>
                    <span className="font-mono text-xs text-muted-foreground ml-auto">{token}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Don&apos;t invent */}
      <section>
        <Card className="p-6 border-border">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">
            Canon rule
          </p>
          <p className="text-base font-medium mb-2">Do not invent palettes alongside Rakis.</p>
          <p className="text-sm text-muted-foreground">
            No categorical sequence starting with magenta-600. No alert series at position 6. No
            diverging cool-warm palette. If a chart needs a treatment Rakis does not cover, surface
            it as a gap to fix in <code className="font-mono text-xs">Rakis-chart-colors.css</code> — not
            as a parallel system in the consuming component.
          </p>
        </Card>
      </section>
    </div>
  );
}
