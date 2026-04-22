<script setup lang="tsx" generic="D">
import type { TableColumnCtx, TableProps } from 'element-plus'
import type { CSSProperties, VNode, VNodeChild } from 'vue'

import { ElTable, ElTableColumn } from 'element-plus'
import { defineComponent, inject, provide, useTemplateRef } from 'vue'

import { X_ELEMENT_CONFIG, X_ELEMENT_IN_TABLE } from '@/constants'

export interface XTableConfig {
  /**
   * 是否隐藏额外内容并在单元格悬停时使用 Tooltip 显示它们。这将影响全部列的展示
   * @default false
   */
  showOverflowTooltip?: TableProps<any>['showOverflowTooltip']
  border?: TableProps<any>['border']
  fit?: TableProps<any>['fit']
  emptyText?: TableProps<any>['emptyText']
  headerAlign?: string
  align?: string
}

export interface XTableColumnProps<D> {
  content?: (scope: { index: number, row: D }) => VNodeChild
  fixed?: 'left' | 'right'
  header?: (scope: { column: XTableColumnProps<D> }) => VNodeChild
  label?: string
  prop?: string
  selectable?: (row: D, index: number) => boolean
  type?: 'index' | 'selection'
  width?: number
  minWidth?: number
  columnKey?: string
  headerAlign?: string
  align?: string
}

export interface XTableProps<D> extends XTableConfig {
  cellClassName?: ((scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => string) | string
  cellStyle?: ((scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => CSSProperties) | CSSProperties
  columns?: XTableColumnProps<D>[]
  data?: D[]
  height?: TableProps<any>['height']
  rowClassName?: ((scope: { row: D, rowIndex: number }) => string) | string
  rowStyle?: ((scope: { row: D, rowIndex: number }) => CSSProperties) | CSSProperties
  rowKey?: (scope: { row: D }) => string
  showSummary?: TableProps<any>['showSummary']
  size?: TableProps<any>['size']
  spanMethod?: (scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => number[] | undefined | { colspan: number, rowspan: number }
  summaryMethod?: (scope: { columns: TableColumnCtx[], data: D[] }) => (string | VNode)[]
}

export interface XTableEvents<D> {
  headerDragend: [newWidth: number, oldWidth: number, column: TableColumnCtx]
  rowClick: [row: D]
  rowDblclick: [row: D]
  selectionChange: [rows: D[]]
}

const { columns, data, border = undefined, fit = undefined, showOverflowTooltip = undefined, align, headerAlign } = defineProps<XTableProps<D>>()
const emit = defineEmits<XTableEvents<D>>()
const config = inject(X_ELEMENT_CONFIG)
const tableConfig = config?.table

const table = useTemplateRef('table')

defineExpose({
  clearSelection: () => table.value?.clearSelection(),
  getSelectionRows: (): D[] => table.value?.getSelectionRows() as D[],
  toggleAllSelection: () => table.value?.toggleAllSelection(),
  scrollTo: (options: number | ScrollToOptions, yCoord?: number) => table.value?.scrollTo(options, yCoord),
  setCurrentRow: (row: D) => table.value?.setCurrentRow(row),
  setScrollLeft: (left: number) => table.value?.setScrollLeft(left),
  setScrollTop: (top: number) => table.value?.setScrollTop(top),
  doLayout: () => table.value?.doLayout(),
  toggleRowSelection: (row: D, selected?: boolean, ignoreSelectable?: boolean) => table.value?.toggleRowSelection(row, selected, ignoreSelectable)
})

provide(X_ELEMENT_IN_TABLE, true)

const XTableColumn = defineComponent((props: XTableColumnProps<D>) => {
  return () => (
    <ElTableColumn
      fixed={props.fixed}
      label={props.label}
      prop={props.prop}
      type={props.type}
      width={props.width}
      minWidth={props.minWidth}
      columnKey={props.columnKey}
      selectable={props.selectable}
      headerAlign={props.headerAlign}
      align={props.align}
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
      spanMethod,
      summaryMethod,
      size,
      rowKey,
      showOverflowTooltip: showOverflowTooltip ?? tableConfig?.showOverflowTooltip,
      fit: fit ?? tableConfig?.fit,
      border: border ?? tableConfig?.border
    }"
    @row-click="(row: D) => emit('rowClick', row)"
    @row-dblclick="(row: D) => emit('rowDblclick', row)"
    @selection-change="(rows: D[]) => emit('selectionChange', rows)"
    @header-dragend="
      (newWidth, oldWidth, column) => emit('headerDragend', newWidth, oldWidth, column)
    "
  >
    <XTableColumn
      v-for="column of columns"
      v-bind="{
        align: align ?? tableConfig?.align,
        headerAlign: headerAlign ?? tableConfig?.headerAlign,
        ...column
      }"
    />
  </ElTable>
</template>
