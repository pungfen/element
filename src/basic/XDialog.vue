<script setup lang="tsx">
import type { Component } from 'vue'
import { ElDialog } from 'element-plus'

export interface XDialogProps {
  title?: string
  bodyClass?: string
}

defineProps<XDialogProps>()

const { header, footer } = defineSlots<{
  default?: () => Component
  header?: () => Component
  footer?: () => Component
}>()
const model = defineModel<boolean>()
</script>

<template>
  <ElDialog
    v-model="model"
    :title="title"
    :body-class="`flex flex-col ${bodyClass}`"
  >
    <template v-if="header" #header>
      <slot name="header"></slot>
    </template>
    <slot></slot>
    <template v-if="footer" #footer>
      <slot name="footer"></slot>
    </template>
  </ElDialog>
</template>
