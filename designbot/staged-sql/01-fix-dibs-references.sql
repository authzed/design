-- ============================================================================
-- STAGED — NOT APPLIED. Review before running.
--
-- Target: Burrow Postgres on Sandtrap (SHARED infrastructure, not local).
--   ssh sandtrap
--   docker exec -i burrow-postgres psql -U brandai -d burrow < 01-fix-dibs-references.sql
--
-- What it fixes (all three are live problems, see docs/designbot/LEARNINGS.md §6):
--   1. All six Dibs refs sit at weight 70. The API budget is 4 slots and ties
--      break by insertion order, so two refs NEVER reach the model.
--   2. Both three-quarter views are mislabeled ('Front Third' => front,
--      'Back Third' => back), so 3/4 renders condition on front/back images.
--   3. 'Left Side' carries mascotView 'left-side', which is NOT in the
--      MascotView union — it crashed a VIEW_CONFIG[x].label lookup in prod.
--
-- Also populates description + promptInjection, which are empty on every ref.
--
-- Runs in a transaction and ends with ROLLBACK. Read the verification output,
-- then change the last line to COMMIT and re-run to apply for real.
-- ============================================================================

BEGIN;

-- --- Backup the current value into app_setting so this is reversible --------
INSERT INTO app_setting (key, value)
SELECT 'backup-reference-images-2026-08-06', reference_images::text
FROM brand_config
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- --- The patch -------------------------------------------------------------
-- Weight bands (see docs/designbot/01-composer-contract.md §4):
--   canonical 90 > turnaround spread 82/80/78/76 > situational 74
--
-- Top-4 by weight resolves to: Front, Front-Third, Side, Back-Third —
-- a deliberate spread AROUND the character (front, 3/4, profile, rear-3/4)
-- rather than a front-heavy set. This is a character TURNAROUND; its whole
-- purpose is defining Dibs in the round. Starving the rear views means any
-- back-facing render has no reference for what Dibs looks like from behind,
-- and the model invents it.
--
-- Expression drops to reserve at 74 because it is SITUATIONAL — pull it when
-- the brief calls for enthusiasm, not as a standing member of the set.
--
-- !! THIS IS A STOPGAP. Static weights are the wrong mechanism entirely. !!
-- The 4-slot budget is a PER-REQUEST constraint; a global ranking cannot
-- express "which views matter for THIS camera angle." See the note at the
-- bottom of this file — the real fix is angle-aware selection, and these
-- weights only decide what happens until that exists.

UPDATE brand_config
SET reference_images = (
  SELECT jsonb_agg(patched ORDER BY (patched->>'weight')::int DESC)
  FROM (
    SELECT
      CASE r->>'id'

        -- Canonical front. The identity anchor.
        WHEN '0fd1L4gVBua3D7t-J7XQf' THEN r || jsonb_build_object(
          'weight', 90,
          'isCanonical', true,
          'mascotView', 'front',
          'artStyle', 'vector',
          'description', 'Dibs, canonical front view. The identity anchor: oversized leaf-shaped pink ears, large dark-purple circular eyes each carrying a small violet highlight, soft orange body with peach belly, pink tail with orange tuft.',
          'promptInjection', 'flat vector illustration, bold uniform outlines, smooth clean surface with no visible fur texture'
        )

        -- Front three-quarter. Was mislabeled 'front'.
        WHEN 'wzLD4oESUI-mhrPiJsCmx' THEN r || jsonb_build_object(
          'weight', 82,
          'mascotView', 'three-quarter',
          'artStyle', 'vector',
          'description', 'Dibs, front three-quarter view. Shows ear depth and body volume that the flat front view flattens.',
          'promptInjection', 'flat vector illustration, bold uniform outlines, smooth clean surface with no visible fur texture'
        )

        -- Expression reference. Carries the personality register.
        WHEN 'atVZAdmJJrz-ZQeFp8V33' THEN r || jsonb_build_object(
          'weight', 74,
          'mascotView', 'expression',
          'artStyle', 'vector',
          'description', 'Dibs cheering — the canonical happy/energetic expression. Arms raised, wide open smile. Use when the brief calls for enthusiasm.',
          'promptInjection', 'flat vector illustration, bold uniform outlines, cheerful open expression'
        )

        -- Side profile. Was the off-enum 'left-side' that crashed prod.
        WHEN 'DRIPUDgrvkmRVj7asmnqu' THEN r || jsonb_build_object(
          'weight', 80,
          'mascotView', 'side',
          'artStyle', 'vector',
          'description', 'Dibs, left side profile. Defines the tail silhouette and the head-to-body proportion.',
          'promptInjection', 'flat vector illustration, bold uniform outlines, smooth clean surface with no visible fur texture'
        )

        -- Rear three-quarter. Was mislabeled 'back'. See NOTE below on 'other'.
        WHEN 'C4tYPgm6HVus909Xejt1U' THEN r || jsonb_build_object(
          'weight', 78,
          'mascotView', 'other',
          'artStyle', 'vector',
          'description', 'Dibs, rear three-quarter view. Shows how the tail attaches and how the ears read from behind.',
          'promptInjection', 'flat vector illustration, bold uniform outlines, smooth clean surface with no visible fur texture'
        )

        -- Straight back.
        WHEN 'sVSUpz75ItpG2SBRQzNj4' THEN r || jsonb_build_object(
          'weight', 76,
          'mascotView', 'back',
          'artStyle', 'vector',
          'description', 'Dibs, straight back view. Rear tail and ear placement.',
          'promptInjection', 'flat vector illustration, bold uniform outlines, smooth clean surface with no visible fur texture'
        )

        ELSE r
      END AS patched
    FROM jsonb_array_elements(reference_images) r
  ) s
);

