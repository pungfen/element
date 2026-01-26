<script setup lang="ts">
import type { TagProps } from 'element-plus'
import { ElTag } from 'element-plus'

export interface XTagProps {
  type?: TagProps['type']
  color?: TagProps['color']
  closable?: TagProps['closable']
  round?: TagProps['round']
}

const { closable = undefined, round = undefined } = defineProps<XTagProps>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <ElTag v-bind="{ type, color, closable, round }" @close="$emit('close')">
    <slot></slot>
  </ElTag>
</template>
