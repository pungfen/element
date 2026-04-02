/// <reference types="vitest/config" />
/// <reference types="vite/client" />

import { fileURLToPath, URL } from 'node:url'

import Tailwindcss from '@tailwindcss/vite'
import VueJsx from '@vitejs/plugin-vue'
import Vue from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import Dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => ({
  build: {
    lib: {
      entry: [
        'src/index.ts',
        'src/advance.ts',
        'src/basic.ts',
        'src/locales.ts',
        'src/resolver.ts'
      ],
      formats: ['es', 'cjs'],
      cssFileName: 'style'
    },
    rolldownOptions: {
      external: ['element-plus', 'vue'],
      output: { exports: 'named' }
    },
    sourcemap: mode === 'staging'
  },
  plugins: [Vue(), VueJsx(), Dts({ tsconfigPath: './tsconfig.app.json' }), Tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    environment: 'jsdom'
  }
}))
