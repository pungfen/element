---
name: dependency-upgrade-and-release
description: Upgrade this pnpm Vue component library's dependencies safely, resolve peer constraints, update peer documentation, and prepare a Changeset-backed release.
---

# Dependency Upgrade and Release

Use this skill when upgrading Vue, Element Plus, VueUse, Vite, TypeScript, ESLint, or related workspace tooling in this repository.

## Version Sources

This is a pnpm workspace with:

- root package: `package.json`
- Playground package: `__play__/package.json`
- shared versions: `pnpm-workspace.yaml` under `catalog`
- resolved graph: `pnpm-lock.yaml`

Dependencies shared across packages should remain in the catalog and referenced with `catalog:`. Do not update only one importer when the shared catalog controls the same package.

## Upgrade Procedure

1. Inspect existing user changes and do not overwrite unrelated work.
2. Query outdated direct dependencies:

   ```bash
   pnpm outdated --recursive
   ```

3. Update the workspace:

   ```bash
   pnpm update --recursive --latest
   ```

4. Check peer compatibility immediately:

   ```bash
   pnpm peers check
   ```

5. If a major upgrade has incompatible peers, retain the newest compatible major rather than forcing an invalid latest version.

   Example:

   - TypeScript 7 may be newer than the supported range of current typescript-eslint and Volar packages.
   - `@stylistic/eslint-plugin` 6 may be newer than the supported range of `eslint-plugin-vue`.

6. Re-run `pnpm install` after applying compatibility pins.
7. Ensure Vue and Element Plus peer versions in `README.md` match `pnpm-workspace.yaml`.

## Validation

Run all of these after dependency graph changes:

```bash
pnpm peers check
pnpm lint
pnpm typecheck
pnpm test --run
pnpm build
pnpm -C __play__ build
```

Build the library before the Playground. The Playground resolves `@pungfe/element/resolver` from generated library output, so running both builds concurrently can cause a false `dist/resolver.js` missing-module failure.

If a command introduces compatibility failures, fix repository code/configuration only when the behavior change is understood. Otherwise pin the highest compatible dependency major and document why.

## Release Metadata

Package source, exports, catalog versions, or dependency changes require a Changeset.

Add a patch/minor/major entry under `.changeset/`:

```md
---
"@pungfe/element": patch
---

Upgrade Vue, Element Plus, and workspace tooling dependencies.
```

Validate with:

```bash
pnpm changeset status
```

Do not manually edit the package version for a normal release. The Changesets GitHub Action versions and publishes from `main`.

## Final Review

Before handing off:

- verify `pnpm outdated --recursive` only lists intentionally constrained dependencies;
- inspect `package.json`, `__play__/package.json`, `pnpm-workspace.yaml`, and lockfile changes;
- run `git diff --check`;
- report any peer-driven compatibility pins;
- never describe a parallel Playground build race as a source compatibility failure.
