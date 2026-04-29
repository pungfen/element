import { getCurrentInstance, inject, type MaybeRef } from 'vue'

import type { ElementConfig } from '@/types'

import { X_ELEMENT_CONFIG } from '@/constants'

export const defaultElementConfig: ElementConfig = {
  button: {
    autoInsertSpace: false
  },
  datePicker: {},
  pagination: {
    layout: 'prev, pager, next, sizes, jumper, ->, total'
  },
  table: {
    showOverflowTooltip: false
  }
}

export const mergeElementConfig = (config: ElementConfig = {}): ElementConfig => {
  return {
    button: { ...defaultElementConfig.button, ...config.button },
    datePicker: { ...defaultElementConfig.datePicker, ...config.datePicker },
    oss: config.oss,
    pagination: { ...defaultElementConfig.pagination, ...config.pagination },
    table: { ...defaultElementConfig.table, ...config.table }
  }
}

export const provideElementConfig = (config: MaybeRef<ElementConfig>) => {
  console.log(config)
}

export const useElementConfig = () => {
  const config = getCurrentInstance()
    ? inject(X_ELEMENT_CONFIG, defaultElementConfig)
    : defaultElementConfig

  return { config }
}
