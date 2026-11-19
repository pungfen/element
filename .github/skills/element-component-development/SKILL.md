---
name: element-component-development
description: Develop or modify Vue components in this Element Plus wrapper library while preserving its export, registration, typing, style, and validation conventions.
---

# Element Plus Component Development

Use this skill when adding, changing, or reviewing components in `@pungfe/element`.

## Architecture

The library is a typed wrapper over Vue 3 and Element Plus:

```text
src/components/basic  -> focused Element Plus wrappers
src/components/advance -> composed components with request or business behavior
src/basic.ts           -> public basic entry point
src/advance.ts         -> public advanced entry point
src/install.ts         -> Vue plugin and global configuration
src/resolver.ts        -> unplugin-vue-components mappings
src/types.ts           -> shared public types
```

Advanced components may depend on basic components. Basic components must not depend on advanced components.

## Adding or Renaming a Component

Keep all public surfaces synchronized:

1. Add the Vue SFC under `src/components/basic/` or `src/components/advance/`.
2. Export the component and its SFC types from the matching `src/basic.ts` or `src/advance.ts`.
3. If it should be globally installed, verify `src/install.ts` picks it up through the corresponding barrel.
4. Add its resolver mapping in `src/resolver.ts`, including all Element Plus CSS side effects it requires.
5. Add or update the component list in `README.md`.
6. Add a focused test under `__tests__/` and a Playground example when behavior needs manual verification.
7. Add a Changeset for publishable package behavior.

Component names exposed by the package must match the public `X...` export exactly. Do not retain stale `Next` suffixes in documentation or resolver names unless such a component actually exists.

## Component Implementation Conventions

- Use Vue Composition API with `<script setup lang="tsx">`.
- Use `generic="..."` for reusable row, value, or request data types.
- Prefer Element Plus types such as `ButtonProps['type']` rather than duplicating unions.
- Keep the Props surface intentional. A wrapper is not automatically a transparent proxy for every Element Plus prop.
- Place public `Props`, `Events`, and `Config` interfaces in the component SFC so barrel exports include them.
- Use `defineModel` for v-model state.
- Use `defineExpose` for imperative methods that wrap an Element Plus instance.
- Use JSX function components or scoped slot render functions for dynamic table/form content.
- Keep templates readable and use a blank line between sibling tags/blocks, as required by ESLint.

Good expose pattern:

```ts
const table = useTemplateRef('table')

defineExpose({
  clearSelection: () => table.value?.clearSelection(),
  scrollTo: (options: number | ScrollToOptions, yCoord?: number) =>
    table.value?.scrollTo(options, yCoord),
})
```

## Configuration and Injection

Global config is defined by `ElementConfig` and provided by `src/install.ts`.

- Use the existing injection keys from `src/constants/`.
- For component-level defaults, prefer `useXConfig('table' | 'pagination' | 'datePicker')`.
- Let an explicit prop override global configuration.
- Keep `defaultElementConfig` and `defaultConfig` behavior aligned when touching either configuration helper.

Example:

```ts
const config = useXConfig('table')
const effectiveFit = computed(() => fit ?? config.value?.fit)
```

## Resolver and CSS

Any component intended for automatic import must exist in `XBasicResolve` or `XAdvanceResolve`.

Include:

- the Element Plus base style;
- every component style directly used by the implementation;
- styles used by nested Element Plus components when the public component requires them.

A resolver entry with a missing CSS side effect can render an unstyled component even when TypeScript and tests pass.

## Validation

Run the smallest relevant checks, then the package checks when public surfaces change:

```bash
pnpm lint
pnpm typecheck
pnpm test --run
pnpm build
pnpm -C __play__ build
```

Before building the Playground, build the library first because it imports `@pungfe/element/resolver` from the generated `dist/` entry.
