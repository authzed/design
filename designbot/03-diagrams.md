# Diagrams

Source: `sandworm/design/diagrams.md` (status: stable, ground-truthed 2026-06-09 against
the shipped brand reference set). Load `sandworm/DESIGN.md` alongside it for primitive
tokens.

---

## Route diagrams to SVG, not to an image model

This is the most important call in the package, and it goes against the reflex.

AuthZed diagrams are **hand-rolled SVG and Canvas** — no mermaid, no reactflow, no d3-graph.
They are dense with mono-caps text labels (`RAG`, `YOUR DATA`, `accessible doc ids`), exact
1px and 1.5px strokes, an exact `7 3` dash array, and exact hex fills. Every one of those
is something raster image generation is bad at:

- **Text.** Image models misspell labels. A diagram is mostly labels. This alone disqualifies
  the approach for anything shipping.
- **Exact stroke weights and dash arrays.** A model approximates `7 3`; the brand *is* `7 3`.
- **Editability.** A shipped diagram gets revised. A PNG gets regenerated from scratch and
  drifts every time.

So the designbot's diagram job is **generate SVG source against the token spec**, which a
text model does well and which is diffable, reviewable, and exactly on-token. Use image
generation for diagrams only for throwaway concept exploration that will be redrawn.

Everything below is the spec that SVG output must satisfy. It is written as constraints
rather than prose so it can be checked mechanically.

---

## Grammar — the rule that carries the most weight

**Solid rounded-rect = a thing. Dashed rounded-rect = a grouping of things.** Never cross
them. Dashed is *only* for scope containers, never for a connector.

## Nodes

| Property | Value |
|---|---|
| Shape | rounded-rect, `rounded-lg` (8px) → `rounded-2xl` (16px); hub/identity nodes may be `rounded-full` |
| Border | **solid**, 1px, `stone-700` dark / `stone-200` light |
| Fill | `#0D0D10` dark (shipped HeroDiagram, ~85% alpha) · `#ffffff` light. Alt: `rgba(23,13,28,0.5)` + backdrop blur |
| Icon | one Lucide line-icon, `strokeWidth: 2`, centered, `stone-025` dark / `stone-900` light |
| Label | mono-caps, `stone-400`, placed **above** the node |

Process/verb nodes (`Embed Model`, `re-rank`, `Environment`) instead use a **filled stone
pill below** with a sentence-case label.

## Scope containers

Dashed rounded-rect, `strokeDasharray: "7 3"`, 1px, `stone-700` dark / `stone-200` light.
Mono-caps label inset top-left, riding the dashed edge. Containers **nest** — `partition ▸
prefix ▸ docs` — with the inner dash dimming as it goes.

## Connectors

Solid, 1.5px, simple chevron/triangle arrowhead in the line's own color. Routing is
**orthogonal** with ~16px corner radius, or dead-straight for pipeline flows. Bezier is
allowed only for organic hub-and-spoke fans.

Color carries meaning — `stone-400` neutral flow · `teal-400` allowed/active/accessible ·
`red-500` denied/blocked. Optional junction dot `r=3` at `rgba(114,177,173,0.35)`.

Signal an active edge by **teal** and/or by dimming siblings to ~0.1 opacity.

## The checkpoint beam — the signature device

The most ownable primitive: AuthZed drawn as the authorization layer everything crosses.

- **Bar** — `gradients.warm-hero` (sand-300 → red-400 → violet/magenta) with a magenta
  bloom, `0 0 24px rgba(165,49,138,0.25)`
- **Logomark** — the Saturn mark on a `stone-950` coin with a subtle `stone-800` ring,
  sitting **on** the beam. The mark *is* the checkpoint. The dark disc is required — the
  color glyph needs it to pop off the gradient (decided 2026-06-10)
- **Threads** — fine 1px lines crossing the beam, one per permission check. `teal-400`
  permitted, `red-500` denied
- **Orientation** — horizontal (data fans down through it) or vertical (subject ↔ resources)
- **Label** — mono-caps, warm/muted, attached to the beam not the nodes: `accessible doc
  ids`, `permission management`, `functionality control`

Use it when the teach is *"authorization happens here."* **Exactly one beam per diagram.**

## Entity state

Folded-corner Lucide file icon. `teal-400` accessible · `red-500` denied (add a padlock) ·
`stone-400` neutral/unscoped.

## Category eyebrows

For capability taxonomies: mono-caps eyebrow tinted to a family, over solid thin-border
pills inheriting that tint. `sand-300` Permissions Model · `magenta-600` Authorization Data
· `teal-500` Evaluation Engine. `Grant/Deny` is a sparkle pill with a violet border;
`Access Decision` is the violet-bordered terminal output.

## One color language

| Color | Connector | Entity | Beam |
|---|---|---|---|
| `teal-400` | allowed / active | accessible doc | permitted thread |
| `red-500` | denied | locked doc + padlock | blocked thread |
| `stone-400` | neutral flow | unscoped data | — |
| warm-hero gradient | — | — | the AuthZed layer itself |

A red doc and a red edge mean the same thing. That consistency is what makes a Sandworm
diagram legible at a glance.

---

## Quality locks

Copy verbatim into the negative-constraint slot.

```
- Node borders are SOLID. Never draw a node with a dashed border.
- Dashed strokes are ONLY for scope containers, using dasharray 7 3. Never dash a connector.
- Active or allowed state is teal (#72b1ad family) or opacity-dimming of siblings.
  NEVER recolor an edge to magenta to indicate active state.
- Exactly one checkpoint beam per diagram. Never render multiple gradient beams.
- The state vocabulary is teal (allowed), red (denied), stone (neutral). Never introduce
  a fourth state color.
- Node labels are mono-caps and sit above the node. Process labels sit in a filled pill.
- Icons are Lucide line icons at 2px stroke, one per node.
- Do not use mermaid, reactflow, or d3-graph conventions or default styling.
```

## Shipped references

Ground these against real code rather than memory:

- `projects/web/src/home/UseCaseTree.tsx` — hub-and-fan; solid teal bezier at
  `rgba(114,177,173,0.18)`, `rounded-full` hub, junction dots
- `projects/web/src/home/HeroDiagram.tsx` — permission-check flow; `#0D0D10` nodes,
  canvas flow dots, active = sibling opacity-dim
- `projects/web/src/mdx/custom/SpiceBoxDiagram.tsx` — the canonical `7 3` container
- `projects/web/src/products/authzed-cloud/IfStatementsToCheckPermission.tsx` — code-as-diagram

## Open

`defaultDiagramRef` has **no database column** (see `02-source-material-spec.md`). Diagram
references must be attached per request until that migration lands.

## Correction carried forward

An earlier hub token described the connected-system motif as a dashed `4 4` stone connector
with a magenta active state. Ground-truthing disproved it: the UseCaseTree fan is **solid
teal**, the only dashed element that ships is the SpiceBox **container** at `7 3`, and
active state is never a magenta edge. If you find the old form anywhere, it is wrong.
