<script setup lang="ts">
import type { PaginationProps } from 'element-plus'
import { ElPagination } from 'element-plus'

export interface XPaginationProps extends Partial<
  Omit<PaginationProps, 'pageSizes'>
> {
  sizes?: number[]
}

const {
  sizes = [20, 50, 100],
  layout = 'prev, pager, next, jumper, ->, total',
  background = true
} = defineProps<XPaginationProps>()

const emit = defineEmits<{
  sizeChange: [size: number]
  currentChange: [current: number]
}>()

const size = defineModel<number>('size')
const current = defineModel<number>('current')
</script>

<template>
  <ElPagination
    v-bind="{ background, pageSizes: sizes, layout, total }"
    v-model:current-page="current"
    v-model:page-size="size"
    @size-change="emit('sizeChange', $event)"
    @current-change="emit('currentChange', $event)"
  ></ElPagination>
</template>
