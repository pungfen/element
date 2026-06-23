<script setup lang="tsx" generic="U, PT, QR, D, V, MV extends V | V[]">
import type { Ref } from 'vue'

import { useDebounceFn } from '@vueuse/core'

import { XSelect, type XSelectEvents, type XSelectProps } from '@/basic'

export interface XSelectRequestEvents<PT, QR, V> extends XSelectEvents<V> {
  prepare: [parameters: { path: PT, query: QR }, input?: string]
}

export interface XSelectRequestProps<U, PT, QR, D, V> extends Omit<XSelectProps<D, V>, 'supplement'> {
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

const { disabled = undefined, multiple = undefined, request, supplement } = defineProps<XSelectRequestProps<U, PT, QR, D, V>>()

const emit = defineEmits<XSelectRequestEvents<PT, QR, V>>()

const model = defineModel<MV>()

const { data, execute, isFetching, path, query, url } = request()

let executeCounter = 0
let lastInput = ''
const search = useDebounceFn(async (input?: string) => {
  if (!executeCounter || input !== lastInput) {
    emit('prepare', { path: path.value, query: query.value }, input)
    lastInput = input ?? ''
    executeCounter += 1
    execute()
  }
})
const _supplement = supplement && ((lacks: V[]) => supplement(lacks, url))

defineExpose({ data, execute, path, query, search, url })
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
