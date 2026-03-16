import config from '@antfu/eslint-config'

export default config(
  {
    lessOpinionated: true
  }
).overrideRules(
  {
    'antfu/no-top-level-await': 'off',
    'curly': 'off',
    'no-console': 'off',
    'ts/no-use-before-define': 'off',
    'vue/valid-v-for': 'off',
    'vue/html-self-closing': 'off',
    'vue/return-in-computed-property': 'off',
    'style/comma-dangle': 'error'
  }
)
