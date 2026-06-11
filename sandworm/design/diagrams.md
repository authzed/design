---
name: Sandworm — Diagrams
description: The system / relationship / authorization-flow diagram language for Sandworm — nodes, dashed scope-containers, solid connectors, entity-state color, and the signature gradient checkpoint beam.
part-of: Sandworm
status: stable   # defined 2026-06-09 from brand reference set + shipped diagrams
---

> **Primitive tokens** (`{colors.*}`, `{typography.*}`, `{spacing.*}`, `{motion.*}`, `{rounded.*}`, `{elevation.*}`) are defined in the hub at [`../DESIGN.md`](../DESIGN.md). Load the hub alongside this spoke.

← Back to [Sandworm DESIGN.md](../DESIGN.md)

## What this spoke covers

AuthZed sells authorization — so **diagrams of relationships, permission checks, and data access are
core brand surfaces**, not decoration. This spoke defines the reusable diagram vocabulary: how to draw a
node, group a scope, route a connector, color an entity by access state, and render the signature
**authorization checkpoint** where data crosses the AuthZed layer.

Diagrams are **hand-rolled SVG + Canvas** (no reactflow / mermaid / d3-graph). Available libs: `d3` +
`framer-motion` (marketing site), `recharts` (design-system app, charts only). Charts are a different
system — see [`dataviz.md`](dataviz.md).

## Diagram tokens

```yaml
diagrams:
  # ── A · NODES ── a discrete entity (user, agent, service, data store, doc)
  node:
    shape: rounded-rect                       # rounded-lg (8px) to rounded-2xl (16px); hub/identity nodes may be rounded-full
    border: { width: 1, color: "{colors.stone.700}", color-light: "{colors.stone.200}" }
    fill-dark: "#0D0D10"                       # near-black, slightly bluer than stone-975 (shipped HeroDiagram node fill, 85% alpha)
    fill-dark-alt: "rgba(23,13,28,0.5)"        # stone-950/50 + backdrop-blur-sm (shipped UseCaseTree hub node)
    fill-light: "#ffffff"
    icon: { library: "Lucide React", strokeWidth: 2, color: "{colors.stone.025}", color-light: "{colors.stone.900}" }
    label:
      typography: "{typography.label-caps}"    # mono-caps — RAG, AGENT, APPS, YOUR DATA, MEMORY, TOOLS, GOALS
      color: "{colors.stone.400}"
      placement: "above the node (default) — or a filled stone pill below for verb/process nodes (Embed Model, re-rank, Environment)"
    notes: "Solid border ALWAYS for a node. Dashed is reserved for containers (below). One line-icon per node, centered."

  # ── B · SCOPE CONTAINERS ── a SET / boundary / partition that groups nodes. THIS is where dashed lives.
  container:
    shape: rounded-rect
    border-style: dashed
    strokeDasharray: "7 3"                      # shipped on SpiceBoxDiagram container; the canonical diagram dash
    strokeWidth: 1
    color-dark: "{colors.stone.700}"
    color-light: "{colors.stone.200}"
    label:
      typography: "{typography.label-caps}"     # partition 1, prefix 1, Permissions Model
      placement: "top-left, inset, riding the dashed edge"
    nesting: "containers nest — partition ▸ prefix ▸ docs. Inner containers keep the same dash, dimmer color."
    notes: "Dashed = 'these belong together / this is a scope'. NEVER use dashed for a connector. A solid rounded-rect is a node; a dashed rounded-rect is a grouping."

  # ── C · CONNECTORS ── a flow / relationship / edge between nodes
  connector:
    routing: orthogonal                         # right-angle bends with a small corner radius (~16px); dead-straight for pipelines
    cornerRadius: 16
    strokeWidth: 1.5
    color-default: "{colors.stone.400}"         # neutral flow — white/stone
    color-active: "{colors.teal.400}"           # ALLOWED / active / accessible path — teal, NOT magenta
    color-denied: "{colors.red.500}"            # blocked / denied relationship
    arrowhead: "simple chevron/triangle marker, same color as the line"
    junctionDot: { r: 3, color: "rgba(114,177,173,0.35)" }   # optional node-junction dot (shipped UseCaseTree)
    activeState: "signal active by COLOR (teal) and/or by dimming sibling edges to ~0.1 opacity — not by recoloring to magenta"
    notes: "Connectors are SOLID. Bezier curves are allowed for organic hub-and-spoke fans (shipped UseCaseTree) but orthogonal is the default for system maps."

  # ── D · CHECKPOINT BEAM ── THE signature device: AuthZed as the authorization layer everything crosses
  checkpoint-beam:
    role: "Render AuthZed as the permission boundary — data/queries/actions pass THROUGH the beam; the beam decides."
    orientation: "horizontal (data fans down through it) OR vertical (subject ↔ resources across it)"
    bar:
      gradient: "{gradients.warm-hero}"        # sand-300 → red-400 → violet/magenta, with a soft bloom/glow
      glow: "0 0 24px rgba(165,49,138,0.25)"    # magenta bloom around the bar
    logomark: "AuthZed Saturn mark on a stone-950 coin (subtle stone-800 ring) sits ON the beam (centered, or at the origin end) — the mark IS the checkpoint. Coin treatment decided 2026-06-10: the color glyph needs the dark disc to pop off the gradient."
    threads:
      description: "fine 1px lines crossing the beam = individual permission checks"
      permitted: "{colors.teal.400}"
      denied: "{colors.red.500}"
    label:
      typography: "{typography.label-caps}"
      examples: ["accessible doc ids", "permission management", "functionality control"]
      tone: "warm/muted — attaches to the beam, not the nodes"
    notes: "The most ownable diagram primitive. Use when the teach is 'authorization happens HERE'. One beam per diagram — it's the focal point, not a repeating element."

  # ── E · ENTITY STATE ── access state of a data entity (doc, record, resource)
  entity-state:
    icon: "Lucide file with folded corner; add a padlock for restricted"
    permitted: { color: "{colors.teal.400}", meaning: "accessible / allowed" }
    denied: { color: "{colors.red.500}", meaning: "locked / denied", icon-add: "padlock" }
    neutral: { color: "{colors.stone.400}", meaning: "unscoped / generic data" }
    notes: "Teal = yes, red = no, stone = neutral. Consistent with connector color-active/denied so a viewer reads one color language across the whole diagram."

  # ── F · CATEGORY EYEBROWS ── color-coded section labels over grouped pills (taxonomy diagrams)
  category-eyebrow:
    typography: "{typography.label-caps}"
    pattern: "a mono-caps label tinted to a family, over a group of solid thin-border pills in that same tint"
    families:
      permissions-model: "{colors.sand.300}"
      authorization-data: "{colors.magenta.600}"
      evaluation-engine: "{colors.teal.500}"
    special:
      grant-deny: "pill with a sparkle icon + violet border — the decision node"
      access-decision: "violet-bordered pill — the terminal output"
    notes: "Used for capability/architecture taxonomies (the Permissions Model / Auth Data / Evaluation Engine layout). Each category owns a hue; the pills inside inherit it."
```

