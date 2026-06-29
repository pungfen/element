<script setup lang="tsx" generic="U, PT, QR, D extends DefaultRow">
import type { Ref, VNodeChild } from 'vue'

import { Rank, Setting } from '@element-plus/icons-vue'
import { useArrayFilter, useArrayMap, useDebounceFn } from '@vueuse/core'
import { moveArrayElement, useSortable } from '@vueuse/integrations/useSortable'
import { ElFormItem, ElPopover, ElScrollbar, ElSpace, ElSwitch, ElText, useLocale } from 'element-plus'
import { computed, inject, nextTick, ref } from 'vue'

import type { Paging, TableColumnField } from '@/types'

import { XButtonAsync, XTableFlex, type XTableFlexEvents, type XTableFlexProps, type XTableRequestColumnsProps } from '@/advance'
import { type DefaultRow, XButton, XForm, XFormItem, XInput, XPagination, type XTableColumnProps } from '@/basic'
import { X_LOCALE_CONFIG } from '@/constants'

export interface XTableRequestConfigColumnsProps<QR, D> extends Omit<XTableRequestColumnsProps<D>, 'content'> {
  content?: (scope: { index: number, row: D }) => VNodeChild
  search?: (scope: { query: QR }) => VNodeChild
}

export interface XTableRequestConfigEvents<PT, QR, D> extends XTableFlexEvents<D> {
  prepare: [parameters: { path: PT, query: QR }]
}

export interface XTableRequestConfigProps<U, PT, QR, D extends DefaultRow> extends Omit<XTableFlexProps<D>, 'columns' | 'showOverflowTooltip'> {
  config: Record<string, XTableRequestConfigColumnsProps<QR, D>>
  fields: () => {
    data: Ref<TableColumnField[]>
    loading: Ref<boolean>
    update: (fields: TableColumnField[]) => PromiseLike<unknown>
  }
  header?: (scope: {
    data: D[]
    isFetching: boolean
    paging: Paging
    path: PT
    query: QR
  }) => VNodeChild
  pagination?: boolean
  paginationLayout?: string
  request: () => {
    data: Ref<D[]>
    execute: () => PromiseLike<unknown>
    isFetching: Ref<boolean>
    paging: Ref<Paging>
    path: Ref<PT>
    query: Ref<QR>
    url: U
  }
}

const { config, fields, header, pagination = true, paginationLayout, request } = defineProps<XTableRequestConfigProps<U, PT, QR, D>>()
const emit = defineEmits<XTableRequestConfigEvents<PT, QR, D>>()

const { data, execute, isFetching, paging, path, query, url } = request()

const init = JSON.stringify(query.value)

const search = useDebounceFn(async () => {
  emit('prepare', { path: path.value, query: query.value })
  execute()
})
const reset = useDebounceFn(async () => {
  query.value = JSON.parse(init) as QR
  search()
})

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
  },
})

const locale = inject(X_LOCALE_CONFIG, undefined)
const { t } = useLocale(locale)

const Q = () => (
  <XForm
    content={({ data }) => (
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2">
        {[
          ...items.value.map(
            (it) => {
              const _config = config[it.code]
              return (
                <XFormItem
                  content={() => _config?.search?.({ query: data as QR }) ?? <XInput disabled modelValue={it.code} />}
                  label={_config?.label ?? it.label}
                />
              )
            },
          ),
          <ElFormItem>
            {{
              default: () => (
                <ElSpace>
                  <XButtonAsync
                    action={() => {
                      const _q = query.value as { pageIndex?: number, pageSize?: number }
                      _q.pageIndex = undefined
                      _q.pageSize = undefined
                      search()
                    }}
                  >
                    {t('el.common.query')}
                  </XButtonAsync>
                  <XButton onClick={() => reset()}>{t('el.common.reset')}</XButton>
                </ElSpace>
              ),
              label: () => <div style="height: 22px"></div>,
            }}
          </ElFormItem>,
        ]}
      </div>
    )}
    data={query.value as object}
    disabled={loading.value || isFetching.value}
    labelPosition={locale?.value.name.toLowerCase() === 'zh-cn' ? 'left' : 'top'}
  />
)

const H = () => header?.({ data: data.value, isFetching: isFetching.value, paging: paging.value, path: path.value, query: query.value })

const T = () => (
  <XTableFlex
    border
    columns={columns.value}
    data={data.value}
    onHeaderDragend={(newWidth, _oldWidth, column) => {
      const item = fieldsData.value.find(it => it.code === column.columnKey)
      if (item) {
        item.width = newWidth
        nextTick(() => {
          update(fieldsData.value)
        })
      }
    }}
    onScroll={({ scrollLeft, scrollTop }) => emit('scroll', { scrollLeft, scrollTop })}
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

const P = () => (
  <XPagination
    currentPage={paging.value.pageIndex}
    layout={paginationLayout}
    onCurrentChange={() => execute()}
    onSizeChange={() => {
      const _q = query.value as { pageIndex?: number }
      _q.pageIndex = 1
      execute()
    }}
    onUpdate:currentPage={value => (query.value as { pageIndex?: number }).pageIndex = value ?? 0}
    onUpdate:pageSize={value => (query.value as { pageSize?: number }).pageSize = value ?? 0}
    pageSize={paging.value.pageSize}
    size="small"
    total={paging.value.itemCount}
  />
)

defineExpose({ data, isFetching, paging, path, query, reset, search, url })
</script>

<template>
  <Q
    v-if="queryShow"
    class="rounded bg-(--el-fill-color-darker) px-2 pt-4"
  />

  <H />

  <div
    v-loading="loading || isFetching"
    class="relative flex flex-1 flex-col gap-2 overflow-hidden"
  >
    <S />

    <T />

    <div
      v-if="pagination"
      class="flex justify-end"
    >
      <P />
    </div>
  </div>
</template>
