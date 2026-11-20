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

export type XButtonProps = ButtonProps

const props = withDefaults(defineProps<XButtonProps>(), {
  autofocus: undefined,
  autoInsertSpace: undefined,
  bg: undefined,
  circle: undefined,
  dark: undefined,
  dashed: undefined,
  disabled: undefined,
  link: undefined,
  loading: undefined,
  plain: undefined,
  round: undefined,
  text: undefined,
})

defineEmits<{ click: [e: MouseEvent] }>()
</script>

<template>
  <ElButton
    v-bind="props"
    @click="$emit('click', $event)"
  >
    <slot />
  </ElButton>
</template>
