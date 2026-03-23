<script setup lang="tsx" generic="U, PT, QR, D">
import type { Ref, VNodeChild } from 'vue'
import type { XTableRequestColumnsProps, XTableRequestEvents, XTableRequestProps } from '@/components/advance'
import type { XTableColumnProps } from '@/components/basic'
import type { Paging, TableColumnField } from '@/types'
import { Rank, Setting } from '@element-plus/icons-vue'
import { useArrayFilter, useArrayMap, useDebounceFn } from '@vueuse/core'
import { moveArrayElement, useSortable } from '@vueuse/integrations/useSortable'
import { ElPopover, ElScrollbar, ElSwitch, ElText } from 'element-plus'
import { nextTick, useTemplateRef } from 'vue'

import { XTableFlex } from '@/components/advance'
import { XButton, XPagination } from '@/components/basic'

export interface XTableRequestConfigColumnsProps<QR, D> extends Omit<XTableRequestColumnsProps<D>, 'content'> {
  content?: (scope: { row: D, index: number }) => VNodeChild
  search?: (scope: { query: QR }) => VNodeChild
}

export interface XTableRequestConfigProps<U, PT, QR, D> extends Omit<XTableRequestProps<U, PT, QR, D>, 'columns' | 'request'> {
  request: () => {
    data: Ref<D[]>
    execute: () => PromiseLike<unknown>
    isFetching: Ref<boolean>
    paging: Ref<Paging>
    path: Ref<PT>
    query: Ref<QR>
    url: U
  }
  fields: () => {
    data: Ref<TableColumnField[]>
    update: (fields: TableColumnField[]) => PromiseLike<unknown>
  }
  config: Record<string, XTableRequestConfigColumnsProps<QR, D>>
}

export interface XTableRequestConfigEvents<PT, QR, D> extends XTableRequestEvents<PT, QR, D> {}

const { request, config, fields, pagination = true, showOverflowTooltip = undefined } = defineProps<XTableRequestConfigProps<U, PT, QR, D>>()
const emit = defineEmits<XTableRequestConfigEvents<PT, QR, D>>()

const { data, execute, path, query, isFetching, url, paging } = request()

const search = useDebounceFn(async () => {
  emit('prepare', { path: path.value, query: query.value })
  execute()
})

const { data: fieldsData } = fields()
const visibleColumns = useArrayFilter(fieldsData, it => it.visible)

const columns = useArrayMap(visibleColumns, (it) => {
  const _config = config[it.code]
  return {
    label: _config?.label ?? it.label,
    prop: _config?.prop ?? it.prop,
    width: _config?.width ?? it.width,
    content: _config?.content
  } as XTableColumnProps<D>
})

const T = () => <XTableFlex data={data.value} columns={columns.value} showOverflowTooltip={showOverflowTooltip} />

const P = () => (
  <XPagination
    size="small"
    total={paging.value.itemCount}
    currentPage={paging.value.pageIndex}
    pageSize={paging.value.pageSize}
    onUpdate:currentPage={value => paging.value.pageIndex = value ?? 0}
    onUpdate:pageSize={value => paging.value.pageSize = value ?? 0}
    onCurrentChange={() => execute()}
    onSizeChange={() => execute()}
  />
)

const sortable = useTemplateRef('sortable')
const { option } = useSortable(sortable, fieldsData)
option('animation', 150)
option('ghostClass', 'bg-(--el-color-primary-light-7)')
option('handle', '.cursor-grab')
option('onUpdate', (e: { oldIndex: number, newIndex: number }) => {
  moveArrayElement(fieldsData.value, e.oldIndex, e.newIndex, e)
  nextTick(() => {})
})

defineExpose({ search, data, paging, isFetching, url, query })
</script>

<template>
  <div class="relative flex-1 overflow-hidden flex flex-col gap-2">
    <ElPopover trigger="click" width="auto" popper-class="shadow-xl bg-(--el-bg-color)">
      <template #reference>
        <XButton :icon="Setting" text class="absolute top-0 right-0 z-1000" />
      </template>
      <ElText size="small">
        表头设置
      </ElText>
      <ElScrollbar :max-height="500">
        <div ref="sortable" class="flex flex-col">
          <div v-for="item of fieldsData" :key="item.code" class="w-50 px-2 flex items-center gap-2">
            <XButton text :icon="Rank" type="primary" size="small" />
            <ElText class="flex-1 overflow-ellipsis">
              {{ item.label }}
            </ElText>
            <ElSwitch size="small" :model-value="item.visible"></ElSwitch>
          </div>
        </div>
      </ElScrollbar>
    </ElPopover>
    <T />
    <div v-if="pagination" class="flex justify-end">
      <P />
    </div>
  </div>
</template>
