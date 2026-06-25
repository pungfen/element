import { computedInject } from '@vueuse/core'

import type { ElementConfig } from '@/types'

import { X_ELEMENT_CONFIG } from '@/constants'

export const defaultConfig: ElementConfig = {
  button: {
    autoInsertSpace: false,
  },
  datePicker: {
    valueFormat: 'YYYY-MM-DD',
  },
  pagination: {
    defaultPageSize: 20,
    layout: 'prev, pager, next, sizes, jumper, ->, total',
  },
  table: {
    showOverflowTooltip: false,
  },
}

export const useXConfig = <K extends keyof ElementConfig>(key: K) => computedInject(X_ELEMENT_CONFIG, config => config[key], defaultConfig)
