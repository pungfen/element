<script setup lang="tsx">
import type { ButtonProps } from 'element-plus'

import { ElButton } from 'element-plus'

export interface XButtonConfig {
  /**
   * 两个中文字符之间自动插入空格(仅当文本长度为 2 且所有字符均为中文时才生效)
   * @default false
   */
  autoInsertSpace?: boolean
}

export interface XButtonProps {
  disabled?: ButtonProps['disabled']
  link?: ButtonProps['link']
  size?: ButtonProps['size']
  text?: ButtonProps['text']
  type?: ButtonProps['type']
  icon?: ButtonProps['icon']
}

const { disabled = undefined, link = undefined } = defineProps<XButtonProps>()

const emit = defineEmits<{
  click: [e: MouseEvent]
}>()
</script>

<template>
  <ElButton v-bind="{ type, text, link, disabled, size, icon }" @click="emit('click', $event)">
    <slot />
  </ElButton>
</template>
