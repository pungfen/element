<script setup lang="tsx">
import { ElTabPane } from 'element-plus'
import { provide } from 'vue'

import { X_ELEMENT_IN_TAB_PANE, X_TAB_PANE_NAME } from '@/constants'

import type { TabPaneProps } from 'element-plus'

export interface XTabPaneConfig {
  label?: string
  name?: number | string
}

export interface XTabPaneProps {
  closable?: TabPaneProps['closable']
  disabled?: TabPaneProps['disabled']
  label?: TabPaneProps['label']
  lazy?: TabPaneProps['lazy']
  name?: TabPaneProps['name']
}

const { label, name } = defineProps<XTabPaneProps>()

const pane = { label, name }

defineExpose({ ...pane })

provide(X_ELEMENT_IN_TAB_PANE, true)
provide(X_TAB_PANE_NAME, name)
</script>

<template>
  <ElTabPane v-bind="{ label, name, disabled, closable, lazy }">
    <slot />
  </ElTabPane>
</template>
