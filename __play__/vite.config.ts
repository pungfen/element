import Element from '@pungfe/element/resolver'
import Tailwindcss from '@tailwindcss/vite'
import Vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Mock from 'mockjs'
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
    {
      configureServer: ({ middlewares }) => {
        middlewares.use('/api', (req, res, next) => {
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200
          const url = `${req.method?.toUpperCase() ?? 'GET'} ${req.url}`
          switch (url) {
            case 'GET /api/user':
              res.end(JSON.stringify(Mock.mock({
                'confirmations': [],
                'data|20': [
                  {
                    'address': '@province @city',
                    'age': '@integer(1, 80)',
                    'comment': '@csentence',
                    'id|+1': 1,
                    'name': '@cname',
                    'preparedDatetime': `@datetime('yyyy-MM-dd HH:mm:ss')`,
                    'sex': {
                      code: '@string("MW")',
                      message: '@string("男女")',
                      type: '',
                    },
                  },
                ],
                'errors': [],
                'meta': {
                  sessionKeys: [],
                },
                'warnings': [],
              })))
              break
            case 'GET /api/user/:userId':
              break
          }
          next()
        })
      },

      name: 'pungfe:mock',
    },
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
