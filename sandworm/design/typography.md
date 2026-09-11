---
name: Sandworm — Typography
description: The type system as rules, not specimens. Weight pairing, the emphasis contract, display metrics, the mono contract, and the two competing scales. Grounded in shipped authzed.com frequency counts.
part-of: Sandworm
status: draft   # grounded 2026-09-11 against projects/web/src (weight counts + emphasis audit)
---

> **Primitive tokens** (`{colors.*}`, `{typography.*}`, `{spacing.*}`, `{motion.*}`, `{rounded.*}`, `{elevation.*}`) are defined in the hub at [`../DESIGN.md`](../DESIGN.md). Load the hub alongside this spoke.

← Back to [Sandworm DESIGN.md](../DESIGN.md) · Siblings: [`web-ui.md`](web-ui.md) · [`social.md`](social.md) · [`print.md`](print.md) · [`slides.md`](slides.md)

> **The one rule, if you read nothing else:** a display headline is **two clauses** — a `font-light`
> setup and a `font-semibold` payoff. The weight change carries the hierarchy so the size does not
> have to. Everything below is elaboration on that.

## What this spoke covers

How Sandworm sets type: the **weight pairing**, what **emphasis** actually means (a corrected claim —
see below), **display metrics** (leading, tracking, case, line breaking), the **mono contract**, and
the **two competing scales** you will meet in the wild. Surface-specific type behaviour lives in the
surface spokes: [`social.md`](social.md) owns feed-legibility minimums, [`print.md`](print.md) and
[`slides.md`](slides.md) own the presentation tier.

## Weight

```yaml
typography:
  weights:
    # Ranked by SHIPPED FREQUENCY in projects/web/src (verified 2026-09-11), not by numeric value.
    light:      { value: 300, uses: 295, role: "Headlines and marketing body. The brand default." }
    semibold:   { value: 600, uses: 223, role: "The emphasis clause in a headline. UI labels." }
    medium:     { value: 500, uses: 161, role: "Dense UI only — table headers, small controls." }
    bold:       { value: 700, uses:  51, role: "Off-system for marketing. Use semibold." }
    normal:     { value: 400, uses:  29, role: "Rare. Product UI body where light is too airy." }
    extralight: { value: 200, uses:  21, role: "Oversized display only. Never below ~48px." }
    extrabold:  { value: 800, uses:   4, role: "OFF-SYSTEM. Four uses site-wide. Do not reach for it." }
    thin:       { value: 100, uses:   2, role: "OFF-SYSTEM." }
```

**Sandworm is a two-weight pairing, not a five-weight ramp.** Light (295) and semibold (223) are 63%
of all weight usage; everything 700-and-up is 57 uses combined, most of it legacy. A specimen sheet
showing five weights at equal billing misrepresents the system — the ramp exists, but only two rungs
are load-bearing.

**The canonical construction** (`projects/web/src/app/(main)/page.tsx:18-23`):

```tsx
<span className="font-light">
  AI Moves Fast.
  <br />
  <span className="font-semibold">Permissions Must Keep Up.</span>
</span>
```

Light states the situation; semibold states the consequence. The setup should be the concessive or
neutral half and the payoff the half you want remembered. If both clauses want to be semibold, the
headline is two headlines.

## Emphasis — CORRECTED 2026-09-11

An earlier draft of the hub claimed `font-semibold text-magenta-600` was "the AuthZed pattern" for
headline emphasis. **Ground-truthing disproved it.** Across `projects/web/src` there are **zero**
instances of solid `text-magenta-600` used as a headline emphasis span. All 12 `font-semibold` +
magenta co-occurrences are eyebrows (5), gradient stops (5), or button/chip backgrounds (2).

```yaml
emphasis:
  neutral:                       # ~17 uses — THE DEFAULT
    pattern: "font-semibold + text-white | text-stone-050 | inherited"
    use-when: "Almost always. The weight change alone is the emphasis."
  brand-gradient:                # ~8 uses — the expressive variant
    pattern: "bg-gradient-to-r from-sand-300 via-red-400 to-violet-600 bg-clip-text font-semibold text-transparent"
    token: "warm-hero"           # end-stop violet-600, SETTLED 2026-06-10 — see the hub
    use-when: "A hero that needs lift. One per page, never two competing."
    # Shipped warm clip-text end-stops (verified 2026-09-11): to-violet-500 ×4 (known drift,
    # reconciles to -600), to-[#6242e0] ×1 (= violet-600), to-magenta-600 ×1, to-magenta-500 ×1.
    # Violet is the canonical end-stop; the magenta variants are the minority, not the pattern.
  eyebrow:                       # 5 uses — NOT headline emphasis
    pattern: "text-xs|text-sm + uppercase + tracking-widest"
    color-on-light: "{colors.magenta.600}"   # 5.8 on stone-025 — AA, the shipped pattern
    color-on-dark:  "{colors.sand.300}"      # AAA. DEFAULT for dark boards — see below
    fallback-on-dark: "{colors.magenta.400}" # 5.6 — use if the eyebrow must read magenta
    use-when: "Small label above a headline."
```

The failure mode this correction prevents: reading "magenta-600 is the emphasis colour", applying it
to a 100px headline clause, and producing something that ships nowhere in the actual product.

### Eyebrow colour on dark — CORRECTED 2026-09-11

`magenta-600` is the shipped eyebrow colour, and on a **light** surface it is correct (5.8, AA). On a
**dark** surface it is wrong on two counts, and an earlier draft of this spoke recommended it anyway.

