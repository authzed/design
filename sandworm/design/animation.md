---
name: Sandworm — Animation
description: Shipped keyframes, transition patterns, and reduced-motion rules for the Sandworm design system.
part-of: Sandworm
---

> **Primitive tokens** (`{colors.*}`, `{typography.*}`, `{spacing.*}`, `{motion.*}`, `{rounded.*}`, `{elevation.*}`) are defined in the hub at [`../DESIGN.md`](../DESIGN.md). Load the hub alongside this spoke.

← Back to [Sandworm DESIGN.md](../DESIGN.md)

## Motion principles

Motion is restrained. Every transition clarifies a state change — it never announces itself. Reach for motion to confirm "your input registered" (hover/focus feedback) or to ease a layout shift (accordion open, element entering on scroll), not for decoration.

**Sandworm motion does not bounce.** Only `ease-out`, `ease-in`, `ease-in-out`, and the Material `cubic-bezier(0.4, 0, 0.2, 1)` ship. There is no spring or overshoot easing anywhere in the codebase. The "calm density" feel comes from preferring the slower `500ms` lift on signature hovers over the SaaS-typical snappy `200ms`.

## Durations & easings

Durations and easings are tokenized in the hub under `motion` — see [`../DESIGN.md`](../DESIGN.md) for the full duration scale (`fast 200ms` / `base 300ms` / `slow 500ms`, plus the rare `dramatic 700ms` and one-off `legato 2000ms`) and the easing set. Named keyframe animations layer additional durations on top of those Tailwind transition tokens: `0.2s` (accordion), `0.4s` (logo slide), `0.8s` (fade-in), `1s` (logo/book reveal), `2s`/`3s`/`4s`/`5s`/`6s`/`8s`/`10s` (looping ambient motion).

The only custom bezier is the Material standard `cubic-bezier(0.4, 0, 0.2, 1)` — used on the `logo-fade-in` animation and throughout the storybook/flipbook surfaces.

## Shipped keyframes & animations

### Design-system Tailwind config (`tailwind.config.ts`)

The Sandworm design-system app ships three keyframes plus `tailwindcss-animate`:

- **`glow`** — `glow 2s ease-in-out infinite`. The pulsing aura: ramps `brightness(100%)→150%`, `blur(0px)→1px`, and a `box-shadow` halo `0 0 20px 2px rgba(255,255,255,0.3)` at the 50% mark, then back. Use as an attention pulse on a hovered or featured element.
- **`accordion-down` / `accordion-up`** — `0.2s ease-out`, animating `height` to/from `var(--radix-accordion-content-height)`. Radix accordion content expand/collapse.

### Marketing site Tailwind config (`projects/web/tailwind.config.js`)

- **`fade-in`** — `fade-in 0.8s ease-out forwards`. Opacity `0→1` with `translateY(30px)→0`. Scroll/load entrance for content blocks.
- **`logo-fade-in`** — `logo-fade-in 1s cubic-bezier(0.4, 0, 0.2, 1) forwards`. Opacity `0→0.8`, `scale(0.85)→1`, `blur(12px)→0`. The blur-in logo entrance.
- **`logo-slide-out` / `logo-slide-in`** — both `0.4s` (`ease-in` out, `ease-out` in), `forwards`. Opacity + `translateY` swap between rotating logos.
- **`accordion-down` / `accordion-up`** — same `0.2s ease-out` as the design-system config.

### GradientButton gradient-slide on hover

The signature CTA pattern (`projects/web/src/components/ui/GradientButton.tsx`). The animated border is a moving background, not a keyframe:

- Outer wrapper: `bg-gradient-to-r from-[#ffb370] via-[#f9808a] to-[#6242e0]` (sand-300 → red-400 → violet-600 — the canon `warm-hero` stops, settled 2026-06-10) sized `bg-[length:200%_200%]`, positioned `bg-left`.
- On hover: `hover:bg-right` (slides the oversized gradient) plus `hover:scale-[1.02]`, all under `transition-all duration-500 ease-in-out`.
- Inner content span transitions text color under `transition-colors duration-500`.

So the whole interaction runs on the `slow (500ms)` token with `ease-in-out` — gradient pan + a 2% lift, no bounce. There is a single `GradientButton.tsx` (under `components/ui/`); no second copy exists despite the brief's expectation of one.

### Rotating conic-gradient "After-card" border

