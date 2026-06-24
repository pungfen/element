/// <reference types="vitest/config" />

import Tailwindcss from '@tailwindcss/vite'
import VueJsx from '@vitejs/plugin-vue'
import Vue from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import Dts from 'unplugin-dts/vite'
import { defineConfig } from 'vite'

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
  plugins: [Vue(), VueJsx(), Dts({ entryRoot: 'src', tsconfigPath: './tsconfig.src.json' }), Tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: { environment: 'happy-dom' },
}))
