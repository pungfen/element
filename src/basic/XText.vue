<script setup lang="ts">
import type { TextProps } from 'element-plus'
import { ElText } from 'element-plus'

export interface XTextProps {
  type?: TextProps['type']
  size?: TextProps['size']
  truncated?: boolean
}

const { truncated = undefined } = defineProps<XTextProps>()
</script>

<template>
  <ElText v-bind="{ type, size, truncated }">
    <slot></slot>
  </ElText>
</template>
