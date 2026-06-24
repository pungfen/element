<script setup lang="tsx" generic="U, PT, QR, D">
import type { Ref, VNodeChild } from 'vue'

import { useDebounceFn } from '@vueuse/core'

import type { Paging } from '@/types'

export interface XRequestEvents<PT, QR> {
  prepare: [parameters: { path: PT, query: QR }]
}

export interface XRequestProps<U, PT, QR, D> {
  content?: (scope: {
    data: D
    isFetching: boolean
    paging: Paging
    path: PT
    query: QR
    search: () => PromiseLike<unknown>
  }) => VNodeChild
  request: () => {
    data: Ref<D>
    execute: () => PromiseLike<unknown>
    isFetching: Ref<boolean>
    paging: Ref<Paging>
    path: Ref<PT>
    query: Ref<QR>
    url: U
  }
}

const { content, request } = defineProps<XRequestProps<U, PT, QR, D>>()
defineSlots<{
  default: (scope: {
    data: D
    isFetching: boolean
    paging: Paging
    path: PT
    query: QR
    search: () => PromiseLike<unknown>
  }) => VNodeChild
}>()
const emit = defineEmits<XRequestEvents<PT, QR>>()
const { data, execute, isFetching, paging, path, query, url } = request()

const search = useDebounceFn(async () => {
  emit('prepare', { path: path.value, query: query.value })
  execute()
})
const Content = () => content?.({
  data: data.value,
  isFetching: isFetching.value,
  paging: paging.value,
  path: path.value,
  query: query.value,
  search,
})

defineExpose({ data, execute, isFetching, paging, path, query, search, url })
</script>

<template>
  <slot
    :data="data"
    :paging="paging"
    :path="path"
    :query="query"
    :is-fetching="isFetching"
    :search="search"
  >
    <Content />
  </slot>
</template>
