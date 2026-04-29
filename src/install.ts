import type { App, Component } from 'vue'

import { vLoading } from 'element-plus'

import type { ElementConfig } from '@/types'

import * as advances from '@/advance'
import * as basics from '@/basic'
import { mergeElementConfig } from '@/composables/useElementConfig'
import { X_ELEMENT_CONFIG, X_ELEMENT_INSTALLED } from '@/constants'

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
