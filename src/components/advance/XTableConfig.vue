<script setup lang="tsx" generic="D extends DefaultRow">
import type { Ref, VNodeChild } from 'vue'

import { Rank, Setting } from '@element-plus/icons-vue'
import { useArrayFilter, useArrayMap } from '@vueuse/core'
import { moveArrayElement, useSortable } from '@vueuse/integrations/useSortable'
import { ElPopover, ElScrollbar, ElSwitch, ElText, useLocale } from 'element-plus'
import { inject, nextTick, ref } from 'vue'

import type { TableColumnField } from '@/types'

import { XTableFlex, type XTableFlexEvents, type XTableFlexProps } from '@/advance'
import { type DefaultRow, XButton, type XTableColumnProps } from '@/basic'
import { X_LOCALE_CONFIG } from '@/constants'

export interface XTableConfigColumnsProps<D> extends Omit<XTableColumnProps<D>, 'content'> {
  content?: (scope: { index: number, row: D }) => VNodeChild
}

export interface XTableConfigEvents<D> extends XTableFlexEvents<D> {
  rowClick: [row: D]
}

export interface XTableConfigProps<D extends DefaultRow> extends Omit<XTableFlexProps<D>, 'columns' | 'data' | 'showOverflowTooltip'> {
  config: Record<string, XTableConfigColumnsProps<D>>
  data?: D[]
  fields: () => {
    data: Ref<TableColumnField[]>
    loading: Ref<boolean>
    update: (fields: TableColumnField[]) => PromiseLike<unknown>
  }
}

const { config, data, fields } = defineProps<XTableConfigProps<D>>()
const emit = defineEmits<XTableConfigEvents<D>>()

const { data: fieldsData, loading, update } = fields()
const visibleColumns = useArrayFilter(fieldsData, it => it.visible)

const columns = useArrayMap(visibleColumns, (it) => {
  const _config = config[it.code]
  return {
    columnKey: it.code,
    content: _config?.content,
    label: _config?.label ?? it.label,
    minWidth: it.width,
    prop: _config?.prop ?? it.prop,
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
  },
})

const locale = inject(X_LOCALE_CONFIG, undefined)
const { t } = useLocale(locale)

const T = () => (
  <XTableFlex
    border
    columns={columns.value}
    data={data}
    onHeaderDragend={(newWidth, _oldWidth, column) => {
      const item = fieldsData.value.find(it => it.code === column.columnKey)
      if (item) {
        item.width = newWidth
        nextTick(() => {
          update(fieldsData.value)
        })
      }
    }}
    onRowClick={row => emit('rowClick', row)}
    showOverflowTooltip
  />
)

const S = () => (
  <ElPopover popper-class="shadow-xl bg-(--el-bg-color)" trigger="click" width="auto">
    {{
      default: () => (
        <div class="flex flex-col gap-2">
          <ElText size="large">{t('el.common.tableConfigTitle')}</ElText>
          <ElScrollbar max-height={500}>
            <div class="flex flex-col divide-y divide-[#f2f6fc]" ref={sortable}>
              {() => fieldsData.value.map(
                it => (
                  <div class="flex w-50 items-center gap-2 py-2">
                    <XButton class="cursor-grab" disabled={false} icon={Rank} size="small" text type="primary" />
                    <ElText class="flex-1 text-ellipsis">{it.label}</ElText>
                    <ElSwitch
                      disabled={false}
                      modelValue={it.visible}
                      onUpdate:modelValue={(value) => {
                        it.visible = value as boolean
                        nextTick(() => {
                          update(fieldsData.value)
                        })
                      }}
                      size="small"
                    />
                  </div>
                ),
              )}
            </div>
          </ElScrollbar>
        </div>
      ),
      reference: () => <XButton class="absolute top-0 right-0 z-1000" disabled={false} icon={Setting} text />,
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
