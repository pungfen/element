<script setup lang="tsx" generic="D, V, MV extends V | V[]">
import type { SelectProps } from 'element-plus'
import type { Ref } from 'vue'

import { useArrayMap } from '@vueuse/core'
import { ElOption, ElSelect, useLocale } from 'element-plus'
import { computed, type FunctionalComponent, inject, ref, type VNodeChild, watch } from 'vue'

import { X_FORM_ITEM_VALIDATION, X_LOCALE_CONFIG } from '@/constants'

export interface XSelectEvents<V> {
  blur: [e: FocusEvent]
  change: [value: V]
  focus: [e: FocusEvent]
}

export interface XSelectOptionProps<V> {
  disabled?: boolean
  label?: number | string
  render?: VNodeChild
  value: V
}

export interface XSelectProps<D, V> {
  allowCreate?: SelectProps['allowCreate']
  clearable?: SelectProps['clearable']
  collapseTags?: SelectProps['collapseTags']
  collapseTagsTooltip?: SelectProps['collapseTagsTooltip']
  data?: D[]
  defaultFirstOption?: SelectProps['defaultFirstOption']
  disabled?: SelectProps['disabled']
  factory: (option: D) => XSelectOptionProps<V>

  filterable?: SelectProps['filterable']
  identify?: (value: V) => number | string
  loading?: SelectProps['loading']
  multiple?: SelectProps['multiple']
  placeholder?: SelectProps['placeholder']

  remote?: SelectProps['remote']
  remoteMethod?: (query: string) => void

  size?: SelectProps['size']
  supplement?: (lacks: V[]) => D[] | PromiseLike<D[]>
}

const {
  allowCreate,
  data,
  disabled = undefined,
  factory,
  identify,
  supplement,
} = defineProps<XSelectProps<D, V>>()

const emit = defineEmits<XSelectEvents<V>>()

const model = defineModel<MV>()

const locale = inject(X_LOCALE_CONFIG)
const { t } = useLocale(locale)

const supplements = ref([]) as Ref<D[]>
const init = useArrayMap(() => data ?? [], factory)
const options = computed(() => [...useArrayMap(supplements, factory).value, ...init.value])

const forward = (value: V) => {
  if (typeof value === 'object') {
    if (identify) {
      return identify(value)
    }
    else {
      throw new Error('`identify` is required when value\'s type extends `object` or `object[]`')
    }
  }
  else {
    return value as number | string
  }
}
const backward = (key: number | string) =>
  options.value.map(item => item.value).find(item => forward(item) === key)

let no = 0
watch(
  [model, init],
  async () => {
    no++
    if (model.value) {
      const lacks = [
        ...([] as V[]),
        ...(Array.isArray(model.value) ? model.value : [model.value]),
      ].filter(item => !init.value.map(it => forward(it.value)).includes(forward(item)))
      const _no = no
      const _data = await supplement?.(lacks)
      if (_no === no && _data) {
        supplements.value = _data
      }
    }
    else {
      supplements.value = []
    }
  },
  { immediate: true },
)

const localOptions = computed(() =>
  options.value.map((item) => {
    const key = forward(item.value) as V
    return { disabled: item.disabled, key, label: item.label, render: item.render, value: key }
  }),
)

const localModel = computed({
  get: () =>
    model.value
    && (Array.isArray(model.value) ? model.value.map(forward) : forward(model.value as V)),
  set: (value) => {
    if (Array.isArray(value)) {
      model.value = value.map(item => backward(item)!) as MV
    }
    else {
      model.value
        = value === undefined
          ? undefined
          : ((backward(value) ?? (allowCreate ? value : undefined)) as MV)
    }
  },
})

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { label, validator } = formItemValidation
  formItemValidation.validator = () => {
    if (label && (!model.value || (Array.isArray(model.value) && model.value.length === 0))) {
      return t('el.validation.select', { label })
    }
    return validator?.()
  }
}

const blur = (e: FocusEvent) => {
  emit('blur', e)
  formItemValidation?.validate?.()
}
const focus = (e: FocusEvent) => {
  emit('focus', e)
}
const change = (value: V) => {
  emit('change', value)
}

const XOption: FunctionalComponent<XSelectOptionProps<V>> = props => (
  <ElOption
    disabled={props.disabled}
    label={props.label}
    value={props.value as boolean | object | string}
  >
    {props.render ?? props.label}
  </ElOption>
)
</script>

<template>
  <ElSelect
    v-bind="{
      placeholder: placeholder ?? t('el.select.placeholder'),
      disabled,
      allowCreate,
      remote,
      filterable: filterable || remote,
      clearable,
      remoteMethod,
      multiple,
      loading,
      size,
      collapseTags,
      collapseTagsTooltip,
      defaultFirstOption: defaultFirstOption || allowCreate
    }"
    v-model="localModel"
    @blur="blur"
    @focus="focus"
    @change="change"
  >
    <XOption
      v-for="option of localOptions"
      :label="option.label"
      :value="option.value"
      :disabled="option.disabled"
      :render="option.render"
    />
  </ElSelect>
</template>
