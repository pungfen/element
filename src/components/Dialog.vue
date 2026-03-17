<script setup lang="tsx">
import type { DialogProps } from 'element-plus'

import type { VNodeChild } from 'vue'
import { ElDialog } from 'element-plus'

export interface XDialogProps {
  bodyClass?: DialogProps['bodyClass']
  width?: DialogProps['width']
  showClose?: DialogProps['showClose']
  title?: DialogProps['title']
  center?: DialogProps['center']
  alignCenter?: DialogProps['alignCenter']
  draggable?: DialogProps['draggable']
  closeOnClickModal?: DialogProps['closeOnClickModal']
  closeOnPressEscape?: DialogProps['closeOnPressEscape']
}

defineProps<XDialogProps>()
defineSlots<{
  default?: () => VNodeChild
  header?: () => VNodeChild
  footer?: () => VNodeChild
}>()
const visible = defineModel<boolean>()
</script>

<template>
  <ElDialog
    v-model="visible" v-bind="{
      bodyClass,
      width,
      showClose,
      title,
      center,
      alignCenter,
      draggable,
      closeOnClickModal,
      closeOnPressEscape,
    }"
  >
    <template v-if="'header' in $slots" #header>
      <slot name="header"></slot>
    </template>
    <slot></slot>
    <template v-if="'footer' in $slots" #footer>
      <slot name="footer"></slot>
    </template>
  </ElDialog>
</template>
