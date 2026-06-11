---
name: Sandworm — Web UI (Page Composition)
description: Page-level composition recipes for authzed.com — site chrome (nav/footer), hero variants, section recipes, page archetypes, rhythm/background alternation, and the use-case section registry. Element-level specs live in components.md; this spoke is how pages are ASSEMBLED.
part-of: Sandworm
status: draft   # grounded 2026-06-10 (full page-composition scout over the marketing-site repo); pending review
---

> **Primitive tokens** (`{colors.*}`, `{typography.*}`, `{spacing.*}`, `{motion.*}`, `{rounded.*}`, `{elevation.*}`) are defined in the hub at [`../DESIGN.md`](../DESIGN.md). Load the hub alongside this spoke. Element-level component specs: [`components.md`](components.md).

← Back to [Sandworm DESIGN.md](../DESIGN.md)

## What this spoke covers

How authzed.com pages are **composed**: site chrome, the wrapper-utility skeleton, vertical rhythm and
background alternation, recurring section recipes, page archetypes with their section orders, and the
(unmerged) use-case section registry. The unit here is the **recipe** — the repeatable shape you follow
to assemble a new page — not the component.

> **Branch caveat**: grounded on the working branch (`fix/blog-table-sandworm-values`). Two systems this
> spoke references live in **unmerged worktrees** and are marked as such: the section registry
> (`feat/web-22-component-library`) and RAGDemo (`web-28-ai-resources`). Don't design against those as
> if deployed.

## Composition tokens

```yaml
web-ui:
  # ── CHROME ──
  nav:
    bar: { position: "sticky top-0", z: 100, height: 60px, background: "rgb(32,29,45)" }   # ⚠ off-token bg — see drift notes
    container: "max-w-[1360px] px-4 (wider than content-default's 1140px)"
    left: "logo (with right-click brand context menu) + megamenu"
    right: "Button subtle 'Schedule a Demo' + GradientButton 'Get Started' (both h-9, hidden below laptop)"
    scroll-behavior: "primary CTA swaps analytics id at scrollY>100; 'scrolled' class at >140"
    mobile: "hamburger → full-screen Drawer (bg-stone-850/80 + backdrop-blur-lg, slide-from-right 300ms, scroll-locked); GradientButton first, then accordion groups, 44px-min touch rows"
  megamenu:
    panel: "full-nav-width viewport, rounded-2xl border-stone-700 bg-stone-975 shadow-2xl, fade-only 200ms"
    trigger-active: "underline decoration-red-500 decoration-4 underline-offset-8"   # the nav's signature active state
    recipe: "p-8 → link-column grid + ONE featured card (w-64) on the right"
    column-header: "font-mono text-xs uppercase tracking-widest {colors.sand.300}"
    link-row: "rounded-xl p-3 hover:bg-stone-800/50 — white label + optional sand mono badge pill + stone-300 description"
    structure: "Products (3 cols + featured image) · Solutions (2 cols + featured text) · Resources (4 cols + featured image) · Pricing · AI Authorization (simple links)"
  announcement-bar:
    aesthetic: "terminal — bg-stone-950, border-b-2 stone-800, all font-mono text-[.8125rem]; sand '>' prompt; CTA in sand brackets; live GitHub star count right (laptop+)"
    content: "src/content/settings/announcement.yaml (enable / markdown / button)"
  footer:
    shell: "content-section → max-w-screen-2xl (wider than content), pt-10/14 pb-14/20, top hairline border-stone-400"
    grid: "1 → tablet:2 → laptop:7 cols — brand block (span 2: logo, newsletter, trust badges) + 5 link columns"
    link-style: "py-1 font-light text-stone-200, hover:underline decoration-red-500 decoration-2 underline-offset-4"
    subheading: "pt-6 font-semibold uppercase tracking-widest"
    variants: "hideNewsletter (pricing/demo) · dark border=false (use-case/industry) · dark=false (light learn pages) · MiniFooter (single row, stripped pages)"
    note: "Footer is rendered BY EACH PAGE, not the layout — don't forget it on new pages"

  # ── SKELETON & RHYTHM ──
  wrappers:
    skeleton: '<section class="content-section [rhythm]"><div class="content-default">…</div></section>'
    content-section: "px-6 laptop:px-10"        # horizontal gutter
    content-default: "max-w-desktop (1140px) container mx-auto"
    home-section: "py-14 laptop:py-24"          # marketing rhythm
  rhythm-tiers:
    marketing: "home-section (py-14 → laptop:py-24) — home, careers, campaign pages"
    templated-interior: "py-20 tablet:py-28 — use-case/industry inner sections"
    final-cta: "py-20/24 → tablet:py-32 → laptop:py-40 — CTAs escalate; the page exhales before the ask"
  background-alternation:
    base: "the PAGE shell is bg-dark (= stone-975 #0c050f, the layout default) with text-stone-050 base type; templated pages set their own bg-stone-950 shell — SECTION surfaces alternate stone-950/stone-900 on top. Page ≠ section."
    pattern: "alternate sections wrapped in plain bg-stone-900 divs — hero(950) → problem(900) → solution(950) → examples(900) → faq(950) → cta(900)"
  gradient-washes:
    component: "GradientHighlight — absolutely-positioned blob inside relative shim, page overflow-hidden, content z-10"
    primary: "centered behind hero, w-3/4 max-w-[800px], blur 125px, bg-gradient-hero-original (AI pages: gradient-hero-ai = 114deg violet-600 → magenta/50 → transparent)"
    secondary: "large positioned blob (~1050px), from-sand-200/30 via-red-400/30 to-magenta-600/30"
  full-bleed-exceptions: "footer (screen-2xl), nav (1360px), full-width comparison panels + testimonial bands (full bg, contained inner) — everything else 1140px"

  # ── STICKY OFFSETS ── (keyed to the 60px nav — keep in sync if nav height changes)
  sticky:
    nav: "top-0 z-100"
    pricing-plan-headers: "top-[60px] desktop (backdrop-blur-md) / top-[68px] mobile select"
    toc: "top-24 (blog, case-study scroll-spy) / top-[80px] (learn, boxed variants)"
    split-section-heading: "laptop:top-32 (home Developer pattern — heading pins, content scrolls)"
```

