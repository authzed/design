---
name: Sandworm — Slides
description: The 16:9 deck language — type scale, layout grid, the gradient agenda capsule, layout recipes, slide components, and beam-in-slides. Grounded in the AuthZed Deck Template (Dark v1.0) and the Golden Pitch March 2026.
part-of: Sandworm
status: draft   # grounded 2026-06-10 (deck template v1.0 + golden pitch, Drive exports). Split from presentations.md 2026-06-10; sibling: print.md
---

> **Primitive tokens** (`{colors.*}`, `{typography.*}`, `{spacing.*}`, `{motion.*}`, `{rounded.*}`, `{elevation.*}`) are defined in the hub at [`../DESIGN.md`](../DESIGN.md). Load the hub alongside this spoke.

← Back to [Sandworm DESIGN.md](../DESIGN.md) · Sibling: [`print.md`](print.md)

> **Presentation-tier fingerprint** (shared with [`print.md`](print.md)): light/bold emphasis splits
> carry every headline; JetBrains Mono is metadata ONLY (kickers, labels, attributions, footers); footer
> chrome = hairline rule + mark + mono-caps label + page number; chromatic restraint (surfaces and ink do
> the work — accents are punctuation); the faint square-grid texture is the tier's backdrop motif; and
> **the canvas is fixed** — page or frame, content fits or gets cut.

## What this spoke covers

