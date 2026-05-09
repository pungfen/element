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

## Naming Convention

- **`basic/`** — filenames omit the `X` prefix (e.g., `Button.vue`), exported as `XButton` via `src/basic.ts`
- **`advance/`** — filenames keep the `X` prefix (e.g., `XButtonAsync.vue`), exported as-is
- **Generic parameters** — `U` = URL type, `PT` = Path type, `QR` = Query type, `D` = Data/Row type, `V` = Value type, `MV` = Model Value type

## Architecture

### Entry Points (src/)

| File | Purpose |
| --- | --- |
| `src/index.ts` | Main entry — exports `install`, `ElementConfig` types, version, imports `index.css` |
| `src/install.ts` | Plugin `install` function — registers all components + provides global config |
| `src/basic.ts` | Named exports of all basic X components + their types |
| `src/advance.ts` | Named exports of all advance X components + their types |
| `src/locales.ts` | Re-exports locale packages (en, zhCn, ar, th) |
| `src/resolver.ts` | `unplugin-vue-components` resolver — maps X component names to import paths + Element Plus CSS side effects |
| `src/types.ts` | Shared types: `ElementConfig`, `Paging`, `TableColumnField`, `OssInfo` |
| `src/constants/index.ts` | All `InjectionKey`s for provide/inject across components |

### Component Catalog

#### Basic (src/components/basic/) — thin wrappers around Element Plus

| Component | Wraps | Extra Logic |
| --- | --- | --- |
| `Button` | `ElButton` | Global config: `autoInsertSpace` |
| `Cascader` | `ElCascader` | `factory` for option props; form-item validation |
| `Checkbox` | `ElCheckbox` | Required validation (value must be truthy) |
| `ConfigProvider` | `ElConfigProvider` | Provides `X_LOCALE_CONFIG` to all children; defaults to `zhCn` |
| `DatePicker` | `ElDatePicker` | Splits range model into `start`/`end` v-models; global `valueFormat` |
| `Dialog` | `ElDialog` | `v-model:visible`; header/footer slots |
| `Form` | `ElForm` | Collects FormItem validators via `X_FORM_VALIDATIONS`; renders via JSX `content` |
| `FormItem` | `ElFormItem` | Registers `XFormItemValidation` with parent Form; cross-tab validation focus |
| `Input` | `ElInput` | Blur-triggered form-item validation; placeholder i18n |
| `InputNumber` | `ElInputNumber` | Same validation pattern as Input |
| `Pagination` | `ElPagination` | Global config for `layout`; i18n text |
| `Select` | `ElSelect` + `ElOption` | Value normalization via `identify`; `supplement` for async missing-option loading; remote search |
| `TabPane` | `ElTabPane` | Provides `X_ELEMENT_IN_TAB_PANE` + `X_TAB_PANE_NAME` for validation context |
| `Table` | `ElTable` + `ElTableColumn` | Column-driven via `columns` prop + JSX rendering; global config: `showOverflowTooltip`; provides `X_ELEMENT_IN_TABLE` |
| `Tabs` | `ElTabs` | Provides `X_TABS_MODEL_UPDATE_HOOK` (EventHook) so FormItem can trigger tab-switch on validation failure |
| `Upload` | `ElUpload` | Adapts Element Plus callback-based upload events to work via props |

#### Advance (src/components/advance/) — composite components with extra logic

| Component | Wraps | Extra Logic |
| --- | --- | --- |
| `XButtonAsync` | `XButton` | `useDebounceFn` on `action`; link-style in tables |
| `XButtonConfirm` | `ElPopconfirm` + `XButton` | Confirmation popover before action; i18n popover text |
| `XCascaderRequest` | `XCascader` | Connects cascader to async `request`; emits `prepare` |
| `XFormFlex` | `ElScrollbar` + `XForm` | Scrollable flex container around XForm |
| `XFormRequestNext` | `XForm` | Connects form to async `request`; `reset()` to initial data; loading state |
| `XRequest` | _none (renderless)_ | Core request wrapper — factory returns `{ data, execute, isFetching, paging, path, query }`; debounced `search()` |
| `XSelectRequest` | `XSelect` | Connects select to async `request`; debounced remote search |
| `XTableConfig` | `XTableFlex` + `ElPopover` + `useSortable` | Field-driven column visibility/sort via drag; column-width persistence |
| `XTableFlex` | `XTable` | `useElementSize` for auto-fill height in flex containers |
| `XTableRequestConfigNext` | `XForm` + `XTableFlex` + `XPagination` + `ElPopover` | Combines request, column config, search form, and pagination |
| `XTableRequestNext` | `XTableFlex` + `XPagination` | Connects table to async `request` with pagination; debounced search |
| `XUploadOssNext` | `XUpload` | Aliyun OSS direct upload; reads OSS credentials from global config; dynamic policy/formData |

