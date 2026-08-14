# Authoring Source Material

How to add a reference image, a vocabulary keyword, or an asset profile so that it
actually changes output. This is the file to read before uploading anything.

---

## The problem this file exists to solve

Burrow's schema is excellent and almost entirely unpopulated. Measured against the live
`brand_config` on 2026-08-04:

| Field | Schema supports | Live value |
|---|---|---|
| `mascot_prompt` | free text | **2,073 chars** |
| `reference_images` | rich per-ref metadata | 6 refs, **all metadata null** |
| `colors` | `BrandColor[]` | **0 entries** |
| `vocabulary` | `BrandKeyword[]` | **0 entries** |
| `asset_profiles` | `AssetProfile[]` | **0 entries** |
| `identity` · `voice` · `color_scales` | full objects | **null** |

One prose blob is carrying the entire brand. Every structured field that prompt assembly
already reads — and it does read them, `buildStyleWeightedReferences` copies nine metadata
fields onto every weighted reference — arrives empty.

**That is the opportunity.** These fields are already wired end to end. Populating them is
pure source-material work with no code change and no deploy.

---

## A reference is inert until it has four things

Uploading an image gets you a slot in the pool. It does not get you influence. Every
reference needs:

**1. A distinct weight.** Not the default. If everything is 70, the top-4 slice is
arbitrary and the last entries never reach the model. Pick from the bands in
`01-composer-contract.md` §4 and make sure no two references in the same category tie.

**2. `isCanonical` set on exactly one reference per subject.** This is the fallback the
resolver uses when no explicit default is configured (`getDefaultReference` looks for a
canonical before falling back to highest-weight). Leaving it null everywhere means the
fallback path is guesswork. Live config: null on all six.

**3. A real `description`.** It ships to the model as semantic context — this is the field
that tells the renderer *what it is looking at*. Live config: empty string on all six.
"Mascot Dibs Refrence Front" is a filename, not a description. (It is also misspelled, and
that misspelling is now load-bearing in the data.)

**4. A `promptInjection`, if the reference implies a rule.** Free text appended when this
reference is used — e.g. `"maintaining the flat vector style with bold uniform outlines
and no visible fur texture"`. This is where a reference stops being a picture and starts
being a constraint. Live config: null on all six.

Then, per category, fill the matching characteristics object — `mascotCharacteristics`,
`diagramCharacteristics`, `sceneCharacteristics`, `objectCharacteristics`,
`textureCharacteristics`. The two that earn their keep fastest:

- **`alwaysInclude`** — features that must appear. For Dibs: oversized pink ears, large
  dark circular eyes, pink tail with orange tuft.
- **`neverInclude`** — features to avoid. This is a negative constraint attached to the
  asset rather than to the prompt, which means it survives every prompt rewrite.

## Enum discipline

Off-enum values crash the app and silently disable conditioning. Both are live right now.

`MascotView` accepts exactly: `front` · `side` · `back` · `three-quarter` · `expression` ·
`action` · `other`.

Live data violates this three ways:

- `"left-side"` is **not a member** — it crashed a `VIEW_CONFIG[x].label` lookup in
  production.
- `"Front Third"` is tagged `front`; it is a **three-quarter** view.
- `"Back Third"` is tagged `back`; also **three-quarter**.

The mislabels do not crash anything. They just quietly mean the model never receives a
correctly-labeled three-quarter reference, so three-quarter renders are conditioned on
front and back images. That is the more dangerous failure of the two, because it has no
symptom.

**Rule: pick the enum member, or extend the enum in code first. Never invent a value at
data-entry time.**

## Vocabulary and alias mining

The matcher (`matchVocabulary`) is deliberately simple: case-insensitive, **word-boundary**
regex against `keyword` plus `aliases`. It will not match substrings, so "Dibs" correctly
fails to fire on "distribution" — good. But it also means it is **exactly as good as the
aliases you write, and no better.**

For every keyword, list the phrases a teammate would actually type:

```jsonc
{
  "keyword": "Dibs",
  "aliases": ["dibs", "the mascot", "our mascot", "the jerboa", "the character"],
  "referenceIds": ["<canonical-front>", "<three-quarter>", "<expression>"],
  "category": "mascot",
  "autoInclude": true,
  "promptPrefix": "the brand mascot character"
}
```

Four things worth knowing:

- **`autoInclude` defaults to true.** Omitting it means the references attach. Set it
  `false` explicitly if you want the keyword to add context without pulling images.
- **`promptPrefix` is wrapped as `[Context: …]` and prepended.** Keep it to a noun phrase.
  It is not a sentence and not an instruction.
- **Aliases are the whole ballgame.** A teammate who types "make the worm wave" gets
  nothing unless "the worm" is an alias. Write aliases for how people talk, not for how
  the asset is named.
- **`promptPrefixes` can be dropped by the caller.** `matchVocabulary` returns both an
  `enhancedPrompt` and a bare `referenceIds` list; assembly paths that consume only the
  IDs discard the prefix. Verify your path uses `enhancedPrompt` if you rely on prefixes.

## Asset profiles

Use a profile when several references share one identity — the six views of one character
are the canonical case. Author the characteristics **once** on the profile and link the
references by `profileId`; `applyProfile` merges profile characteristics onto each ref.

This is strictly better than repeating characteristics per reference, because it makes the
identity single-sourced. When the character's canon changes, one row changes.

## Mapping to `brand_config` columns

| Package concept | Column | Notes |
|---|---|---|
| Character identity prose | `mascot_prompt` | Already rich. Keep, but promote its facts into structured fields. |
| Palette | `colors` | Empty. Fill from `sandworm/design/palette.md`. |
| Color ramps | `color_scales` | Null. Sandworm's 7 families × 15 stops map directly onto `ColorScale`. |
| Semantic roles | `semantic_colors` | Null. Sandworm's light/dark token sets map onto `SemanticColorMapping`. |
| Brand name, tagline, logos | `identity` | Null. |
| Voice do/don't | `voice` | Null. Sandworm `DESIGN.md` § Do's and Don'ts is the source. |
| Keywords | `vocabulary` | Empty. |
| Shared character facts | `asset_profiles` | Empty. |

**Three columns in the TypeScript type have no database column at all:**
`defaultDiagramRef`, `defaultSceneRef`, `defaultObjectRef`. The type declares them;
`brand_config` has only `default_mascot_ref` and `default_texture_ref`.

This matters directly for diagrams — our first-priority output type — because **you
cannot currently set a default diagram reference.** Setting it appears to work in the type
system and vanishes on write. That is the same double-silent-drop shape that disabled
vocabulary and asset profiles before migration 0003: a field present in the UI and the
type, but missing from both the DB column set and the PUT allowlist. No error, no
persistence, `tsc` clean.

Adding those three columns is a small migration and it unblocks diagram defaults. Until
then, diagram references must be attached explicitly per request.

## Before you commit a change here

- [ ] Weight is distinct within its category
- [ ] Exactly one `isCanonical` per subject
- [ ] `description` is a description, not a filename
- [ ] Enum values are real members
- [ ] Aliases cover how people actually talk
- [ ] Any new rule traces to shipped code or an explicit brand decision
