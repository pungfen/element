import { vLoading } from 'element-plus'

import * as advances from '@/advance'
import * as basics from '@/basic'
import { X_ELEMENT_CONFIG, X_ELEMENT_INSTALLED } from '@/constants'

import type { ElementConfig } from '@/types'
import type { App, Component } from 'vue'

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
    table: { ...defaultElementConfig.table, ...config.table },
    oss: config.oss
  }
}

declare module 'vue' {
  export interface App {
    [X_ELEMENT_INSTALLED]: boolean
  }
}

export const install = (app: App, options: { advance?: boolean; config?: ElementConfig } = {}) => {
  if (app[X_ELEMENT_INSTALLED]) return
  app[X_ELEMENT_INSTALLED] = true

  app.provide(X_ELEMENT_CONFIG, mergeElementConfig(options.config))

  app.directive('loading', vLoading)

  Object.entries({
    ...basics,
    ...(options.advance ? advances : {})
  }).forEach(([name, component]) => app.component(name, component as Component))
}
