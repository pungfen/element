<script setup lang="tsx" generic="V extends string">
import type { DatePickerProps } from 'element-plus'

import { ElDatePicker, useLocale } from 'element-plus'
import { computed, inject } from 'vue'

import { X_FORM_ITEM_VALIDATION, X_LOCALE_CONFIG, X_ELEMENT_CONFIG } from '@/constants'

export interface XDateConfig {
  valueFormat?: DatePickerProps['valueFormat']
}

export interface XDatePickerProps extends XDateConfig {
  disabled?: boolean
  disabledDate?: DatePickerProps['disabledDate']
  endPlaceholder?: DatePickerProps['endPlaceholder']
  placeholder?: DatePickerProps['placeholder']
  shortcuts?: DatePickerProps['shortcuts']
  startPlaceholder?: DatePickerProps['startPlaceholder']
  type?: DatePickerProps['type']
  size?: DatePickerProps['size']
}

const { disabled = undefined, type = 'date' } = defineProps<XDatePickerProps>()

defineEmits<{
  blur: [e: FocusEvent]
  focus: [e: FocusEvent]
}>()

const model = defineModel<V>()
const start = defineModel<V>('start')
const end = defineModel<V>('end')

const config = inject(X_ELEMENT_CONFIG)
const locale = inject(X_LOCALE_CONFIG)
const { t } = useLocale(locale)

const modelValue = computed({
  get() {
    if (type.includes('range') && start.value && end.value) {
      return [start.value, end.value]
    } else if (!type.includes('range')) {
      return model.value
    }
    return null
  },
  set(value) {
    if (type.includes('range') && Array.isArray(value)) {
      start.value = value?.[0] as V
      end.value = value?.[1] as V
    } else {
      model.value = value as V
    }
  }
})

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { label, validator } = formItemValidation
  formItemValidation.validator = () => {
    if (label && type.includes('range') && (!start.value || !end.value)) {
      return t('el.validation.datepicker', { label })
    } else if (label && !type.includes('range') && !model.value) {
      return t('el.validation.datepicker', { label })
    }
    return validator?.()
  }
}
</script>

<template>
  <ElDatePicker
    v-bind="{
      disabled,
      disabledDate,
      type,
      valueFormat: valueFormat ?? config?.datePicker?.valueFormat,
      placeholder: placeholder ?? t('el.datepicker.placeholder'),
      startPlaceholder: startPlaceholder ?? placeholder ?? t('el.datepicker.startPlaceholder'),
      endPlaceholder: endPlaceholder ?? placeholder ?? t('el.datepicker.endPlaceholder'),
      shortcuts,
      size
    }"
    v-model="modelValue"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  />
</template>
