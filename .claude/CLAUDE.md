# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@pungfe/element` is a Vue 3 component library built on top of Element Plus. It wraps Element Plus components with an `X` prefix (e.g., `XButton`, `XTable`) and provides optional "advance" components for common patterns like request-based tables and OSS uploads.

## Common Commands

```bash
npm run build    # Build library (outputs to dist/)
npm run fmt      # Format code with oxfmt
npm run lint     # Type-aware lint with oxlint
npm run typecheck # TypeScript check with vue-tsc
npm run test     # Run tests with Vitest (watch mode)
npm run test:ci  # Run tests once (CI mode)
npm run release  # Build + bump version with bumpp
```

## Architecture

### Entry Points (src/)

| File                     | Purpose                                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `src/index.ts`           | Main entry — exports `install`, `ElementConfig` types, version                                              |
| `src/install.ts`         | Plugin `install` function — registers all components + provides global config                               |
| `src/basic.ts`           | Named exports of all basic X components + their types                                                       |
| `src/advance.ts`         | Named exports of all advance X components + their types                                                     |
| `src/locales.ts`         | Re-exports locale packages (en, zhCn, ar, th)                                                               |
| `src/resolver.ts`        | `unplugin-vue-components` resolver — maps X component names to import paths + Element Plus CSS side effects |
| `src/types.ts`           | Shared types: `ElementConfig`, `Paging`, `TableColumnField`, `OssInfo`                                      |
| `src/constants/index.ts` | All `InjectionKey`s for provide/inject across components                                                    |

### Components (src/components/)

- **`basic/`** — Thin wrappers around Element Plus (e.g., `Button.vue` wraps `ElButton`). All accept typed props and re-emit events.
- **`advance/`** — Scenario-specific components that combine multiple Element Plus components with extra logic (async loading, request handling, OSS upload, etc.).

### Build Output

Build produces a **library mode** bundle from multiple entry points (`src/index.ts`, `src/advance.ts`, `src/basic.ts`, `src/locales.ts`, `src/resolver.ts`), generating both ESM and CJS formats in `dist/`. Element Plus and Vue are externalized as peer dependencies.

### Global Config Pattern

`install.ts` calls `app.provide(X_ELEMENT_CONFIG, mergedConfig)`. Components use `inject(X_ELEMENT_CONFIG)` to access global defaults (e.g., `table.showOverflowTooltip`, `button.autoInsertSpace`).

### Resolver Side Effects

`resolver.ts` maps each X component to its corresponding Element Plus CSS paths. This enables `unplugin-vue-components` to auto-import both the component and its styles when using the resolver approach.

### InjectionKey Context Pattern (`src/constants/index.ts`)

Child components detect their parent context via provide/inject keys to adapt behavior:

| Key | Purpose |
| --- | ------- |
| `X_ELEMENT_IN_TABLE` | Set by `XTable`, checked by child components inside a table |
| `X_ELEMENT_IN_TABLE_COLUMN` | Set by table columns |
| `X_ELEMENT_IN_FORM` | Set by `XForm`, checked by form children |
| `X_ELEMENT_IN_FORM_ITEM` | Set by `XFormItem` |
| `X_ELEMENT_IN_TABS` / `X_ELEMENT_IN_TAB_PANE` | Set by tabs/tab pane |
| `X_FORM_VALIDATIONS` / `X_FORM_ITEM_VALIDATION` | Form validation communication between form items and the form |

### Composable Pattern

`src/composables/useElementConfig.ts` uses `getCurrentInstance()` as a guard before `inject()`:

```ts
const config = getCurrentInstance()
  ? inject(X_ELEMENT_CONFIG, defaultElementConfig)
  : defaultElementConfig
```

This prevents crashes when the composable is called outside Vue's setup context (e.g., in plain `.ts` modules). Follow this pattern for new composables.

### Generic Components

Vue 3.3+ generic components: `Table.vue` uses `<script setup generic="D">` (single row type). Advance components like `XTableRequestNext.vue` use multi-generic `<script setup generic="U, PT, QR, D">` for url, path, query, and row types.

### Tailwind CSS v4

CSS-based config — no `tailwind.config.ts`. Only `theme` and `utilities` layers are imported (`base` is skipped to avoid conflicting with Element Plus styles). `@source './**/*.vue'` scans Vue files for class usage. The CSS (`src/index.css`) is imported from `src/index.ts` and bundled into `dist/style.css`.

### TypeScript Configuration

Uses project references: `tsconfig.json` → `tsconfig.app.json` (source), `tsconfig.node.json` (tooling), `tsconfig.test.json` (tests). `vue-tsc` checks against `tsconfig.app.json`. Path alias `@` maps to `./src`.

### Build & Lint Details

- **vite.config.ts**: Import names are misleading — `Vue` imports `@vitejs/plugin-vue-jsx` and `VueJsx` imports `@vitejs/plugin-vue`. Uses `rolldownOptions` (Rolldown is Vite 8's bundler).
- **oxlint**: Only `correctness: 'warn'` category; plugins: `typescript`, `import`, `unicorn`, `vue`, `eslint-plugin-perfectionist` (`sort-objects: 'error'`).
- **Pre-commit**: `simple-git-hooks` → `lint-staged` runs `oxlint --fix` on staged `.js/.ts/.vue/.tsx/.jsx` files.

### Testing

Tests live in `test/` and run with Vitest in jsdom environment. Current tests are placeholder stubs. Use `npm run test -- path/to/file.test.ts` to run a single test file (watch mode), or `npm run test:ci` for single run.
