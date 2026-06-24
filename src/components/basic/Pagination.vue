<script setup lang="tsx">
import type { PaginationProps } from 'element-plus'

import { ElPagination, useLocale } from 'element-plus'
import { inject } from 'vue'

import { X_ELEMENT_CONFIG, X_LOCALE_CONFIG } from '@/constants'

export interface XPaginationConfig {
  layout?: XPaginationProps['layout']
}

export interface XPaginationProps {
  background?: PaginationProps['background']
  defaultPageSize?: PaginationProps['defaultPageSize']
  layout?: PaginationProps['layout']
  pageSizes?: PaginationProps['pageSizes']
  size?: PaginationProps['size']
  total?: PaginationProps['total']
}

const { defaultPageSize = 20 } = defineProps<XPaginationProps>()
const emit = defineEmits<{ currentChange: [value: number], sizeChange: [value: number] }>()
const currentPage = defineModel<number>('currentPage')
const pageSize = defineModel<number>('pageSize')
const config = inject(X_ELEMENT_CONFIG)
const paginationConfig = config?.pagination

const locale = inject(X_LOCALE_CONFIG)
useLocale(locale)
</script>

<template>
  <ElPagination
    v-bind="{ size, total, pageSizes, background, layout: layout ?? paginationConfig?.layout }"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :default-page-size="defaultPageSize"
    @size-change="emit('sizeChange', $event)"
    @current-change="emit('currentChange', $event)"
  >
    <slot />
  </ElPagination>
</template>
