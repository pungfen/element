<script setup lang="tsx" generic="V extends string">
import type { DatePickerProps } from 'element-plus'
import { ElDatePicker } from 'element-plus'
import { computed, inject } from 'vue'

import { X_FORM_ITEM_VALIDATION } from '../constants'

export interface XDatePickerProps {
  disabled?: boolean
  disabledDate?: DatePickerProps['disabledDate']
  endPlaceholder?: DatePickerProps['endPlaceholder']
  placeholder?: DatePickerProps['placeholder']
  shortcuts?: DatePickerProps['shortcuts']
  startPlaceholder?: DatePickerProps['startPlaceholder']
  type?: DatePickerProps['type']
  valueFormat?: DatePickerProps['valueFormat']
}

const {
  endPlaceholder = '结束日期',
  placeholder = '请选择',
  startPlaceholder = '开始日期',
  type = 'date'
} = defineProps<XDatePickerProps>()

defineEmits<{
  blur: [e: FocusEvent]
  focus: [e: FocusEvent]
}>()
const model = defineModel<V>()
const start = defineModel<V>('start')
const end = defineModel<V>('end')

const modelValue = computed({
  get() {
    if (type.includes('range') && start.value && end.value) {
      return [start.value, end.value]
    }
    else if (!type.includes('range')) {
      return model.value
    }
    return null
  },
  set(value) {
    if (type.includes('range') && Array.isArray(value)) {
      start.value = value?.[0] as V
      end.value = value?.[1] as V
    }
    else {
      model.value = value as V
    }
  }
})

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { label, validator } = formItemValidation
  formItemValidation.validator = () => {
    if (type.includes('range') && (!start.value || !end.value)) {
      return `请选择${label}`
    }
    else if (!model.value) {
      return `请选择${label}`
    }
    return validator?.()
  }
}
</script>

<template>
  <ElDatePicker
    v-bind="{ disabled, disabledDate, type, valueFormat, placeholder, startPlaceholder, endPlaceholder, shortcuts }"
    v-model="modelValue"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  />
</template>
