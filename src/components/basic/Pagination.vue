<script setup lang="tsx">
import type { PaginationProps } from 'element-plus'
import { ElConfigProvider, ElPagination, useLocale } from 'element-plus'

import { inject } from 'vue'
import { X_LOCALE_CONFIG } from '@/constants'

export interface XPaginationProps {
  pageSizes?: PaginationProps['pageSizes']
  background?: PaginationProps['background']
  size?: PaginationProps['size']
  layout?: PaginationProps['layout']
  total?: PaginationProps['total']
  defaultPageSize?: PaginationProps['defaultPageSize']
}

const { defaultPageSize = 20, layout = 'prev, pager, next, sizes, jumper, ->, total' } = defineProps<XPaginationProps>()

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
  <ElConfigProvider :locale="locale">
    <ElPagination
      v-bind="{ size, total, pageSizes, background, layout }"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :default-page-size="defaultPageSize"
      @size-change="emit('sizeChange', $event)"
      @current-change="emit('currentChange', $event)"
    >
      <slot />
    </ElPagination>
  </ElConfigProvider>
</template>
