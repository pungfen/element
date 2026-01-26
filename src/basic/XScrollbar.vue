<script setup lang="tsx">
import type { ScrollbarProps } from 'element-plus'
import { ElScrollbar } from 'element-plus'
import { computed, useTemplateRef } from 'vue'

export interface XScrollbarProps extends Partial<ScrollbarProps> {}

const props = defineProps<XScrollbarProps>()

const el = useTemplateRef('scrollbar')

const wrapRef = computed(() => el.value?.wrapRef)
const viewRef = computed(() => wrapRef.value?.firstElementChild)

defineExpose({ wrapRef, viewRef })
</script>

<template>
  <ElScrollbar ref="scrollbar" v-bind="props">
    <slot></slot>
  </ElScrollbar>
</template>
