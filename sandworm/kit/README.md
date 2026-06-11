# Sandworm Design Kit

Machine-readable export of the Sandworm design system. The three token files are **generated** from
`../DESIGN.md` (the canonical spec) by `../generate-kit.py` — do not hand-edit those;
re-run the generator when the spec changes. **`SKILL.md` and this README are hand-maintained** — when the
spec's *shape* changes (new spokes, renamed token groups, retired names), update them by hand in the same
pass. (This bit a real drift: SKILL.md referenced a retired gradient name after a CSS regen — fixed 2026-06-10.)

## Contents

| File | What it is | Consume it in |
|------|-----------|---------------|
| `SKILL.md` | claude.ai skill manifest — the entry point for AI design tools | Claude Design / Claude Code |
| `colors_and_type.css` | CSS custom properties for every token (`var(--magenta-600)`, gradients, type, spacing, motion) | any web project |
| `tailwind.tokens.json` | `theme.extend` block — colors, fontFamily, fontSize, radius, spacing, screens, durations | `tailwind.config.js` |
| `tokens.dtcg.json` | W3C Design Tokens (DTCG) format — color / dimension / duration groups | Style Dictionary, token tooling |

## Regenerate

```bash
# 1. extract BOTH frontmatters to JSON (ruby has YAML built in)
# run from this kit/ directory; the spec is one level up
awk 'NR==1{next} /^---$/{exit} {print}' ../DESIGN.md > /tmp/hub-fm.yaml
awk 'NR==1{next} /^---$/{exit} {print}' ../design/palette.md > /tmp/palette-fm.yaml
ruby -ryaml -rjson -e 'puts JSON.pretty_generate(YAML.load_file("/tmp/hub-fm.yaml"))' > /tmp/hub-fm.json
ruby -ryaml -rjson -e 'puts JSON.pretty_generate(YAML.load_file("/tmp/palette-fm.yaml"))' > /tmp/palette-fm.json
# 2. generate the kit — palette FIRST, hub second (hub's top-level scalars win; colors deep-merge)
python3 ./generate-kit.py /tmp/palette-fm.json /tmp/hub-fm.json .
```

> The palette table was demoted from the hub to `design/palette.md` (Track B slim, 2026-06-10) —
> the generator merges the two; output verified byte-identical across the split.

## Source of truth

The **spec** (`DESIGN.md` + `design/*.md` spokes) is canonical. This kit is downstream of it. If a value
here disagrees with the spec, the spec wins and the kit is stale — regenerate.

> Note: this kit covers the standard token groups (colors, typography, spacing, radius, motion) plus
> Sandworm's gradients — **gradients ship in the CSS export only**; `tailwind.tokens.json` and
> `tokens.dtcg.json` carry none (flat token formats). Sandworm's richer blocks — elevation, mode pairs,
> layouts, diagrams, dataviz — live in the spec/spokes and are not expressible here either; read the spec.
