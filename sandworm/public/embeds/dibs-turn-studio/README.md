# Dibs Turn Studio (stage)

`stage.html` is the Dibs rig itself: the front and side drawings, the drag handles on the character, and the
bones, with no controls of its own. The Sandworm page `/tools/dibs-turn-studio` (app/tools/dibs-turn-studio)
owns every control, built from the Sandworm component library, and drives the stage through
`frame.contentWindow.DibsStudio` (setView, front/side presets, face, mixes, settings/load, exportPng, setTheme).
The stage fires a `dibschange` event on its window whenever the pose changes.

## Where it comes from

`stage.html` is a build artifact. It is generated from the Dibs rig sources (the front parts rig and the
skinned side rig, the same art and bones as the Rive files), so do not hand-edit it: changes are lost on the
next build. Source and build script: `scratch/playground/dibs-rig/studio/studio.py` in Corey's workspace.

    ../.venv/bin/python studio.py      # writes dibs-turn-stage.html; copy it here as stage.html

## Known limits

- Front: legs are fixed (seated); head tilt is limited to +-6 deg, ears to 12 deg inward, so the joins stay clean.
- Side: ear curl is capped at 40; the side view's silhouette smoothing is a browser filter (not in Rive).
