import { defineConfig } from 'oxfmt'

export default defineConfig({
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  sortImports: {
    order: 'asc',
    groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type'],
    newlinesBetween: true
  },
  sortTailwindcss: true,
  sortPackageJson: {
    sortScripts: true
  },
  jsxSingleQuote: true
})
