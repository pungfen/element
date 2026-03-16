import VueJsx from '@vitejs/plugin-vue'
import Vue from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

import Dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: ['./src/index.ts', './src/resolver.ts']
    },
    rolldownOptions: {
      external: ['element-plus', 'vue'],
      output: [
        {
          format: 'esm',
          dir: 'dist/es',
          cleanDir: true
        },
        {
          format: 'cjs',
          dir: 'dist/cjs',
          cleanDir: true
        }
      ]
    }
  },
  plugins: [
    Vue(),
    VueJsx(),
    Dts({ tsconfigPath: './tsconfig.app.json', outDir: 'dist/types' })
  ]
})
