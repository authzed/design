"use client";

import { StatusBadge } from "@/components/ui/status-badge";
import { usePageStatus } from "@/hooks/use-page-status";
import { Card } from "@/components/ui/card";

type GradientStop = {
  family: string;
  stop: string;
  position: string;
};

type GradientDef = {
  token: string;
  label: string;
  description: string;
  direction: string;
  stops: GradientStop[];
  tailwindSnippet: string;
  cssSnippet: string;
  isBrand?: boolean;
};

const gradients: Record<string, GradientDef[]> = {
  warm: [
    {
      token: "warm-hero",
      label: "warm-hero",
      description:
        "THE brand gradient. Hero emphasis spans, GradientButton, customer-story card halos.",
      direction: "to right",
      stops: [
        { family: "sand", stop: "300", position: "0%" },
        { family: "red", stop: "400", position: "50%" },
        { family: "violet", stop: "600", position: "100%" },
      ],
      tailwindSnippet:
        "bg-gradient-to-r from-sand-300 via-red-400 to-violet-600",
      cssSnippet:
        "background-image: linear-gradient(to right, var(--sand-300) 0%, var(--red-400) 50%, var(--violet-600) 100%);",
      isBrand: true,
    },
    {
      token: "warm-accent",
      label: "warm-accent",
      description: "Accent strips, narrower CTAs.",
      direction: "to right",
      stops: [
        { family: "sand", stop: "300", position: "0%" },
        { family: "red", stop: "500", position: "100%" },
      ],
      tailwindSnippet: "bg-gradient-to-r from-sand-300 to-red-500",
      cssSnippet:
        "background-image: linear-gradient(to right, var(--sand-300) 0%, var(--red-500) 100%);",
    },
    {
      token: "warm-brand",
      label: "warm-brand",
      description:
        "Light-to-deep, lands on brand magenta. Richer than the old 2-stop sand→magenta.",
      direction: "to right",
      stops: [
        { family: "sand", stop: "100", position: "0%" },
        { family: "sand", stop: "300", position: "33%" },
        { family: "magenta", stop: "600", position: "67%" },
        { family: "magenta", stop: "900", position: "100%" },
      ],
      tailwindSnippet:
        "bg-gradient-to-r from-sand-100 via-sand-300 via-magenta-600 to-magenta-900",
      cssSnippet:
        "background-image: linear-gradient(to right, var(--sand-100) 0%, var(--sand-300) 33%, var(--magenta-600) 67%, var(--magenta-900) 100%);",
    },
  ],
  cool: [
    {
      token: "cool-hero",
      label: "cool-hero",
      description:
        "Cool counterpart to warm-hero. Cloud, data, and product surfaces where warm over-saturates.",
      direction: "to right",
      stops: [
        { family: "violet", stop: "500", position: "0%" },
        { family: "teal", stop: "400", position: "100%" },
      ],
      tailwindSnippet: "bg-gradient-to-r from-violet-500 to-teal-400",
      cssSnippet:
        "background-image: linear-gradient(to right, var(--violet-500) 0%, var(--teal-400) 100%);",
    },
    {
      token: "cool-hero-alt",
      label: "cool-hero-alt",
      description: "Softer warm↔cool blend variant.",
      direction: "to right",
      stops: [
        { family: "violet", stop: "500", position: "0%" },
        { family: "red", stop: "150", position: "100%" },
      ],
      tailwindSnippet: "bg-gradient-to-r from-violet-500 to-red-150",
      cssSnippet:
        "background-image: linear-gradient(to right, var(--violet-500) 0%, var(--red-150) 100%);",
    },
    {
      token: "cool-accent",
      label: "cool-accent",
      description: "Cool accent strips and CTAs.",
      direction: "to right",
      stops: [
        { family: "violet", stop: "400", position: "0%" },
        { family: "blue", stop: "300", position: "100%" },
      ],
      tailwindSnippet: "bg-gradient-to-r from-violet-400 to-blue-300",
      cssSnippet:
        "background-image: linear-gradient(to right, var(--violet-400) 0%, var(--blue-300) 100%);",
    },
    {
      token: "cool-brand",
      label: "cool-brand",
      description:
        "Light-to-deep mirror of warm-brand, lands on violet. Cloud-native brand mark.",
      direction: "to right",
      stops: [
        { family: "blue", stop: "150", position: "0%" },
        { family: "teal", stop: "300", position: "33%" },
        { family: "violet", stop: "600", position: "67%" },
        { family: "violet", stop: "900", position: "100%" },
      ],
      tailwindSnippet:
        "bg-gradient-to-r from-blue-150 via-teal-300 via-violet-600 to-violet-900",
      cssSnippet:
        "background-image: linear-gradient(to right, var(--blue-150) 0%, var(--teal-300) 33%, var(--violet-600) 67%, var(--violet-900) 100%);",
    },
  ],
  spectrum: [
    {
      token: "spectrum",
      label: "spectrum",
      description:
        "Full warm↔cool sweep. Reserved for rare showcase or celebration moments — one per page max.",
      direction: "to right",
      stops: [
        { family: "sand", stop: "300", position: "0%" },
        { family: "magenta", stop: "600", position: "25%" },
        { family: "violet", stop: "500", position: "50%" },
        { family: "teal", stop: "400", position: "75%" },
        { family: "blue", stop: "150", position: "100%" },
      ],
      tailwindSnippet:
        "bg-gradient-to-r from-sand-300 via-magenta-600 via-violet-500 via-teal-400 to-blue-150",
      cssSnippet:
        "background-image: linear-gradient(to right, var(--sand-300) 0%, var(--magenta-600) 25%, var(--violet-500) 50%, var(--teal-400) 75%, var(--blue-150) 100%);",
    },
    {
      token: "depth",
      label: "depth",
      description:
        "Dark structural elevation wash. Not brand-expressive — used for section depth and dark surface layering.",
      direction: "to right",
      stops: [
        { family: "stone", stop: "700", position: "0%" },
        { family: "stone", stop: "950", position: "100%" },
      ],
      tailwindSnippet: "bg-gradient-to-r from-stone-700 to-stone-950",
      cssSnippet:
        "background-image: linear-gradient(to right, var(--stone-700) 0%, var(--stone-950) 100%);",
    },
    {
      token: "depth-light",
      label: "depth-light",
      description:
        "Light structural elevation wash. Not brand-expressive — used for light section depth.",
      direction: "to right",
      stops: [
        { family: "stone", stop: "150", position: "0%" },
        { family: "stone", stop: "300", position: "50%" },
        { family: "stone", stop: "600", position: "100%" },
      ],
      tailwindSnippet:
        "bg-gradient-to-r from-stone-150 via-stone-300 to-stone-600",
      cssSnippet:
        "background-image: linear-gradient(to right, var(--stone-150) 0%, var(--stone-300) 50%, var(--stone-600) 100%);",
    },
  ],
};

