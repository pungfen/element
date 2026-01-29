import type { App } from 'vue'

import * as Components from './components'

export * from './components'
export * from './constants'

export default {
  install(app: App) {
    Object.entries(Components).forEach(([key, component]) => app.component(key, component))
  }
}
