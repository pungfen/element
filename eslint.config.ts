import config from '@antfu/eslint-config'

export default config(
  {
    typescript: true,
    vue: true,
    lessOpinionated: true,
    stylistic: true,
    formatters: true
  }
).overrideRules(
  {
    'antfu/no-top-level-await': 'off',
    'curly': 'off',
    'no-console': 'off',
    'ts/no-use-before-define': 'off',
    'vue/html-self-closing': 'off',
    'vue/return-in-computed-property': 'off',
    'style/comma-dangle': 'error'
  }
)
