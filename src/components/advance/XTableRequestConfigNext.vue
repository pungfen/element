<script setup lang="tsx" generic="U, PT, QR, D">
import type { Ref, VNodeChild } from 'vue'
import type { XTableRequestColumnsProps, XTableRequestEvents, XTableRequestProps } from '@/components/advance'
import type { XTableColumnProps } from '@/components/basic'
import type { Paging, TableColumnField } from '@/types'
import { Rank, Setting } from '@element-plus/icons-vue'
import { useArrayFilter, useArrayMap, useDebounceFn } from '@vueuse/core'
import { useSortable } from '@vueuse/integrations/useSortable'
import { ElScrollbar, ElSwitch, ElText, ElTooltip } from 'element-plus'
import { ref } from 'vue'

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

const button = ref()

const B = () => <XButton ref={button} icon={Setting} text type="info" />

const T = () => <XTableFlex data={data.value} columns={columns.value} showOverflowTooltip={showOverflowTooltip} />

const P = () => (
  <XPagination
    total={paging.value.itemCount}
    currentPage={paging.value.pageIndex}
    pageSize={paging.value.pageSize}
    onUpdate:currentPage={value => paging.value.pageIndex = value ?? 0}
    onUpdate:pageSize={value => paging.value.pageSize = value ?? 0}
    onCurrentChange={() => execute()}
    onSizeChange={() => execute()}
  />
)

const sortable = ref()
useSortable(sortable, fieldsData)
const S = () => (
  <ElTooltip virtualTriggering virtualRef={button.value} trigger="click">
    <ElText size="small">表头设置</ElText>
    <ElScrollbar height={200}>
      <div ref={sortable} class="flex flex-col">
        {() => fieldsData.value.map(
          it => (
            <div class="p-2 flex items-center gap-2">
              <XButton text icon={Rank} type="primary" />
              <ElText size="small" class="flex-1 overflow-ellipsis">{it.label}</ElText>
              <ElSwitch size="small"></ElSwitch>
            </div>
          )
        )}
      </div>
    </ElScrollbar>
  </ElTooltip>
)

defineExpose({ search, data, paging, isFetching, url, query })
</script>

<template>
  <div class="relative flex-1 overflow-hidden flex flex-col gap-2">
    <B class="absolute top-0 right-0" style="z-index: 2;" />
    <T />
    <div v-if="pagination" class="flex justify-end">
      <P />
    </div>
    <S />
  </div>
</template>
