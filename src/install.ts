import type { App, Component } from 'vue'

import * as advances from '@/components/advance'
import * as basics from '@/components/basic'

export const install = (app: App, options?: { advance?: boolean }) => {
  Object.entries(basics).forEach(([name, component]) => {
    app.component(name, component as Component)
  })

  if (options?.advance) {
    Object.entries(advances).forEach(([name, component]) => {
      app.component(name, component as Component)
    })
  }
}
