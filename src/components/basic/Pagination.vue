<script setup lang="tsx">
import type { PaginationProps } from 'element-plus'

import { ElPagination, useLocale } from 'element-plus'
import { computed, inject } from 'vue'

import { useXConfig } from '@/composables/useXConfig'
import { X_LOCALE_CONFIG } from '@/constants'

export interface XPaginationConfig {
  defaultPageSize?: PaginationProps['defaultPageSize']
  layout?: XPaginationProps['layout']
}

export interface XPaginationProps extends XPaginationConfig {
  background?: PaginationProps['background']
  layout?: PaginationProps['layout']
  pageSizes?: PaginationProps['pageSizes']
  size?: PaginationProps['size']
  total?: PaginationProps['total']
}

const { defaultPageSize, layout } = defineProps<XPaginationProps>()
const emit = defineEmits<{ currentChange: [value: number], sizeChange: [value: number] }>()
const currentPage = defineModel<number>('currentPage')
const pageSize = defineModel<number>('pageSize')

const config = useXConfig('pagination')
const _layout = computed(() => layout ?? config.value?.layout)
const _defaultPageSize = computed(() => defaultPageSize ?? config.value?.defaultPageSize)

const locale = inject(X_LOCALE_CONFIG)
useLocale(locale)
</script>

<template>
  <ElPagination
    v-bind="{ size, total, pageSizes, background, layout: _layout }"
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :default-page-size="_defaultPageSize"
    @size-change="emit('sizeChange', $event)"
    @current-change="emit('currentChange', $event)"
  >
    <slot />
  </ElPagination>
</template>
