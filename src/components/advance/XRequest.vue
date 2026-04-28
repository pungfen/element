<script setup lang="tsx" generic="U, PT, QR, D">
import type { Ref, VNodeChild } from 'vue'

import { useDebounceFn } from '@vueuse/core'

import type { Paging } from '@/types'

export interface XRequestProps<U, PT, QR, D> {
  request: () => {
    data: Ref<D>
    execute: () => PromiseLike<unknown>
    isFetching: Ref<boolean>
    paging: Ref<Paging>
    path: Ref<PT>
    query: Ref<QR>
    url: U
  }
  content?: (scope: {
    data: D
    query: QR
    path: PT
    isFetching: boolean
    paging: Paging
    search: () => PromiseLike<unknown>
  }) => VNodeChild
}

export interface XRequestEvents<PT, QR> {
  prepare: [parameters: { path: PT; query: QR }]
}

const { request, content } = defineProps<XRequestProps<U, PT, QR, D>>()
const emit = defineEmits<XRequestEvents<PT, QR>>()
defineSlots<{
  default: (scope: {
    data: D
    search: () => PromiseLike<unknown>
    isFetching: boolean
    paging: Paging
    path: PT
    query: QR
  }) => VNodeChild
}>()

const { data, paging, path, query, isFetching, url, execute } = request()

const search = useDebounceFn(async () => {
  emit('prepare', { path: path.value, query: query.value })
  execute()
})
const Content = () =>
  content?.({
    data: data.value,
    path: path.value,
    isFetching: isFetching.value,
    query: query.value,
    paging: paging.value,
    search
  })

defineExpose({ data, paging, path, query, isFetching, url, execute, search })
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
