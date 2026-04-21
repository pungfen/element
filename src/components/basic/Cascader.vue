<script setup lang="tsx" generic="D, V, MV extends V | V[]">
import { ElCascader, useLocale } from 'element-plus'
import { computed, inject, watchEffect } from 'vue'

import { X_FORM_ITEM_VALIDATION, X_LOCALE_CONFIG } from '@/constants'

import type { CascaderComponentProps, CascaderNodeValue, CascaderOption } from 'element-plus'

export interface XCascaderOptionProps<D, V> {
  children?: D[]
  disabled?: boolean
  label?: number | string
  value: V
  leaf?: boolean
}

export interface XCascaderProps<D, V> {
  data?: D[]
  factory?: (option: D, level: number) => XCascaderOptionProps<D, V>

  clearable?: CascaderComponentProps['clearable']
  disabled?: CascaderComponentProps['disabled']
  filterable?: CascaderComponentProps['filterable']
  size?: CascaderComponentProps['size']
  placeholder?: CascaderComponentProps['placeholder']
  props?: CascaderComponentProps['props']
}

const { data, disabled = undefined } = defineProps<XCascaderProps<D, V>>()

const locale = inject(X_LOCALE_CONFIG)
const { t } = useLocale(locale)

const model = defineModel<MV>()

const options = computed(() => (data ?? []) as CascaderOption[])

const localModel = computed({
  get: () => model.value as CascaderNodeValue,
  set: (value) => {
    model.value = value as MV
  }
})

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { label, validator } = formItemValidation
  formItemValidation.validator = () => {
    if (label && (!model.value || (Array.isArray(model.value) && model.value.length === 0))) {
      return t('el.validation.cascader', { label })
    }
    return validator?.()
  }
}
</script>

<template>
  <ElCascader
    v-model="localModel"
    v-bind="{
      clearable,
      disabled,
      filterable,
      size,
      options,
      props,
      placeholder: placeholder ?? t('el.select.placeholder')
    }"
  />
</template>
