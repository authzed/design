# Mascot & Character

**Dibs is the AuthZed mascot** — a jerboa, named for *Muad'Dib*, the desert mouse of Dune.
The naming is part of a coherent set: **SpiceDB** the product, **Sandworm** the design
system, **Dibs** the character. Dibs is referred to as **they**.

That lineage is usable source material, not trivia. It places the character in a desert
register that the palette already speaks (`sand`, `stone`), and it means Dibs is a
*desert* creature — which should inform environment, lighting, and prop choices in a way
that a generic "cute rodent" prompt never will.

Separately and strictly: the **Saturn logomark** is not the mascot and follows different
rules. Part 1 covers the mark, Part 2 covers Dibs.

---

## Part 1 — The logomark (applies now)

The logomark gradient uses canonical Sandworm tokens: **magenta-600 → red-500 → sand-300**.

**The shipped SVG assets carry the wrong hexes.** `#A43189` / `#F0546C` / `#FFB371` are
legacy near-matches that predate the current palette. They are **un-reconciled drift, not a
separate brand palette.** Use the tokens, not the values you find in the files.

Canonical assets live at `projects/web/public/assets/brand/` and
`projects/design/sandworm/public/` (synchronized), in five variants.

In diagrams, the mark sits on a `stone-950` coin with a subtle `stone-800` ring — the dark
disc is required for the color glyph to read against the gradient beam
(see `03-diagrams.md`).

```
- Never recolor the logomark. Its gradient is magenta-600 → red-500 → sand-300.
- Never regenerate or redraw the logomark with an image model. Composite the canonical
  asset. A generated approximation of a logo is a wrong logo.
- Never use the legacy hexes #A43189, #F0546C, or #FFB371.
```

That second lock matters more than it looks. A logomark is the one asset where "close" is
strictly worse than absent.

---

## Part 2 — Generating Dibs

### Pick exactly one mode

The two modes make different assumptions about what the attached image *is*. Emitting both
leaves the model guessing which image is canonical — see `01-composer-contract.md` §2.

**Character fidelity** — the references *define* the character; synthesize something new.
Use for new poses, scenes, compositions.

> The first reference image(s) ARE the canonical character. Render the character EXACTLY
> as shown — same species, face shape, ear shape/size/color, eye shape, fur color,
> proportions. Do NOT use a training-data prior of "what the species looks like" — the
> references are the source of truth.

That last sentence is load-bearing. Without it the model renders its idea of a jerboa
rather than *this* jerboa.

**Character preservation** — the attached image *is* the work; modify it in place. Use for
refinement passes on an existing render.

Fidelity pairs with a **reference strength** dial that changes the instruction, not just a
number: ≥80 "lock to references, minimal interpretation" · ≥50 "strong adherence, small
stylistic adjustments OK" · below 50 "treat references as inspiration only."

### Bind attributes to identity — do not decouple them

The single most useful prompt-craft finding from the Burrow arc, and it was learned by
getting it wrong first.

An early revision separated identity from pose and attributes, reasoning that decoupling
would let pose vary freely while identity held. **It did the opposite** — renders drifted
off-character, because attributes floating free of the identity gave the model permission
to re-derive the character to fit the pose.

The fix was to **bind pose and attributes to the identity first**, then vary them. State
who the character is, then say what they are doing, as one continuous constraint. For a
fixed character, binding-first beats decoupling.

Corollary, from the same arc: **schema fields govern costume, composition, palette, and
ornament — never character anatomy.** Say so explicitly in the prompt.

### Ask for one image, and no text

Two artifacts show up otherwise, both fixed by being explicit:

- **The sticker sheet** — the model returns a contact sheet of variants instead of one
  image. Request a single image.
- **The label leak** — spec keys and field labels bleed into the render as literal text.
  Request no text, and strip keys from the payload.

### Read the brand spec before constraining color

We shipped an instruction demanding "uniform flat color, no gradients" against a character
whose own brand spec defined an intended belly→back gradient. The instruction and the spec
fought; the spec lost.

**Always read the character's own definition before emitting a color-uniformity
constraint.** Where the spec defines a gradient, the correct instruction is "head matches
body, follow the spec's intended gradient" — not a blanket flattening.

### Where identity actually lives

In Burrow, character identity lives in **`brand_config.mascot_prompt`** — a single long
prose field. The per-reference `mascotCharacteristics` and `visualCharacteristics` fields
are **empty on every reference.**