### Build Output

Build produces a **library mode** bundle from multiple entry points (`src/index.ts`, `src/advance.ts`, `src/basic.ts`, `src/locales.ts`, `src/resolver.ts`), generating both ESM and CJS formats in `dist/`. Element Plus and Vue are externalized as peer dependencies.

### Global Config Pattern

`install.ts` calls `app.provide(X_ELEMENT_CONFIG, mergeElementConfig(options.config))`. `mergeElementConfig` shallow-merges user config over `defaultElementConfig`. Components use `inject(X_ELEMENT_CONFIG)` to access global defaults (e.g., `table.showOverflowTooltip`, `pagination.layout`).

### Resolver Side Effects

`resolver.ts` maps each X component to its corresponding Element Plus CSS paths. This enables `unplugin-vue-components` to auto-import both the component and its styles when using the resolver approach.

### InjectionKey Reference (src/constants/index.ts)

Child components detect their parent context via provide/inject keys:

| Key | Type | Set By | Purpose |
| --- | --- | --- | --- |
| `X_LOCALE_CONFIG` | `Ref<Language>` | `XConfigProvider` | i18n object consumed by all components with text |
| `X_ELEMENT_CONFIG` | `ElementConfig` | `install()` | Global component defaults |
| `X_ELEMENT_INSTALLED` | `Symbol` | `install()` | Prevents double registration |
| `X_ELEMENT_IN_TABLE` | `boolean` | `XTable` | Checked by `XButtonAsync`/`XButtonConfirm` for link-style in tables |
| `X_ELEMENT_IN_TABLE_COLUMN` | `boolean` | table columns | _(defined but unused)_ |
| `X_ELEMENT_IN_FORM` | `boolean` | `XForm` | Checked by form children |
| `X_ELEMENT_IN_FORM_ITEM` | `boolean` | `XFormItem` | Checked by form controls |
| `X_ELEMENT_IN_TABS` | `boolean` | `XTabs` | Checked by FormItem for cross-tab validation |
| `X_ELEMENT_IN_TAB_PANE` | `boolean` | `XTabPane` | Checked by FormItem for cross-tab validation |
| `X_FORM_VALIDATIONS` | `XFormItemValidation[]` | `XForm` | Collects validators from all FormItems |
| `X_FORM_ITEM_VALIDATION` | `XFormItemValidation` | `XFormItem` | Single form-control validation context (clearValidate, validate, validator) |
| `X_TAB_PANE_NAME` | `string \| number \| undefined` | `XTabPane` | Current tab name for validation-triggered tab switching |
| `X_TABS_MODEL_UPDATE_HOOK` | `EventHook` | `XTabs` | EventHook that FormItem triggers to switch tabs on validation failure |

### Request Pattern

The core data-fetching abstraction used by all advance request components:

1. **`XRequest`** is a renderless component whose `request` prop is a factory function returning `{ data, execute, isFetching, paging, path, query, url }`. It exposes `search()` (debounced via `useDebounceFn`) which emits `prepare` with `{ path, query }` then calls `execute()`.
2. **Consumer components** (`XTableRequestNext`, `XSelectRequest`, `XCascaderRequest`, `XFormRequestNext`) wrap `XRequest` (or inline its pattern) and pass the reactive state to their child components.
3. **`prepare` event** — emitted before execution so callers can sync `path`/`query` changes to external state (e.g., URL query string).
4. **`paging`** — `{ pageIndex, pageSize, itemCount }` — is managed by paginated consumers and fed into the query for the next request.

### Validation System

