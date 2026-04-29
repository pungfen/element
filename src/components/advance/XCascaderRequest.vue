<script setup lang="tsx" generic="U, PT, QR, D, V, MV extends V | V[]">
import type { CascaderComponentProps } from 'element-plus'
import type { Ref } from 'vue'

import { useDebounceFn } from '@vueuse/core'

import { XCascader, type XCascaderProps } from '@/basic'

export interface XCascaderRequestProps<U, PT, QR, D, V> extends Omit<
  XCascaderProps<D, V>,
  'data' | 'factory'
> {
  request: () => {
    data: Ref<D[]>
    execute: () => PromiseLike<unknown>
    isFetching: Ref<boolean>
    path: Ref<PT>
    query: Ref<QR>
    url: U
  }
  clearable?: CascaderComponentProps['clearable']
  disabled?: CascaderComponentProps['disabled']
  filterable?: CascaderComponentProps['filterable']
}

export interface XCascaderRequestEvents<PT, QR, V> {
  prepare: [parameters: { path: PT; query: QR }]
  change: [value: V]
}

const {
  disabled = undefined,
  props,
  request
} = defineProps<XCascaderRequestProps<U, PT, QR, D, V>>()

const emit = defineEmits<XCascaderRequestEvents<PT, QR, V>>()

const model = defineModel<MV>()

const { data, execute, path, query, url } = request()

const search = useDebounceFn(async () => {
  emit('prepare', { path: path.value, query: query.value })
  execute()
})

defineExpose({ data, execute, path, query, search, url })
</script>

<template>
  <XCascader v-model="model" v-bind="{ clearable, disabled, filterable, data, props }" />
</template>
