# Dibs Turn Studio

`stage-html.ts` holds the Dibs rig itself (as an HTML string): the front and side drawings, the drag handles on the character, and the
bones, with no controls of its own. The Sandworm page `/tools/dibs-turn-studio` (app/tools/dibs-turn-studio)
owns every control, built from the Sandworm component library, and loads it with `<iframe srcDoc>` and drives it through
`frame.contentWindow.DibsStudio` (setView, front/side presets, face, mixes, settings/load, exportPng, setTheme).
The stage fires a `dibschange` event on its window whenever the pose changes.

## Where it comes from

`stage-html.ts` is a build artifact. It is generated from the Dibs rig sources (the front parts rig and the
skinned side rig, the same art and bones as the Rive files), so do not hand-edit it: changes are lost on the
next build. Source and build script: `scratch/playground/dibs-rig/studio/studio.py` in Corey's workspace.

    ../.venv/bin/python studio.py      # writes dibs-turn-stage.ts; copy it here as stage-html.ts

## Known limits

- Front: legs are fixed (seated); head tilt is limited to +-6 deg, ears to 12 deg inward, so the joins stay clean.
- Side: ear curl is capped at 40; the side view's silhouette smoothing is a browser filter (not in Rive).
