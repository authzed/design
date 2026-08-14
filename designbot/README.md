# AuthZed Designbot — Source Materials

This package is the **source material** a designbot needs to produce on-brand AuthZed
imagery. It is not the tooling. The tooling exists; what it lacked was a definition of
what "on-brand" means in a form a model can consume.

Scope: **diagrams**, **blog & social imagery**, **mascot / character**. Product UI mockups
are explicitly out of scope — `sandworm/design/product-ui.md` and `web-ui.md` already
cover that surface for humans and code, and generating UI is a different problem.

---

## The one idea: two layers, never blurred

A generation request has two kinds of content in it, and the single most expensive class
of bug we hit came from mixing them.

| Layer | Who reads it | What it contains | Failure mode when wrong |
|---|---|---|---|
| **Composer rules** | The text model assembling the prompt (Claude, backend) | Assembly order, precedence, what may never co-occur, how many references to attach | Self-contradicting payloads → confidently wrong output |
| **Renderer facts** | The image model receiving the prompt (Gemini, via Burrow) | Hexes, identity descriptions, style locks, negative constraints | Drift, off-palette output, off-model characters |

The composer decides *what to say*. The renderer facts are *what gets said*. A rule like
"never emit the blending preamble alongside a character-fidelity block" belongs to the
composer and must never reach the image model. A hex value belongs to the renderer and
should never be paraphrased by the composer.

We learned this the hard way — see [`LEARNINGS.md`](LEARNINGS.md) §1. Burrow shipped a
prompt that told the model to "ignore character and costume, blend freely" in the same
payload as "character MUST MATCH EXACTLY." Both instructions were individually correct.
Together they produced the wrong character, silently, for weeks.

---

## Files

| File | Layer | Read it when |
|---|---|---|
| [`01-composer-contract.md`](01-composer-contract.md) | Composer | Building or reviewing the assembly step |
| [`02-source-material-spec.md`](02-source-material-spec.md) | Both | Authoring a new reference, keyword, or profile |
| [`03-diagrams.md`](03-diagrams.md) | Renderer | Generating any system/flow/authorization diagram |
| [`04-social-blog.md`](04-social-blog.md) | Renderer | Generating OG cards, blog headers, social posts |
| [`05-mascot-character.md`](05-mascot-character.md) | Renderer | Generating character work |
| [`LEARNINGS.md`](LEARNINGS.md) | — | Before changing any of the above |

---

## Consuming this package

**As a prompt/knowledge corpus (Claude backend).** Load `01-composer-contract.md` plus the
one per-type file that matches the request. Do not load all three type files at once —
they contain competing palettes and composition rules, and a model holding all three will
average them. One request, one type file.

**As Burrow brand-config rows.** `02-source-material-spec.md` maps each field in this
package onto the `brand_config` columns that Burrow's prompt assembly already reads.
Most of those columns are currently empty; populating them is the highest-leverage work
available and requires no code change.

**As a standalone tool.** The per-type files are self-contained. Each one ends with a
`Quality locks` section — copy those verbatim into your negative-constraint slot. They are
phrased as instructions to an image model, not as prose for a human.

---

## Provenance, and why it matters

Nothing in the per-type files is invented. It is bridged from Sandworm's design canon —
`sandworm/DESIGN.md` and the `sandworm/design/*.md` spokes — which is itself ground-truthed
against shipped code. Where Sandworm records a correction (it does, in several places),
this package carries the corrected form and cites it.

That lineage is the reason this package can be trusted, and it sets the bar for changes:
**if you add a rule here, it must be traceable to shipped code or an explicit brand
decision.** A rule someone remembered is a rule that will drift. Sandworm's diagram spoke
learned this when a plausible "dashed-border connector" motif was written down, believed,
and then disproved by ground-truthing — the real shipped pattern was a solid teal fan.

---

## Status

Bridged and reviewed against `sandworm/` and Burrow's live `brand_config` on 2026-08-04.

The brand is **Dune-coded end to end**, and the naming is load-bearing rather than
decorative: **SpiceDB** the product, **Sandworm** the design system, and **Dibs** the
mascot — a jerboa, after *Muad'Dib*, the desert mouse Paul Atreides takes his name from.
That coherence explains the palette's desert register (`sand`, `stone`) and is itself
source material: it tells a model what world this brand lives in.

**Dibs is richly defined and structurally inert.** The identity prose is 2,073 characters
of genuinely good specification; every structured field around it is empty and every
reference carries null metadata. See `05-mascot-character.md`.
