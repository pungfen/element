import { fileURLToPath, URL } from 'node:url'

import VueJsx from '@vitejs/plugin-vue'
import Vue from '@vitejs/plugin-vue-jsx'
import fg from 'fast-glob'
import { defineConfig } from 'vite'
import Dts from 'vite-plugin-dts'

const components = (await fg('src/components/*.vue', { cwd: fileURLToPath(new URL('./', import.meta.url)) }))
const locales = (await fg('src/locales/*.ts', { cwd: fileURLToPath(new URL('./', import.meta.url)) }))

export default defineConfig({
  build: {
    lib: {
      entry: ['src/index.ts', ...components, ...locales]
    },
    rollupOptions: {
      external: ['element-plus', 'vue'],
      output: [
        {
          format: 'esm',
          dir: 'dist/es',
          entryFileNames: '[name].js',
          cleanDir: true
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          entryFileNames: '[name].cjs',
          cleanDir: true
        }
      ]
    }
  },
  plugins: [
    Vue(),
    VueJsx(),
    Dts({ tsconfigPath: './tsconfig.app.json', outDir: 'dist/types' })
  ],
  resolve: {
    tsconfigPaths: true
  }
})
