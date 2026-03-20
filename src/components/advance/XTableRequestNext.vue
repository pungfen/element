<script setup lang="tsx" generic="U, PT, QR, D">
import type { Ref, VNodeChild } from 'vue'
import type { XRequestProps, XTableFlexEvents, XTableFlexProps } from '@/components/advance'
import type { XTableColumnProps } from '@/components/basic'
import type { Paging } from '@/types'
import { useDebounceFn } from '@vueuse/core'
import { XRequest, XTableFlex } from '@/components/advance'
import { XPagination } from '@/components/basic'

export interface XTableRequestColumnsProps<D> extends XTableColumnProps<D> {
  content?: (scope: { index: number, row: D }) => VNodeChild
}

export interface XTableRequestProps<U, PT, QR, D> extends
  Omit<XRequestProps<U, PT, QR, D>, 'request'>,
  Omit<XTableFlexProps<D>, 'data' | 'columns'> {
  request: () => {
    data: Ref<D[]>
    execute: () => PromiseLike<unknown>
    isFetching: Ref<boolean>
    paging: Ref<Paging>
    path: Ref<PT>
    query: Ref<QR>
    url: U
  }
  pagination?: boolean
  columns: XTableRequestColumnsProps<D>[]
}

export interface XTableRequestEvents<PT, QR, D> extends XTableFlexEvents<D> {
  prepare: [parameters: { path: PT, query: QR }]
}

const { request, columns } = defineProps<XTableRequestProps<U, PT, QR, D>>()
const emit = defineEmits<XTableRequestEvents<PT, QR, D>>()

const { data, execute, path, query, isFetching, url, paging } = request()

const search = useDebounceFn(async () => {
  emit('prepare', { path: path.value, query: query.value })
  execute()
})

defineExpose({ search, data, paging, isFetching, url, query })

const X = () => (
  <XRequest
    request={request}
    onPrepare={parameters => emit('prepare', parameters)}
    content={() => (
      <>
        <XTableFlex data={data.value} columns={columns} />
        <XPagination />
      </>
    )}
  />
)
</script>

<template>
  <div class="flex-1 overflow-hidden flex flex-col">
    <X />
  </div>
</template>
