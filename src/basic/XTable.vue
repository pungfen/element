<script setup lang="tsx" generic="D">
import type { TableColumnCtx, TableInstance } from 'element-plus'
import type { VNodeChild } from 'vue'
import { useElementSize } from '@vueuse/core'

import { ElTable, ElTableColumn } from 'element-plus'
import { computed, ref, useTemplateRef } from 'vue'

export interface XTableColumnProps<D> {
  label?: string
  prop?: string
  width?: number
  fixed?: 'left' | 'right'
  showOverflowTooltip?: boolean
  content?: (scope: { index: number, row: D }) => VNodeChild
  header?: (scope: { column: XTableColumnProps<D> }) => VNodeChild
  type?: 'default' | 'selection'
  columnKey?: string
}

export interface XTableProps<D> {
  data?: D[]
  height?: number | string
  columns: XTableColumnProps<D>[]
  /**
   * It will affect all the table columns.
   */
  showOverflowTooltip?: boolean
  border?: boolean
  highlightCurrentRow?: boolean

  spanMethod?: (data: {
    row: D
    rowIndex: number
    column: TableColumnCtx
    columnIndex: number
  }) => number[] | { rowspan: number, colspan: number } | undefined
}

const {
  data,
  columns,
  height,
  showOverflowTooltip,
  border,
  highlightCurrentRow,
  spanMethod
} = defineProps<XTableProps<D>>()

const emit = defineEmits<{
  rowClick: [row: D]
  selectionChange: [rows: D[]]
  headerDragend: [newWidth: number, oldWidth: number, column: TableColumnCtx]
}>()

const container = useTemplateRef('container')
const el = ref<TableInstance | null>()
const size = useElementSize(container)
const _height = computed(() => height ?? size.height.value)

const X = () => (
  <ElTable
    ref={el}
    {...{
      data,
      height: _height.value,
      showOverflowTooltip,
      border,
      highlightCurrentRow,
      spanMethod
    }}
    onRow-click={row => emit('rowClick', row)}
    onSelection-change={rows => emit('selectionChange', rows)}
    onHeader-dragend={(newWidth, oldWidth, column) =>
      emit('headerDragend', newWidth, oldWidth, column)}
  >
    {() =>
      columns.map(column => (
        <ElTableColumn {...column}>
          {{
            default: ({ $index, row }: { $index: number, row: D }) =>
              column.content?.({ index: $index, row }),
            header: () => column.header?.({ column }) ?? column.label
          }}
        </ElTableColumn>
      ))}
  </ElTable>
)
</script>

<template>
  <div ref="container" :class="[height === undefined && 'h-full']">
    <X />
  </div>
</template>
