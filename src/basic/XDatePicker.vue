<script setup lang="tsx" generic="V extends string">
import type { DatePickerProps } from 'element-plus'
import { ElDatePicker } from 'element-plus'
import { computed, inject } from 'vue'

import {
  X_FORM_ITEM_LABEL,
  X_FORM_ITEM_VALIDATION,
  X_TABLE_QUERY_EXECUTE_HOOK,
  X_TABLE_QUERY_UPDATE_HOOK
} from '../constants'

export interface XDatePickerProps extends Partial<DatePickerProps> {}

const {
  type = 'date',
  placeholder = '请选择',
  startPlaceholder = '开始日期',
  endPlaceholder = '结束日期',
  valueFormat
} = defineProps<XDatePickerProps>()
const emit = defineEmits<{
  blur: []
  change: [value: V | V[] | undefined]
}>()
const model = defineModel<V>()
const start = defineModel<V>('start')
const end = defineModel<V>('end')

const _model = computed({
  get: () => {
    if (type.includes('range') && start.value && end.value) {
      return [start.value, end.value]
    }
    else if (!type.includes('range')) {
      return model.value
    }
  },
  set: (value) => {
    if (type.includes('range')) {
      start.value = value?.[0] as V
      end.value = value?.[1] as V
    }
    else {
      model.value = value as V
    }
  }
})

const shortcuts = computed(() => {
  if (type.includes('range')) {
    return [
      {
        text: '最近一周',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        }
      },
      {
        text: '最近一月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        }
      },
      {
        text: '最近三月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        }
      }
    ]
  }
  else {
    return [
      {
        text: '昨天',
        value: new Date()
      },
      {
        text: '一周前',
        value: () => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          return date
        }
      },
      {
        text: '一月前',
        value: () => {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 30)
          return date
        }
      }
    ]
  }
})

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { validator, label } = formItemValidation
  formItemValidation.validator = () => {
    if (!_model.value || (type.includes('range') && !_model.value?.length)) {
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
        : Array.isArray(_model.value)
          ? `${_model.value[0]} 至 ${_model.value[1]}`
          : _model.value
    ])
)

const change = (value: V | V[] | undefined) => emit('change', value)
const blur = () => {
  formItemValidation?.validate?.()
  emit('blur')
}
</script>

<template>
  <ElDatePicker
    v-bind="{
      type,
      placeholder,
      startPlaceholder,
      endPlaceholder,
      shortcuts,
      valueFormat,
    }"
    v-model="_model"
    @blur="blur"
    @change="change"
  />
</template>
