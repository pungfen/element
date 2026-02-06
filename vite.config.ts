import Vue from '@vitejs/plugin-vue'

import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import Dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: ['src/index.ts', './src/resolver.ts'],
      fileName: (_, name) => `${name}.mjs`,
      formats: ['es']
    },
    rollupOptions: {
      external: ['element-plus', 'vue'],
      output: {
        manualChunks(id) {
          if (/node_modules/.test(id)) {
            return 'vendor'
          }
        }
      }
    }
  },
  plugins: [
    Vue(),
    VueJsx(),
    Dts({ tsconfigPath: './tsconfig.app.json' })
  ]
})
