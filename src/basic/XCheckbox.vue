<script setup lang="tsx" generic="D, V, MV extends V">
import type { CheckboxProps } from 'element-plus'
import { useArrayMap } from '@vueuse/core'
import { ElCheckbox, ElCheckboxGroup } from 'element-plus'
import { computed, inject } from 'vue'

import { X_FORM_ITEM_VALIDATION } from '../constants'

export interface XCheckboxOptionProps<V> {
  disabled?: boolean
  label?: number | string
  value: V
}

export interface XCheckboxProps<D, V> extends Partial<
  Omit<CheckboxProps, 'options' | 'modelValue'>
> {
  data: D[]
  factory: (option: D) => XCheckboxOptionProps<V>
  identify?: (value: V) => number | string
}

const { factory, data, identify, disabled, size }
  = defineProps<XCheckboxProps<D, V>>()
const model = defineModel<MV[]>()

const init = useArrayMap(() => data, factory)
const options = computed(() => [...init.value])

const forward = (value: V) => {
  if (typeof value === 'object') {
    if (identify) {
      return identify(value)
    }
    else {
      throw new Error(
        '`identify` is required when value\'s type extends `object` or `object[]`'
      )
    }
  }
  else {
    return value as number | string
  }
}
const backward = (key: number | string) =>
  options.value.map(item => item.value).find(item => forward(item) === key)

const _options = computed(() =>
  options.value.map((item) => {
    const key = forward(item.value)
    return { ...item, key, value: key }
  })
)
const _model = computed({
  get: () => model.value && model.value.map(forward),
  set: val =>
    (model.value = Array.isArray(val)
      ? (val.map(item => backward(item)!) as MV[])
      : [])
})

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { validator, label } = formItemValidation
  formItemValidation.validator = () => {
    if (
      !model.value
      || (Array.isArray(model.value) && model.value.length === 0)
    ) {
      return `请选择${label}`
    }
    return validator?.()
  }
}
</script>

<template>
  <ElCheckboxGroup v-model="_model" v-bind="{ disabled, size }">
    <ElCheckbox
      v-for="item of _options"
      :key="item.key"
      :disabled="item.disabled"
      :label="item.label"
      :value="item.value"
    ></ElCheckbox>
  </ElCheckboxGroup>
</template>