function buildGradientStyle(stops: GradientStop[], direction: string): string {
  const stopList = stops
    .map((s) => `hsl(var(--${s.family}-${s.stop})) ${s.position}`)
    .join(", ");
  return `linear-gradient(${direction}, ${stopList})`;
}

function GradientSwatch({ gradient }: { gradient: GradientDef }) {
  const gradientStyle = buildGradientStyle(gradient.stops, gradient.direction);

  return (
    <div className="space-y-4">
      {gradient.isBrand && (
        <div className="rounded-md border border-violet-600/40 bg-violet-600/10 px-4 py-3">
          <p className="text-sm font-semibold text-violet-400">
            Brand gradient — warm-hero ends on{" "}
            <code className="font-mono text-xs">violet-600 (#6242e0)</code>,
            settled 2026-06-10. Never{" "}
            <code className="font-mono text-xs">violet-500</code>.
          </p>
        </div>
      )}
      <div
        className="h-24 w-full rounded-lg"
        style={{ backgroundImage: gradientStyle }}
        aria-label={`${gradient.token} gradient swatch`}
      />
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {gradient.label}
        </p>
        <p className="text-sm text-muted-foreground">{gradient.description}</p>
        <div className="flex flex-wrap gap-2">
          {gradient.stops.map((stop) => (
            <span
              key={`${stop.family}-${stop.stop}-${stop.position}`}
              className="inline-flex items-center gap-1 rounded border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground"
            >
              <span
                className="inline-block h-3 w-3 rounded-sm border border-border/50"
                style={{
                  background: `hsl(var(--${stop.family}-${stop.stop}))`,
                }}
              />
              {stop.family}-{stop.stop}
              <span className="text-muted-foreground/50">{stop.position}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Tailwind
        </p>
        <pre className="overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{gradient.tailwindSnippet}</code>
        </pre>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          CSS
        </p>
        <pre className="overflow-x-auto rounded-md bg-muted px-3 py-2 font-mono text-xs">
          <code>{gradient.cssSnippet}</code>
        </pre>
      </div>
    </div>
  );
}

export default function GradientsPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Gradients</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground mt-2">
          A temperature matrix — three roles (hero / accent / brand) × two
          registers (warm / cool), plus spectrum and neutral specials. Gradients
          are for hero brand marks and primary CTAs. Over-application kills the
          signal — reach for the sister gradients only when their specific
          surface logic applies.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Warm — the default register</h2>
        <Card className="p-6">
          <div className="space-y-10">
            {gradients.warm.map((g) => (
              <GradientSwatch key={g.token} gradient={g} />
            ))}
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">
          Cool — cloud / data / product surfaces
        </h2>
        <Card className="p-6">
          <div className="space-y-10">
            {gradients.cool.map((g) => (
              <GradientSwatch key={g.token} gradient={g} />
            ))}
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Spectrum &amp; Neutral</h2>
        <Card className="p-6">
          <div className="space-y-10">
            {gradients.spectrum.map((g) => (
              <GradientSwatch key={g.token} gradient={g} />
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
