"use client";

import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { usePageStatus } from "@/hooks/use-page-status";

type WcagLevel = "AAA" | "AA" | "AA-large" | "FAIL";

interface ContrastRow {
  name: string;
  foreground: string;
  background: string;
  fgVar: string;
  bgVar: string;
  ratio: number;
  wcag: WcagLevel;
  note?: string;
}

const darkPairs: ContrastRow[] = [
  {
    name: "Foreground on surface",
    foreground: "stone-025",
    background: "stone-975",
    fgVar: "--stone-025",
    bgVar: "--stone-975",
    ratio: 18.8,
    wcag: "AAA",
  },
  {
    name: "Body on surface",
    foreground: "stone-300",
    background: "stone-950",
    fgVar: "--stone-300",
    bgVar: "--stone-950",
    ratio: 7.8,
    wcag: "AAA",
  },
  {
    name: "Faint / metadata",
    foreground: "stone-500",
    background: "stone-950",
    fgVar: "--stone-500",
    bgVar: "--stone-950",
    ratio: 4.1,
    wcag: "AA-large",
    note: "Large text (18pt+/14pt bold) or non-essential metadata only — fails AA at body size",
  },
  {
    name: "Link on surface",
    foreground: "sand-300",
    background: "stone-950",
    fgVar: "--sand-300",
    bgVar: "--stone-950",
    ratio: 10.7,
    wcag: "AAA",
  },
  {
    name: "Magenta emphasis",
    foreground: "magenta-600",
    background: "stone-950",
    fgVar: "--magenta-600",
    bgVar: "--stone-950",
    ratio: 3.1,
    wcag: "AA-large",
    note: "Display/headline only (≥24px). Fails AA at body size. Use magenta-400 for small text on dark.",
  },
  {
    name: "Accessible magenta (small text)",
    foreground: "magenta-400",
    background: "stone-950",
    fgVar: "--magenta-400",
    bgVar: "--stone-950",
    ratio: 5.6,
    wcag: "AA",
    note: "Use this for body-size magenta accents on dark surfaces",
  },
  {
    name: "Gradient tail (violet-600)",
    foreground: "violet-600",
    background: "stone-950",
    fgVar: "--violet-600",
    bgVar: "--stone-950",
    ratio: 3.0,
    wcag: "AA-large",
    note: "The warm-hero gradient's violet tail. Same large-text scope as magenta-600 on dark.",
  },
];

const lightPairs: ContrastRow[] = [
  {
    name: "Foreground on surface",
    foreground: "stone-900",
    background: "stone-025",
    fgVar: "--stone-900",
    bgVar: "--stone-025",
    ratio: 16.6,
    wcag: "AAA",
  },
  {
    name: "Body on surface",
    foreground: "stone-700",
    background: "stone-025",
    fgVar: "--stone-700",
    bgVar: "--stone-025",
    ratio: 8.2,
    wcag: "AAA",
  },
  {
    name: "Magenta emphasis",
    foreground: "magenta-600",
    background: "stone-025",
    fgVar: "--magenta-600",
    bgVar: "--stone-025",
    ratio: 5.8,
    wcag: "AA",
    note: "Comfortably AA on light — the dark-mode caveat does not apply here",
  },
  {
    name: "Link on surface",
    foreground: "sand-700",
    background: "stone-025",
    fgVar: "--sand-700",
    bgVar: "--stone-025",
    ratio: 5.8,
    wcag: "AA",
  },
];

