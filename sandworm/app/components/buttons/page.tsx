"use client";

import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Mail, Loader2 } from "lucide-react";
import { useState } from "react";
import { StatusBadge } from "@/components/ui/status-badge";
import { usePageStatus } from "@/hooks/use-page-status";

export default function ButtonsPage() {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Buttons</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground mt-2">
          Interactive button components with different variants, sizes, and states.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-6">Brand CTA — GradientButton</h2>
          <p className="text-sm text-muted-foreground mb-4">
            All primary CTAs go through <code>GradientButton</code> (pill — the gradient family IS the CTA system).
            No solid-magenta CTAs exist. The shadcn variants below are app-internal controls for dense product chrome, not brand CTAs.
          </p>
          <Card className="p-6">
            <div className="flex flex-wrap gap-4">
              <GradientButton variant="outline">Get Started</GradientButton>
              <GradientButton variant="filled">Sign Up Free</GradientButton>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">App controls (shadcn)</h2>
          <p className="text-sm text-muted-foreground mb-4">
            The dense, quiet controls for product chrome — the AuthZed Cloud dashboard (<code>rakis</code>).
            Color flows through semantic tokens only (no raw palette classes), and CTAs are
            <strong> monochrome stone</strong> — the brand gradient never appears in product surfaces.
            Verified against live <code>rakis</code> (<code>authzed/internal</code> @ <code>cfc414b4</code>).
          </p>
          <Card className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </Card>
          <div className="mt-4 space-y-1 text-sm text-muted-foreground">
            <p>
              <strong>Matches live rakis:</strong> these six variants (there is no <code>creative</code>{" "}
              button — that token drives status pills/spinners, not buttons); <code>default</code> and{" "}
              <code>destructive</code> both render monochrome stone (near-identical by design — quiet chrome);
              sizes at product density (<code>h-9</code> / <code>h-8</code> / <code>h-10</code>, small at{" "}
              <code>text-xs</code>).
            </p>
            <p>
              <strong>Documented divergences:</strong> rakis inverts <code>default</code> to accent on hover
              and adds <code>shadow-sm</code> / <code>shadow-xs</code>; its focus ring is 1px stone vs the 2px
              magenta Sandworm canon — the open reconcile item, kept on the marketing canon here.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Sizes</h2>
          <Card className="p-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg">Large</Button>
              <Button size="default">Default</Button>
              <Button size="sm">Small</Button>
              <Button size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">States</h2>
          <Card className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button disabled>Disabled</Button>
              <Button disabled variant="secondary">
                Disabled
              </Button>
              <Button onClick={handleLoadingClick} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                  </>
                ) : (
                  "Click to Load"
                )}
              </Button>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">With Icons</h2>
          <Card className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Login with Email
              </Button>
              <Button variant="secondary">
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Small with Icon
              </Button>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">GradientButton Sizes</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Both variants scale through <code>sm</code>, <code>default</code>, and <code>lg</code>.
          </p>
          <Card className="p-6 space-y-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-3">Outline</p>
              <div className="flex flex-wrap items-center gap-4">
                <GradientButton variant="outline" size="sm">Small</GradientButton>
                <GradientButton variant="outline" size="default">Default</GradientButton>
                <GradientButton variant="outline" size="lg">Large</GradientButton>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-3">Filled</p>
              <div className="flex flex-wrap items-center gap-4">
                <GradientButton variant="filled" size="sm">Small</GradientButton>
                <GradientButton variant="filled" size="default">Default</GradientButton>
                <GradientButton variant="filled" size="lg">Large</GradientButton>
              </div>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Pill Button Vocabulary</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Contextual pill buttons for situations where the gradient CTA is too loud. No dedicated component — compose with Tailwind matching the spec.
          </p>
          <Card className="p-6 space-y-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-3">button-outline — stone-100 border, white on hover</p>
              <div className="flex flex-wrap gap-4">
                <button className="rounded-full border border-stone-100 bg-transparent px-6 py-2.5 font-mono text-xs font-medium uppercase tracking-widest text-stone-200 transition-colors duration-300 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-magenta-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  Get Started
                </button>
                <button className="rounded-full border border-stone-100 bg-transparent px-6 py-2.5 font-mono text-xs font-medium uppercase tracking-widest text-stone-200 transition-colors duration-300 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-magenta-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" disabled>
                  Disabled
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-3">button-subtle — stone-600 border (quieter)</p>
              <div className="flex flex-wrap gap-4">
                <button className="rounded-full border border-stone-600 bg-transparent px-6 py-2.5 font-mono text-xs font-medium uppercase tracking-widest text-stone-300 transition-colors duration-300 hover:border-stone-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-magenta-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  Learn More
                </button>
                <button className="rounded-full border border-stone-600 bg-transparent px-6 py-2.5 font-mono text-xs font-medium uppercase tracking-widest text-stone-300 transition-colors duration-300 hover:border-stone-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-magenta-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" disabled>
                  Disabled
                </button>
              </div>
            </div>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Hero CTA Stack Pattern</h2>
          <p className="text-sm text-muted-foreground mb-4">
            The canonical marketing hero structure: mono-caps eyebrow → font-light h1 with magenta-600 emphasis → CTA pair (GradientButton outline + subtle secondary).
          </p>
          <Card className="p-6">
            <div className="space-y-4">
              <p className="font-mono text-xs font-medium uppercase tracking-widest text-stone-400">
                Authorization Platform
              </p>
              <h1 className="text-4xl font-light leading-tight">
                Every authorization use case.{" "}
                <span className="font-semibold text-magenta-600">One system.</span>
              </h1>
              <p className="text-stone-300 text-lg font-light max-w-lg">
                Fine-grained permissions at any scale. Built for teams that can't afford to get it wrong.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <GradientButton variant="outline">Get Started Free</GradientButton>
                <button className="rounded-full border border-stone-600 bg-transparent px-6 py-2.5 font-mono text-xs font-medium uppercase tracking-widest text-stone-300 transition-colors duration-300 hover:border-stone-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-magenta-600 focus-visible:ring-offset-2">
                  View Docs
                </button>
              </div>
            </div>
          </Card>
          <p className="text-sm text-muted-foreground mt-4">
            <strong>Note:</strong> There is no canonical solid-magenta button in Sandworm. <code>Button variant=&quot;primary&quot;</code> (magenta-600 + violet-500 border) is deprecated by the spec. All brand CTAs go through <code>GradientButton</code>. For loud-on-dark solid CTAs, use <code>GradientButton variant=&quot;filled&quot;</code> (warm gradient + stone-950 text).
          </p>
        </section>

      </div>
    </div>
  );
}