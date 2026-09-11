# The Composer Contract

Rules for the model that **assembles** a generation request. These never reach the image
model. If you are writing the renderer-facing prompt, you want a per-type file instead.

The contract exists because assembly is where the expensive bugs live. An image model
given a coherent prompt fails gracefully — it produces something a bit off. An image model
given a *self-contradicting* prompt fails confidently: it picks one side, ignores the
other, and returns something that looks deliberate. Nobody files a bug against output that
looks deliberate.

---

## 1. Assembly order is fixed

Emit blocks in this order. Order is load-bearing: multimodal models weight early tokens
more heavily, and identity constraints buried under a spec body get overridden by the
spec.

1. **Identity / character block** — only if the request involves a locked character
2. **Reference-attribute block** — only if references carry per-reference notes
3. **Type instruction** — "Render this `<type>` specification as a high-fidelity image"
4. **Payload** — the JSON spec or the user's prose prompt
5. **Quality locks** — negative constraints, from the per-type file

Burrow's `buildRecipePrompt` follows 1 → 3 → 4. The camera clause is injected at the
*front* of the prompt for exactly this reason (`injectCameraAngle` prepends rather than
appends). Treat that as the precedent: anything that must not be overridden goes early.

## 2. Mutual exclusion — the rules that matter most

These pairs must never appear in the same payload. This table is the distilled form of our
worst production bug.

| A | B | Why they cannot co-occur |
|---|---|---|
| Blending preamble ("contribute ONE attribute, ignore character/costume") | Character-fidelity block ("render the character EXACTLY") | Direct contradiction. The blend instruction tells the model to discard identity; the fidelity block tells it to preserve identity. Result: wrong or blended characters. |
| Character-fidelity | Character-preservation | Different base assumptions. *Fidelity* means "references define the character, synthesize new." *Preservation* means "the attached image IS the work, modify it." Emitting both leaves the model guessing which image is canonical. |
| "Uniform flat color, no gradients" | Any brand spec that defines an intended gradient | We shipped this. The instruction contradicted the brand's own documented belly→back gradient. Always read the brand spec before emitting a color-uniformity constraint. |
| Multi-image / variant-sheet language | Single-image request | Produces a contact sheet of variants instead of one image. |
| Label or field names from the spec | The rendered payload | Spec labels leak into the image as literal text. Strip keys; emit values. |

**When the request genuinely needs both sides** — e.g. "keep the character, but pull the
background from this other reference" — do not emit both blocks. Emit the fidelity block,
and scope the blend instruction to the *specific attribute* and the *specific image index*:
"Image 3: extract ONLY the background palette. Ignore its character, pose, and
composition." Burrow's `buildBlendingPreamble` does this correctly at the per-reference
level; the bug was that the global preamble fired alongside it.

## 3. Precedence when something still conflicts

Resolve in this order, highest wins:

1. **Character identity** — species, anatomy, signature features. Never negotiable.
2. **Brand palette and quality locks** — the hexes and the prohibitions.
3. **Explicit user instruction** for this request.
4. **Type defaults** from the per-type file.
5. **Model preference** — whatever it would have done anyway.

If a user instruction conflicts with character identity, the user is asking for a
different character. Say so; do not silently produce a hybrid.

## 4. Reference budget

The API slot budget is **4 images**. Everything below follows from that.

- **Sort by weight before you slice.** Never let insertion order decide. Burrow shipped a
  bug where dropped (100) and gallery (80) references filled all four slots and pushed the
  canonical mascot out entirely — the code took the first four in insertion order.
- **Weights must be distinct.** A reference pool where every entry sits at the same weight
  is not a ranking, and the slice becomes arbitrary. Burrow's live config has six mascot
  references all at weight 70, which means two of them — deterministically the last two —
  never reach the model. Nobody noticed, because output was merely slightly worse.
- **Suggested bands.** Explicit user selection 100 · canonical brand reference 90 ·
  session pins 80 · vocabulary auto-attach 70 · general style pool 50.
- **Re-apply boosts after any recalculation.** If a layer rebuilds weights from stored
  values, caller-applied boosts are silently lost. Either re-boost downstream or move the
  boost into the stored field. Do not assume a boost survives a merge.
- **Log what got dropped.** A silent top-N truncation reads as "we used your references."

## 5. Guard the data boundary

Types describe schema *intent*. They do not describe what the database actually returns
after years of nullable columns and enum drift. Three production crashes in Burrow shared
this exact shape: the type claimed a value was present and in-enum, `tsc` saw nothing, and
it blew up at runtime.

Before composing, at the load boundary:

- **Coerce nullable arrays to `[]`.** `colors`, `vocabulary`, `assetProfiles`,
  `referenceImages` are all nullable in practice. Burrow's live `colors` is empty, and a
  downstream `.map` crashed production.
- **Guard enum-keyed lookups.** Never index a config object with a value that came from
  the database without a fallback. Live data contains `mascotView: "left-side"`, which is
  not a member of the `MascotView` union — it crashed a `VIEW_CONFIG[x].label` lookup.
- **Treat missing as missing, not as default.** If the canonical reference is absent, say
  so and degrade explicitly. Do not quietly substitute the highest-weighted alternative
  and present the result as on-brand.

## 6. What the composer must not do

- **Do not paraphrase hex values.** Emit `#6242e0`, never "a deep violet." Paraphrase is
  how palettes drift.
- **Do not invent facts to fill a gap.** If the brand config has no voice guidelines, the
  request goes out without voice guidelines. An invented rule becomes canon the moment
  someone reads the output and believes it.
- **Do not narrate.** "I will now render…" ends up in the image as text.
- **Do not emit more than one type file's rules.** They carry competing palettes and
  composition defaults; a model holding all of them averages them.

## 7. Pre-flight checklist

Before dispatch, verify:

- [ ] Exactly one character block (fidelity **or** preservation **or** neither)
- [ ] No blend preamble if a character block is present, unless scoped per-image-index
- [ ] Color-uniformity constraints checked against the brand spec's own gradients
- [ ] References sorted by weight, sliced to 4, with distinct weights and drops logged
- [ ] Nullable config arrays coerced; enum lookups guarded
- [ ] Quality locks appended from exactly one per-type file
- [ ] No spec keys, no narration, no paraphrased hexes in the payload
