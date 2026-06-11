#!/usr/bin/env python3
"""Generate the Sandworm design kit from DESIGN.md frontmatter (passed as JSON).
Faithful transform — every value traces to the spec; nothing hand-typed.
Usage: python3 generate-kit.py <palette.json> <hub-frontmatter.json> <out_dir>  (any number of JSON inputs; merged in order, last arg = out dir)
Emits: colors_and_type.css, tailwind.tokens.json, tokens.dtcg.json — ONLY these three.
SKILL.md and README.md in the kit are HAND-MAINTAINED (update them when the spec's shape changes).
"""
import json, sys, re, os

# Merge all JSON inputs (last arg = out dir). Pass palette.json BEFORE hub.json so the hub's
# top-level scalars (name, version) win while dict values (colors) deep-merge.
fm = {}
for _path in sys.argv[1:-1]:
    _d = json.load(open(_path))
    for _k, _v in _d.items():
        if isinstance(_v, dict) and isinstance(fm.get(_k), dict):
            fm[_k].update(_v)
        else:
            fm[_k] = _v
out = sys.argv[-1]
os.makedirs(out, exist_ok=True)

C = fm["colors"]
FAMILIES = ["stone", "magenta", "teal", "sand", "red", "violet", "blue"]
REF = re.compile(r"\{colors\.([a-z]+)\.([0-9]+)\}")

def resolve_hex(val):
    """Resolve a '{colors.fam.stop}' reference to its hex, or pass through a hex."""
    if not isinstance(val, str):
        return val
    m = REF.fullmatch(val.strip())
    if m:
        fam, stop = m.group(1), m.group(2)
        return C[fam][stop]
    return val

def ref_to_var(val):
    """Resolve a '{colors.fam.stop}' reference to a CSS var(), or pass through."""
    if not isinstance(val, str):
        return val
    m = REF.fullmatch(val.strip())
    if m:
        return f"var(--{m.group(1)}-{m.group(2)})"
    return val

# ---------------------------------------------------------------- CSS
css = [f"/* Sandworm design tokens — generated from DESIGN.md v{fm.get('version','?')}. DO NOT EDIT BY HAND. */",
       ":root {"]
css.append("  /* ── Color families (7 × 15 stops) ── */")
for fam in FAMILIES:
    for stop, hexv in C[fam].items():
        css.append(f"  --{fam}-{stop}: {hexv};")
css.append("\n  /* ── Brand semantic shortcuts ── */")
for k in ["primary","secondary","accent","highlight","alert","info","surface","surface-dark","text","text-dark"]:
    if k in C:
        css.append(f"  --color-{k}: {ref_to_var(C[k])};")
css.append("\n  /* ── Semantic light/dark pairs ── */")
for name, pair in C.get("semantic", {}).items():
    css.append(f"  --{name}-light: {ref_to_var(pair['light'])};")
    css.append(f"  --{name}-dark: {ref_to_var(pair['dark'])};")
css.append("\n  /* ── Gradients ── */")
for gname, g in fm.get("gradients", {}).items():
    if gname.startswith("_") or not isinstance(g, dict) or "stops" not in g:
        continue
    stops = ", ".join(f"{ref_to_var(s['color'])} {s['position']}" for s in g["stops"])
    direction = g.get("direction", "to right")
    css.append(f"  --gradient-{gname}: linear-gradient({direction}, {stops});")
css.append("\n  /* ── Typography ── */")
tf = fm["typography"]["fontFamily"]
css.append(f"  --font-sans: {tf['sans']};")
css.append(f"  --font-mono: {tf['mono']};")
for role, spec in fm["typography"].items():
    if role == "fontFamily" or not isinstance(spec, dict):
        continue
    if "fontSize" in spec:
        css.append(f"  --text-{role}-size: {spec['fontSize']};")
    if "fontWeight" in spec:
        css.append(f"  --text-{role}-weight: {spec['fontWeight']};")
css.append("\n  /* ── Radius ── */")
for k, v in fm["rounded"].items():
    css.append(f"  --radius-{k}: {v};")
css.append("\n  /* ── Spacing (4px grid) ── */")
for k, v in fm["spacing"].items():
    if isinstance(v, (int, float, str)) and not isinstance(v, dict) and k not in ("breakpoint","container","rhythm"):
        css.append(f"  --space-{k}: {v};")
css.append("\n  /* ── Motion ── */")
for k, v in fm["motion"]["duration"].items():
    css.append(f"  --duration-{k}: {v};")
for k, v in fm["motion"]["easing"].items():
    css.append(f"  --ease-{k}: {v};")
css.append("}")
open(f"{out}/colors_and_type.css", "w").write("\n".join(css) + "\n")

# ---------------------------------------------------------------- Tailwind
tw_colors = {fam: dict(C[fam]) for fam in FAMILIES}
fontSize = {}
for role, spec in fm["typography"].items():
    if isinstance(spec, dict) and "fontSize" in spec:
        fontSize[role] = spec["fontSize"]
screens = {k: v for k, v in fm["spacing"].get("breakpoint", {}).items()}
spacing = {k: v for k, v in fm["spacing"].items() if k not in ("breakpoint","container","rhythm")}
tailwind = {"theme": {"extend": {
    "colors": tw_colors,
    "fontFamily": {"sans": tf["sans"].split(", "), "mono": tf["mono"].split(", ")},
    "fontSize": fontSize,
    "borderRadius": dict(fm["rounded"]),
    "spacing": spacing,
    "screens": screens,
    "transitionDuration": {k: v for k, v in fm["motion"]["duration"].items()},
}}}
open(f"{out}/tailwind.tokens.json", "w").write(json.dumps(tailwind, indent=2) + "\n")

# ---------------------------------------------------------------- DTCG
dtcg = {"$description": f"Sandworm design tokens (DTCG) — generated from DESIGN.md v{fm.get('version','?')}"}
color_group = {"$type": "color"}
for fam in FAMILIES:
    color_group[fam] = {stop: {"$value": hexv} for stop, hexv in C[fam].items()}
dtcg["color"] = color_group
dim = {"$type": "dimension"}
dim["spacing"] = {k: {"$value": str(v)} for k, v in spacing.items()}
dim["radius"] = {k: {"$value": str(v)} for k, v in fm["rounded"].items()}
dtcg["dimension"] = dim
dur = {"$type": "duration"}
dur["motion"] = {k: {"$value": str(v)} for k, v in fm["motion"]["duration"].items()}
dtcg["duration"] = dur
open(f"{out}/tokens.dtcg.json", "w").write(json.dumps(dtcg, indent=2) + "\n")

print("generated: colors_and_type.css, tailwind.tokens.json, tokens.dtcg.json")
print("hand-maintained (NOT regenerated): SKILL.md, README.md")
print(f"  css lines: {len(css)}  | tw colors: {sum(len(v) for v in tw_colors.values())} | dtcg color groups: {len(FAMILIES)}")
