# What Building Burrow Taught Us

Burrow is an internal brand-asset generation tool — a DAM with a structured "mixing board"
front end over Gemini image models. It has been in real use long enough to fail in
instructive ways. This is what we'd want to know before building a designbot, ordered by
how much it cost to learn.

Every claim here is traceable to shipped code or live data. Where something was believed
and later disproved, the correction is included rather than the tidy version.

---

## 1. The expensive failures are *confident*, not broken

An image model given a coherent-but-mediocre prompt produces something slightly off, and
someone files a bug. An image model given a **self-contradicting** prompt picks a side,
ignores the other, and returns something that looks deliberate. Nobody files a bug against
output that looks deliberate.

Burrow's worst generation bug was exactly this. The payload could contain a blending
preamble — *"each reference contributes ONE attribute; ignore its character and costume"* —
in the same prompt as a character-fidelity block — *"the character MUST MATCH the references
EXACTLY."* Both instructions were individually correct and individually well-written. Together
they produced the wrong character.

The fix was not better wording. It was **gating**: the blend preamble is now suppressed
whenever character fidelity is requested, and per-reference attribute extraction is scoped
to a specific image index instead of stated globally.

**Generalizes to:** any system that assembles prompts from independently-authored fragments.
The failure isn't in any fragment; it's in the combination, which nobody owns. Write down
which fragments may never co-occur, and enforce it at assembly. We put that table in
[`01-composer-contract.md`](01-composer-contract.md) §2 because it's the highest-value thing
we know.

## 2. Prompt craft has a direction, and it's counter-intuitive

For a fixed character, we assumed decoupling identity from pose would let pose vary while
identity held. We shipped it. Renders drifted **off-character** — attributes floating free
of identity gave the model permission to re-derive the character to fit the pose.

The correction was **binding-first**: state who the character is, then bind pose and
attributes to that identity as one continuous constraint.

Two smaller findings from the same arc, both fixed by being explicit rather than clever:
asking for **one image** eliminated a contact-sheet-of-variants artifact, and asking for
**no text** eliminated spec labels leaking into renders as literal type.

**Generalizes to:** resist the instinct that more structural separation gives more control.
With generative models, separation often reads as permission.

## 3. A rich schema is not a populated one

Burrow's `brand.ts` is genuinely well-designed — `MascotCharacteristics` with
`alwaysInclude`/`neverInclude`, per-category characteristics for diagrams and scenes and
objects, `UsageContext` with `useWhen`/`avoidWhen`, a keyword vocabulary with aliases and
prompt prefixes. Prompt assembly reads all of it; `buildStyleWeightedReferences` copies nine
metadata fields onto every weighted reference.

Here is the live config, measured 2026-08-04:

| Field | Live value |
|---|---|
| `mascot_prompt` | 2,073 chars of prose |
| `reference_images` | 6 refs, **all metadata null** |
| `colors` | **0** |
| `vocabulary` | **0** |
| `asset_profiles` | **0** |
| `identity` · `voice` · `color_scales` | **null** |

One prose blob carries the entire brand. Everything structured is empty, and the code that
would use it runs faithfully against nulls.

**Generalizes to:** schema design is the easy half and it feels like progress. The bottleneck
on generation quality is almost always **populated source material**, which is unglamorous,
requires domain judgment, and cannot be done by the person who wrote the schema in an
afternoon. Budget for the authoring, not just the modeling.

This is the entire reason the designbot contribution is framed as source materials rather
than tooling.

## 4. The silent-drop class

Vocabulary and asset profiles had UI, had types, and **silently discarded every save.** Two
independent causes stacked: no database column existed, *and* both fields were missing from
the PUT allowlist. No error. No persistence. `tsc` clean.

This is why earlier attempts to define brand vocabulary "didn't stick" — the work was done,
more than once, and thrown away on write.

The shape is worth naming: **a field present in the UI and the type but absent from both the
DB column set and the write allowlist is a double-silent drop.** Every layer looks correct in
isolation.

It is still live. `defaultDiagramRef`, `defaultSceneRef`, and `defaultObjectRef` are declared
in `BrandConfig` and have **no columns** in `brand_config`. Diagrams are our first-priority
output type, and you currently cannot set a default diagram reference.

**Generalizes to:** for any config surface, test the round trip — write, reload, assert. Type
checking cannot see this class of bug, and neither can a code reviewer looking at one layer.

## 5. Types describe intent; databases describe history

Three production crashes shared one shape: the database held a nullable or off-enum value,
the TypeScript type claimed otherwise, and it blew up at runtime.

- `brand_config.colors` was `null` but typed `BrandColor[]` → `.map` crashed.
- `mascotView: "left-side"` is not in the `MascotView` union → a `VIEW_CONFIG[x].label`
  lookup crashed. **That value is still in live data.**

The durable fix is **coercing and guarding at the data-load boundary**, not at each use
site. Types describe schema *intent*, not what Postgres returns after years of nullable
columns and enum drift. The load boundary is the only place to make the types honest.

## 6. Silent quality loss beats loud failure, and it's worse

