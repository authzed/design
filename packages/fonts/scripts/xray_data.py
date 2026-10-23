"""Outline data for the specimen's x-ray view: every glyph's TrueType points at the 10 masters.

  python3 packages/fonts/scripts/xray_data.py "packages/fonts/fonts/AuthZedDisplay[wdth,wght].ttf" sandworm/public/specimen/authzed-display/xray.json   (needs fonttools)

The masters sit on a full wdth x wght grid and the font has no avar, so the page reproduces any
in-between instance by bilinear interpolation of these points (what the VF itself does).
"""
import json
import sys

from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

WDTH = [58.5, 80.5, 100, 117, 165]
WGHT = [300, 600]

src, out = sys.argv[1], sys.argv[2]
assert 'avar' not in TTFont(src), 'avar present: bilinear interpolation would be wrong'
base = TTFont(src)
cm = base.getBestCmap()
chars = sorted(c for c in cm if c > 32)
glyphs = {chr(c): dict(n=None, f=None, e=None, m=[]) for c in chars}
for wg in WGHT:
    for wd in WDTH:
        f = instantiateVariableFont(TTFont(src), {'wdth': wd, 'wght': wg})
        glyf, hmtx = f['glyf'], f['hmtx']
        for c in chars:
            name = cm[c]
            coords, ends, flags = glyf[name].getCoordinates(glyf)
            g = glyphs[chr(c)]
            fl = ''.join('1' if b & 1 else '0' for b in flags)
            if g['f'] is None:
                g['f'], g['e'] = fl, list(ends)
            assert g['f'] == fl and g['e'] == list(ends), (chr(c), wd, wg)
            g['m'].append([hmtx[name][0]] + [round(v) for p in coords for v in p])
for g in glyphs.values():
    del g['n']
os2 = base['OS/2']
meta = dict(upm=base['head'].unitsPerEm, asc=os2.sTypoAscender, desc=os2.sTypoDescender,
            cap=os2.sCapHeight, x=os2.sxHeight, wdth=WDTH, wght=WGHT)
json.dump(dict(meta=meta, glyphs=glyphs), open(out, 'w'), separators=(',', ':'))
print(out, len(glyphs), 'glyphs')
