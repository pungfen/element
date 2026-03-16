<script setup lang="tsx" generic="D extends Record<string | number | symbol, unknown>">
import type { TableColumnCtx, TableProps } from 'element-plus'
import type { CSSProperties, FunctionalComponent, VNode, VNodeChild } from 'vue'

import { ElTable, ElTableColumn } from 'element-plus'
import { useTemplateRef } from 'vue'

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

export interface XTableProps<D extends Record<number | string | symbol, unknown>> {
  border?: TableProps<D>['border']
  cellClassName?: ((scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => string) | string
  cellStyle?: ((scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => CSSProperties) | CSSProperties
  columns?: XTableColumnProps<D>[]
  data?: D[]
  fit?: TableProps<D>['fit']
  height?: TableProps<D>['height']
  rowClassName?: ((scope: { row: D, rowIndex: number }) => string) | string
  rowKey?: (scope: { row: D }) => string
  rowStyle?: ((scope: { row: D, rowIndex: number }) => CSSProperties) | CSSProperties
  showOverflowTooltip?: TableProps<D>['showOverflowTooltip']
  showSummary?: TableProps<D>['showSummary']
  size?: TableProps<D>['size']
  spanMethod?: (scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => number[] | undefined | { colspan: number, rowspan: number }
  summaryMethod?: (scope: { columns: TableColumnCtx[], data: D[] }) => (string | VNode)[]
}

const { columns, data, showOverflowTooltip = true } = defineProps<XTableProps<D>>()

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

const XTableColumn: FunctionalComponent<XTableColumnProps<D>> = props => (
  <ElTableColumn fixed={props.fixed} label={props.label} prop={props.prop} type={props.type} width={props.width}>
    {{
      default: ({ $index, row }: { $index: number, row: D }) => props.content?.({ index: $index, row }),
      header: () => props.header?.({ column: { ...props } })
    }}
  </ElTableColumn>
)
</script>

<template>
  <ElTable
    ref="table"
    v-bind="{
      data,
      height,
      fit,
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
