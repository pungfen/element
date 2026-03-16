<script setup lang="tsx">
import type { PaginationProps } from 'element-plus'
import { ElPagination } from 'element-plus'

export interface XPaginationProps {
  pageSizes?: PaginationProps['pageSizes']
  background?: PaginationProps['background']
  size?: PaginationProps['size']
  layout?: PaginationProps['layout']
  total?: PaginationProps['total']
}

defineProps<XPaginationProps>()

const emit = defineEmits<{
  sizeChange: [size: number]
  currentChange: [current: number]
}>()
const currentPage = defineModel<number>('currentPage')
const pageSize = defineModel<number>('pageSize')
</script>

<template>
  <ElPagination
    v-bind="{ size, total, pageSizes, background, layout }"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    @size-change="emit('sizeChange', $event)"
    @current-change="emit('currentChange', $event)"
  >
    <slot />
  </ElPagination>
</template>
