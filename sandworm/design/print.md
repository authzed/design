---
name: Sandworm — Print Artifacts
description: The print half of the presentation tier — customer one-pagers, investor data-room artifacts, DocSend section-icon tiles, and the print-media contract for generating agents. Grounded in the Series B data-room production corpus.
part-of: Sandworm
status: draft   # grounded 2026-06-10 (data-room scout). Split from presentations.md 2026-06-10; sibling: slides.md
---

> **Primitive tokens** (`{colors.*}`, `{typography.*}`, `{spacing.*}`, `{motion.*}`, `{rounded.*}`, `{elevation.*}`) are defined in the hub at [`../DESIGN.md`](../DESIGN.md). Load the hub alongside this spoke.

← Back to [Sandworm DESIGN.md](../DESIGN.md) · Sibling: [`slides.md`](slides.md)

> **Presentation-tier fingerprint** (shared with [`slides.md`](slides.md)): light/bold emphasis splits
> carry every headline; JetBrains Mono is metadata ONLY (kickers, labels, attributions, footers); footer
> chrome = hairline rule + mark + mono-caps label + page number; chromatic restraint (surfaces and ink do
> the work — accents are punctuation); the faint square-grid texture is the tier's backdrop motif; and
> **the canvas is fixed** — page or frame, content fits or gets cut.

## What this spoke covers

How Sandworm goes to paper and PDF: **print-target one-pagers** (customer stories, investor data-room
artifacts), **DocSend section-icon tiles**, and the **print-media contract** any generating agent must
follow. Grounded in the Series B data-room production corpus (`projects/data-room/` — 7 shipped customer
one-pagers + 13 icon tiles). 16:9 decks are the sibling spoke: [`slides.md`](slides.md).

## Print tokens