-- --- Verify ----------------------------------------------------------------
SELECT
  r->>'name'         AS name,
  r->>'mascotView'   AS view,
  r->>'weight'       AS weight,
  r->>'isCanonical'  AS canonical,
  left(r->>'description', 40) AS description_starts
FROM brand_config, jsonb_array_elements(reference_images) r
ORDER BY (r->>'weight')::int DESC;

-- Expect: 6 rows, weights 90/82/80/78/76/74, exactly one canonical=true,
-- views front/three-quarter/side/other/back/expression, no 'left-side',
-- every description non-empty.
-- Top-4 by weight = Front, Front-Third, Side, Back-Third (a turnaround spread).

ROLLBACK;  -- <<< change to COMMIT to apply

-- ============================================================================
-- NOTE — 'other' is a compromise, not the right answer.
--
-- MascotView is: front | side | back | three-quarter | expression | action | other
--
-- There is exactly one 'three-quarter' member, but Dibs has TWO three-quarter
-- views (front-facing and rear-facing). Tagging the rear one 'three-quarter'
-- too would make the pair indistinguishable to any view-specific logic, so this
-- patch parks it on 'other' and puts the real meaning in the description.
--
-- The better fix is a code change: extend the union to distinguish
-- 'three-quarter-front' / 'three-quarter-back' (or add a 'facing' field).
-- Do that and this row should be re-tagged.
-- ============================================================================

-- ============================================================================
-- THE REAL FIX — angle-aware reference selection
--
-- Everything above is a stopgap. The underlying problem is that `mascotView` is
-- NEVER READ BY SELECTION. Verified across src/: the field is set in the UI
-- (BrandGuidelines, ReferenceAssetEditor, BrandOnboarding), displayed in the UI
-- (AssetPicker, BrandGuidelines), and copied onto the outgoing payload
-- (GenerationStudio, vocabulary-matcher, prompt.ts). Nothing filters, ranks, or
-- selects on it.
--
-- Camera angle is equally disconnected. `selectedCameraAngle` produces a text
-- clause via CAMERA_ANGLES and gets PREPENDED to the prompt string. It never
-- reaches assembleReferences().
--
-- Net effect: ask for a back view and you get the four highest-weighted
-- references — which under any static ranking are mostly front-facing — plus a
-- sentence saying "back view". The words say back, the images say front, and in
-- a multimodal model the images win. That is the same self-contradiction class
-- documented in docs/designbot/01-composer-contract.md §2, arriving through the
-- reference channel instead of the text channel.
--
-- Proposed selection, replacing pure weight-sort for mascot refs:
--
--   1. ALWAYS include the canonical identity anchor (isCanonical = true).
--      It defines who the character is, independent of camera.
--   2. Fill remaining slots by matching the requested angle to mascotView:
--
--        requested angle   -> preferred views, in order
--        ---------------------------------------------------------------
--        front             -> front, three-quarter
--        three-quarter     -> three-quarter, front, side
--        side              -> side, three-quarter, front
--        back              -> back, rear-three-quarter, side
--        low-angle/top-down-> front, three-quarter   (no dedicated refs)
--        default/auto      -> three-quarter, front, side   (best all-round)
--
--   3. Fill any leftover slots by weight descending.
--   4. Log which references were dropped and why.
--
-- Note CAMERA_ANGLES itself needs attention: the CameraAngle union declares 10
-- members but the array defines only 6. 'back', 'close-up', 'full-body' and
-- 'portrait' are typed-but-absent, so getCameraAnglePrompt() returns '' for
-- them silently. A 'back' angle cannot even be requested today.
-- ============================================================================
