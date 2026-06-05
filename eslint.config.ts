import stylistic from '@stylistic/eslint-plugin'
import { configureVueProject, defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import perfectionist from 'eslint-plugin-perfectionist'
import vue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'
import { writeFileSync } from 'node:fs'
import ts from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

configureVueProject({ scriptLangs: ['ts', 'tsx'] })
const vueConfig = defineConfigWithVueTs(
  vue.configs['flat/recommended'],
  vueTsConfigs.recommendedTypeChecked,
)

const myConfig = defineConfig(
  vue.configs['flat/recommended'],
  ts.configs.recommendedTypeChecked,
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2024,
        extraFileExtensions: ['.vue'],
        parset: {
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
      'vue/block-lang': ['error', { script: { allowNoLang: false, lang: ['ts', 'tsx'] } }],
    },
  },
  {
    files: [
      'src/components/advance/XCascaderRequest.vue',
    ],
    languageOptions: {
      parserOptions: {
        project: false,
        projectService: false,
      },
    },
    name: 'typescript-eslint/disable-type-checked',
    rules: {
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/consistent-return': 'off',
      '@typescript-eslint/consistent-type-exports': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-array-delete': 'off',
      '@typescript-eslint/no-base-to-string': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-deprecated': 'off',
      '@typescript-eslint/no-duplicate-type-constituents': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-for-in-array': 'off',
      '@typescript-eslint/no-implied-eval': 'off',
      '@typescript-eslint/no-meaningless-void-operator': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-misused-spread': 'off',
      '@typescript-eslint/no-mixed-enums': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unnecessary-qualifier': 'off',
      '@typescript-eslint/no-unnecessary-template-expression': 'off',
      '@typescript-eslint/no-unnecessary-type-arguments': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/no-unnecessary-type-conversion': 'off',
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-type-assertion': 'off',
      '@typescript-eslint/no-unsafe-unary-minus': 'off',
      '@typescript-eslint/no-useless-default-assignment': 'off',
      '@typescript-eslint/non-nullable-type-assertion-style': 'off',
      '@typescript-eslint/only-throw-error': 'off',
      '@typescript-eslint/prefer-destructuring': 'off',
      '@typescript-eslint/prefer-find': 'off',
      '@typescript-eslint/prefer-includes': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/prefer-optional-chain': 'off',
      '@typescript-eslint/prefer-promise-reject-errors': 'off',
      '@typescript-eslint/prefer-readonly': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      '@typescript-eslint/prefer-reduce-type-parameter': 'off',
      '@typescript-eslint/prefer-regexp-exec': 'off',
      '@typescript-eslint/prefer-return-this-type': 'off',
      '@typescript-eslint/prefer-string-starts-ends-with': 'off',
      '@typescript-eslint/promise-function-async': 'off',
      '@typescript-eslint/related-getter-setter-pairs': 'off',
      '@typescript-eslint/require-array-sort-compare': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/return-await': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/strict-void-return': 'off',
      '@typescript-eslint/switch-exhaustiveness-check': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.mts',
    ],
    languageOptions: {
      parser: ts.parser,
      parserOptions: {
        extraFileExtensions: ['.vue'],
        projectService: true,
      },
    },
    name: 'vue/typescript/default-project-service-for-ts-files',
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.vue'],
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
    languageOptions: {
      files: [
        'src/components/advance/XButtonAsync.vue',
        'src/components/advance/XButtonConfirm.vue',
        'src/components/advance/XUploadOssNext.vue',
      ],
      parser: vueParser,
      parserOptions: {
        extraFileExtensions: ['.vue'],
        parser: ts.parser,
        projectService: true,
      },
    },
    name: 'vue/typescript/default-project-service-for-vue-files',
  },
)

export default defineConfig(
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
  },
  {
    ignores: ['**/dist/**'],
  },
  stylistic.configs.recommended,
  perfectionist.configs['recommended-alphabetical'],
)
