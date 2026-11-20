<script setup lang="tsx">
import type { DialogProps } from 'element-plus'
import type { VNodeChild } from 'vue'

import { ElDialog } from 'element-plus'

export type XDialogProps = DialogProps

const props = withDefaults(defineProps<XDialogProps>(), {
  alignCenter: undefined,
  appendToBody: undefined,
  center: undefined,
  closeOnClickModal: undefined,
  closeOnPressEscape: undefined,
  destroyOnClose: undefined,
  draggable: undefined,
  fullscreen: undefined,
  lockScroll: undefined,
  modal: undefined,
  modalPenetrable: undefined,
  overflow: undefined,
  showClose: undefined,
  trapFocus: undefined,
})

defineSlots<{
  default?: () => VNodeChild
  footer?: () => VNodeChild
  header?: () => VNodeChild
}>()

const visible = defineModel<boolean>()
</script>

<template>
  <ElDialog
    v-bind="props"
    v-model="visible"
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