```yaml
print:
  # ── ARTIFACT FORMATS ── (verified against shipped PDFs, 2026-06-10)
  formats:
    one-pager:
      page: "US Letter portrait, 8.5in × 11in, single page"   # @page { size: letter; margin: 0 }
      export: "headless Chrome --print-to-pdf (HTML is the source; @page CSS honored, backgrounds print)"
      source-pattern: "design/onepagers/<name>.html + export-pdfs.sh"
      naming: "AuthZed - Customer Story - <Customer>.pdf"
    icon-tile:
      canvas: 1024            # design at 1024×1024 SVG
      export: 200             # rasterize to 200×200 PNG (rsvg-convert)
      display-target: 75      # DocSend thumbnail ≈75px — the tile must read at this size

  # ── PRINT-MEDIA CONTRACT ── REQUIRED for any generated print artifact. HTML is the source format,
  # but the PAGE IS THE CANVAS: a "one-pager" is a fixed 8.5×11in element, NOT an unbounded scroll page.
  # (Added 2026-06-10 — agents generating "one-pagers" as mile-long HTML documents is a real failure mode.)
  print-media-contract:
    page-rule: "@page { size: letter; margin: 0; }"
    page-element: ".page { width: 8.5in; height: 11in; }  — FIXED physical dimensions, grid-rowed (auto 1fr 0.45in)"
    units: "physical units (in / pt) for layout and type — never px-only, never vh/vw"
    overflow-rule: "content must FIT the fixed page. If it doesn't fit, CUT CONTENT — the page never grows. No scrolling, no overflow, no page 2 unless the artifact is explicitly multi-page."
    print-media-query: "@media print { body { background: white; } .page { margin: 0; box-shadow: none; } } — screen preview (page on stone-200 ground + shadow) strips at print"
    hygiene: "text-wrap: pretty; widows: 2; orphans: 2 on flowing text"
    export: "chrome --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf"
    verify: "exported PDF MediaBox MUST be [0 0 612 792] and page count MUST equal the intended count (1 for one-pagers) — check with mdls/pdfinfo before calling it done"

  # ── ONE-PAGER ANATOMY ── the compressed-cover pattern
  one-pager:
    macro-grid: "page = grid-template-rows: auto 1fr 0.45in  (hero / body / footer)"
    gutter: 0.6in             # horizontal padding, consistent across hero/body/footer
    hero:
      surface: "{colors.stone.950}"
      padding: "0.4in 0.6in 0.38in"
      lockup: "customer logo + AuthZed logo, joined by a weight-200 18pt '+' in {colors.stone.400}"
      lockup-heights: "AuthZed 0.34in; customer logo optically tuned per brand (0.28–0.40in)"
      title: { family: Inter, weight: 200, size: 26pt, lineHeight: 1.1, letterSpacing: -0.02em, color: white, emphasis: "strong = 600" }
      subtitle: { weight: 300, size: 11.5pt, lineHeight: 1.4, color: "{colors.stone.300}", maxWidth: 6.2in }
    body:
      surface: "#ffffff"      # PURE WHITE — print deviation from mode-light's stone-025 page surface (see prose)
      padding: "0.42in 0.6in 0.3in"
      columns: "2-col narrative grid, 1fr 1fr, column-gap 0.34in"
    footer:
      height: 0.45in
      surface: "{colors.stone.025}"
      border-top: "1px {colors.stone.100}"
      left: "uppercase JetBrains Mono 8pt doc-context label, {colors.stone.500}"
      right: "dark AuthZed wordmark at 12pt (≈16px / 0.167in) height, opacity 0.85"

  # ── PRINT TYPE SCALE ── (pt-based; the font-light brand rule translates as 200 display / 300 body / 600 emphasis)
  type:
    display: { family: Inter, weight: 200 }          # hero titles, the .light half of section heads
    body: { family: Inter, weight: 300, size: 10pt, lineHeight: 1.5, color: "{colors.stone.800}" }
    section-head: { size: 13pt, letterSpacing: -0.015em, pattern: "weight-200 setup phrase + weight-600 payoff phrase, one line" }
    emphasis-weight: 600                              # strong spans only — never whole paragraphs
    list-item: { weight: 300, size: 9.25pt, lineHeight: 1.45, color: "{colors.stone.700}" }
    pull-quote: { weight: 300, style: italic, size: 11pt, color: "{colors.stone.500}" }
    stat-value: { weight: 600, size: 10.5pt, color: "{colors.stone.900}" }
    metadata: { family: "JetBrains Mono", weight: 300, size: 8pt, transform: uppercase, letterSpacing: "0.04–0.2em" }
    hygiene: "text-wrap: pretty; widows: 2; orphans: 2 on subtitles, narrative, quotes, heads"
    opentype: 'font-feature-settings: "ss01", "cv11"'

  # ── COLOR ON PRINT ── extreme restraint; ink hierarchy + two tiny chromatic accents
  color:
    page: "#ffffff"
    ink: ["{colors.stone.900}", "{colors.stone.800}", "{colors.stone.700}", "{colors.stone.500}", "{colors.stone.400}"]   # heads → narrative → lists → quotes → attributions
    panel: "{colors.stone.025}"                       # pull-quote boxes, footer strip
    hairlines: ["{colors.stone.050}", "{colors.stone.100}", "{colors.stone.300}"]   # stat dividers / footer+kicker rules / quote left-border
    accents:
      red-dash: { color: "{colors.red.500}", form: "a SINGLE 6px-wide × 1px-tall dash tick per why-list item (li::before, left:0, top:0.55em — NOT a stack of dashes); kicker text" }
      sand-border: { color: "{colors.sand.300}", form: "2px left border on voice cards" }
    rule: "Accents are structural punctuation, not surfaces. The shipped template even defines `.accent` hooks that resolve to stone-900 ink — restraint is the design."

  # ── ICON TILES ── DocSend section thumbnails
  icon-tile:
    ground: "{colors.stone.950}"
    border: "4px {colors.stone.800}"                  # at 1024 canvas (8px for the gradient variant — not shipped)
    radius: "96 / 1024 canvas (≈ rounded-lg proportions)"
    texture: "80px grid, white at 4% stroke-opacity, radially masked to edges"
    glyph: { library: "Lucide", stroke: "{colors.stone.100}", strokeWidth: "UNDER REVIEW — shipped generator emits 1.75 (Lucide units); flagged too thick in review 2026-06-10; showcase base was 1.25 → leaning 1.25, regenerate tiles when settled", size: "≈47% of canvas", note: "bump strokeWidth to 2 below ~75px display" }
    label: "icon-dominant (shipped); the numbered JetBrains-Mono variant was explored, not shipped"
```

## The compressed-cover pattern

The one-pager is a miniature of the brand's dark-by-default rule applied to print: a **dark `stone-950`
hero** (the "cover") compressed onto the top of a **white working body**, closed by a **`stone-025` footer
strip**. The hero carries the co-brand lockup and a weight-200 display title; the body does dense
2-column narrative work in weight-300 ink; the footer is quiet mono metadata. One page, three surfaces,
the same dark→light confidence as the website's section rhythm.

**Print body runs pure white, not `stone-025`** — a deliberate deviation from `mode-light.surface`.
On paper/PDF, `stone-025` reads as a printing error rather than a surface tint; white page + `stone-025`
*panels* (pull-quotes, footer) restores the hierarchy that mode-light gets from `stone-025` page +
white cards. Inverted layering, same intent.

## The print type register

Print tightens the marketing weights one notch at each end: display drops to **weight 200** (hero titles,
the `.light` half of section heads), body holds **300**, and emphasis stays **600** — but only ever as
spans. The signature move is the **mixed-weight section head**: a weight-200 setup phrase and a
weight-600 payoff phrase sharing one 13pt line ("Permissions: **stuck in park**"). It's the print
equivalent of the website's font-light h1 + `magenta-600` semibold emphasis span — with ink doing the
work color does on screen.

