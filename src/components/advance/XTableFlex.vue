<script setup lang="tsx" generic="D extends DefaultRow">
import type { ScrollbarInstance, TableColumnCtx } from 'element-plus'
import type { CSSProperties } from 'vue'

import { useElementSize } from '@vueuse/core'
import { computed, useTemplateRef } from 'vue'

import { type DefaultRow, XTable, type XTableEvents, type XTableProps } from '@/basic'

export type XTableFlexEvents<D> = XTableEvents<D>

export interface XTableFlexProps<D extends DefaultRow> extends XTableProps<D> {
  cellClassName?: ((scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => string) | string
  cellStyle?: ((scope: { column: TableColumnCtx, columnIndex: number, row: D, rowIndex: number }) => CSSProperties) | CSSProperties
  rowClassName?: ((scope: { row: D, rowIndex: number }) => string) | string
  rowStyle?: ((scope: { row: D, rowIndex: number }) => CSSProperties) | CSSProperties
}

const props = withDefaults(defineProps<XTableFlexProps<D>>(), {
  border: undefined,
  fit: undefined,
  showOverflowTooltip: undefined,
})
defineEmits<XTableFlexEvents<D>>()

const container = useTemplateRef('container')
const size = useElementSize(container)

const table = useTemplateRef('table')

defineExpose({
  clearSelection: () => table.value?.clearSelection(),
  getSelectionRows: () => table.value?.getSelectionRows(),
  scrollBarRef: computed(() => table.value?.scrollBarRef as ScrollbarInstance | undefined),
  scrollTo: (options: number | ScrollToOptions, yCoord?: number) => table.value?.scrollTo(options, yCoord),
  setCurrentRow: (row: D) => table.value?.setCurrentRow(row),
  setScrollLeft: (left: number) => table.value?.setScrollLeft(left),
  setScrollTop: (top: number) => table.value?.setScrollTop(top),
  toggleRowSelection: (row: D, selected?: boolean, ignoreSelectable?: boolean) => table.value?.toggleRowSelection(row, selected, ignoreSelectable),
})
</script>

<template>
  <div ref="container" class="flex-1 overflow-hidden">
    <XTable
      ref="table"
      v-bind="{ ...props }"
      :height="size.height.value"
      @scroll="(data) => $emit('scroll', data)"
      @row-click="(row: D) => $emit('rowClick', row)"
      @row-dblclick="(row: D) => $emit('rowDblclick', row)"
      @selection-change="(rows: D[]) => $emit('selectionChange', rows)"
      @header-dragend="(newWidth, oldWidth, column) => $emit('headerDragend', newWidth, oldWidth, column)"
    />
  </div>
</template>
