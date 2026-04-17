<script setup lang="tsx" generic="U, PT, QR, D">
import type { TableColumnCtx } from 'element-plus'
import type { CSSProperties, Ref, VNodeChild } from 'vue'
import type { Paging } from '@/types'
import { useDebounceFn } from '@vueuse/core'
import { XTableFlex, type XTableFlexEvents, type XTableFlexProps } from '@/advance'
import { XPagination, type XTableColumnProps } from '@/basic'

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
  header?: (scope: { query: QR }) => VNodeChild
  footer?: (scope: { query: QR }) => VNodeChild
  cellClassName?: ((scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => string) | string
  cellStyle?: ((scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => CSSProperties) | CSSProperties
  rowClassName?: ((scope: { row: D, rowIndex: number }) => string) | string
  rowStyle?: ((scope: { row: D, rowIndex: number }) => CSSProperties) | CSSProperties
  paginationLayout?: string
}

export interface XTableRequestEvents<PT, QR, D> extends XTableFlexEvents<D> {
  prepare: [parameters: { path: PT, query: QR }]
}

const { request, columns, pagination = true, showOverflowTooltip = undefined, header, footer, cellClassName, cellStyle, rowClassName, rowStyle, paginationLayout } = defineProps<XTableRequestProps<U, PT, QR, D>>()
const emit = defineEmits<XTableRequestEvents<PT, QR, D>>()

const { data, execute, path, query, isFetching, url, paging } = request()

const search = useDebounceFn(async () => {
  emit('prepare', { path: path.value, query: query.value })
  execute()
})

defineExpose({ search, data, paging, isFetching, url, query, path })

const H = () => header?.({ query: query.value })

const T = () => (
  <XTableFlex
    data={data.value}
    columns={columns}
    showOverflowTooltip={showOverflowTooltip}
    onRowClick={row => emit('rowClick', row)}
    onRowDblclick={row => emit('rowDblclick', row)}
    onSelectionChange={rows => emit('selectionChange', rows)}
    onHeaderDragend={(newWidth, oldWidth, column) => emit('headerDragend', newWidth, oldWidth, column)}
    cellClassName={cellClassName}
    cellStyle={cellStyle}
    rowClassName={rowClassName}
    rowStyle={rowStyle}
  />
)

const P = () => (
  <XPagination
    size="small"
    layout={paginationLayout}
    total={paging.value.itemCount}
    currentPage={paging.value.pageIndex}
    pageSize={paging.value.pageSize}
    onUpdate:currentPage={value => paging.value.pageIndex = value ?? 0}
    onUpdate:pageSize={value => paging.value.pageSize = value ?? 0}
    onCurrentChange={() => execute()}
    onSizeChange={() => execute()}
  />
)

const F = () => footer?.({ query: query.value })
</script>

<template>
  <div v-loading="isFetching" class="flex flex-1 flex-col gap-2 overflow-hidden">
    <H />
    <T />
    <div v-if="pagination" class="flex justify-end">
      <P />
    </div>
    <F />
  </div>
</template>
