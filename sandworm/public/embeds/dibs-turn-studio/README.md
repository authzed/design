# Dibs Turn Studio (embed)

A self-contained page (`index.html`, no dependencies beyond Google Fonts) for posing the Dibs mascot:
front and side views, drag handles on the character, preset poses, eye and mouth expressions, PNG export,
and copy/paste of the full pose as JSON. Shown on the Sandworm site at `/tools/dibs-turn-studio`.

## Where it comes from

`index.html` is a build artifact. It is generated from the Dibs rig sources (the front parts rig and the
skinned side rig, the same art and bones as the Rive files), so do not hand-edit it: changes are lost on the
next build. Source and build script: `scratch/playground/dibs-rig/studio/studio.py` in Corey's workspace.

    ../.venv/bin/python studio.py      # writes dibs-turn-studio.html; copy it here as index.html

## Known limits

- Front: legs are fixed (seated); head tilt is limited to +-6 deg, ears to 12 deg inward, so the joins stay clean.
- Side: ear curl is capped at 40; the side view's silhouette smoothing is a browser filter (not in Rive).
