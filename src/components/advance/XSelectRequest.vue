<script setup lang="tsx" generic="U, PT, QR, D, V, MV extends V | V[]">
import { useDebounceFn } from '@vueuse/core'

import { XSelect, type XSelectEvents, type XSelectProps } from '@/basic'

import type { Ref } from 'vue'

export interface XSelectRequestProps<U, PT, QR, D, V> extends Omit<
  XSelectProps<D, V>,
  'supplement'
> {
  request: () => {
    data: Ref<D[]>
    execute: () => PromiseLike<unknown>
    isFetching: Ref<boolean>
    path: Ref<PT>
    query: Ref<QR>
    url: U
  }
  supplement?: (lacks: V[], url: U) => D[] | PromiseLike<D[]>
}

export interface XSelectRequestEvents<PT, QR, V> extends XSelectEvents<V> {
  prepare: [parameters: { path: PT; query: QR }, input?: string]
}

const {
  request,
  supplement,
  disabled = undefined,
  multiple = undefined
} = defineProps<XSelectRequestProps<U, PT, QR, D, V>>()

const emit = defineEmits<XSelectRequestEvents<PT, QR, V>>()

const model = defineModel<MV>()

const { data, isFetching, path, url, execute, query } = request()

const search = useDebounceFn(async (input?: string) => {
  emit('prepare', { path: path.value, query: query.value }, input)
  execute()
})
const _supplement = supplement && ((lacks: V[]) => supplement!(lacks, url))

defineExpose({ search, data, path, url, execute, query })
</script>

<template>
  <XSelect
    v-bind="{
      data,
      supplement: _supplement,
      remoteMethod: search,
      factory,
      allowCreate,
      clearable,
      collapseTags,
      identify,
      remote,
      filterable: remote || filterable,
      disabled: disabled,
      loading: isFetching || loading,
      multiple,
      size
    }"
    v-model="model"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    @change="$emit('change', $event)"
  />
</template>