In `projects/web/src/app/globals.css`, used by `IfStatementsToCheckPermission.tsx` on `/products/authzed-cloud`. Animates a conic gradient angle via the registered custom property:

```css
@property --az-after-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}
.az-after-rotating-border {
  background: conic-gradient(from var(--az-after-angle),
    #ffb370 0%, #f9808a 25%, #7a5ce6 50%, #a5318a 75%, #ffb370 100%);
  animation: az-after-spin 10s linear infinite;
}
@keyframes az-after-spin { to { --az-after-angle: 360deg; } }
```

Special-purpose elevation chrome — signals "this is the answer." Use sparingly (one per page). Under reduced motion it falls back to a static `linear-gradient(90deg, #ffb370, #f9808a, #6242e0)` with `animation: none`.

### Ambient float / parallax (storybook surfaces)

The `resources/dibs-and-the-magic-library` story pages carry the bulk of looping ambient motion (`DibsHero.css`, `ParallaxStorySection.css`, `FlipbookReader.css`). Representative values, all infinite + `ease-in-out` unless noted:

- `float` `4s`, `float-reverse` `5s`, `float-gentle` `6s` — gentle `translateY` + slight `rotate` drift on illustrations.
- `illustration-float` `8s ease-in-out infinite` — `translateY(0→-8px→4px)` with sub-degree rotation.
- `twinkle` `2s` / `twinkle-delayed` `3s` — sparkle opacity pulses.
- `glow-pulse` `3s` — hero glow pulse (distinct from the design-system `glow`).
- `shimmer` `4s linear infinite`, `book-reveal` `1s cubic-bezier(0.4, 0, 0.2, 1) forwards`, loading `spin`.
- Card hover lift: `transform 0.4s` + `box-shadow 0.4s`, both `cubic-bezier(0.4, 0, 0.2, 1)`; depth via static `translateZ`/`scale` layers (no scroll-driven JS parallax in CSS — the layering is transform-based).

### Marquee logo wall

`CustomerLogoWall.css` defines `marquee-left` / `marquee-right` keyframes (`translateX(0 ↔ -33.333%)`) and applies `will-change: transform`. The animation duration/play state is driven from JS, not the CSS file. The `LogoCarousel.tsx` rotating-logo variant manages its slide states in JS (entrance → idle → slide-out/in) rather than a single CSS loop.

### Not found in shipped code as of this writing

- No spring/overshoot easing (`cubic-bezier(0.34, 1.56, …)` or similar) — does not exist anywhere.
- No `prefers-reduced-motion` handling in the Sandworm **design-system** app (`projects/design/sandworm/`) — the reduced-motion implementations all live in `projects/web/`.
- No global "scale all durations" reduced-motion sweep in `globals.css`; reduced motion is handled per-surface (see below). The hub's global-wildcard snippet is the recommended pattern, not a verbatim copy of what currently ships.

## Reduced motion

`@media (prefers-reduced-motion: reduce)` is **non-optional** for any animated surface. The marketing site implements it per-surface rather than via one global wildcard:

- **`globals.css`** — the rotating After-card border drops to `animation: none` + a static linear-gradient fallback.
- **`Hero.css`** — `.hero-node` transitions disabled.
- **`CustomerLogoWall.css`** — marquee `animation: none !important`.
- **`ParallaxStorySection.css` / `DibsHero.css` / `FlipbookReader.css`** — floating/twinkle/spinner loops set to `animation: none`.
- **JS guards** — `HeroDiagram.tsx` and `LogoCarousel.tsx` read `window.matchMedia('(prefers-reduced-motion: reduce)')` and halt their `requestAnimationFrame`/rotation loops when it matches.

When adding a new animation, ship its reduced-motion off-switch in the same change. If an animation can't degrade gracefully, gate it explicitly. The hub documents a global-wildcard snippet as the recommended baseline.

## Do / Don't

- **Do** run hover/focus feedback on `fast (200ms)`, feature lifts on `slow (500ms)`, and reach for `ease-in-out` by default; `ease-out` for entrances.
- **Do** pair every animated surface with a `prefers-reduced-motion: reduce` rule in the same change.
- **Don't** add spring or overshoot easing — none ships, and bounce breaks the restrained register. Sandworm motion glides; it never springs.
- **Don't** use sub-`200ms` durations on hover states — they read as snap-not-glide. (`100ms` exists only on a couple of legacy prose-link transitions; don't extend the pattern.)
