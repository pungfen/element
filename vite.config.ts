import Tailwindcss from '@tailwindcss/vite'
import VueJsx from '@vitejs/plugin-vue'
import Vue from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import Dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      cssFileName: 'style',
      entry: [
        'src/index.ts',
        'src/advance.ts',
        'src/basic.ts',
        'src/locales.ts',
        'src/resolver.ts',
      ],
      formats: ['es', 'cjs'],
    },
    rolldownOptions: {
      external: ['element-plus', 'vue'],
      output: { exports: 'named' },
    },
    sourcemap: mode === 'staging',
  },
  plugins: [Vue(), VueJsx(), Dts({ tsconfigPath: './tsconfig.src.json' }), Tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}))
