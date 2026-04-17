<script setup lang="tsx">
import { ElPagination, useLocale } from 'element-plus'
import { inject } from 'vue'

import { X_LOCALE_CONFIG, X_ELEMENT_CONFIG } from '@/constants'

import type { PaginationProps } from 'element-plus'

export interface XPaginationConfig {
  layout?: XPaginationProps['layout']
}

export interface XPaginationProps {
  pageSizes?: PaginationProps['pageSizes']
  background?: PaginationProps['background']
  size?: PaginationProps['size']
  layout?: PaginationProps['layout']
  total?: PaginationProps['total']
  defaultPageSize?: PaginationProps['defaultPageSize']
}

const config = inject(X_ELEMENT_CONFIG)
const { defaultPageSize = 20 } = defineProps<XPaginationProps>()

const emit = defineEmits<{
  sizeChange: [size: number]
  currentChange: [current: number]
}>()
const currentPage = defineModel<number>('currentPage')
const pageSize = defineModel<number>('pageSize')

const locale = inject(X_LOCALE_CONFIG)
useLocale(locale)
</script>

<template>
  <ElPagination
    v-bind="{ size, total, pageSizes, background, layout: layout ?? config?.pagination?.layout }"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :default-page-size="defaultPageSize"
    @size-change="emit('sizeChange', $event)"
    @current-change="emit('currentChange', $event)"
  >
    <slot />
  </ElPagination>
</template>