The live reference set has six mascot images, **all at weight 70**. The API budget is four
slots. With uniform weights, the top-4 slice breaks ties by insertion order — so two
references, deterministically the last two, **never reach the model.**

Separately, the two three-quarter views are tagged `front` and `back`, so three-quarter
renders are conditioned on front and back images.

Neither of these crashes. Neither produces an error. Output is just quietly worse, forever,
and there is no signal that would ever prompt investigation. We found them by querying the
database, not by noticing bad output.

A related bug did have teeth: `buildWeightedReferences` recalculates weights from stored
values, silently discarding caller-applied boosts, so the canonical mascot got pushed out of
the top four entirely by lower-priority references.

**Generalizes to:** any weighted top-N path needs an explicit sort before the slice, distinct
weights to sort by, and a log line for what got dropped. A silent truncation reads as "we
used your references."

## 7. Never hardcode a guessed error cause

A reported "Generation failed" turned out to be Gemini returning
`429 RESOURCE_EXHAUSTED — monthly spending cap exceeded`. The real message never reached
anyone, because the UI threw **four hardcoded copies** of *"you may have hit a rate limit"*
whenever generation returned nothing — regardless of the actual provider status.

The guess was even close. It still cost a debugging session, because the real message named
the actual cause and the guess didn't.

Compounding it: the retry layer retried blindly with no status check, so a 429 burned three
retries across four parallel calls — twelve attempts against an already-capped project.

**Generalizes to:** surface the provider's real status and message. A guessed error cause is
a lie that survives into every future debugging session. And **never retry a 4xx** — retries
are for transient failures, and a spend cap is not transient.

## 8. Some constraints have no API, and mirrors are then legitimate

We verified against Google's billing documentation: there is **no endpoint** to read or set
the Gemini monthly spend cap, and none to read month-to-date spend. The Cloud Billing Budget
API manages a different object that does not gate the Gemini API.

So an accurate spend meter is *impossible* by pull. What shipped instead is a real usage
ledger from `response.usageMetadata` token counts, plus a hand-reconciled baseline, with the
429 as ground truth. The drift is permanent by design and documented as such.

Also worth knowing: Google's cap enforcement **lags the setting by ~10 minutes**, which is
documented behavior. We spent real time debugging a cap raise that had in fact already
worked.

**Generalizes to:** confirm whether an API exists before designing around it, and when it
doesn't, say plainly that the mirror is a mirror. A number presented as authoritative that
is actually a local estimate is worse than an obviously-manual one.

## 9. Dials are for the author; presets are for everyone else

Burrow's organizing metaphor is "dials not dreams" — a JSON spec as a mixing board where
every field is an independent fader. It is genuinely good, and it is tuned for the person
who built it.

Comparing it against a peer tool that reads noticeably nicer, the difference was
**presets-first**: a small number of named levers plus auto-context, with the dials
underneath for power users.

For a **team** designbot this is the whole ergonomic question. Teammates do not want eight
knobs; they want "make me a blog header" and a good default. The cheap version is a preset
layer *over* the existing dials — no architecture change — and it is probably the highest
-leverage UX work available.

## 10. Not everything should be an image

Two of our three in-scope output types shouldn't primarily use image generation at all, and
this only became clear from reading the brand canon.

**Diagrams** are hand-rolled SVG, dense with mono-caps labels, with exact stroke weights and
an exact `7 3` dash array. Image models misspell text, approximate strokes, and produce
un-editable output that drifts on every regeneration. Generating **SVG source against the
token spec** is better on every axis — diffable, reviewable, exactly on-token.

**OG and blog cards** are headline-bearing, and the headline is the entire payload. They
should be templated renders.

That leaves image generation for what it's genuinely good at: atmospheric, illustrative, and
character work.

**Generalizes to:** "we have an image model" is not a reason to make images. Pick the
representation the brand is actually authored in.

## 11. Ground-truth beats memory, and write down what you disproved

The best thing about AuthZed's existing design canon isn't the tokens — it's that it records
its own corrections. A plausible motif ("dashed connectors with a magenta active state") was
written down, believed, then disproved by grepping shipped code. The real pattern was a solid
teal fan. The canon now carries the correction *and* the note that the earlier version was
aspirational.

We hit the same class of error from the other direction: a schema documented as existing
turned out never to have landed, and a code path assumed to be the live one turned out to be
a different surface entirely.

**Generalizes to:** any rule written from memory is load-bearing fiction. Before writing a
rule, grep for it. When shipped code diverges from canon, record it as rejected drift rather
than silently canonizing it — the legacy logomark hexes and the vendor solid-magenta buttons
are both documented as drift, which is why nobody clones them.

---

## The short version

If you read one thing: **the tooling was never the bottleneck.** Burrow can already read
nine metadata fields per reference, match brand vocabulary with aliases, weight and rank
references, and freeze a reusable recipe. Almost all of it runs against empty configuration.

The work that makes a designbot good is authoring the source material, in the fields that
already exist, with enough specificity that a model can't drift — and writing down which
instructions may never appear in the same breath.
