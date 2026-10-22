# Restructuring authzed/design

Goal: this repo ships the design system, not just documents it. Packages other AuthZed repos
install from npm (`@authzed/fonts`, `@authzed/tokens`), and Sandworm documents those same packages
so the docs can't drift from what ships.

Before: Sandworm (docs site) plus Basin (a design-tools catalog that never got used), no CI, no
releases, Sandworm deployed by zipping a static export by hand (`sandworm/deploy.sh`), nothing
consumed by authzed/web.

## Phase 1: this branch (`chore/repo-restructure`)

- pnpm 11 for the whole repo (carries the commit from PR #28 forward onto current `main`, lockfile
  regenerated).
- Basin removed.
- `packages/` in the pnpm workspace, with `@authzed/fonts` (0.4.0-pre): the v0.3.1 AuthZed Display
  files as a placeholder, `scripts/sync-from-lab.mjs` to pull the new S5 build (join notches,
  Compressed to Expanded widths) when it lands, `scripts/verify.mjs` as its build step.
- Changesets for versioning; `ci.yml` (install + `pnpm -r build` on PRs and `main`) and
  `release.yml` (version PR + npm publish with provenance).
- README and CLAUDE.md rewritten for the new layout.

## Phase 2: `@authzed/tokens`

See `docs/TOKENS.md`. One source for colors, type scale and spacing, published as CSS variables, a
Tailwind preset and JSON. Sandworm and authzed/web both consume it.

## Phase 3: `apps/`

Move `sandworm/` to `apps/sandworm/` after the open Sandworm PRs (#35 Mascot / Dibs, #33
designbot materials, #24 MDX components) merge or close, so none of them has to be rebased across
a directory move. Replace `deploy.sh` with a CI deploy (Vercel or static hosting).

## Phase 4: consumers

- authzed/web: `pnpm add @authzed/fonts @authzed/tokens`; load the variable font with
  `next/font/local`; Tailwind preset from tokens.
- OG images and video: the static TTFs from `@authzed/fonts`.
- Agents: `packages/fonts/RULES.md` and the embedded CSS for Claude artifacts and Claude Design.

## Needs Corey's OK (outward)

1. Push `chore/repo-restructure` and open the PR.
2. Close PR #26 (Basin rebuild) and PR #28 (pnpm migration, carried in here) once this PR is up.
3. Add the `NPM_TOKEN` repo secret (an npm automation token with publish rights on the `@authzed`
   scope) so the release workflow can publish.
4. First publish of `@authzed/fonts` (after the S5 build is synced in, as 0.4.0).

## Not in this repo

Burrow (brand asset manager + image generation; Postgres + MinIO, deployed to Sandtrap) was only
ever on a local branch here and does not belong in a public design-system repo. It moves to its own
private repo (see the restructure PR description for the recommendation).