The **16:9 deck language**: how AuthZed presentations are typeset, gridded, and composed.
Grounded 2026-06-10 from **AuthZed Deck Template — Dark v1.0** (26pp, the prescriptive source, Google
Slides Theme Builder) and **Golden Pitch — March 2026** (the applied reality). Both live in Google Drive:
[Deck Template — Dark v1.0](https://docs.google.com/presentation/d/1pBkyllusR3pjqz3mD279PlmPgZZth4Stvhs6IVUPWxo) ·
[Golden Pitch — March 2026](https://docs.google.com/presentation/d/1mvLaVYiQPls5P1IPC2bHUioEF6cO7LcsGxidv3P2_J0) ·
[Golden Pitch — Static](https://docs.google.com/presentation/d/1wh9v696WdnbGgnSOTx67T6W7OBiHy5aOiXAROP6k8rk).
Print artifacts are the sibling spoke: [`print.md`](print.md).

## Slide tokens

```yaml
slides:
  format: "16:9 — Google Slides (Theme Builder template); dark by default"
  grid: "12-column layout grid (template p5) with prescribed frame widths (p6) — 'minimizes visual shifts'. Width combos always sum to 12: thirds (4/4/4), 5/7, 6/6, 8/4, 10/2, full."
  surface:
    default: "near-black, dark by default — same register as the web"
    light-variant: "supported minority — the type scale ships a light-panel sibling (template p24); see Light-mode slides below"
    texture: "faint square-grid + warm corner glow on cover/closer slides (the icon-tile grid texture at slide scale)"
  type-scale:                                # Inter Light primary; JetBrains Mono secondary (template p7)
    display: { xl: "53pt / 0.77", l: "45pt / 0.77", m: "34pt / 0.77" }
    heading: { h1: "23pt / 0.85", h2: "19pt / 0.85", h3: "15pt / 0.85" }
    paragraph: { xl: "11pt / 1.00", l: "10pt / 1.00", m: "8pt / 1.00" }
    secondary-mono: { xl: "11pt", l: "10pt", m: "8pt", use: "subheadings, chart labels, image descriptions, kickers" }
  headline-rule: "light + bold emphasis split, always. Display headings 2-4 lines max ('Less is more'); Heading-1 walls 3-6 lines max."
  footer: "thin stone rule · Saturn mini-logomark + mono-caps tagline left ('THE AUTHORIZATION PLATFORM') · page number right"
  agenda-capsule: "the slide-tier signature device — the ACTIVE agenda item rides a gradient-bordered rounded capsule that bleeds off the right slide edge; inactive items are dimmed with large light numerals + thin rules"
  images: "rounded corners matching layout radius; recolor to the theme palette when original colors distract (template p8)"
  beam-in-slides: "ships THIN with a white-hot right tip; observed gradient runs magenta→red→sand→white (≠ web warm-hero — no violet end); logomark sits at the beam's ORIGIN end (bare glyph in the golden pitch; the stone-950 coin treatment is forward-canon per 2026-06-10 decision). Also used small, as a strip under the logo lockup on divider/list slides."
  html-mock-contract: "HTML slide mocks are FIXED 16:9 frames (e.g. 1280×720 or aspect-ratio:16/9), one frame per slide — never a continuous scroll page. Same canvas discipline as print.md's print-media contract."
```

## Layout recipes (template "Example Slides", p16-22 + applied)

The template prescribes these as starting points — "copy, modify, and use as you need":

1. **Title slide** (p1) — logomark + hairline chrome across the top (mono version tag right); mono kicker
   (date/version) over a light/bold split Display title, left-aligned at ~40% height; author caption below.
2. **Agenda / section divider** (p2/4/9/16/23) — left third: bold-lead heading + body; right two-thirds:
   the numbered list with the **gradient capsule** on the active item. Re-shown at each section boundary
   with the next item active — the deck's wayfinding system.
3. **Left-rail content** (p3/p10) — content hugs the left ~third (mono eyebrow → Display-M light title →
   body with bold spans → mono sub-labels over white detail lines); the rest of the slide is deliberately
   EMPTY. Whitespace is the layout.
4. **Statement** (p17) — full-bleed warm gradient wash background; one large light heading with a bold
   punchline ("Less is more."), top-left. Display sizes, 2-4 lines max, minimal chrome.
5. **Long-headline** (p18) — bold lead-in phrase + light continuation at Heading 1, 3-6 lines max, on a
   cool dark wash. For when the headline IS the content.
6. **Quote** (p15) — oversized ghost quote-mark, Display-light quote with bold emphasis span, mono
   attribution; faint grid + glow backdrop.
7. **Text & cropped image, 50/50** (p19) — left dark panel: title + repeated [mono label → paragraph]
   stacks; right half: image FULL-BLEED to the slide edges.
8. **Focused text & rounded image** (p20) — short text block left-center (title + one paragraph); image
   right (~55%) in a ROUNDED container INSET from the edges. Bleed (p19) vs inset (p20): pick by content
   density — dense text gets the bleed split, focused statements get the inset float.
9. **4-up principle rows** (p12-14/p22) — four columns of [icon → Heading 3 → paragraph]; icons either
   dark rounded tiles (geometric) or bare brand-color line icons.
10. **Timeline** (p21) — full-width gradient line (violet→magenta→red→sand sweep) with colored dot
    milestones; heading + paragraph column under each dot.
11. **Two-panel split** (p24) — 50/50 vertical split, used for dark/light comparisons (the type-scale
    specimen) and before/after pairings.
12. **Diagram slide** (p25, golden p8) — the [`diagrams.md`](diagrams.md) vocabulary verbatim: dashed
    scope containers with mono labels, solid node tiles, orthogonal arrowed connectors with tiny mono
    labels, category-tinted pills, glow-active Saturn tile. One language across web, print, and slides.
13. **Closer** (p11/p26, golden p18) — body block top-left; giant Display ("Thanks" / "Thank you!")
    pinned bottom-left; grid texture + warm corner glow.

## Applied components (Golden Pitch)

- **kicker-rule quote grid** — color-coded mono-caps kickers (sand/red/magenta) over full-width
  hairlines, each followed by a row of ghost-quote-mark quotes (golden p5)
- **outlined feature cards** — thin colored-outline rounded cards (red/magenta), transparent fill, bold
  lead + light continuation (golden p7)
- **boxed list rows** — stacked stone-outline rounded boxes, Heading + muted paragraph; left rail
  carries lockup + light headline (golden p9-10)
- **code-as-diagram** — rounded code panel with syntax-highlighted if-wall, DIMMED, with a floating
  elevated check-card overlaid (golden p13-14 — the slide form of `IfStatementsToCheckPermission`)
- **chart slides** — mono axis/annotation labels, dashed gridlines; violet "typical" line vs green
  "AuthZed" line (golden p6/p15 — green ruled a deliberate one-off punch for that chart, 2026-06-10;
  teal stays the system good-color)
- **logo wall** — real logos in center rows surrounded by stone-outline mono NDA pills, edge-faded
  (golden p16 — the web `CustomerLogoWall` pattern)
- **case-study slide** — logo + heading + mono read-more links left; the data-room one-pagers rendered
  as an angled paper stack right (golden p17 — cross-tier reuse of [`print.md`](print.md) artifacts)
- **UI-vignette cards** — grid of rounded dark cards, each a miniature product vignette: colored avatar
  circle → verb chip → entity tile, mono-caps sublabels (golden p2)

## Light-mode slides — NEEDS REFS

Grounded only by the type-scale light panel (template p24): light slides exist and carry the same pt
scale. **Ungrounded**: light surface stops, when to choose light over dark, ink hierarchy on light
slides, how the capsule/beam devices translate. Don't generate light decks from guesses — gather light
slide references or run a forward-canon session first.

## Charts in slides — OPEN

Observed: mono labels/annotations, dashed gridline dividers, violet for "typical/before", restraint in
series counts. **Undecided: whether the Rakis value-count palettes ([`dataviz.md`](dataviz.md)) govern
deck charts.** Recommendation: adopt Rakis (value-count palettes + the surface rule — dark slides take
the bright set) for any multi-series deck chart, keep the mono chrome; single-line story charts may keep
deliberate punch colors per the green-line ruling. Pending a design ruling.

## Do / Don't

- ✅ Light/bold split headlines; mono kickers; the 12-col grid; footer chrome on every content slide
- ✅ One gradient-capsule active state per agenda; re-show the agenda at section boundaries
- ✅ Whitespace is a layout — the left-rail recipe leaves two-thirds empty on purpose
- ✅ HTML slide mocks = fixed 16:9 frames, one per slide
- ❌ Don't exceed the headline line-caps (Display 2-4 lines, Heading-1 3-6) — "Less is more" is in the template itself
- ❌ Don't put body copy in mono — mono is for kickers, chart labels, attributions, footer
- ❌ Don't generate light-mode decks yet (needs refs) or generalize the green chart line (one-off punch)
- ❌ Don't scatter multiple beams or capsules — one signature device per slide, same rule as diagrams

## Known gaps

- **Slide beam gradient variant** — decks ship magenta→red→sand→white-hot (no violet end) vs web
  `warm-hero`. Either canonize a `beam-slides` variant or reconcile decks to warm-hero in the next
  template rev.
- **Template footer is a placeholder** ("Edit > Theme Builder > …") — the golden pitch's mono-caps
  tagline footer is the applied form; template rev should bake it in.
- **Light-mode slides** — see section above; needs refs.
- **Rakis governance for deck charts** — see Charts in slides; pending ruling.
- **Product supplements deck unscouted** — "Working Copy - Golden Pitch Product Supplements" (Cormac) is
  in Drive; likely holds product/feature slide patterns the main pitch doesn't.

## Grounding

Grounded 2026-06-10 from the Drive decks linked above: **AuthZed Deck Template — Dark v1.0** (26pp; type scale
p7/p24, layout grid p5-6, agenda capsule p2/4/9/16/23, quote p15, statement slides p17-18, image layouts
p19-20, timeline p21, diagram components p25) and **AuthZed Golden Pitch — March 2026** (+ Static
variant; cover/closer texture, kicker-quote grid p5, charts p6/15, beam-in-the-wild p8/11,
code-as-diagram p13-14, logo wall p16, case-study stack p17). Split from the unified presentations
spoke 2026-06-10 (print → [`print.md`](print.md)).
