<script setup lang="tsx" generic="D extends DefaultRow">
import type { TableColumnCtx, TableProps } from 'element-plus'
import type { CSSProperties, VNode, VNodeChild } from 'vue'

import { ElTable, ElTableColumn } from 'element-plus'
import { computed, defineComponent, provide, useTemplateRef } from 'vue'

import { useXConfig } from '@/composables/useXConfig'
import { X_ELEMENT_IN_TABLE } from '@/constants'
export type DefaultRow = Record<PropertyKey, unknown>
export interface XTableColumnProps<D> {
  align?: string
  columnKey?: string
  content?: (scope: { index: number, row: D }) => VNodeChild
  fixed?: 'left' | 'right'
  header?: (scope: { column: XTableColumnProps<D> }) => VNodeChild
  headerAlign?: string
  label?: string
  minWidth?: number
  prop?: string
  selectable?: (row: D, index: number) => boolean
  type?: 'index' | 'selection'
  width?: number
}

export interface XTableConfig {
  align?: string
  border?: TableProps<DefaultRow>['border']
  emptyText?: TableProps<DefaultRow>['emptyText']
  fit?: TableProps<DefaultRow>['fit']
  headerAlign?: string
  /**
   * 是否隐藏额外内容并在单元格悬停时使用 Tooltip 显示它们。这将影响全部列的展示
   * @default false
   */
  showOverflowTooltip?: TableProps<DefaultRow>['showOverflowTooltip']
}

export interface XTableEvents<D> {
  headerDragend: [newWidth: number, oldWidth: number, column: TableColumnCtx]
  rowClick: [row: D]
  rowDblclick: [row: D]
  scroll: [data: { scrollLeft: number, scrollTop: number }]
  selectionChange: [rows: D[]]
}

export interface XTableProps<D extends DefaultRow> extends XTableConfig {
  cellClassName?: ((scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => string) | string
  cellStyle?: ((scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => CSSProperties) | CSSProperties
  columns?: XTableColumnProps<D>[]
  data?: D[]
  height?: TableProps<D>['height']
  rowClassName?: ((scope: { row: D, rowIndex: number }) => string) | string
  rowKey?: ((row: D) => string) | string
  rowStyle?: ((scope: { row: D, rowIndex: number }) => CSSProperties) | CSSProperties
  showSummary?: TableProps<D>['showSummary']
  size?: TableProps<D>['size']
  spanMethod?: (scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => number[] | undefined | { colspan: number, rowspan: number }
  summaryMethod?: (scope: { columns: TableColumnCtx[], data: D[] }) => (string | VNode)[]
}

const { align, border = undefined, columns, data, fit = undefined, headerAlign, showOverflowTooltip = undefined } = defineProps<XTableProps<D>>()
defineEmits<XTableEvents<D>>()

const table = useTemplateRef('table')

defineExpose({
  clearSelection: () => table.value?.clearSelection(),
  doLayout: () => table.value?.doLayout(),
  getSelectionRows: (): D[] => table.value?.getSelectionRows() as D[],
  scrollTo: (options: number | ScrollToOptions, yCoord?: number) => table.value?.scrollTo(options, yCoord),
  setCurrentRow: (row: D) => table.value?.setCurrentRow(row),
  setScrollLeft: (left: number) => table.value?.setScrollLeft(left),
  setScrollTop: (top: number) => table.value?.setScrollTop(top),
  toggleAllSelection: () => table.value?.toggleAllSelection(),
  toggleRowSelection: (row: D, selected?: boolean, ignoreSelectable?: boolean) => table.value?.toggleRowSelection(row, selected, ignoreSelectable),
})

provide(X_ELEMENT_IN_TABLE, true)

const XTableColumn = defineComponent((props: XTableColumnProps<D>) => {
  return () => (
    <ElTableColumn
      align={props.align}
      columnKey={props.columnKey}
      fixed={props.fixed}
      headerAlign={props.headerAlign}
      label={props.label}
      minWidth={props.minWidth}
      prop={props.prop}
      selectable={props.selectable}
      type={props.type}
      width={props.width}
    >
      {{
        default: ({ $index, row }: { $index: number, row: D }) => props.content?.({ index: $index, row }),
        header: () => props.header?.({ column: { ...props } }),
      }}
    </ElTableColumn>
  )
}, { props: ['content', 'fixed', 'header', 'label', 'prop', 'selectable', 'type', 'width'] })

const config = useXConfig('table')
const _align = computed(() => align ?? config.value?.align)
const _border = computed(() => border ?? config.value?.border)
const _showOverflowTooltip = computed(() => showOverflowTooltip ?? config.value?.showOverflowTooltip)
const _fit = computed(() => fit ?? config.value?.fit)
const _headerAlign = computed(() => headerAlign ?? config.value?.headerAlign)
</script>

<template>
  <ElTable
    ref="table"
    :data="data"
    v-bind="{
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
      showOverflowTooltip: _showOverflowTooltip,
      fit: _fit,
      border: _border
    }"
    @scroll="({ scrollLeft, scrollTop }) => $emit('scroll', { scrollLeft, scrollTop })"
    @row-click="(row: D) => $emit('rowClick', row)"
    @row-dblclick="(row: D) => $emit('rowDblclick', row)"
    @selection-change="(rows: D[]) => $emit('selectionChange', rows)"
    @header-dragend="(newWidth, oldWidth, column) => $emit('headerDragend', newWidth, oldWidth, column)"
  >
    <XTableColumn
      v-for="column of columns"
      v-bind="{
        align: _align,
        headerAlign: _headerAlign,
        ...column
      }"
    />
  </ElTable>
</template>