JetBrains Mono appears **only as metadata** — stat labels, quote attributions, kickers, the footer doc
label — always small (8pt), usually uppercase, letter-spaced. Never narrative.

## Color: ink does the talking

The entire chromatic budget of a shipped one-pager is: **red-500 dash ticks** on why-lists (plus kicker
text on the voices page) and a **sand-300 left border** on voice cards. Everything else is the stone ramp.
Magenta, teal, violet, and the warm gradient do not appear in the print corpus at all — brand warmth
comes from the dark hero + logo lockup, not from chromatic surfaces. When designing new print artifacts,
match this restraint: if you're reaching for a third accent color on a one-pager, you've left the
register.

Customer logos: **brand-color on the dark hero** (Netflix red, OpenAI white), **forced to near-black**
(`filter: brightness(0)`, opacity 0.85) in light-surface logo grids.

## Recurring recipes (shipped)

> **Normative template**: `design/onepagers/turo.html` in the data-room corpus — the 5 sibling customer
> pages are byte-identical in CSS. New one-pagers start from its page order: hero lockup+title →
> 2-col body (sections + why-list left · pull-quote + sections + stat stack right) → footer chrome.
> No cleared customer logo yet? Use a mono-caps name pill in the lockup position (the NDA-pill device,
> forward-canon) — never typeset a fake logo.

1. **Co-brand lockup** — `[customer] + [AuthZed]`, weight-200 plus-glyph, per-logo optical height tuning
2. **Mixed-weight section head** — 200 setup + 600 payoff, one 13pt line
3. **Why-list** — unbulleted items, one 6×1px `red-500` dash tick per item
4. **Pull-quote panel** — `stone-025` box, 2px `stone-300` left border, italic 300 quote, mono attribution (`Name · Role, Company`)
5. **Result-stat stack** — vertical rows: 600-weight value + 8pt mono uppercase label, `stone-050` hairline dividers (values may be qualitative)
6. **Footer chrome** — mono doc-context label left, dark wordmark right, on the `stone-025` strip
7. **Kicker rule** — uppercase mono `red-500` kicker over a 1px `stone-100` rule, opening a body
8. **Logo strip** — edge-faded (alpha mask) horizontal logo rows, per-logo width tuning
9. **Voice-card grid** — sand-border cards: blackened logo, italic quote with weight-500 `.em` spans, mono attribution pinned to bottom

## Do / Don't

- ✅ Dark `stone-950` hero + white body + `stone-025` footer — the three-surface page
- ✅ Weight 200/300/600 only; mixed-weight section heads; mono for metadata only
- ✅ Two chromatic accents max per artifact, structural not surface (ticks, borders, kickers)
- ✅ Design icon tiles at 1024, verify legibility at 75px (bump stroke to 2)
- ❌ **Never generate an unbounded-height HTML page as a "one-pager"** — the page is a FIXED 8.5×11in element with an `@page` rule (see print-media-contract). If content overflows, cut content; the page doesn't grow. Verify the exported PDF is 1 page at 612×792 before calling it done.
- ❌ Don't tint the print page `stone-025` — white page, `stone-025` panels
- ❌ Don't import the warm gradient or magenta emphasis into print artifacts — ungrounded in the corpus; ink + restraint IS the print register
- ❌ Don't ship multi-page artifacts off this spec — every grounded PDF is exactly one page; running headers/page numbers are undefined

## Known gaps

- **Multi-page anatomy** — running headers, page numbers, continuation patterns ungrounded (all shipped PDFs are 1 page).
- **Charts on print/light** — no chart styling exists in the corpus; when needed, start from `dataviz.md`'s light-surface palette + this spoke's restraint rule.
- **Font delivery** — exports pull Inter/JBMono from the Google Fonts CDN at print time; no embedded/self-hosted strategy. Network-dependent exports.
- **Letter-only** — no A4/international variant.
- **Logo SVG hex drift (again)** — data-room's `authzed-logo.svg` carries `#A43189 / #F0546C / #FFB471` (note `FFB471`, a *different* near-miss than the web assets' `FFB371`); dark wordmark `#2B2231` matches no stone token. Same reconcile family as `logo-brand.md`'s TODO.
- **Icon roster** — 13 section tiles shipped (11 numbered + website + voices), not the "12" in older notes.
- **Icon glyph stroke under review** — shipped generator emits 1.75; flagged too thick 2026-06-10, leaning 1.25 (showcase base). Regenerate tiles when settled.

## Grounding

Scouted 2026-06-10 from `projects/data-room/` (production corpus): `design/onepagers/turo.html` (+5
byte-identical-template siblings + `voices.html` variant), `design/onepagers/export-pdfs.sh`,
`design/icons/export.mjs`, `design/icons/showcase.html`, shipped PDFs in `out/docsend-ready/`.
Verified: `@page` letter sizing, MediaBox 612×792, 200×200 tile exports, per-element type/color values.
Split from the unified presentations spoke 2026-06-10 (slides → [`slides.md`](slides.md)).
