<script setup lang="tsx" generic="U, PT, QR, D extends object">
import type { Ref, VNodeChild } from 'vue'
import type { XFormProps } from '@/components/basic'
import { useDebounceFn } from '@vueuse/core'
import { computed, useTemplateRef } from 'vue'

import { XForm } from '@/components/basic'

export interface XFormRequestProps<U, PT, QR, D> extends Omit<XFormProps<D>, 'disabled' | 'data'> {
  request: () => {
    data: Ref<D>
    execute: () => PromiseLike<unknown>
    isFetching: Ref<boolean>
    path: Ref<PT>
    query: Ref<QR>
    url: U
  }
  content?: (scope: { data: D }) => VNodeChild
  disabled?: ((scope: { data: D }) => boolean) | boolean
}

export interface XFormRequestEvents<PT, QR> {
  prepare: [parameters: { path: PT, query: QR }]
}

const { disabled = undefined, content, labelWidth = 'auto', request } = defineProps<XFormRequestProps<U, PT, QR, D>>()
const emit = defineEmits<XFormRequestEvents<PT, QR>>()

const { data, isFetching, execute, path, url, query } = request()
const _init = JSON.stringify(data.value)

const _disabled = computed(() => isFetching.value || (typeof disabled === 'function' ? disabled({ data: data.value }) : disabled))

const form = useTemplateRef('form')

const validate = () => form.value?.validate()
const clearValidate = () => form.value?.clearValidate()

const search = useDebounceFn(async () => {
  emit('prepare', { path: path.value, query: query.value })
  execute()
})
const reset = () => {
  data.value = JSON.parse(_init) as D
  clearValidate()
}

const _content = () => content?.({ data: data.value })

defineExpose({ data, url, search, validate, clearValidate, reset })
</script>

<template>
  <XForm
    ref="form"
    v-bind="{
      data,
      disabled: _disabled,
      inline,
      labelPosition,
      labelSuffix,
      labelWidth,
      content: _content,
    }"
  />
</template>
