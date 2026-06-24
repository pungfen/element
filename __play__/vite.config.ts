import Element from '@pungfe/element/resolver'
import Tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import { VueRouterAutoImports } from 'vue-router/unplugin'
import VueRouter from 'vue-router/vite'

export default defineConfig({
  plugins: [
    VueRouter(),
    Vue(),
    vueJsx(),
    Tailwindcss(),
    AutoImport({
      dirs: ['./src', './src/composables'],
      imports: ['vue', '@vueuse/core', VueRouterAutoImports, { from: 'vue-component-type-helpers', imports: ['ComponentExposed'], type: true }],
      resolvers: [ElementPlusResolver(), Element({ advance: true })],
    }),
    Components({ resolvers: [IconsResolver({ enabledCollections: ['ep'] }), ElementPlusResolver(), Element({ advance: true })] }),
    Icons({ autoInstall: true }),
    VueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 8080,
  },
})
