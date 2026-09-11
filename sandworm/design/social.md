---
name: Sandworm — Social & Ads
description: The feed tier — organic social, paid units, and link-preview OG cards. Canvas formats, the feed-legibility floor, logo-wall rules, and the awareness-vs-conversion split. Grounded in the /api/og contract and the 2026-09 AI-agents campaign.
part-of: Sandworm
status: draft   # grounded 2026-09-11 (og-generator contract + agents-campaign design lab)
---

> **Primitive tokens** (`{colors.*}`, `{typography.*}`, `{spacing.*}`, `{motion.*}`, `{rounded.*}`, `{elevation.*}`) are defined in the hub at [`../DESIGN.md`](../DESIGN.md). Load the hub alongside this spoke.

← Back to [Sandworm DESIGN.md](../DESIGN.md) · Siblings: [`typography.md`](typography.md) · [`print.md`](print.md) · [`slides.md`](slides.md)

> **Feed-tier fingerprint:** the canvas is fixed and small on arrival; **the viewer is not reading, they
> are scrolling past**. Every rule here follows from that. Type is larger than feels right on your
> monitor, content is fewer elements than feels complete, and the brand mark is legible at thumbnail
> scale or it is decoration.

## What this spoke covers

Everything that renders inside someone else's feed: **organic social** (LinkedIn, Reddit, X),
**paid units**, and **OG link-preview cards**. The presentation tier is the sibling spokes —
[`print.md`](print.md) for paper/PDF, [`slides.md`](slides.md) for 16:9 decks.

Two of these are already systematized and one is not:

- **OG cards are solved.** `projects/web/src/app/api/og` renders them, `preview-og/page.tsx` previews
  them, and `plugins/og-generator/` drives them. 1200×630. Use that pipeline; don't hand-build one.
- **Feed units are not.** Square and portrait organic/paid assets have no generator and no spec. That
  gap is what this spoke is for.

## Canvas formats

```yaml
social:
  formats:
    og-link-preview:
      canvas: "1200×630 logical — the route renders 2400×1260 (@2x retina)"   # 1.905:1
      surface: "OG/Twitter card — the image attached to a shared URL"
      pipeline: "/api/og (see preview-og/page.tsx) — do NOT hand-roll"
    feed-square:
      canvas: "1200×1200"       # 1:1 — THE DEFAULT for organic
      surface: "LinkedIn + Reddit native image post"
      note: "Safest cross-platform. Design so the centre 1200×1000 survives a landscape crop."
    feed-portrait:
      canvas: "1080×1350"       # 4:5 — maximum feed real estate
      surface: "LinkedIn native image post"
      note: "~2× the vertical space of 1.91:1. Use when the post is the destination."
  render-scale:
    desktop-feed: 0.42          # ~500px displayed from a 1200px canvas
    mobile-feed:  0.30          # ~360px displayed — ALWAYS design against this
```

**1.91:1 is the weakest ratio for organic reach.** It is the correct shape for a *link preview*, where
the platform crops to it anyway. It is the wrong shape for a native image post, where square and 4:5
get substantially more feed height. Choosing 1.91:1 for an awareness post is a format error, not a
style preference.

## The feed-legibility floor

The governing arithmetic: a 1200px canvas renders **~360px wide in a mobile feed**, a 0.30× scale. Any
text under that scale must survive being divided by three.

```yaml
legibility:
  floor: 32                     # px on a 1200px canvas ≈ 10px at mobile feed scale.
                                # HARD MINIMUM — every entry below is >= this. No exceptions.
  # SIZES ONLY. Colour rules live in typography.md — notably the eyebrow is sand-300 on
  # dark (AAA, and a gradient stop) and magenta-600 only on light. Do not read the sizes
  # below as carrying colour guidance.
  minimums:                     # measured on a 1200×1200 canvas
    display-headline: 88        # 90–130 typical
    subhead:          38
    eyebrow:          32        # was 30 — raised 2026-09-11 to stop contradicting the floor
    mono-code:        34        # 34–40; below this code is texture, not content
    footer-url:       32
    customer-logo:    50        # logo HEIGHT in a wall
    brand-mark:       48        # 48–64 for a footer lockup. See 'Lockup scale' below —
                                # the 96–112 figure this line used to carry was wrong.
```

