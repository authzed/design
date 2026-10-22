# CLAUDE.md

Guidance for Claude Code (and other agents) working in this repo.

## What this repo is

AuthZed's design system, as a pnpm 11 monorepo:

- `sandworm/`: the Sandworm docs site (Next.js 14, `output: 'export'`). Private, never published.
  Brand rules live in `sandworm/design/*.md` and `sandworm/DESIGN.md`; generated tokens in
  `sandworm/kit/colors_and_type.css` (do not edit by hand).
- `packages/fonts/`: `@authzed/fonts`, AuthZed Display (OFL 1.1). Usage rules for agents are in
  `packages/fonts/RULES.md`; read it before setting any headline.
- `packages/tokens/`: planned (`docs/TOKENS.md`).

## Commands

```bash
pnpm install
pnpm dev                                   # Sandworm on :3000
pnpm build                                 # pnpm -r build: Sandworm + packages
pnpm --filter @authzed/fonts build         # verify every font file the CSS/tokens reference exists
pnpm --filter @authzed/fonts sync [dir]    # pull a new font build from the typeface lab
pnpm changeset                             # describe a package change for release
```

Use pnpm only. There are no npm lockfiles; don't add one.

## Rules

- Any change under `packages/` needs a changeset (`pnpm changeset`) in the same PR.
- Don't edit `packages/fonts/fonts/*` or `css/display-embedded.css` by hand: they come from the
  typeface lab via `sync`.
- Sandworm moves to `apps/sandworm/` later; don't start that move while Sandworm PRs are open.
- Burrow (the brand asset/generation tool) is not part of this repo.
