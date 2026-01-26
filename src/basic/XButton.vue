<script setup lang="ts">
import type { ButtonProps } from 'element-plus'
import { ElButton } from 'element-plus'

export interface XButtonProps extends Partial<ButtonProps> {}
const props = withDefaults(defineProps<XButtonProps>(), { disabled: undefined })

const emit = defineEmits<{
  click: [e: MouseEvent]
}>()
</script>

<template>
  <ElButton v-bind="props" @click="emit('click', $event)">
    <slot></slot>
  </ElButton>
</template>
