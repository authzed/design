# Changesets

Every change to a package under `packages/` gets a changeset: `pnpm changeset`, pick the package
and bump, write one line on what changed. On merge to `main` the release workflow opens a
"Version packages" PR; merging that publishes to npm.

Sandworm is private and is never published.
