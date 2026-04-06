<script setup lang="tsx" generic="D">
import type { Ref, VNodeChild } from 'vue'
import type { TableColumnField } from '@/types'
import { Rank, Setting } from '@element-plus/icons-vue'
import { useArrayFilter, useArrayMap } from '@vueuse/core'
import { moveArrayElement, useSortable } from '@vueuse/integrations/useSortable'
import { ElPopover, ElScrollbar, ElSpace, ElSwitch, ElText } from 'element-plus'
import { nextTick, ref } from 'vue'

import { XTableFlex, type XTableFlexEvents, type XTableFlexProps } from '@/advance'
import { XButton, type XTableColumnProps } from '@/basic'

export interface XTableConfigColumnsProps<D> extends Omit<XTableColumnProps<D>, 'content'> {
  content?: (scope: { row: D, index: number }) => VNodeChild
}

export interface XTableConfigProps<D> extends Omit<XTableFlexProps<D>, 'columns' | 'showOverflowTooltip'> {
  fields: () => {
    data: Ref<TableColumnField[]>
    update: (fields: TableColumnField[]) => PromiseLike<unknown>
    loading: Ref<boolean>
  }
  config: Record<string, XTableConfigColumnsProps<D>>
}

export interface XTableConfigEvents<D> extends XTableFlexEvents<D> {}

const { config, fields, data } = defineProps<XTableConfigProps<D>>()
const emit = defineEmits<XTableConfigEvents<D>>()

const { data: fieldsData, update, loading } = fields()
const visibleColumns = useArrayFilter(fieldsData, it => it.visible)

const columns = useArrayMap(visibleColumns, (it) => {
  const _config = config[it.code]
  return {
    columnKey: it.code,
    label: _config?.label ?? it.label,
    prop: _config?.prop ?? it.prop,
    width: it.width,
    content: _config?.content
  } as XTableColumnProps<D>
})

const sortable = ref<HTMLDivElement | null>()
useSortable(sortable, fieldsData, {
  animation: 150,
  ghostClass: 'bg-(--el-color-primary-light-7)',
  handle: '.cursor-grab',
  onUpdate: (e) => {
    moveArrayElement(fieldsData.value, e.oldIndex!, e.newIndex!, e)
    nextTick(() => {
      update(fieldsData.value)
    })
  }
})

const T = () => (
  <XTableFlex
    data={data}
    columns={columns.value}
    showOverflowTooltip
    border
    onHeaderDragend={(newWidth, _oldWidth, column) => {
      const item = fieldsData.value.find(it => it.code === column.columnKey)
      if (item) {
        item.width = newWidth
        nextTick(() => {
          update(fieldsData.value)
        })
      }
    }}
  />
)

const S = () => (
  <ElPopover trigger="click" width="auto" popper-class="shadow-xl bg-(--el-bg-color)">
    {{
      reference: () => <XButton icon={Setting} text class="absolute top-0 right-0 z-1000" />,
      default: () => <div class="flex flex-col gap-2">
        <ElText size="large"> 表头设置 </ElText>
        <ElScrollbar max-height={500}>
          <div ref={sortable} class="flex flex-col divide-y divide-[#f2f6fc]">
            {() => fieldsData.value.map(
              it => <div class="flex w-50 items-center gap-2 py-2">
                <XButton text icon={Rank} type="primary" size="small" class="cursor-grab"/>
                <ElText class="flex-1 overflow-ellipsis">{it.label}</ElText>
                <ElSwitch size="small" modelValue={it.visible} onUpdate:modelValue={value => {
                  it.visible = value as boolean
                  nextTick(() => {
                    update(fieldsData.value)
                  })
                }}/>
              </div>
            )}
          </div>
        </ElScrollbar>
      </div>
    }}
  </ElPopover>
)

defineExpose({ data })
</script>

<template>
  <div v-loading="loading" class="relative flex flex-1 flex-col gap-2 overflow-hidden">
    <S />
    <T />
  </div>
</template>
