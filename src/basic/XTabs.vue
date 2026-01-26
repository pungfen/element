<script lang="tsx">
import type { TabPaneProps, TabsProps } from 'element-plus'
import { ElTabPane, ElTabs } from 'element-plus'

import { defineComponent, inject, provide } from 'vue'

import { X_TAB_PANE, X_TAB_PANES } from '../constants'

export interface XTabPaneProps extends Partial<TabPaneProps> {}

export interface XTabPaneInstance extends Pick<
  XTabPaneProps,
  'label' | 'name'
> {}

export const XTabPane = defineComponent(
  (props: XTabPaneProps, { slots }) => {
    const instance: XTabPaneInstance = {
      ...props
    }

    const panes = inject(X_TAB_PANES, undefined)
    panes?.push(instance)

    provide(X_TAB_PANE, instance)

    return () => <ElTabPane {...props}>{{ ...slots }}</ElTabPane>
  },
  {
    props: ['label', 'name', 'closable', 'lazy', 'disabled']
  }
)
</script>

<script setup lang="tsx" generic="V extends string | number">
export interface XTabsProps {
  type?: TabsProps['type']
  defaultValue?: TabsProps['defaultValue']
  addable?: TabsProps['addable']
  editable?: TabsProps['editable']
  tabPosition?: TabsProps['tabPosition']
}

const { addable = undefined, editable = undefined } = defineProps<XTabsProps>()

const emit = defineEmits<{
  tabChange: [name: V]
  tabRemove: [name: V]
}>()

const model = defineModel<V>()

const panes = [] as XTabPaneInstance[]
provide(X_TAB_PANES, panes)
</script>

<template>
  <ElTabs
    v-bind="{ addable, editable, type, defaultValue, tabPosition }"
    v-model="model"
    @tab-change="(name) => emit('tabChange', name as V)"
    @tab-remove="(name) => emit('tabRemove', name as V)"
  >
    <slot></slot>
  </ElTabs>
</template>
