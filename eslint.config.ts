import stylistic from '@stylistic/eslint-plugin'
import perfectionist from 'eslint-plugin-perfectionist'
import vue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import ts from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

const vueTsConfig = defineConfig(
  // vue/base/setup
  // vue/base/setup-for-vue
  // vue/essential/rules
  // vue/strongly-recommended/rules
  // vue/recommended/rules
  vue.configs['flat/base'],
  // typescript-eslint/base
  // typescript-eslint/eslint-recommended
  // typescript-eslint/recommended-type-checked
  ts.configs.recommendedTypeChecked,
  // typescript-eslint/base
  // typescript-eslint/eslint-recommended
  // typescript-eslint/stylistic-type-checked
  ts.configs.stylisticTypeChecked,

  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2024,
        extraFileExtensions: ['.vue'],
        parser: {
          js: 'espree',
          jsx: 'espree',
          ts: ts.parser,
          tsx: ts.parser,
        },
        sourceType: 'module',
      },
    },
    name: 'vue/typescript/setup',
    rules: {
      'vue/block-lang': ['error', { script: { allowNoLang: false, lang: ['tsx'] } }],
    },
  },
  {
    extends: [ts.configs.disableTypeChecked],
    // lang="tsx" file
    files: ['**/*.vue'],
    name: 'typescript-eslint/disable-type-checked',
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        projectService: true,
      },
    },
    name: 'vue/typescript/default-project-service-for-ts-files',
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    name: 'vue/typescript/type-aware-rules-in-conflict-with-vue',
    rules: {
      // Would error on `createApp(App)`
      '@typescript-eslint/no-unsafe-argument': 'off',
      // Would error on route component configuration
      '@typescript-eslint/no-unsafe-assignment': 'off',
      // Might error on `defineExpose` + `useTemplateRef` usages
      '@typescript-eslint/no-unsafe-call': 'off',

      '@typescript-eslint/no-unsafe-member-access': 'off',
      // Would error on async components
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
  {
    files: ['**/*.{ts,vue}'],
    name: 'overrides',
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
).map(
  (it) => {
    if (it.files && it.name === 'typescript-eslint/eslint-recommended') {
      it.files = [...it.files, '**/*.vue']
    }
    return it
  },
)

export default defineConfig(
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
  },
  {
    ignores: ['**/dist/**'],
  },
  vueTsConfig,
  stylistic.configs.recommended,
  perfectionist.configs['recommended-natural'],
)
