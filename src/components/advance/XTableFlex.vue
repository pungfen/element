<script setup lang="tsx" generic="D">
import type { XTableEvents, XTableProps } from '@/components/basic'
import { useElementSize } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import { XTable } from '@/components/basic'

export interface XTableFlexProps<D> extends XTableProps<D> {}

export interface XTableFlexEvents<D> extends XTableEvents<D> {}

const { showOverflowTooltip = undefined } = defineProps<XTableFlexProps<D>>()
defineEmits<XTableFlexEvents<D>>()

const container = useTemplateRef('container')
const size = useElementSize(container)

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
</script>

<template>
  <div ref="container" class="flex-1 overflow-hidden">
    <XTable
      ref="table"
      v-bind="{ ...$props, showOverflowTooltip }"
      :height="size.height.value"
      @row-click="(row: D) => $emit('rowClick', row)"
      @row-dblclick="(row: D) => $emit('rowDblclick', row)"
      @selection-change="(rows: D[]) => $emit('selectionChange', rows)"
      @header-dragend="(newWidth, oldWidth, column) => $emit('headerDragend', newWidth, oldWidth, column)"
    />
  </div>
</template>
