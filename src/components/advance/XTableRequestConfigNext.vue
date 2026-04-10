<script setup lang="tsx" generic="U, PT, QR, D">
import type { Ref, VNodeChild } from 'vue'
import type { Paging, TableColumnField } from '@/types'
import { Rank, Setting } from '@element-plus/icons-vue'
import { useArrayFilter, useArrayMap, useDebounceFn } from '@vueuse/core'
import { moveArrayElement, useSortable } from '@vueuse/integrations/useSortable'
import { ElPopover, ElScrollbar, ElSpace, ElSwitch, ElText, useLocale } from 'element-plus'
import { computed, nextTick, ref, inject } from 'vue'

import { XButtonAsync, XTableFlex, type XTableFlexEvents, type XTableFlexProps, type XTableRequestColumnsProps } from '@/advance'
import { XButton, XForm, XFormItem, XInput, XPagination, type XTableColumnProps } from '@/basic'

import { X_LOCALE_CONFIG } from '@/constants'

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
    loading: Ref<boolean>
  }
  header?: (scope: {
    data: D[]
    query: QR
    path: PT
    isFetching: boolean
    paging: Paging
  }) => VNodeChild
  config: Record<string, XTableRequestConfigColumnsProps<QR, D>>
  pagination?: boolean
}

export interface XTableRequestConfigEvents<PT, QR, D> extends XTableFlexEvents<D> {
  prepare: [parameters: { path: PT, query: QR }]
}

const { request, config, fields, pagination = true, header } = defineProps<XTableRequestConfigProps<U, PT, QR, D>>()
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

const { data: fieldsData, update, loading } = fields()
const visibleColumns = useArrayFilter(fieldsData, it => it.visible)

const columns = useArrayMap(visibleColumns, (it) => {
  const _config = config[it.code]
  return {
    columnKey: it.code,
    label: _config?.label ?? it.label,
    prop: _config?.prop ?? it.prop,
    minWidth: it.width,
    content: _config?.content
  } as XTableColumnProps<D>
})

const items = useArrayFilter(visibleColumns, it => it.search)

const queryShow = computed(() => !!items.value.length)

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

const locale = inject(X_LOCALE_CONFIG, undefined)
const { t } = useLocale(locale)

const Q = () => (
  <XForm
    data={query.value as object}
    disabled={loading.value || isFetching.value}
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
              <XButtonAsync action={() => search()}>{t('el.common.query')}</XButtonAsync>
              <XButton onClick={() => reset()}>{t('el.common.reset')}</XButton>
            </ElSpace>
          )}
          />
        ]}
      </div>
    )}
  />
)

const H = () => header?.({ data: data.value, isFetching: isFetching.value, paging: paging.value, path: path.value, query: query.value })

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

const P = () => (
  <XPagination
    size="small"
    total={paging.value.itemCount}
    currentPage={paging.value.pageIndex}
    pageSize={paging.value.pageSize}
    onUpdate:currentPage={value => paging.value.pageIndex = value ?? 0}
    onUpdate:pageSize={value => paging.value.pageSize = value ?? 0}
    onCurrentChange={() => execute()}
    onSizeChange={() => {
      paging.value.pageIndex = 1
      execute()
    }}
  />
)

defineExpose({ search, data, paging, isFetching, url, query, path })
</script>

<template>
  <Q v-if="queryShow" class="rounded bg-(--el-fill-color-darker) px-2 pt-4" />

  <H />

  <div
    v-loading="loading || isFetching"
    class="relative flex flex-1 flex-col gap-2 overflow-hidden"
  >
    <S />
    <T />
    <div v-if="pagination" class="flex justify-end">
      <P />
    </div>
  </div>
</template>
