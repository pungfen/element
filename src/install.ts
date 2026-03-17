import type { App, Component } from 'vue'

import * as components from '@/components'

export const install = (app: App) => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component as Component)
  })
}
