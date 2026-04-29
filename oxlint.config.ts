import { defineConfig } from 'oxlint'

export default defineConfig({
  categories: {
    correctness: 'warn'
  },
  globals: {
    computed: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    defineProps: 'readonly',
    onMounted: 'readonly',
    onUnmounted: 'readonly',
    reactive: 'readonly',
    ref: 'readonly',
    shallowReactive: 'readonly',
    shallowRef: 'readonly',
    toRef: 'readonly',
    toRefs: 'readonly',
    watch: 'readonly',
    watchEffect: 'readonly'
  },
  plugins: ['typescript', 'import', 'unicorn', 'vue'],
  ignorePatterns: ['node_modules', 'dist', '*.config.*'],
  jsPlugins: ['eslint-plugin-perfectionist'],
  rules: {
    'perfectionist/sort-objects': 'error'
  }
})
