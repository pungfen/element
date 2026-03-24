import type { App, Component } from 'vue'
import type { ElementConfig } from '@/types'

import { vLoading } from 'element-plus'

import * as advances from '@/components/advance'
import * as basics from '@/components/basic'

import { X_ELEMENT_CONFIG } from '@/constants'

const defaultElementConfig: ElementConfig = {
  button: {
    autoInsertSpace: false
  },
  table: {
    showOverflowTooltip: false
  }
}

const mergeElementConfig = (config: ElementConfig = {}): ElementConfig => {
  return {
    button: { ...defaultElementConfig.button, ...config.button },
    table: { ...defaultElementConfig.table, ...config.table }
  }
}

export const install = (app: App, options?: { advance?: boolean, config?: ElementConfig }) => {
  app.provide(X_ELEMENT_CONFIG, mergeElementConfig(options?.config))

  app.directive('v-loading', vLoading)

  Object.entries(basics).forEach(([name, component]) => {
    app.component(name, component as Component)
  })

  if (options?.advance) {
    Object.entries(advances).forEach(([name, component]) => {
      app.component(name, component as Component)
    })
  }
}
