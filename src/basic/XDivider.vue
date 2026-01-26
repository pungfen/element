<script setup lang="ts">
import type { DividerProps } from 'element-plus'
import { ElDivider } from 'element-plus'

export interface XDividerProps extends Partial<DividerProps> {}

const props = defineProps<XDividerProps>()
</script>

<template>
  <ElDivider v-bind="props">
    <slot></slot>
  </ElDivider>
</template>
