# Blog & Social Imagery

Source: `sandworm/DESIGN.md` § Colors, Typography, Do's and Don'ts. Hex values live in
`sandworm/design/palette.md` — this file references token names, matching the hub's own
anti-drift rule.

---

## Two lanes, and the split is about text

**Lane A — text-bearing cards** (OG images, blog headers with a headline, quote cards).
These are **templated renders**, not image generations. An AuthZed OG generator already
exists for this. Reasons, in order of how much they matter:

1. Image models misspell headlines, and the headline is the entire payload of an OG card.
2. The typographic register is precise — Inter `font-light` (300) headlines with
   `font-semibold text-magenta-600` emphasis spans. A model approximates weight; the brand
   *is* the weight.
3. OG cards are regenerated constantly as titles change. A template is deterministic; a
   generation drifts on every re-roll.

**Lane B — non-text imagery** (atmospheric backgrounds, illustrative spot art, abstract
brand texture, section headers with no baked-in copy). This is genuine image-generation
territory, and the rest of this file is the spec for it.

If a request has a headline in it, it is Lane A. Do not compromise by generating an image
and hoping the text lands.

---

## Palette

**Brand spine.** `magenta-600` is the AuthZed primary — wordmark, in-prose emphasis, hover
borders on dark cards. `sand-300` is the warm counterweight and the link color on dark.
`teal-500` is the cool tertiary for secondary CTAs and success.

**Stone is the neutral spine and it is purple-tinted, not gray.** This is the single most
common way generated imagery goes off-brand: a model reaches for a neutral dark and
produces a brown or blue-black, which reads instantly wrong next to real surfaces. Dark
page surface is `stone-975`; dark cards are `stone-950` at 90% opacity so gradients breathe
through. Light page surface is `stone-025`, cards pure white.

**Gradients are a temperature matrix, not one gradient.**

| Role | Warm | Cool |
|---|---|---|
| Hero (3-stop) | `warm-hero` — sand-300 → red-400 → **violet-600** | `cool-hero` — violet-500 → teal-400 |
| Accent (2-stop) | `warm-accent` — sand-300 → red-500 | `cool-accent` — violet-400 → blue-300 |
| Brand-landing (4-stop) | `warm-brand` — sand-100 → sand-300 → magenta-600 → magenta-900 | `cool-brand` — blue-150 → teal-300 → violet-600 → violet-900 |

`warm-hero` is **the** brand gradient. Its violet end-stop is `violet-600` (`#6242e0`),
settled 2026-06-10 against the canonical CTA — if you see `violet-500` terminating a warm
gradient, that is known drift, not canon.

Use `cool-hero` for cloud/data/product surfaces where warm over-saturates.

**Do not put the brand gradient on everything.** Over-application kills the signal. It
belongs on hero emphasis and primary CTAs, not as a default background wash.

## Typography (Lane A, and for any generated mock that implies type)

- **Inter** carries ~95% of the surface. **Brand weight is light** — headlines and marketing
  body both run `font-light` (300). The lightness is the warm-authority register.
- **Bold is for emphasis spans only.** The AuthZed pattern is `font-light` headline with a
  `font-semibold text-magenta-600` phrase inside it.
- **JetBrains Mono** for code, terminal chrome, and mono-caps section labels (`text-xs`,
  `letterSpacing: 0.08em`, uppercase), paired with horizontal rules.
- **Prose is never mono.** Inter for narrative, mono for code.

## Composition

- **Left-align by default.** Centered text is for announcement-style sections only.
  Defaulting to centered is what makes imagery read as generic SaaS.
- **Translucency or gradient border — never both.** Layering a translucent background
  inside a gradient-bordered container reads muddy.
- The asymmetric 4/8 grid is the house pattern for breaking out of centered layouts on
  laptop and up.

## Semantic color

`teal` success · `sand` warning · `red` error · `violet` creative/highlight. Same language
as diagrams, so a reader carries one meaning across surfaces.

---

## Quality locks

Copy verbatim into the negative-constraint slot for Lane B.

```
- Neutrals must be purple-tinted (Sandworm stone family). Never render neutral grays,
  browns, or blue-blacks. Never use generic Tailwind palette colors.
- Never use arbitrary hex values for brand surfaces. Use only Sandworm family colors.
- The warm brand gradient runs sand → red → violet-600. Never terminate it on a different hue.
- Do not apply the brand gradient as a full-bleed background wash. It is for emphasis.
- Do not render headline text, wordmarks, or UI copy into the image. Text is composited
  separately.
- Do not render a solid-magenta button. No solid-magenta CTA exists in this brand.
- Do not center-align composition by default.
- Do not combine a translucent background with a gradient border.
- No fake dashboards, live tickers, or implied backend activity.
```

That last one is a brand-integrity rule, not an aesthetic one: the system explicitly
forbids implying activity that isn't happening.

## Known drift — do not clone

- **Solid-magenta buttons.** These appear where vendor forms (HubSpot, Calendly) force a
  solid background. That is vendor drift. There is no canonical solid-magenta CTA.
- **`violet-500` warm-gradient end-stops.** Three shipped sites still carry it; canon is
  `violet-600`.

The hub's own rule applies here: document rejected drift, don't bless it.

## Open

`identity` and `voice` are both null in the live `brand_config`. Voice guidelines matter for
any generated copy and for choosing register in illustrative work. `DESIGN.md` § Do's and
Don'ts is the nearest source and should be promoted into the `voice` field — see
`02-source-material-spec.md`.
