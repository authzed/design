# AuthZed Design

AuthZed's design system: the Sandworm docs site, and the packages other AuthZed repos install
(fonts now, design tokens next).

## Layout

```
design/
├── sandworm/          # Sandworm: design system docs site (Next.js static export). Private, not published.
├── packages/
│   └── fonts/         # @authzed/fonts: AuthZed Display (variable display face) + CSS + usage rules
├── docs/              # repo plans (RESTRUCTURE.md, TOKENS.md)
└── .changeset/        # release notes for packages
```

`sandworm/` moves to `apps/sandworm/` once the open Sandworm PRs land (see `docs/RESTRUCTURE.md`).

## Getting started

Requires Node 22 and pnpm 11 (`corepack enable` picks the version from `package.json`).

```bash
git clone https://github.com/authzed/design.git
cd design
pnpm install
pnpm dev            # Sandworm on localhost:3000
pnpm build          # Sandworm + every package
```

## Packages

| Package | What | Status |
|---|---|---|
| [`@authzed/fonts`](./packages/fonts) | AuthZed Display, the brand display face (OFL 1.1) | 0.4.0-pre, not yet published |
| `@authzed/tokens` | Sandworm colors, type scale and spacing as CSS variables, a Tailwind preset and JSON | planned, see `docs/TOKENS.md` |

Other repos (authzed/web, docs, OG and video tooling) install these from npm instead of keeping
their own copies.

## Releasing a package

1. Make the change under `packages/<name>/`.
2. `pnpm changeset`: pick the package and the bump, write one line on what changed. Commit it with the change.
3. Merge to `main`. The Release workflow opens a "chore: version packages" PR.
4. Merge that PR. The workflow publishes the bumped packages to npm (needs the `NPM_TOKEN` repo secret).

## CI

- `.github/workflows/ci.yml`: on every PR and on `main`, `pnpm install --frozen-lockfile` + `pnpm -r build`.
- `.github/workflows/release.yml`: changesets version PR + npm publish on `main`.

## Support

Open a GitHub issue, or join the [Discord community](https://authzed.com/discord).

## License

There is no repo-wide license file yet (the old README linked one that never existed). `@authzed/fonts` is SIL Open Font License 1.1 (`packages/fonts/LICENSE.txt`).
