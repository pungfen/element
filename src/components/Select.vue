<script setup lang="tsx" generic="D, V, MV extends V | V[]">
import type { SelectProps } from 'element-plus'
import type { Ref } from 'vue'

import { useArrayMap } from '@vueuse/core'
import { ElOption, ElSelect, useLocale } from 'element-plus'
import { computed, inject, ref, watch } from 'vue'

import { X_FORM_ITEM_VALIDATION, X_LOCALE_CONFIG } from '../constants'

export interface XSelectOptionProps<V> {
  disabled?: boolean
  label?: number | string
  value: V
}

export interface XSelectProps<D, V> {
  collapseTagsTooltip?: SelectProps['collapseTagsTooltip']
  clearable?: SelectProps['clearable']
  allowCreate?: SelectProps['allowCreate']
  collapseTags?: SelectProps['collapseTags']
  data?: D[]
  disabled?: SelectProps['disabled']
  factory: (option: D) => XSelectOptionProps<V>

  filterable?: SelectProps['filterable']
  identify?: (value: V) => number | string
  loading?: SelectProps['loading']
  multiple?: SelectProps['multiple']
  remote?: SelectProps['remote']

  remoteMethod?: (query: string) => void
  size?: SelectProps['size']

  supplement?: (lacks: V[]) => D[] | PromiseLike<D[]>
  placeholder?: SelectProps['placeholder']
}

const {
  allowCreate,
  data,
  disabled = false,
  factory,
  identify,
  supplement
} = defineProps<XSelectProps<D, V>>()

const emit = defineEmits<{
  blur: [e: FocusEvent]
  change: [value: MV]
  focus: []
}>()

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
      const lacks = [...[] as V[], ...Array.isArray(model.value) ? model.value : [model.value]]
        .filter(item => !init.value.map(it => forward(it.value)).includes(forward(item)))
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
  { immediate: true }
)

const localOptions = computed(() =>
  options.value.map((item) => {
    const key = forward(item.value)
    return { disabled: item.disabled, key, label: item.label, value: key }
  })
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
  }
})

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { label, validator } = formItemValidation
  formItemValidation.validator = () => {
    if (!model.value || (Array.isArray(model.value) && model.value.length === 0)) {
      return `请选择${label}`
    }
    return validator?.()
  }
}
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
    }"
    v-model="localModel"
    @blur="emit('blur', $event)"
  >
    <ElOption
      v-for="option of localOptions"
      :key="option.key"
      :label="option.label"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </ElOption>
  </ElSelect>
</template>