So: prompt craft must **read from the brand config**, not expect per-reference
characteristics to carry the signal. If you build against the per-ref fields, you will
build against nulls.

The better end state is to promote those prose facts into structured fields — especially
`alwaysInclude` and `neverInclude`, which attach the constraint to the *asset* rather than
the prompt, so it survives every prompt rewrite. See `02-source-material-spec.md`.

### Reference set discipline

A character needs a turnaround, and the turnaround needs to be correctly labeled and
correctly weighted. The live Dibs set fails on both counts:

- Six references, **all at weight 70** — with a 4-slot budget and ties broken by insertion
  order, two views never reach the model.
- **Three-quarter views tagged `front` and `back`**, so three-quarter renders are
  conditioned on front and back images. No symptom, permanently worse output.
- One reference carries `mascotView: "left-side"`, which is **not a member of the
  `MascotView` union** — it crashed a config lookup in production.

Author a set as: one canonical front (weight 90, `isCanonical: true`), a correctly-tagged
three-quarter, a side, a back, and at least one expression — each with a distinct weight, a
real `description`, and a `promptInjection` carrying the style rule.

### The durable fix is a LoRA, not a better prompt

Everything above is prompt craft approximating character consistency. The structural fix
for a recurring character is a trained LoRA. Notes carried forward from that research:

- LoRAs can't run on Gemini — this forces a FLUX/fal backend alongside the Gemini one.
- **Caption in full sentences, not tags**, for FLUX.2 (single VLM text encoder).
- 20–30 images, **variety beats count**. A turnaround alone is risky: a flat consistent
  backdrop makes the LoRA bind the character to the backdrop instead of generalizing.
- Caption only variable elements; leave fixed identity traits unstated so they bind to the
  trigger token.
- **One render style per LoRA.** Never mix two visual styles of the same character in one
  training set, or the style lock breaks.
- Text-heavy shots route to a model with better text fidelity, or get composited.

---

## Dibs — the canonical identity

From the live `mascot_prompt`. This is the character definition of record. Note how much
of it is *identity anchors* rather than description — that ratio is what makes it work:

- **Anatomy** — very large round head on a small plump oval torso, top-heavy but balanced;
  small slender limbs, dainty rounded feet
- **Eyes** — enormous, perfectly circular, solid deep dark purple (`#330066`), **no pupils
  or highlights**
- **Ears** — two exceptionally large leaf-shaped ears, broad at base, warm pink (`#FF6699`)
- **Body** — soft orange with an intended gradient, lighter peach belly (`#FFC18C`) to
  deeper orange back (`#FF8000`)
- **Tail** — long slender, accent pink, ending in a bushy **orange** tuft
- **Surface** — smooth, clean, **no visible fur texture**; flat vector
- **Always** — oversized pink ears, large dark circular eyes, simple facial features, pink
  tail with orange tuft
- **Render** — bright clean 2D cartoon, bold outlines, flat color with minimal smooth
  gradients

The "always" line is the one doing the most work, and it is exactly what belongs in
`alwaysInclude`.

---

## Quality locks

```
- Render exactly one image. Never produce a contact sheet, variant grid, or sticker sheet.
- Render no text, labels, watermarks, or field names anywhere in the image.
- The reference images are the source of truth for the character. Do not substitute a
  generic version of the species from training data.
- Schema fields control costume, composition, palette, and ornament — never character anatomy.
- Do not humanize the character or alter its species.
- Follow the character spec's own gradients. Do not flatten a documented gradient.
```

## Open

The identity prose is strong; everything structured around it is missing. In rough order of
payoff:

1. **Promote the prose into structured fields** — especially `alwaysInclude` (oversized
   pink ears, large dark circular eyes, pink tail with orange tuft) and `neverInclude`.
   These attach to the asset, so they survive every prompt rewrite.
2. **Fix the reference set** — distinct weights, one `isCanonical`, real descriptions,
   correct the two mislabeled three-quarter views, and replace the off-enum `"left-side"`.
   Today two of the six references never reach the model.
3. **Decide the Dune register explicitly.** Dibs is a *desert* creature by lineage. Whether
   that shows up in environments and props — or whether Dibs floats on brand-gradient
   backgrounds with no world at all — is a brand call worth making on purpose rather than
   letting each generation improvise.
4. **The LoRA.** Still the durable fix for consistency, still not started.
