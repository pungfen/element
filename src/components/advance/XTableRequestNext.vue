<script setup lang="tsx" generic="U, PT, QR, D">
import type { Ref, VNodeChild } from 'vue'
import type { XTableFlexEvents, XTableFlexProps } from '@/components/advance'
import type { XTableColumnProps } from '@/components/basic'
import type { Paging } from '@/types'
import { useDebounceFn } from '@vueuse/core'
import { XTableFlex } from '@/components/advance'
import { XPagination } from '@/components/basic'

export interface XTableRequestColumnsProps<D> extends XTableColumnProps<D> {
  content?: (scope: { index: number, row: D }) => VNodeChild
}

export interface XTableRequestProps<U, PT, QR, D> extends Omit<XTableFlexProps<D>, 'data' | 'columns'> {
  request: () => {
    data: Ref<D[]>
    execute: () => PromiseLike<unknown>
    isFetching: Ref<boolean>
    paging: Ref<Paging>
    path: Ref<PT>
    query: Ref<QR>
    url: U
  }
  pagination?: boolean
  columns: XTableRequestColumnsProps<D>[]
}

export interface XTableRequestEvents<PT, QR, D> extends XTableFlexEvents<D> {
  prepare: [parameters: { path: PT, query: QR }]
}

const { request, columns, pagination = true, showOverflowTooltip = undefined } = defineProps<XTableRequestProps<U, PT, QR, D>>()
const emit = defineEmits<XTableRequestEvents<PT, QR, D>>()

const { data, execute, path, query, isFetching, url, paging } = request()

const search = useDebounceFn(async () => {
  emit('prepare', { path: path.value, query: query.value })
  execute()
})

defineExpose({ search, data, paging, isFetching, url, query })

const T = () => (
  <XTableFlex
    data={data.value}
    columns={columns}
    showOverflowTooltip={showOverflowTooltip}
    onRowClick={row => emit('rowClick', row)}
    onRowDblclick={row => emit('rowDblclick', row)}
    onSelectionChange={rows => emit('selectionChange', rows)}
    onHeaderDragend={(newWidth, oldWidth, column) => emit('headerDragend', newWidth, oldWidth, column)}
  />
)

const P = () => (
  <XPagination
    size="small"
    total={paging.value.itemCount}
    currentPage={paging.value.pageIndex}
    pageSize={paging.value.pageSize}
    onUpdate:currentPage={value => paging.value.pageIndex = value ?? 0}
    onUpdate:pageSize={value => paging.value.pageSize = value ?? 0}
    onCurrentChange={() => execute()}
    onSizeChange={() => execute()}
  />
)
</script>

<template>
  <div class="flex-1 overflow-hidden flex flex-col gap-2">
    <T />
    <div v-if="pagination" class="flex justify-end">
      <P />
    </div>
  </div>
</template>
