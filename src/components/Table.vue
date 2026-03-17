<script setup lang="tsx" generic="D">
import type { TableColumnCtx, TableProps } from 'element-plus'
import type { CSSProperties, VNode, VNodeChild } from 'vue'

import { ElTable, ElTableColumn } from 'element-plus'
import { defineComponent, useTemplateRef } from 'vue'

export interface XTableColumnProps<D> {
  content?: (scope: { index: number, row: D }) => VNodeChild
  fixed?: 'left' | 'right'
  header?: (scope: { column: XTableColumnProps<D> }) => VNodeChild
  label?: string
  prop?: string
  selectable?: (row: D, index: number) => boolean
  type?: 'index' | 'selection'
  width?: number
}

export interface XTableProps<D> {
  border?: TableProps<any>['border']
  cellClassName?: ((scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => string) | string
  cellStyle?: ((scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => CSSProperties) | CSSProperties
  columns?: XTableColumnProps<D>[]
  data?: D[]
  height?: TableProps<any>['height']
  emptyText?: TableProps<any>['emptyText']
  rowClassName?: ((scope: { row: D, rowIndex: number }) => string) | string
  rowKey?: (scope: { row: D }) => string
  rowStyle?: ((scope: { row: D, rowIndex: number }) => CSSProperties) | CSSProperties
  showOverflowTooltip?: TableProps<any>['showOverflowTooltip']
  showSummary?: TableProps<any>['showSummary']
  size?: TableProps<any>['size']
  spanMethod?: (scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => number[] | undefined | { colspan: number, rowspan: number }
  summaryMethod?: (scope: { columns: TableColumnCtx[], data: D[] }) => (string | VNode)[]
}

const { columns, data, showOverflowTooltip = true, border = true } = defineProps<XTableProps<D>>()

const emit = defineEmits<{
  headerDragend: [newWidth: number, oldWidth: number, column: TableColumnCtx]
  rowClick: [row: D]
  rowDbClick: [row: D]
  selectionChange: [rows: D[]]
}>()

const table = useTemplateRef('table')

defineExpose({
  clearSelection: () => table.value?.clearSelection(),
  getSelectionRows: () => table.value?.getSelectionRows(),
  scrollTo: (options: number | ScrollToOptions, yCoord?: number) => table.value?.scrollTo(options, yCoord),
  setCurrentRow: (row: D) => table.value?.setCurrentRow(row),
  setScrollLeft: (left: number) => table.value?.scrollTo(left),
  setScrollTop: (top: number) => table.value?.scrollTo(top),
  toggleRowSelection: (row: D, selected?: boolean, ignoreSelectable?: boolean) => table.value?.toggleRowSelection(row, selected, ignoreSelectable)
})

const XTableColumn = defineComponent((props: XTableColumnProps<D>) => {
  return () => (
    <ElTableColumn
      fixed={props.fixed}
      label={props.label}
      prop={props.prop}
      type={props.type}
    >
      {{
        default: ({ row, $index }: { row: D, $index: number }) => props.content?.({ row, index: $index }),
        header: () => props.header?.({ column: { ...props } })
      }}
    </ElTableColumn>
  )
}, { props: ['content', 'fixed', 'header', 'label', 'prop', 'selectable', 'type', 'width'] })
</script>

<template>
  <ElTable
    ref="table"
    v-bind="{
      data,
      height,
      rowClassName,
      rowStyle,
      cellClassName,
      cellStyle,
      showSummary,
      showOverflowTooltip,
      spanMethod,
      summaryMethod,
      size,
      rowKey,
      border,
      emptyText,
    }"
    @row-click="(row: D) => emit('rowClick', row)"
    @row-dblclick="(row: D) => emit('rowDbClick', row)"
    @selection-change="(rows: D[]) => emit('selectionChange', rows)"
    @header-dragend="(newWidth, oldWidth, column) => emit('headerDragend', newWidth, oldWidth, column)"
  >
    <XTableColumn
      v-for="column of columns"
      v-bind="column"
    />
  </ElTable>
</template>
