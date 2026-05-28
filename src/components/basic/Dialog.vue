<script setup lang="tsx">
import type { DialogProps } from 'element-plus'
import type { VNodeChild } from 'vue'

import { ElDialog } from 'element-plus'

export interface XDialogProps {
  alignCenter?: DialogProps['alignCenter']
  bodyClass?: DialogProps['bodyClass']
  center?: DialogProps['center']
  closeOnClickModal?: DialogProps['closeOnClickModal']
  closeOnPressEscape?: DialogProps['closeOnPressEscape']
  draggable?: DialogProps['draggable']
  showClose?: DialogProps['showClose']
  title?: DialogProps['title']
  width?: DialogProps['width']
}

const {
  closeOnClickModal = undefined,
  closeOnPressEscape = undefined,
  showClose = undefined,
} = defineProps<XDialogProps>()
defineSlots<{
  default?: () => VNodeChild
  footer?: () => VNodeChild
  header?: () => VNodeChild
}>()
const visible = defineModel<boolean>()
</script>

<template>
  <ElDialog
    v-model="visible"
    v-bind="{
      bodyClass,
      width,
      showClose,
      title,
      center,
      alignCenter,
      draggable,
      closeOnClickModal,
      closeOnPressEscape
    }"
  >
    <template
      v-if="'header' in $slots"
      #header
    >
      <slot name="header" />
    </template>
    <slot />
    <template
      v-if="'footer' in $slots"
      #footer
    >
      <slot name="footer" />
    </template>
  </ElDialog>
</template>