## Page archetypes

Section-order recipes. **Hand-built** = bespoke TSX; **templated** = YAML-driven.

| Archetype | Source | Recipe |
|---|---|---|
| **Home** | hand-built | Hero (2-col: copy+CTAs / HeroDiagram) → customer quote CtaBoxWide → logo wall → architecture (2/5+3/5) → UseCaseTree → sticky-heading value props → testimonial carousel → final CtaBoxWide |
| **Product (templated ×5)** | `content/products/*.yaml` | GradientHighlight → PageHero (centered h1+sub @70%) → BigBox → 3×SmallBox *(templated product-page components, defined in `products/[slug]` source — not yet spec'd in components.md)* → CTA → FAQ (global bank by slug) |
| **Product flagship (cloud)** | hand-built | Hero (5/12 copy + 7/12 metrics carousel, teal→violet clip-text h1) → code-as-diagram → demo video → ValueProposition (4+8 split, numbered ol) → KeyBenefits (4+8, icon cards) → CEO quote → gradient-frame CTA |
| **Use-case (templated ×6)** | `content/use-cases/*.yaml` | UseCaseHero (centered, sand label pill, gradient-hero-ai wash) → Problem (900) → Solution (950, 2-col teal icon chips) → Examples (900, sand icon cards) → AssessmentCTA → FAQ (YAML-local) → CTA (900) |
| **Industry (templated ×3)** | `content/industries/*.yaml` | Same hero recipe → UseCases → Quote → Capabilities → SubVerticals → Stories-or-Stats (YAML decides) → AssessmentCTA → CTA |
| **Pricing** | hand-built | Centered h1 → 3 OptionCards (mobile order-swap puts Cloud first) → comparison tables (sticky plan headers) → FAQ + "Schedule a call" → Footer hideNewsletter |
| **Case study (×6)** | hand-built | Gradient hero (stone-900→950 + brand tint, logo badge, emphasis-span h1, 3-col metric row) → laptop:grid-cols-4: scroll-spy TOC rail + chaptered sections (`scroll-mt-24`) → CtaBoxWide |
| **Blog index** | ISR 3600s | BlogHero (featured) → filter/search/theme controls → SectionLabel "Recent" + 3-card grid → "Archive" + lazy ArchiveList |
| **Blog post** | MD-driven | ReadingProgress → mono breadcrumb → capped header (720px) → procedural Voronoi banner → prose+sticky-TOC grid → RelatedPosts → CtaBoxWide. Only site surface with its own light/dark toggle (`--blog-*` vars) |
| **Careers** | hand-built | Full-width gradient hero (centered display h2, gradient word + sand→magenta underline bar, anchor pill) → JobListings |
| **Contact / form pages** | hand-built | bg-grid texture + secondary blob → narrow 2-col (title / HubSpot form restyled via arbitrary selectors) → logo carousel |
| **Campaign (ai-authorization)** | hand-built | Off-canvas blob → hero → stat cards + red OWASP cards → pillar cards on grid texture → quote → **full-bleed** red-vs-teal comparison → terminal code card → gradient-frame CTA |
| **Learn article** | **light archetype** | `bg-light text-stone-950` → header → TOC (2/5 sticky) + prose (3/5) → CtaBoxWide lightMode → Footer dark=false |

## Section recipes (the shapes between hero and footer)

- **Split intro+content (4+8)** — the hub's `layouts.asymmetric-4-8` at section level: 4-col intro
  (mono uppercase eyebrow `text-[.75rem] tracking-[0.15em] text-stone-500` + light/semibold split h2) +
  8-col content (numbered `ol` rows with mono `01/02/03` accents and stone-800 row borders, or a 2-col
  icon-card grid). Canonical: cloud ValueProposition / KeyBenefits.
- **Stat rows** — three shapes: glass stat card (`rounded-xl border-stone-500/40` gradient tint,
  `text-5xl font-extralight tracking-tighter` value, mono source link) · bare Metric (colored semibold
  value + mono label, 3-up) · image-backed `aspect-[4/3] rounded-3xl` tile (metric or quote variant).
- **Logo walls** — marquee rows (4, alternating directions, opacity ramp 0.1→1.0, NDA pill placeholders
  mixed in) · static carousel (contact) · grid (why-authzed).
- **Quotes** — testimonial carousel (7s auto-cycle, dots/arrows/pause) · quote-in-CtaBoxWide with the
  giant quote-mark SVG (**duplicated verbatim in 5 files — de-facto token, extraction candidate**) ·
  industry Quote section.
- **Comparison** — pricing TableGroup (sticky headers, 380px label col) · red-vs-teal "Without/With
  AuthZed" 2-panel grid (`border-red-400/60 bg-red-900/20` vs teal mirror) — the page-level expression
  of the diagrams teal=yes/red=no language.
- **FAQ** — Radix single-accordion with per-question `#faq-<slug>` anchors. Two content sources:
  the **global Q&A bank** (`content/faq.yaml`, keyed by page id — pricing/open-source/spicedb/products)
  vs **YAML-local questions** (use-case/industry templates). Know which one you're feeding.
- **Final-CTA banners** — three recipes: ① **CtaBoxWide gradient picture-frame** — outer `rounded-[42px]`
  `sand-200 → red-400 → magenta-600` frame, inner `rounded-[18px] bg-stone-900` (or `bg-light`); doubles
  as mid-page quote box. ② Hand-rolled same frame with cool gradients (teal→violet) on cloud/AI pages.
  ③ Centered text + HubSpot modal button at the escalated `py-40` rhythm.
- **AssessmentCTA interstitial** — `rounded-2xl` stone gradient card + animated hex-radar (axis colors =
  the dataviz radar palette) + mono "ASSESSMENT" badge. Ships on every use-case + industry page.

## The use-case section registry — ⚠ UNMERGED

Lives only on unmerged branch `feat/web-22-component-library`; the
deployed `use-cases/[slug]` pipeline is fixed. When it merges:

- **14 variants in 3 families** — `problem` (icon-cards default, painpoint-list, scenarios-grid,
  stat-grid, numbered-options) · `solution` (feature-cards default, diagram-annotations,
  chapter-walkthrough, diagram-chapters, before-after, code-first, integration-pipeline) ·
  `examples` (icon-grid default, tagged-cards)
- YAML opts in via a top-level `layout:` block (`layout: { problem: stat-grid, solution: before-after }`);
  omitted family → default variant. Hero/FAQ/CTA are NOT registry-driven.
- Zod schema enforces per-variant required fields at build; gallery at `(internal)/gallery/…`;
  authoring decision-flow in the `/use-case-page` skill.

## OG / social chrome

OG images are 1200×630. Archetypes share static art (all use-cases share one OG, etc.); **blog posts get
per-post procedural Voronoi art** — the same generator renders the in-page PostBanner, so OG and post
hero share a visual language. Runtime fallback endpoint at `/api/og` (25s timeout → default art).

## Do / Don't

- ✅ Compose with the skeleton: `content-section` + rhythm class outer, `content-default` inner
- ✅ Alternate `stone-950` / `stone-900` section backgrounds on templated pages; escalate padding into the final CTA
- ✅ One gradient wash per hero, positioned blob behind `z-10` content, page `overflow-hidden`
- ✅ Red-500 underline (`decoration-4` nav / `decoration-2` footer) is the link/active accent at chrome level
- ✅ Render `<Footer />` on every new page (it's not in the layout) — and pick the right variant
- ❌ Don't hand-build a use-case/industry page — they're YAML-templated; new sections go through the registry (once merged)
- ❌ Don't invent sticky offsets — they're keyed to the 60px nav (`top-[60px]`/`top-24`/`top-[80px]` family)
- ❌ Don't center body sections by default — centered is for heroes and final CTAs; working sections are left-aligned or split
- ❌ Don't design against the registry or RAGDemo as if deployed — both are unmerged worktrees

## Drift notes (found during grounding — for the reconcile list)

- Nav bar background is `rgb(32,29,45)` (#201d2d) — matches no stone token (stone-900 is #1e1424)
- Customers-index Banner gradient uses raw rgb triples (`rgb(176,75,216)` etc.) — off-token
- CtaBoxWide frame gradient `sand-200 → red-400 → magenta-600` is an undocumented warm-family variant
  (closest matrix member: `warm-brand`) — fold into the gradients→code reconcile
- 5 unused home section components (`Stats`, `LatestNews`, `Features`, `CustomerStory`, `Principles`) —
  deprecated or staged, unclear
- `projects/web/CLAUDE.md` references a `(variants)` route group that doesn't exist (stale)

## Known gaps

- **No `/use-cases` or `/industries` index pages** — discovery is megamenu + footer only
- Events pages, `/assessment` flow, `/brand`, `/z/*` landers, `(modal)` signup flows: outside this
  spoke's archetype set, unaudited
- Registry + RAGDemo composition documented from worktrees — re-verify on merge

## Grounding

Scouted 2026-06-10 over `projects/web/src` (branch `fix/blog-table-sandworm-values`). Chrome:
`(main)/layout.tsx`, `Nav.tsx`, `components/nav/*`, `Footer.tsx`, `AnnouncementBar.tsx`. Rhythm:
`globals.css` @layer components, `tailwind.config.js`. Archetypes: `(main)/page.tsx`, `products/[slug]`,
`products/authzed-cloud`, `spicedb`, `use-cases/[slug]`, `industries/[slug]`, `pricing`, `customers/*`,
`blog/*`, `careers`, `contact`, `ai-authorization`, `why-authzed`, `learn/[slug]`. Registry:
branch `feat/web-22-component-library` → `src/sections/registry.ts`. OG: `common/metadata.ts`, `scripts/generate-og.mjs`.
