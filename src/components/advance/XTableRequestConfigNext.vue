<script setup lang="tsx" generic="U, PT, QR, D">
import type { Ref, VNodeChild } from 'vue'
import type { XTableFlexEvents, XTableFlexProps, XTableRequestColumnsProps } from '@/components/advance'
import type { XTableColumnProps } from '@/components/basic'
import type { Paging, TableColumnField } from '@/types'
import { Rank, Setting } from '@element-plus/icons-vue'
import { useArrayFilter, useArrayMap, useDebounceFn } from '@vueuse/core'
import { moveArrayElement, useSortable } from '@vueuse/integrations/useSortable'
import { ElPopover, ElScrollbar, ElSpace, ElSwitch, ElText } from 'element-plus'
import { nextTick, useTemplateRef } from 'vue'

import { XButtonAsync, XTableFlex } from '@/components/advance'
import { XButton, XForm, XFormItem, XInput, XPagination } from '@/components/basic'

export interface XTableRequestConfigColumnsProps<QR, D> extends Omit<XTableRequestColumnsProps<D>, 'content'> {
  content?: (scope: { row: D, index: number }) => VNodeChild
  search?: (scope: { query: QR }) => VNodeChild
}

export interface XTableRequestConfigProps<U, PT, QR, D> extends Omit<XTableFlexProps<D>, 'columns' | 'showOverflowTooltip'> {
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
  pagination?: boolean
}

export interface XTableRequestConfigEvents<PT, QR, D> extends XTableFlexEvents<D> {
  prepare: [parameters: { path: PT, query: QR }]
}

const { request, config, fields, pagination = true } = defineProps<XTableRequestConfigProps<U, PT, QR, D>>()
const emit = defineEmits<XTableRequestConfigEvents<PT, QR, D>>()

const { data, execute, path, query, isFetching, url, paging } = request()

const init = JSON.stringify(query.value)

const search = useDebounceFn(async () => {
  emit('prepare', { path: path.value, query: query.value })
  execute()
})
const reset = useDebounceFn(async () => {
  query.value = JSON.parse(init) as QR
  search()
})

const { data: fieldsData, update } = fields()
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

const items = useArrayFilter(visibleColumns, it => it.search)

const Q = () => (
  <XForm
    data={query.value as object}
    disabled={isFetching.value}
    content={({ data }) => (
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2">
        {[
          ...items.value.map(
            (it) => {
              const _config = config[it.code]
              return (
                <XFormItem
                  label={_config?.label ?? it.label}
                  content={() => _config?.search?.({ query: data as QR }) ?? <XInput disabled modelValue={it.code} />}
                />
              )
            }
          ),
          <XFormItem content={() => (
            <ElSpace>
              <XButtonAsync action={() => search()}>查询</XButtonAsync>
              <XButton onClick={() => reset()}>重置</XButton>
            </ElSpace>
          )}
          />
        ]}
      </div>
    )}
  />
)

const T = () => (
  <XTableFlex
    data={data.value}
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

defineExpose({ search, data, paging, isFetching, url, query, path })
</script>

<template>
  <Q class="pt-4 px-2 rounded bg-(--el-fill-color-light)" />

  <div v-loading="isFetching" class="relative flex-1 overflow-hidden flex flex-col gap-2">
    <ElPopover trigger="click" width="auto" popper-class="shadow-xl bg-(--el-bg-color)">
      <template #reference>
        <XButton :icon="Setting" text class="absolute top-0 right-0 z-1000" />
      </template>
      <div class="flex flex-col gap-2">
        <ElText size="large">
          表头设置
        </ElText>
        <ElScrollbar :max-height="500">
          <div ref="sortable" class="flex flex-col divide-y divide-[#f2f6fc]">
            <div
              v-for="item of fieldsData"
              :key="item.code"
              class="w-50 py-2 flex items-center gap-2"
            >
              <XButton text :icon="Rank" type="primary" size="small" class="cursor-grab" />
              <ElText class="flex-1 overflow-ellipsis">
                {{ item.label }}
              </ElText>
              <ElSwitch size="small" :model-value="item.visible"></ElSwitch>
            </div>
          </div>
        </ElScrollbar>
      </div>
    </ElPopover>
    <T />
    <div v-if="pagination" class="flex justify-end">
      <P />
    </div>
  </div>
</template>
