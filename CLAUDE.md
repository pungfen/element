# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

@pungfe/element is a Vue 3 component library that wraps Element Plus components with custom implementations. Components are prefixed with "X" (XButton, XForm, XInput, etc.) and re-exported from Element Plus.

## Common Commands

```bash
npm run build      # Build ESM and CJS bundles to dist/
npm run lint       # Run ESLint with auto-fix
npm run typecheck  # TypeScript type checking
npm run release    # Build and bump version (uses bumpp)
```

## Architecture

- **Source**: `src/` contains all components in `src/components/`
- **Entry**: `src/index.ts` exports components and locales
- **Resolver**: `src/resolver.ts` provides unplugin-vue-components resolver for auto-importing components with their Element Plus side effects
- **Locales**: `src/locales/` contains i18n files (en, zh-cn)

## Build Output

Vite builds to `dist/` with:
- `dist/es/` - ESM modules
- `dist/cjs/` - CommonJS modules
- `dist/types/` - TypeScript declarations

## Dependencies

Peer dependencies: `element-plus@^2.13.1`, `vue@^3.5.27`

## CI/CD

- GitHub Actions runs lint, typecheck, and build on PRs to main branch
- Releases are triggered by version tags (v*) and publish to npm
