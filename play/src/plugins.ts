import { createMemoryHistory, createRouter } from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

if (import.meta.hot) {
  handleHotUpdate(router)
}
