<script setup lang="tsx">
import type { DialogProps } from 'element-plus'

import type { VNode } from 'vue'
import { ElDialog } from 'element-plus'

export interface XDialogProps {
  bodyClass?: DialogProps['bodyClass']
  width?: DialogProps['width']
  showClose?: DialogProps['showClose']
  title?: DialogProps['title']
  center?: DialogProps['center']
  alignCenter?: DialogProps['alignCenter']
  draggable?: DialogProps['draggable']
}

defineProps<XDialogProps>()
defineSlots<{
  default?: () => VNode
  header?: () => VNode
  footer?: () => VNode
}>()
const visible = defineModel<boolean>()
</script>

<template>
  <ElDialog v-model="visible" v-bind="{ bodyClass, width, showClose, title, center, alignCenter, draggable }">
    <template v-if="'header' in $slots" #header>
      <slot name="header"></slot>
    </template>
    <slot></slot>
    <template v-if="'footer' in $slots" #footer>
      <slot name="footer"></slot>
    </template>
  </ElDialog>
</template>
