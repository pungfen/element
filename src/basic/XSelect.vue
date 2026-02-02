<script setup lang="tsx" generic="D, V, MV extends V | V[]">
import type { SelectProps } from 'element-plus'

import type { Ref } from 'vue'
import { useArrayMap } from '@vueuse/core'
import { ElOption, ElSelect } from 'element-plus'

import { computed, inject, ref, watch } from 'vue'

import {
  X_FORM_ITEM_LABEL,
  X_FORM_ITEM_VALIDATION,
  X_TABLE_QUERY_EXECUTE_HOOK,
  X_TABLE_QUERY_UPDATE_HOOK
} from '../constants'

export interface XSelectOptionProps<V> {
  disabled?: boolean
  label?: number | string
  value: V
}

export interface XSelectProps<D, V> extends Partial<
  Omit<SelectProps, 'modelValue'>
> {
  data: D[]
  factory: (option: D) => XSelectOptionProps<V>
  identify?: (value: V) => number | string
  supplement?: (lacks: V[]) => D[] | PromiseLike<D[]>
}

const {
  factory,
  data,
  identify,
  supplement,
  allowCreate,
  clearable,
  disabled = undefined,
  filterable,
  placeholder = '请选择',
  remote,
  remoteMethod,
  size,
  loading,
  multiple,
  collapseTags
} = defineProps<XSelectProps<D, V>>()

const emit = defineEmits<{
  blur: []
  change: [value: MV]
}>()

const model = defineModel<MV>()

const supplements = ref([]) as Ref<D[]>
const init = useArrayMap(() => data, factory)
const options = computed(() => [
  ...useArrayMap(supplements, factory).value,
  ...init.value
])

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

let no = 0
watch(
  [model, init],
  async () => {
    no++
    if (model.value) {
      const lacks = ([] as V[])
        .concat(model.value)
        .filter(
          item =>
            !init.value.map(it => forward(it.value)).includes(forward(item))
        )
      const _no = no
      const data = await supplement?.(lacks)
      if (_no === no && data) {
        supplements.value = data
      }
    }
    else {
      supplements.value = []
    }
  },
  { immediate: true }
)

const _options = computed(() =>
  options.value.map((item) => {
    const key = forward(item.value)
    return { ...item, key, value: key }
  })
)
const _model = computed({
  get: () =>
    model.value
    && (Array.isArray(model.value)
      ? model.value.map(forward)
      : forward(model.value as V)),
  set: (val) => {
    if (Array.isArray(val)) {
      model.value = val.map(item => backward(item)!) as MV
    }
    else {
      model.value
        = val === undefined
          ? undefined
          : ((backward(val) || (allowCreate ? val : undefined)) as MV)
    }
  }
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

const formItemLabel = inject(X_FORM_ITEM_LABEL, undefined)
const tableQueryUpdateHook = inject(X_TABLE_QUERY_UPDATE_HOOK, undefined)
const tableQueryExecuteHook = inject(X_TABLE_QUERY_EXECUTE_HOOK, undefined)
tableQueryUpdateHook?.on(
  ([label, value]) =>
    formItemLabel === label && value === undefined && (_model.value = undefined)
)
tableQueryExecuteHook?.on(
  () =>
    formItemLabel
    && tableQueryUpdateHook?.trigger([
      formItemLabel,
      _model.value === undefined
        ? undefined
        : ([] as (string | number)[])
            .concat(_model.value)
            .map(
              item =>
                _options.value.find(option => option.value === item)!.label
            )
            .join(',')
    ])
)

const change = (value: string | undefined) => emit('change', value as MV)
const blur = () => {
  formItemValidation?.validate()
  emit('blur')
}
</script>

<template>
  <ElSelect
    v-bind="{
      allowCreate,
      clearable,
      filterable,
      remote,
      remoteMethod,
      placeholder,
      disabled,
      size,
      loading,
      multiple,
      collapseTags,
      collapseTagsTooltip: collapseTags,
    }"
    v-model="_model"
    @blur="blur"
    @change="change"
  >
    <ElOption
      v-for="item of _options"
      :key="item.key"
      :label="item.label"
      :value="item.value"
    >
      {{ item.label }}
    </ElOption>
  </ElSelect>
</template>