function WcagBadge({ level }: { level: WcagLevel }) {
  const styles: Record<WcagLevel, string> = {
    AAA: "bg-teal-600 text-stone-025",
    AA: "bg-teal-500 text-stone-025",
    "AA-large": "bg-sand-600 text-stone-025",
    FAIL: "bg-red-600 text-stone-025",
  };
  const labels: Record<WcagLevel, string> = {
    AAA: "AAA",
    AA: "AA",
    "AA-large": "AA large only",
    FAIL: "FAIL",
  };
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold ${styles[level]}`}
    >
      {labels[level]}
    </span>
  );
}

function ContrastSwatch({ row }: { row: ContrastRow }) {
  return (
    <div className="rounded-lg overflow-hidden border border-stone-800">
      <div
        className="px-4 py-3 text-sm font-medium"
        style={{
          backgroundColor: `hsl(var(${row.bgVar}))`,
          color: `hsl(var(${row.fgVar}))`,
        }}
      >
        {row.foreground} on {row.background}
      </div>
      <div className="bg-stone-900 px-4 py-2 flex items-center justify-between gap-3">
        <span className="text-stone-300 text-xs font-mono">{row.ratio}:1</span>
        <WcagBadge level={row.wcag} />
      </div>
      {row.note && (
        <div className="bg-stone-950 px-4 py-2">
          <p className="text-stone-500 text-xs">{row.note}</p>
        </div>
      )}
    </div>
  );
}

export default function AccessibilityPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Accessibility</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground mt-2">
          Contrast ratios, focus states, gradient text-fill vendor-prefix
          requirements, and reduced-motion rules for the Sandworm design system.
          Ratios computed 2026-06-10 via WCAG 2.1 relative-luminance math.
        </p>
      </div>

      <div className="space-y-8">
        {/* Contrast table — dark mode */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Contrast ratios — dark surfaces
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Key foreground/background pairs on{" "}
            <code className="text-xs">stone-950</code> /
            <code className="text-xs">stone-975</code>. The critical caveat:{" "}
            <strong>magenta-600 on dark is 3.1:1</strong> — display/headline
            scope only. For body-size magenta on dark, use{" "}
            <strong>magenta-400 (5.6:1)</strong>.
          </p>
          <Card className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {darkPairs.map((row) => (
                <ContrastSwatch key={row.name} row={row} />
              ))}
            </div>
          </Card>
        </section>

        {/* Contrast table — light mode */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Contrast ratios — light surfaces
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Key pairs on <code className="text-xs">stone-025</code>. Note that
            magenta-600 is comfortably AA on light (5.8:1) — the dark-mode
            caveat does not apply here.
          </p>
          <Card className="p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lightPairs.map((row) => (
                <ContrastSwatch key={row.name} row={row} />
              ))}
            </div>
          </Card>
        </section>

        {/* Brand emphasis caveat */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            Brand emphasis and the dark-mode caveat
          </h2>
          <Card className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              The signature emphasis devices —{" "}
              <code className="text-xs">font-semibold text-magenta-600</code>{" "}
              spans and the warm-hero gradient text-fill — are{" "}
              <strong>display patterns, not body-text patterns</strong>, on dark
              surfaces.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-teal-400 font-semibold shrink-0">✓</span>
                <span>
                  Hero/headline emphasis (h1/h2, ≥24px) — magenta-600 and
                  gradient text-fills are fine on dark
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-400 font-semibold shrink-0">✓</span>
                <span>
                  Body-size emphasis on light surfaces — magenta-600 is 5.8:1,
                  comfortably AA
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-teal-400 font-semibold shrink-0">✓</span>
                <span>
                  Body-size magenta accent on dark — use{" "}
                  <code className="text-xs">magenta-400</code> (5.6:1)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-red-400 font-semibold shrink-0">✗</span>
                <span>
                  Don&apos;t carry essential meaning in body-size magenta-600 or
                  gradient text on dark — at those sizes it&apos;s decorative
                  emphasis; the surrounding font-light copy must carry the
                  content
                </span>
              </li>
            </ul>
            <div className="pt-2 border-t border-stone-800">
              <p className="text-xs text-stone-500">
                Gradient text-fill profile on stone-950: sand-300 end 10.7 →
                red-400 mid 7.6 → violet-600 tail 3.0. The tail is the
                constraint — gradient emphasis carries the same large-text
                scoping as solid magenta.
              </p>
            </div>
          </Card>
        </section>

        {/* Gradient text-fill / Safari rule */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            Gradient text-fill — Safari vendor prefix rule
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            <code className="text-xs">background-clip: text</code> requires
            both the standard and{" "}
            <code className="text-xs">-webkit-</code> forms or Safari/iOS
            renders the gradient as a background block instead of clipping to
            the text shape. Always include all three declarations.
          </p>
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">
                Required CSS pattern
              </h3>
              <pre className="bg-stone-900 rounded-lg p-4 text-xs text-stone-300 overflow-x-auto">
                {`background: linear-gradient(to right, #ffb370, #f9808a, #6242e0);
background-clip: text;
-webkit-background-clip: text;       /* Safari */
-webkit-text-fill-color: transparent; /* Safari */
color: transparent;                    /* fallback */`}
              </pre>
              <p className="text-xs text-stone-500 mt-2">
                Without <code>-webkit-text-fill-color: transparent</code>,
                Safari may render the original text color over the clipped
                gradient.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">
                Live example — warm-hero gradient headline
              </h3>
              <div
                className="rounded-lg px-6 py-8 text-center"
                style={{ backgroundColor: "hsl(var(--stone-950))" }}
              >
                <p
                  className="text-4xl font-bold tracking-tight select-none"
                  style={{
                    background:
                      "linear-gradient(to right, hsl(var(--sand-300)), hsl(var(--red-400)), hsl(var(--violet-600)))",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  Sandworm.
                </p>
                <p className="text-xs text-stone-500 mt-3">
                  sand-300 → red-400 → violet-600 · warm-hero gradient
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">
                Backdrop blur — also needs{" "}
                <code className="text-xs">-webkit-</code>
              </h3>
              <pre className="bg-stone-900 rounded-lg p-4 text-xs text-stone-300 overflow-x-auto">
                {`backdrop-filter: blur(4px);
-webkit-backdrop-filter: blur(4px);   /* Safari */
background-color: rgba(23, 13, 28, 0.9);  /* stone-950/90 fallback */`}
              </pre>
              <p className="text-xs text-stone-500 mt-2">
                Card-dark and modal surfaces. Always include a solid background
                fallback — <code>backdrop-filter</code> fails silently in
                browsers that don&apos;t support it.
              </p>
            </div>
          </Card>
        </section>

        {/* Focus rings */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Focus rings</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Every interactive element needs a visible focus ring on keyboard
            navigation. Use{" "}
            <code className="text-xs">:focus-visible</code> (not{" "}
            <code className="text-xs">:focus</code>) so the ring only appears
            when needed — keyboard nav, not mouse click. Keyboard accessibility
            is a brand requirement: if a custom interactive element
            doesn&apos;t have a visible focus ring, it isn&apos;t shippable.
          </p>
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-2">Token spec</h3>
              <div className="space-y-1 text-sm font-mono text-stone-300">
                <p>
                  Ring color:{" "}
                  <span className="text-magenta-400">magenta-600</span> at 2px
                </p>
                <p>Ring offset: 2px</p>
                <p>
                  Offset color on dark:{" "}
                  <span className="text-stone-400">stone-950</span> (matches
                  surface)
                </p>
                <p>
                  Offset color on light:{" "}
                  <span className="text-stone-400">stone-025</span> (matches
                  surface)
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">
                Focusable demo — Tab to this element
              </h3>
              <div
                className="rounded-lg px-6 py-6 flex flex-wrap gap-4 items-center"
                style={{ backgroundColor: "hsl(var(--stone-950))" }}
              >
                <button
                  className="px-4 py-2 rounded text-sm font-medium bg-stone-800 text-stone-100 transition-colors hover:bg-stone-700"
                  style={
                    {
                      "--tw-ring-color": "hsl(var(--magenta-600))",
                      "--tw-ring-offset-color": "hsl(var(--stone-950))",
                    } as React.CSSProperties
                  }
                  // Inline focus ring for demo clarity — real components use Tailwind ring utilities
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `2px solid hsl(var(--magenta-600))`;
                    e.currentTarget.style.outlineOffset = "2px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = "";
                    e.currentTarget.style.outlineOffset = "";
                  }}
                >
                  Focusable button (dark)
                </button>
                <button
                  className="px-4 py-2 rounded text-sm font-medium bg-stone-100 text-stone-900 transition-colors hover:bg-stone-200"
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `2px solid hsl(var(--magenta-600))`;
                    e.currentTarget.style.outlineOffset = "2px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = "";
                    e.currentTarget.style.outlineOffset = "";
                  }}
                >
                  Focusable button (light bg)
                </button>
                <a
                  href="#focus-demo"
                  className="text-sm underline"
                  style={{ color: "hsl(var(--sand-300))" }}
                  onFocus={(e) => {
                    e.currentTarget.style.outline = `2px solid hsl(var(--magenta-600))`;
                    e.currentTarget.style.outlineOffset = "2px";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.outline = "";
                    e.currentTarget.style.outlineOffset = "";
                  }}
                >
                  Focusable link
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">
                Tailwind utility pattern
              </h3>
              <pre className="bg-stone-900 rounded-lg p-4 text-xs text-stone-300 overflow-x-auto">
                {`/* Applied to interactive elements */
focus-visible:ring-2
focus-visible:ring-[hsl(var(--magenta-600))]
focus-visible:ring-offset-2
focus-visible:ring-offset-[hsl(var(--stone-950))]  /* dark */
focus-visible:ring-offset-[hsl(var(--stone-025))]  /* light */`}
              </pre>
              <p className="text-xs text-stone-500 mt-2">
                Don&apos;t substitute the browser&apos;s default blue focus
                ring — the magenta-600 ring works on both modes because
                magenta-600 is a brand spine color, not a status color.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Disabled state</h3>
              <div className="text-sm font-mono text-stone-300 space-y-1">
                <p>opacity: 0.5</p>
                <p>pointer-events: none</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Reduced motion */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Reduced motion</h2>
          <p className="text-sm text-muted-foreground mb-4">
            <code className="text-xs">
              @media (prefers-reduced-motion: reduce)
            </code>{" "}
            is non-optional for any animated surface. Ship the reduced-motion
            off-switch in the same change as the animation. If an animation
            can&apos;t degrade gracefully, gate it explicitly.
          </p>
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">
                Recommended global baseline
              </h3>
              <pre className="bg-stone-900 rounded-lg p-4 text-xs text-stone-300 overflow-x-auto">
                {`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`}
              </pre>
              <p className="text-xs text-stone-500 mt-2">
                This is the recommended hub pattern. The marketing site
                currently implements reduced motion per-surface rather than via
                one global wildcard — both approaches are valid.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">
                Per-surface pattern (current marketing site)
              </h3>
              <ul className="space-y-1 text-sm text-stone-300">
                <li>
                  Rotating border — drops to{" "}
                  <code className="text-xs">animation: none</code> + static
                  linear-gradient fallback
                </li>
                <li>
                  Marquee logo wall —{" "}
                  <code className="text-xs">animation: none !important</code>
                </li>
                <li>
                  Float/twinkle/spinner loops —{" "}
                  <code className="text-xs">animation: none</code>
                </li>
                <li>
                  JS-driven loops — read{" "}
                  <code className="text-xs">
                    window.matchMedia(&apos;(prefers-reduced-motion: reduce)&apos;)
                  </code>{" "}
                  and halt <code className="text-xs">requestAnimationFrame</code>{" "}
                  loops
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">
                JS guard pattern for animated components
              </h3>
              <pre className="bg-stone-900 rounded-lg p-4 text-xs text-stone-300 overflow-x-auto">
                {`const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  requestAnimationFrame(animationLoop);
}`}
              </pre>
            </div>
          </Card>
        </section>

        {/* Touch targets */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Touch targets</h2>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">
              Interactive touch targets should be at minimum{" "}
              <strong>44×44px</strong> (WCAG 2.5.5 AAA target; the AA bar is
              24×24px). For icon-only buttons, use a wrapper with padding to
              meet the minimum hit area even if the visual element is smaller.
              The{" "}
              <code className="text-xs">size=&quot;icon&quot;</code> Button variant
              defaults to <code className="text-xs">h-9 w-9</code> (36px) —
              add <code className="text-xs">h-11 w-11</code> for primary touch
              surfaces.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}
