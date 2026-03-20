<script setup lang="tsx">
import type { ButtonProps, ButtonType } from 'element-plus'

import { ElButton } from 'element-plus'

export interface XButtonProps {
  disabled?: ButtonProps['disabled']
  link?: ButtonProps['link']
  size?: ButtonProps['size']
  text?: ButtonProps['text']
  type?: ButtonProps['type']
  icon?: ButtonProps['icon']
}

export type XButtonType = ButtonType

const { disabled = undefined, link = undefined } = defineProps<XButtonProps>()

const emit = defineEmits<{
  click: [e: MouseEvent]
}>()
</script>

<template>
  <ElButton
    v-bind="{ type, text, link, disabled, size, icon }"
    @click="emit('click', $event)"
  >
    <slot />
  </ElButton>
</template>