## The pieces

### A · Nodes

A node is a discrete entity — a user, an agent, a service, a data store, a document. Draw it as a
**rounded-rect with a solid 1px border** (`stone-700` dark / `stone-200` light), a near-black fill
(`#0D0D10`, slightly bluer than `stone-975` — the shipped HeroDiagram value), and a **single Lucide
line-icon** at 2px stroke. Identity/hub nodes may be `rounded-full`; most nodes are `rounded-lg` to
`rounded-2xl`.

Label nodes with **mono-caps** (`{typography.label-caps}`) — `RAG`, `AGENT`, `APPS`, `YOUR DATA`,
`MEMORY`, `TOOLS`, `GOALS` — placed **above** the node. Process/verb nodes (`Embed Model`, `re-rank`,
`Environment`) instead sit in a filled stone pill with a sentence-case label.

**A node's border is always solid.** Dashed borders mean something else (containers, below).

### B · Scope containers

A **dashed rounded-rect** groups nodes into a scope, set, or boundary — a vector-DB partition, a prefix,
a permission domain, a stack of related docs. Dash array is **`7 3`** (the shipped `SpiceBoxDiagram`
value), 1px, `stone-700` dark / `stone-200` light, with a mono-caps label inset at the top-left riding
the edge. Containers **nest** — `partition ▸ prefix ▸ docs` — with the inner dash dimming as it goes.

This is the one place dashed lives. The mental model: **solid rounded-rect = a thing; dashed rounded-rect
= a grouping of things.**

### C · Connectors

Connectors are **thin (1.5px) solid lines** with simple arrowheads. Default routing is **orthogonal** —
right-angle bends with a ~16px corner radius — or dead-straight for pipeline flows (`User → query →
Embed Model → …`). Bezier curves are permitted for organic hub-and-spoke fans (the shipped `UseCaseTree`
uses 16px-cornered bezier), but orthogonal is the default for system maps.

Color carries meaning:
- **`stone-400` (white/stone)** — neutral flow
- **`teal-400`** — the **allowed / active / accessible** path
- **`red-500`** — a **denied / blocked** relationship

