import { defineConfig } from 'oxlint'

export default defineConfig({
  plugins: ['typescript', 'import', 'unicorn', 'vue'],
  ignorePatterns: ['node_modules', 'dist', '*.config.*']
})