**Nothing below 32px, and that includes the eyebrow.** The floor outranks every per-element
number; if a table entry ever reads lower, the floor wins and the table is the bug. At 19px (a reasonable web footer) a viewer sees 5.7px and the element is
decoration. This is the same principle as `print.md`'s DocSend tile rule (`display-target: 75 — the
tile must read at this size`); only the divisor changes.

**Raising type is not enough — cut content.** Type floors and canvas size fight each other, and the
canvas always wins. Observed 2026-09-11: raising a code block from 29px to 38px required cutting the
snippet from 8 lines to 5, and a denial list from 5 rows to 4. If the floor doesn't fit, the board has
too much on it.

**Verify at scale, don't assert it.** Render every board at 360px before shipping. A contact sheet of
0.30× thumbnails answers "is this legible" in one look; reasoning about it does not.

## Composition

**Make a claim, not a category.** A headline that names a topic ("AuthZ for AI Agents") gives the
scroller nothing to react to and leaves any proof element with nothing to back up. A headline that
states a tension ("Your Agent Inherits Your Permissions. All Of Them.") earns the stop. Category
labels are legitimate for campaign openers and when post copy carries the argument — just know which
one you're shipping.

Type follows [`typography.md`](typography.md) unchanged: light setup, semibold payoff, `leading-none`,
Title Case, **explicit `<br>` breaks**. Explicit breaking matters more here than anywhere, because the
canvas is fixed and a stranded orphan cannot be fixed by the reader resizing a window.

**Dark is the default; light is the differentiator.** Every authorization and dev-tools company ships
a dark gradient card. A light board (`stone-025`-ish ground, `dark` ink, brand arc as the composition)
is frequently the one that interrupts a feed of dark ones. Both are in-system.

> ⚠️ **Pull gradient hexes from tokens, never from the logo SVGs.** The shipped logo SVGs carry legacy
> hexes that are known drift (see the hub's Open Questions). Sampling a colour out of
> `authzed-logo-multi.svg` gives you `#FFB471 / #F0546C / #A43189`; the canonical stops are
> the `warm-hero` stops (`sand-300 / red-400 / violet-600`). `red-400` is the one that bites — the SVG value is markedly more
> saturated than canon. Reference token names; resolve hex from [`palette.md`](palette.md).

**Use the brand gradient as composition, not decoration.** `warm-hero` (`sand-300 → red-400 → violet-600`) is the
brand's strongest visual asset and it is routinely wasted on a 40px logo while a generic purple radial
does the actual work. Let the gradient be a spine, an arc, or the clip-text payoff.

## Composition on a fixed canvas

Grounded 2026-09-11 by testing this spoke with a fresh agent: every item below was a documented
**guess** it had to make because the system was silent. They are now decided.

```yaml
composition:
  edge-padding: "{spacing.24}"        # 96px on a 1200 canvas. NOT the web section token
                                      # (spacing.10 / 40px) — that reads as a nested page margin
                                      # on a poster-scale canvas.
  vertical-anchor: "centred stack"    # headline + rule + footer centred as ONE block.
                                      # Do not top-anchor; do not distribute to the edges.
  alignment: "left"                   # the hub's "centre only for announcement-style" exception
                                      # does NOT extend to feed units — left-align.
  gradient-moments: 1                 # exactly one gradient device per board, full stop.
                                      # A clip-text payoff AND a gradient rule is two. Pick one.
  divider: "at most one, full-width, ONLY as a terminator"   # see 'Rules and lockups' below
  url-case: "natural case"            # authzed.com, never uppercased — label-caps is for section
                                      # labels, and uppercasing a URL misrepresents it
```

**Lockup scale — the mark is subordinate, always.** Corrected 2026-09-11: an earlier draft of this
spoke said 96–112px for a footer lockup, which was derived from feed legibility alone and ignored
hierarchy. At that size the wordmark competes with the headline and the board reads bottom-heavy and
logo-forward. Observed directly on two test boards.

> **This is a sanctioned exception to `logo-brand.md`.** That spoke sets a general floor of 80px
> *wide* for the colour wordmark. The numbers below are *heights* on a fixed 1200px canvas, and a
> 56px-tall lockup renders roughly 270px wide — clear of that floor. Where the two ever do conflict,
> the feed-tier number governs a feed board (hub precedence rule 6.2: the spoke governs its surface).

```yaml
lockup:
  footer-default: "48–64px tall on a 1200 canvas"
  ceiling: "never taller than ~60% of the headline's cap height"
  hero-lockup: "96–112px — ONLY when the mark IS the composition (brand-led board, no long headline)"
```

The test: squint at the board. If your eye lands on the wordmark before the headline, the mark is too
big. A social card is a claim with a signature, not a logo with a caption.

