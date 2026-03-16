<script setup lang="tsx" generic="V extends string | number">
import type { TabsProps } from 'element-plus'
import { createEventHook } from '@vueuse/core'
import { ElTabs } from 'element-plus'
import { provide } from 'vue'
import { X_ELEMENT_IN_TABS, X_TABS_MODEL_UPDATE_HOOK } from '../constants'

export interface XTabsProps {
  addable?: TabsProps['addable']
  editable?: TabsProps['editable']
  tabPosition?: TabsProps['tabPosition']
  type?: TabsProps['type']
}

defineProps<XTabsProps>()

const model = defineModel<V>()
provide(X_ELEMENT_IN_TABS, true)

const modelUpdateHook = createEventHook()
provide(X_TABS_MODEL_UPDATE_HOOK, modelUpdateHook)
modelUpdateHook.on(value => model.value = value)
</script>

<template>
  <ElTabs
    v-bind="{ addable, editable, tabPosition, type }"
    v-model="model"
  >
    <slot />
  </ElTabs>
</template>
