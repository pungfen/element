<script setup lang="tsx" generic="U, PT, QR, D extends DefaultRow">
import type { TableColumnCtx } from 'element-plus'
import type { CSSProperties, Ref, VNodeChild } from 'vue'

import { useDebounceFn } from '@vueuse/core'
import { ref } from 'vue'
import { ComponentExposed } from 'vue-component-type-helpers'

import type { Paging } from '@/types'

import { XTableFlex, type XTableFlexEvents, type XTableFlexProps } from '@/advance'
import { type DefaultRow, XPagination, type XTableColumnProps } from '@/basic'

export interface XTableRequestColumnsProps<D> extends XTableColumnProps<D> {
  content?: (scope: { index: number, row: D }) => VNodeChild
}

export interface XTableRequestEvents<PT, QR, D> extends XTableFlexEvents<D> {
  prepare: [parameters: { path: PT, query: QR }]
}

export interface XTableRequestProps<U, PT, QR, D extends DefaultRow> extends Omit<XTableFlexProps<D>, 'columns' | 'data'> {
  cellClassName?: ((scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => string) | string
  cellStyle?: ((scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => CSSProperties) | CSSProperties
  columns: XTableRequestColumnsProps<D>[]
  footer?: (scope: { query: QR }) => VNodeChild
  header?: (scope: { query: QR }) => VNodeChild
  pagination?: boolean
  paginationLayout?: string
  request: () => {
    data: Ref<D[]>
    execute: () => PromiseLike<unknown>
    isFetching: Ref<boolean>
    paging: Ref<Paging>
    path: Ref<PT>
    query: Ref<QR>
    url: U
  }
  rowClassName?: ((scope: { row: D, rowIndex: number }) => string) | string
  rowStyle?: ((scope: { row: D, rowIndex: number }) => CSSProperties) | CSSProperties
}

const { cellClassName, cellStyle, columns, fit = undefined, footer, header, pagination = true, paginationLayout, request, rowClassName, rowStyle, showOverflowTooltip = undefined } = defineProps<XTableRequestProps<U, PT, QR, D>>()
const emit = defineEmits<XTableRequestEvents<PT, QR, D>>()

const { data, execute, isFetching, paging, path, query, url } = request()

const table = ref<ComponentExposed<typeof XTableFlex> | null>()
const init = JSON.stringify(query.value)
const search = useDebounceFn(async () => {
  emit('prepare', { path: path.value, query: query.value })
  execute()
})
const reset = useDebounceFn(async () => {
  query.value = JSON.parse(init) as QR
  search()
})
const clearSelection = () => table.value?.clearSelection()

defineExpose({ clearSelection, data, isFetching, paging, path, query, reset, search, url })

const H = () => header?.({ query: query.value })

const T = () => (
  <XTableFlex
    cellClassName={cellClassName}
    cellStyle={cellStyle}
    columns={columns}
    data={data.value}
    fit={fit}
    onHeaderDragend={(newWidth, oldWidth, column) => emit('headerDragend', newWidth, oldWidth, column)}
    onRowClick={row => emit('rowClick', row)}
    onRowDblclick={row => emit('rowDblclick', row)}
    onScroll={data => emit('scroll', data)}
    onSelectionChange={rows => emit('selectionChange', rows)}
    ref={table}
    rowClassName={rowClassName}
    rowStyle={rowStyle}
    showOverflowTooltip={showOverflowTooltip}
  />
)

const P = () => (
  <XPagination
    currentPage={paging.value.pageIndex}
    layout={paginationLayout}
    onCurrentChange={() => execute()}
    onSizeChange={() => {
      const _q = query.value as { pageIndex?: number }
      _q.pageIndex = 1
      execute()
    }}
    onUpdate:currentPage={value => (query.value as { pageIndex?: number }).pageIndex = value ?? 0}
    onUpdate:pageSize={value => (query.value as { pageSize?: number }).pageSize = value ?? 0}
    pageSize={paging.value.pageSize}
    size="small"
    total={paging.value.itemCount}
  />
)

const F = () => footer?.({ query: query.value })
</script>

<template>
  <div
    v-loading="isFetching"
    class="flex flex-1 flex-col gap-2 overflow-hidden"
  >
    <H />

    <T />

    <div
      v-if="pagination"
      class="flex justify-end"
    >
      <P />
    </div>

    <F />
  </div>
</template>