**Rules and lockups — a hairline is a terminator, not decoration.** Corrected 2026-09-11: this spoke
previously said "optional hairline," which gave no length, position, or purpose, and test boards duly
invented floating stubs and redundant double rules.

- **At most one** hairline per board.
- **Full-width** across the content measure (edge padding to edge padding). Never a short stub — a
  rule that stops arbitrarily reads as a mistake, because nothing explains where it stopped.
- **It separates two things.** Put it *between* the claim and the signature. A rule with nothing
  below it terminates nothing and is the single most common way these boards go wrong.
- **Optional means omit it.** A board with headline and lockup alone is complete. Reach for the rule
  only when the footer would otherwise float.

**Where to break the headline.** The type spoke mandates explicit `<br>` breaks but gives no method
for choosing where. The method: render at full size and at 0.30×, then pick the split with (a) no
orphaned word, (b) no line dramatically wider than its neighbours, and (c) the semibold clause whole
on its own line. Rule (c) outranks the other two — rebalance the setup clause, never the payoff.

**Balance check — space before content is headroom, space after content is void.** This is the part
that surprises people: a stack can be centred to the pixel and still read bottom-heavy. Measured on
the 2026-09-11 test board, the gap above the headline was 326px and the gap below the footer 340px,
a 14px difference — and the board still read as having an empty bottom third. The asymmetry is
perceptual, not metric: the upper gap is *framed* by the content that follows it, so it reads as
headroom, while the lower gap is terminated only by the canvas edge, so it reads as nothing there.

So **do not centre by measurement.** Either:
- **Settle the stack DOWNWARD** — bias it *below* true centre (roughly 20–40px on a 1200 canvas) so the
  footer sits nearer the bottom edge and the larger gap lands *above* the headline, where it reads as
  headroom. Corrected 2026-09-11: this bullet previously said "optically raise the stack," which is
  backwards — raising it shrinks the headroom and grows the void. Measured on a test board, shifting
  up made the lower gap worse (240px → 275px); shifting down ~24px closed it.
- **Give the lower gap something to terminate on** — a logo wall, a larger mark, a full-width rule.

Both remedies follow from the same principle: you want the **big gap above** and the **small gap
below**. If a remedy moves you the other way, it is the wrong remedy.

Judge it from the rendered image at 0.30×, never from the CSS. `justify-content: center` is a
mathematical claim about a box; it is not a claim about how the image reads.

## Logo walls

```yaml
logo-wall:
  max-marks: 6                  # 5 is safer once logos hit the 50px floor
  logo-height: 50               # ≥50px on a 1200 canvas; per-logo tuning IS expected
  normalize: "filter: brightness(0) invert(1) — one weight, one colour, opacity ~0.9"
  caption: "mono-caps, ≥28px, e.g. TRUSTED BY TEAMS AT"
  zone: "bounded — hairline rule above, its own band. Never a loose row pinned to an edge."
```

A logo wall is **proof for a claim**. Under a category-label headline it has nothing to prove and
becomes a template slot. Drop it rather than ship it decorative.

Normalizing to one weight is required but not sufficient: logos have different optical weights at
equal pixel height (Workday renders visibly lighter than Zoom at the same height). Tune per-logo and
check the row as a row.

> ⚠️ **Customer logo usage is a permissions question, not a design one.** A logo being in the repo is
> not clearance to use it in a given context. Confirm per-campaign before shipping. (2026-09-11: OpenAI
> was pulled from an agents-campaign wall for exactly this reason.)

## Do / Don't

- ✅ 1200×1200 for organic; 1080×1350 when you want maximum feed height
- ✅ `/api/og` for link previews — don't hand-roll an OG card
- ✅ 32px floor for ALL secondary text; verify on a 0.30× contact sheet
- ✅ Cut content when the floor doesn't fit
- ✅ Brand gradient as composition; light boards as a deliberate differentiator
- ✅ Gradient stops from the `warm-hero` token (ends on **violet-600**, settled 2026-06-10 — see the hub), never sampled from a logo SVG
- ✅ Confirm customer-logo clearance per campaign
- ✅ One gradient moment per board; 96px edge padding; left-aligned; centred stack
- ❌ Don't uppercase a URL, and don't judge balance from the CSS — look at the render
- ❌ Don't oversize the lockup (48–64px footer default) or leave a hairline with nothing beneath it
- ❌ Don't use 1.91:1 for a native image post
- ❌ Don't ship a logo wall under a headline that makes no claim
- ❌ Don't let a headline auto-wrap on a fixed canvas
- ❌ Don't size text by what reads well on your monitor