1. **Contrast.** `magenta-600` on dark measures **3.1** — large-text territory only, per
   [`accessibility.md`](accessibility.md). An eyebrow is the smallest type on the board, so it is the
   worst possible place to spend a 3.1 ratio. The accessible magenta on dark is `magenta-400` (5.6).
2. **It doesn't belong to the composition.** The brand gradient runs `sand-300 → red-400 →
   violet-600`. A magenta eyebrow shares no stop with it, so the label reads as imported from another
   board rather than as part of this one.

**Default the dark-board eyebrow to `sand-300`.** It is comfortable AAA on dark, it is the canonical
dark-surface link colour, and it is the gradient's own warm end-stop — so it connects to the payoff
clause instead of floating free. If the eyebrow genuinely must be magenta, use `magenta-400`, never
`magenta-600`.

This is the general rule, not a one-off: **an accent on a dark board should already exist somewhere
else in the composition.** If a colour appears exactly once, it reads as a mistake.

## Display metrics

```yaml
display:
  leading:
    homepage-hero: "leading-none (1.0)"      # page.tsx:18
    section-hero:  "leading-tight (1.25)"    # IndustryHero, UseCaseHero
  tracking:
    ceiling: "-0.025em (tracking-tight)"     # the LARGEST value shipped on a light headline
    homepage-hero: "none"                    # page.tsx:18 sets no tracking
    shipped-at: "IndustryHero.tsx:40 · UseCaseHero.tsx:31 · AssessmentFlow.tsx (×3)"
    blog-prose: "h2 -0.015em · h3 -0.005em"  # globals.css:199,221 — scoped to .blog-prose
  case: "Title Case"
  breaking: "explicit <br> — never auto-wrap a display headline"
```

**Tracking has a ceiling, not a ban — CORRECTED 2026-09-11.** An earlier draft of this spoke said "no
negative letter-spacing." That was wrong: `tracking-tight` (-0.025em) ships on light display headlines
in `IndustryHero.tsx:40`, `UseCaseHero.tsx:31`, and three places in `AssessmentFlow.tsx`. The homepage
hero sets none. **Both are in-system** — pick one and be consistent within a surface.

What is off-system is *magnitude*. -0.025em is the shipped ceiling; roughly double it (-0.045em) on a
large light headline reads as generic tech-poster rather than as AuthZed. Inter Light is already
narrow, so the tightening you think you need is usually already there. If you are unsure, set none:
that is what the canonical hero does.

(Separate documented exception: braille/ASCII art in JetBrains Mono needs `letter-spacing: -0.2em` +
`line-height: 0.95` to stop fragmenting — see the hub.)

**Break display headlines explicitly.** The semibold clause must begin its own line and must never be
split across a wrap. Auto-wrapping cannot guarantee this: a container a few pixels narrower strands
one word of the payoff on its own line and the pairing collapses. Observed failure, 2026-09-11: a
headline set with `max-width` instead of `<br>` rendered as `…Credentials Is` / `You.` — the emphasis
clause broken across two lines with an orphan. Set the breaks; don't hope for them.

## Mono

JetBrains Mono is **metadata, not prose**: inline code, code blocks, mono-caps section labels,
terminal-window chrome, kickers, attributions, footers. Roboto Mono is the marketing-site fallback;
new surfaces prefer JetBrains Mono. Never set narrative paragraphs in mono, and never set code in
Inter — the split is absolute.

Mono runs **light-to-regular (300–400)** in display contexts. Heavy mono reads as a terminal error,
not as a label.

## The two scales

There are two type scales in circulation and they do not match. Know which one you are in.

```yaml
scales:
  product:     # projects/web/tailwind.config.js — what SHIPS
    tokens: "text-xxs .75rem | text-xs .875rem | text-md 1rem | text-lg 1.25rem | text-xl 1.5rem |
             text-2xl 1.75rem | text-3xl 2rem | text-4xl 2.25rem | text-5xl 3rem | text-6xl 4.5rem"
    ceiling: "4.5rem / 72px"
    note: "Also body1 (1.25rem/2rem) and body2 (1rem/1.75rem) for marketing prose."
  docs-site:   # sandworm globals.css — what the DOCS SITE demonstrates
    tokens: ".textextrasmall … .textbase … .text2xlarge … .text9xlarge"
    note: "Docs-site display classes. They do NOT exist in projects/web."
```

**Cite Tailwind class names, not the docs-site classes.** `.text2xlarge` and `.semibold` appear in no
production codebase; `text-2xl` and `font-semibold` do. Anyone who learns the docs vocabulary has to
translate before they can write a line of product code.

For canvases above the 72px ceiling (social, slides, print), set an explicit `font-size` and record it
in the surface spoke rather than inventing new scale tokens.

## Do / Don't

- ✅ Light setup, semibold payoff — two weights, never more
- ✅ `leading-none` on display sizes
- ✅ Explicit `<br>`; the semibold clause owns its line
- ✅ Eyebrows: `sand-300` on dark (AAA, in the gradient), `magenta-600` on light
- ✅ Title Case on display headlines
- ❌ Don't use weights above 600 in marketing — treat 700+ as off-system
- ❌ Don't exceed `tracking-tight` (-0.025em) on a display headline — tracking is capped, not banned
- ❌ Don't use solid `text-magenta-600` as headline emphasis — it ships zero times
- ❌ Don't let a display headline auto-wrap
- ❌ Don't cite `.text2xlarge` / `.semibold` — those are docs-site classes only
- ❌ Don't put `magenta-600` on a dark eyebrow — 3.1 contrast and it matches nothing else there
- ❌ Don't set prose in mono or code in Inter
