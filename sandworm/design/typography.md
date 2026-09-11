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
    pattern: "bg-gradient-to-r from-sand-300 via-red-400 to-magenta-600 bg-clip-text font-semibold text-transparent"
    use-when: "A hero that needs lift. One per page, never two competing."
  eyebrow:                       # 5 uses — NOT headline emphasis
    pattern: "text-xs|text-sm + uppercase + tracking-widest + text-magenta-600"
    use-when: "Small label above a headline. This is where magenta-600 lives."
```

The failure mode this correction prevents: reading "magenta-600 is the emphasis colour", applying it
to a 100px headline clause, and producing something that ships nowhere in the actual product.

## Display metrics

```yaml
display:
  leading: "leading-none (1.0)"     # light weight needs tight leading to read as one block
  tracking: "NONE"                  # do not apply negative letter-spacing
  case: "Title Case"
  breaking: "explicit <br> — never auto-wrap a display headline"
```

**No negative letter-spacing.** The shipped hero sets none. Inter Light is already narrow, and
tightened tracking is the single fastest way to make a Sandworm headline read as generic tech-poster
rather than as the brand. (The one documented exception is braille/ASCII art in JetBrains Mono, which
needs `letter-spacing: -0.2em` + `line-height: 0.95` to stop fragmenting — see the hub.)

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
- ✅ `text-magenta-600` for eyebrows (uppercase, tracking-widest, small)
- ✅ Title Case on display headlines
- ❌ Don't use weights above 600 in marketing — treat 700+ as off-system
- ❌ Don't apply negative letter-spacing
- ❌ Don't use solid `text-magenta-600` as headline emphasis — it ships zero times
- ❌ Don't let a display headline auto-wrap
- ❌ Don't cite `.text2xlarge` / `.semibold` — those are docs-site classes only
- ❌ Don't set prose in mono or code in Inter
