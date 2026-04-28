<script setup lang="tsx" generic="V extends string | number">
import type { TabsProps } from 'element-plus'

import { createEventHook } from '@vueuse/core'
import { ElTabs } from 'element-plus'
import { type VNodeChild } from 'vue'
import { provide } from 'vue'

import { X_ELEMENT_IN_TABS, X_TABS_MODEL_UPDATE_HOOK } from '@/constants'

export interface XTabsProps {
  addable?: TabsProps['addable']
  editable?: TabsProps['editable']
  tabPosition?: TabsProps['tabPosition']
  type?: TabsProps['type']
}
export interface XTabsEvents<V> {
  change: [name: V]
  remove: [name: V]
  edit: [name: V, action: 'remove' | 'add']
}

defineProps<XTabsProps>()
defineEmits<XTabsEvents<V>>()

defineSlots<{
  default: () => VNodeChild
  addIcon: () => VNodeChild
}>()

const model = defineModel<V>()
provide(X_ELEMENT_IN_TABS, true)

const modelUpdateHook = createEventHook()
provide(X_TABS_MODEL_UPDATE_HOOK, modelUpdateHook)
modelUpdateHook.on((value) => (model.value = value))
</script>

<template>
  <ElTabs
    v-bind="{ addable, editable, tabPosition, type }"
    v-model="model"
    @tab-change="$emit('change', $event as V)"
    @tab-remove="$emit('remove', $event as V)"
    @edit="(paneName, action) => $emit('edit', paneName as V, action)"
  >
    <slot></slot>

    <template v-if="'addIcon' in $slots" #add-icon>
      <slot name="addIcon" />
    </template>
  </ElTabs>
</template>
