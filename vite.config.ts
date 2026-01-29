import Vue from '@vitejs/plugin-vue'

import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import Dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: ['src/index.ts', 'src/resolver.ts'],
      fileName: (_, name) => `${name}.js`,
      formats: ['es']
    },
    minify: true,
    rollupOptions: {
      external: ['element-plus', 'vue']
    }
  },
  plugins: [
    Vue(),
    VueJsx(),
    Dts({ tsconfigPath: './tsconfig.app.json' })
  ]
})