Signal an active edge by **color (teal)** and/or by **dimming sibling edges to ~0.1 opacity** — never by
recoloring an edge to magenta. (Magenta is a node/category accent and the beam gradient, not an edge
state.)

### D · The checkpoint beam — the signature device 🟣

This is the most ownable thing in the Sandworm diagram language: **AuthZed drawn as the authorization
layer that everything crosses.** A **brand-gradient laser bar** (`gradients.warm-hero` — sand-300 →
red-400 → violet/magenta, with a magenta bloom) carries the **Saturn logomark**, and data, queries, or
agent actions pass **through** it. Fine 1px threads cross the beam — **teal for permitted, red for
denied** — representing individual permission checks. A mono-caps label attaches to the beam, not the
nodes: `accessible doc ids`, `permission management`, `functionality control`.

The beam runs **horizontal** (data columns fan down through it — the "Your Data" pattern) or **vertical**
(a subject on one side, resources on the other — the fine-grained-access pattern). Use it when the teach
is *"authorization happens here."* **One beam per diagram** — it's the focal point, not a repeating
motif.

### E · Entity state

Data entities (docs, records, resources) are **folded-corner file icons**, colored by access state:
**teal = accessible**, **red = denied** (add a padlock), **stone = neutral/unscoped**. This is the same
teal/red/stone language as connectors, so a viewer reads one color system across the whole diagram — a
red doc and a red edge mean the same thing.

### F · Category eyebrows

For capability/architecture taxonomies (the `Permissions Model / Authorization Data / Evaluation Engine`
layout), use **color-coded mono-caps eyebrows** over groups of solid thin-border pills, each category
owning a hue: **sand** (Permissions Model), **magenta** (Authorization Data), **teal** (Evaluation
Engine). The pills inside inherit the category tint. Decision nodes are special: `Grant/Deny` is a
sparkle pill with a violet border; `Access Decision` is the violet-bordered terminal output.

## Color semantics (the one rule that ties it together)

| Color | In a connector | In an entity | In the beam |
|---|---|---|---|
| **teal-400** | allowed / active path | accessible doc | permitted thread |
| **red-500** | denied relationship | locked doc (padlock) | blocked thread |
| **stone-400** | neutral flow | unscoped data | — |
| **warm-hero gradient** | — | — | the AuthZed layer itself |

One color language, read the same way everywhere. That consistency is what makes a Sandworm diagram
legible at a glance.

## Do / Don't

- ✅ Solid border = node; dashed border = scope container. Never cross them.
- ✅ Teal = allowed, red = denied — in edges, entities, AND beam threads, consistently.
- ✅ One checkpoint beam per diagram, as the focal point.
- ✅ Mono-caps labels for nodes and containers; node label above, process label in a pill.
- ✅ Lucide icons at 2px; near-black node fills (`#0D0D10`).
- ❌ Don't use dashed lines for connectors (the old hub token implied this — it's wrong).
- ❌ Don't recolor an edge magenta to show "active" — active is teal or opacity-dimming.
- ❌ Don't scatter multiple gradient beams — it stops reading as "the checkpoint."
- ❌ Don't invent a third state color — teal/red/stone is the whole vocabulary.

## Shipped reference implementations

Real diagrams in `projects/web/` that this spec is grounded in (use as worked examples):

- **`home/UseCaseTree.tsx`** — hub-and-fan relationship graph; solid teal bezier connectors (1.5px,
  `rgba(114,177,173,0.18)`), `rounded-full` hub + `rounded-2xl` group nodes, junction dots `r=3`.
- **`home/HeroDiagram.tsx`** — permission-check flow; near-black nodes (`#0D0D10`), canvas-animated flow
  dots (in-flight `#F1F0F2`, approved green, denied red), active = sibling opacity-dim.
- **`mdx/custom/SpiceBoxDiagram.tsx`** — architecture/system map; the canonical dashed `7 3` container,
  solid brand-tinted inner node borders, straight arrowhead edges.
- **`products/authzed-cloud/IfStatementsToCheckPermission.tsx`** — code-as-diagram; brand-tinted syntax
  tokens (kw→violet-400, fn→teal-400, str→sand-300, deny→red-400), magenta flash on new lines.

> **Reconciliation note (2026-06-09)**: the hub's earlier `dashed-border` token claimed the "connected
> system" motif was a dashed `4 4` stone connector with a magenta-active state, crediting the UseCaseTree
> fan. Ground-truthing showed that was aspirational: the UseCaseTree fan is **solid teal**, the only
> dashed thing that ships is the SpiceBox **container** (`7 3`), and active state is teal/opacity, never a
> magenta edge. This spoke is the corrected canon; the hub token now points here.