Validation flows through three layers:

```
XForm (collects validators)
  └─ XFormItem (registers XFormItemValidation on mount, unregisters on unmount)
       └─ Form control (Input/Select/Cascader/Checkbox/DatePicker/InputNumber/Upload)
            — injects X_FORM_ITEM_VALIDATION
            — on blur/change: calls validation.validate() if required
            — validation.validator is the XFormItem's validator prop
```

- `XFormItem.validate()` runs `validator?.()`, stores the error string, and if in tabs context triggers `X_TABS_MODEL_UPDATE_HOOK` to switch to the failing tab
- `XForm.validate()` calls every FormItem's `validate()` and returns `!errors`
- `XForm.resetFields()` clears all errors via `clearValidate()`

### Localization Pattern

Each locale file merges custom translations into Element Plus's language pack via `Object.assign`:

```ts
import en from 'element-plus/es/locale/lang/en'
Object.assign(en.el, {
  common: { cancel: 'Cancel', confirm: 'Confirm', ... },
  validation: { input: 'Please enter {label}', ... }
})
export { en }
```

`XConfigProvider` provides the locale as `Ref<Language>` via `X_LOCALE_CONFIG`. Components use it via `inject(X_LOCALE_CONFIG)` to call `locale.value.el.common.cancel` etc. Supported locales: `en`, `zhCn`, `ar`, `th`.

### Composable Pattern

`src/composables/useElementConfig.ts` uses `getCurrentInstance()` as a guard before `inject()`:

```ts
const config = getCurrentInstance()
  ? inject(X_ELEMENT_CONFIG, defaultElementConfig)
  : defaultElementConfig
```

This prevents crashes when the composable is called outside Vue's setup context (e.g., in plain `.ts` modules). Follow this pattern for new composables.

### Generic Components

Vue 3.3+ generic components using `<script setup generic="...">`:

- `Table.vue` — `<D>` (single row type)
- `Select.vue` — `<D, V, MV extends V | V[]>` (data item, value, model value)
- `Cascader.vue` — `<D, V, MV extends V | V[]>`
- `XRequest.vue` — `<U, PT, QR, D>` (URL, path, query, data)
- `XTableRequestNext.vue` — `<U, PT, QR, D>`
- `XSelectRequest.vue` — `<U, PT, QR, D, V, MV extends V | V[]>`
- `XCascaderRequest.vue` — `<U, PT, QR, D, V, MV extends V | V[]>`
- `XFormRequestNext.vue` — `<U, PT, QR, D extends object>`

Generic conventions: `U` = URL type, `PT` = Path params, `QR` = Query params, `D` = Data/Row, `V` = Value, `MV` = Model Value.

### TypeScript Configuration

Uses project references: `tsconfig.json` → `tsconfig.app.json` (source), `tsconfig.node.json` (tooling), `tsconfig.test.json` (tests). `vue-tsc` checks against `tsconfig.app.json`. Path alias `@` maps to `./src`.

### Tailwind CSS v4

CSS-based config — no `tailwind.config.ts`. Only `theme` and `utilities` layers are imported (`base` is skipped to avoid conflicting with Element Plus styles). `@source './**/*.vue'` scans Vue files for class usage. The CSS (`src/index.css`) is imported from `src/index.ts` and bundled into `dist/style.css`.

### Build & Lint Details

- **vite.config.ts**: Import names are misleading — `Vue` imports `@vitejs/plugin-vue-jsx` and `VueJsx` imports `@vitejs/plugin-vue`. Uses `rolldownOptions` (Rolldown is Vite 8's bundler).
- **oxlint**: Only `correctness: 'warn'` category; plugins: `typescript`, `import`, `unicorn`, `vue`, `eslint-plugin-perfectionist` (`sort-objects: 'error'`).
- **Pre-commit**: `simple-git-hooks` → `lint-staged` runs `oxlint --fix` on staged `.js/.ts/.vue/.tsx/.jsx` files.

### Testing

Tests live in `test/` and run with Vitest in jsdom environment. Current tests are placeholder stubs covering only `XTable` and `XButton`. Use `npm run test -- path/to/file.test.ts` to run a single test file (watch mode), or `npm run test:ci` for single run.
