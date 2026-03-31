import { fileURLToPath, URL } from 'node:url'

import Tailwindcss from '@tailwindcss/vite'
import VueJsx from '@vitejs/plugin-vue'
import Vue from '@vitejs/plugin-vue-jsx'
import fg from 'fast-glob'
import { defineConfig } from 'vite'
import Dts from 'vite-plugin-dts'

const basic = (await fg('src/components/basic/*.vue', { cwd: fileURLToPath(new URL('./', import.meta.url)) }))
const advance = (await fg('src/components/advance/*.vue', { cwd: fileURLToPath(new URL('./', import.meta.url)) }))
const locales = (await fg('src/locales/*.ts', { cwd: fileURLToPath(new URL('./', import.meta.url)) }))

export default defineConfig({
  build: {
    lib: {
      entry: [
        'src/resolver.ts',
        'src/index.ts',
        'src/advance.ts',
        'src/style.ts',
        ...basic,
        ...advance,
        ...locales
      ]
    },
    rolldownOptions: {
      external: ['element-plus', 'vue'],
      output: [
        {
          format: 'esm',
          dir: 'dist/es',
          entryFileNames: '[name].js',
          cleanDir: true,
          exports: 'named'
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          entryFileNames: '[name].cjs',
          cleanDir: true,
          exports: 'named'
        }
      ]
    },
    sourcemap: true
  },
  plugins: [
    Vue(),
    VueJsx(),
    Dts({ tsconfigPath: './tsconfig.build.json', outDir: 'dist/types' }),
    Tailwindcss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
