import json from '@eslint/json'
import stylistic from '@stylistic/eslint-plugin'
import { configureVueProject, defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import perfectionist from 'eslint-plugin-perfectionist'
import vue from 'eslint-plugin-vue'

configureVueProject({ scriptLangs: ['ts', 'tsx'] })

export default defineConfigWithVueTs(
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
  },
  {
    ignores: ['**/dist/**'],
  },
  {
    files: ["**/tsconfig.json", ".vscode/*.json"],
    plugins: { json },
    language: "json/jsonc",
    languageOptions: {
			allowTrailingCommas: true,
		},
    extends: ["json/recommended"]
  },
  vue.configs['flat/essential'],
  vueTsConfigs.recommended,
  stylistic.configs.recommended,
  perfectionist.configs['recommended-alphabetical'],
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/valid-v-for': 'off',
      'json/sort-keys': 'error'
    },
  },
)
