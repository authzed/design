'use client';

import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { usePageStatus } from '@/hooks/use-page-status';

export default function AnimationPage() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Animation</h1>
          <StatusBadge status={usePageStatus()} />
        </div>
        <p className="text-lg text-muted-foreground mt-2">
          Motion principles, duration tokens, easing set, and reduced-motion
          rules for Sandworm. Motion is restrained — every transition clarifies
          a state change, never announces itself.
        </p>
      </div>

      <div className="space-y-8">

        {/* Motion principles */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Motion principles</h2>
          <Card className="p-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              Reach for motion to confirm &ldquo;your input registered&rdquo;
              (hover/focus feedback) or to ease a layout shift (accordion open,
              element entering on scroll) — not for decoration.
            </p>
            <div className="rounded-lg border bg-muted px-4 py-3">
              <p className="text-sm font-semibold text-foreground">
                Sandworm motion does not bounce.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Only <code className="text-xs">ease-out</code>,{' '}
                <code className="text-xs">ease-in</code>,{' '}
                <code className="text-xs">ease-in-out</code>, and the Material
                standard <code className="text-xs">cubic-bezier(0.4, 0, 0.2, 1)</code>{' '}
                ship. No spring or overshoot easing exists anywhere in the
                codebase. The &ldquo;calm density&rdquo; feel comes from
                preferring the slower <code className="text-xs">500ms</code>{' '}
                lift on signature hovers over the SaaS-typical snappy{' '}
                <code className="text-xs">200ms</code>.
              </p>
            </div>
          </Card>
        </section>

        {/* Duration tokens */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Duration tokens</h2>
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 pr-6 font-semibold text-muted-foreground">Token</th>
                    <th className="pb-3 pr-6 font-semibold text-muted-foreground">Value</th>
                    <th className="pb-3 pr-6 font-semibold text-muted-foreground">Use</th>
                    <th className="pb-3 font-semibold text-muted-foreground">Live demo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-3 pr-6 font-mono text-xs text-foreground">fast</td>
                    <td className="py-3 pr-6 font-mono text-xs text-muted-foreground">200ms</td>
                    <td className="py-3 pr-6 text-muted-foreground">Hover/focus feedback</td>
                    <td className="py-3">
                      <span
                        className="inline-block px-3 py-1 rounded text-xs bg-muted text-foreground cursor-default"
                        style={{ transition: 'background-color 200ms ease-out' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'hsl(var(--magenta-600))'; (e.currentTarget as HTMLElement).style.color = 'hsl(var(--stone-025))'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; (e.currentTarget as HTMLElement).style.color = ''; }}
                      >
                        hover me
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-xs text-foreground">base</td>
                    <td className="py-3 pr-6 font-mono text-xs text-muted-foreground">300ms</td>
                    <td className="py-3 pr-6 text-muted-foreground">Standard transitions</td>
                    <td className="py-3">
                      <span
                        className="inline-block px-3 py-1 rounded text-xs bg-muted text-foreground cursor-default"
                        style={{ transition: 'background-color 300ms ease-in-out' }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'hsl(var(--teal-600))'; (e.currentTarget as HTMLElement).style.color = 'hsl(var(--stone-025))'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; (e.currentTarget as HTMLElement).style.color = ''; }}
                      >
                        hover me
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-xs text-foreground">slow</td>
                    <td className="py-3 pr-6 font-mono text-xs text-muted-foreground">500ms</td>
                    <td className="py-3 pr-6 text-muted-foreground">Signature feature lifts, GradientButton</td>
                    <td className="py-3">
                      <span
                        className="inline-block px-3 py-1 rounded text-xs bg-muted text-foreground cursor-default"
                        style={{ transition: 'all 500ms ease-in-out' }}
                        onMouseEnter={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.backgroundColor = 'hsl(var(--violet-600))';
                          el.style.color = 'hsl(var(--stone-025))';
                          el.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.backgroundColor = '';
                          el.style.color = '';
                          el.style.transform = '';
                        }}
                      >
                        hover me
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-xs text-foreground">dramatic</td>
                    <td className="py-3 pr-6 font-mono text-xs text-muted-foreground">700ms</td>
                    <td className="py-3 pr-6 text-muted-foreground italic">Rare — deliberate reveals</td>
                    <td className="py-3">
                      <span className="text-xs text-muted-foreground">—</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-xs text-foreground">legato</td>
                    <td className="py-3 pr-6 font-mono text-xs text-muted-foreground">2000ms</td>
                    <td className="py-3 pr-6 text-muted-foreground italic">One-off ambient loops only</td>
                    <td className="py-3">
                      <span className="text-xs text-muted-foreground">—</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Named keyframe animations layer additional durations on top of these tokens: 0.2s
              (accordion), 0.4s (logo slide), 0.8s (fade-in), 1s (logo reveal), and 2–10s looping
              ambient loops (float, twinkle, glow-pulse, shimmer).
            </p>
          </Card>
        </section>

        {/* Easing set */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Easing set</h2>
          <Card className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 pr-6 font-semibold text-muted-foreground">Easing</th>
                    <th className="pb-3 pr-6 font-semibold text-muted-foreground">Value</th>
                    <th className="pb-3 font-semibold text-muted-foreground">When to use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  <tr>
                    <td className="py-3 pr-6 font-mono text-xs text-foreground">ease-out</td>
                    <td className="py-3 pr-6 font-mono text-xs text-muted-foreground">ease-out</td>
                    <td className="py-3 text-muted-foreground">Entrances — element decelerates into view. Accordion, fade-in entrance.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-xs text-foreground">ease-in</td>
                    <td className="py-3 pr-6 font-mono text-xs text-muted-foreground">ease-in</td>
                    <td className="py-3 text-muted-foreground">Exits — element accelerates out. Logo slide-out.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-xs text-foreground">ease-in-out</td>
                    <td className="py-3 pr-6 font-mono text-xs text-muted-foreground">ease-in-out</td>
                    <td className="py-3 text-muted-foreground">Default — symmetric ramp. GradientButton gradient pan, hover lifts, ambient loops.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 font-mono text-xs text-foreground">material</td>
                    <td className="py-3 pr-6 font-mono text-xs text-muted-foreground">cubic-bezier(0.4, 0, 0.2, 1)</td>
                    <td className="py-3 text-muted-foreground">Logo-fade-in, flipbook/storybook card lifts, shimmer. The only custom bezier.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 rounded-lg border border-red-900 bg-red-950/40 px-4 py-3">
              <p className="text-sm text-red-300">
                <strong>No spring or overshoot easing.</strong>{' '}
                <code className="text-xs">cubic-bezier(0.34, 1.56, …)</code> and similar bounce curves
                do not exist anywhere in the codebase. Don&apos;t add them — bounce breaks the
                restrained register. Sandworm motion glides; it never springs.
              </p>
            </div>
          </Card>
        </section>

        {/* Shipped keyframes */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Shipped keyframes</h2>
          <Card className="p-6 space-y-6">

            <div>
              <h3 className="text-sm font-semibold mb-1">glow</h3>
              <p className="text-sm text-muted-foreground mb-2">
                <code className="text-xs">2s ease-in-out infinite</code> — pulsing aura on a hovered or
                featured element. Ramps <code className="text-xs">brightness(100%→150%)</code>,{' '}
                <code className="text-xs">blur(0px→1px)</code>, and a{' '}
                <code className="text-xs">box-shadow</code> halo at the 50% mark, then back.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-1">accordion-down / accordion-up</h3>
              <p className="text-sm text-muted-foreground">
                <code className="text-xs">0.2s ease-out</code> — animates <code className="text-xs">height</code> to/from{' '}
                <code className="text-xs">var(--radix-accordion-content-height)</code>. Radix accordion content expand/collapse.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-1">fade-in</h3>
              <p className="text-sm text-muted-foreground">
                <code className="text-xs">0.8s ease-out forwards</code> — opacity{' '}
                <code className="text-xs">0→1</code> with{' '}
                <code className="text-xs">translateY(30px)→0</code>. Scroll/load entrance for
                content blocks.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-1">logo-fade-in</h3>
              <p className="text-sm text-muted-foreground">
                <code className="text-xs">1s cubic-bezier(0.4, 0, 0.2, 1) forwards</code> — opacity{' '}
                <code className="text-xs">0→0.8</code>, scale{' '}
                <code className="text-xs">0.85→1</code>,{' '}
                <code className="text-xs">blur(12px)→0</code>. The blur-in logo entrance.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-1">logo-slide-out / logo-slide-in</h3>
              <p className="text-sm text-muted-foreground">
                Both <code className="text-xs">0.4s forwards</code> (ease-in out, ease-out in) — opacity +{' '}
                <code className="text-xs">translateY</code> swap between rotating logos.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-1">Ambient float loops</h3>
              <p className="text-sm text-muted-foreground">
                <code className="text-xs">float</code> (4s), <code className="text-xs">float-reverse</code> (5s),{' '}
                <code className="text-xs">float-gentle</code> (6s),{' '}
                <code className="text-xs">illustration-float</code> (8s) — gentle{' '}
                <code className="text-xs">translateY</code> + sub-degree rotation drift on illustrations.
                All <code className="text-xs">ease-in-out infinite</code>. Storybook/story surfaces only.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-1">GradientButton gradient-slide</h3>
              <p className="text-sm text-muted-foreground mb-2">
                The signature CTA pattern. Not a keyframe — a moving background:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-none">
                <li>
                  Outer wrapper: <code className="text-xs">bg-gradient-to-r</code> from sand-300 → red-400 → violet-600,
                  sized <code className="text-xs">bg-[length:200%_200%]</code>, positioned <code className="text-xs">bg-left</code>.
                </li>
                <li>
                  On hover: <code className="text-xs">hover:bg-right</code> slides the oversized gradient +{' '}
                  <code className="text-xs">hover:scale-[1.02]</code>.
                </li>
                <li>
                  All under <code className="text-xs">transition-all duration-500 ease-in-out</code> — the slow token, no bounce.
                </li>
              </ul>
            </div>

          </Card>
        </section>

        {/* Live hover demo */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Live demos</h2>
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">fast (200ms ease-out) — hover feedback</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  className="px-4 py-2 rounded text-sm font-medium bg-muted text-foreground"
                  style={{ transition: 'background-color 200ms ease-out, color 200ms ease-out' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = 'hsl(var(--magenta-600))';
                    el.style.color = 'hsl(var(--stone-025))';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = '';
                    el.style.color = '';
                  }}
                >
                  fast · 200ms ease-out
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">slow (500ms ease-in-out) — signature lift</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  className="px-4 py-2 rounded text-sm font-medium bg-muted text-foreground"
                  style={{ transition: 'all 500ms ease-in-out' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = 'hsl(var(--violet-600))';
                    el.style.color = 'hsl(var(--stone-025))';
                    el.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.backgroundColor = '';
                    el.style.color = '';
                    el.style.transform = '';
                  }}
                >
                  slow · 500ms ease-in-out + scale(1.02)
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">material bezier (500ms) — card lift</h3>
              <div className="flex flex-wrap gap-3">
                <div
                  className="px-4 py-3 rounded-lg text-sm font-medium bg-muted text-foreground cursor-default select-none"
                  style={{ transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 500ms cubic-bezier(0.4, 0, 0.2, 1)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = 'translateY(-4px) scale(1.01)';
                    el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = '';
                    el.style.boxShadow = '';
                  }}
                >
                  card lift · cubic-bezier(0.4, 0, 0.2, 1)
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Reduced motion */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Reduced motion</h2>
          <p className="text-sm text-muted-foreground mb-4">
            <code className="text-xs">@media (prefers-reduced-motion: reduce)</code> is non-optional
            for any animated surface. Ship the off-switch in the same change as the animation.
          </p>
          <Card className="p-6 space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Recommended global baseline</h3>
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
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-2">JS guard for animation loops</h3>
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

        {/* Do / Don't */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Do / Don&apos;t</h2>
          <Card className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-teal-400">Do</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-teal-400 shrink-0">✓</span>
                    <span>Run hover/focus feedback on <code className="text-xs">fast (200ms)</code></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-400 shrink-0">✓</span>
                    <span>Run feature lifts on <code className="text-xs">slow (500ms)</code></span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-400 shrink-0">✓</span>
                    <span>Reach for <code className="text-xs">ease-in-out</code> by default; <code className="text-xs">ease-out</code> for entrances</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-teal-400 shrink-0">✓</span>
                    <span>Pair every animated surface with a <code className="text-xs">prefers-reduced-motion: reduce</code> rule in the same change</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-red-400">Don&apos;t</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-red-400 shrink-0">✗</span>
                    <span>Add spring or overshoot easing — none ships, and bounce breaks the restrained register</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400 shrink-0">✗</span>
                    <span>Use sub-<code className="text-xs">200ms</code> durations on hover states — they read as snap, not glide (<code className="text-xs">100ms</code> is legacy; don&apos;t extend it)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-red-400 shrink-0">✗</span>
                    <span>Use motion for decoration — every transition must clarify a state change</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

      </div>
    </div>
  );
}
