<script setup lang="tsx" generic="V extends string">
import type { DatePickerProps } from 'element-plus'
import { ElConfigProvider, ElDatePicker, useLocale } from 'element-plus'
import { computed, inject, useAttrs } from 'vue'

import { X_FORM_ITEM_VALIDATION, X_LOCALE_CONFIG } from '../constants'

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

const { type = 'date', disabled = undefined } = defineProps<XDatePickerProps>()

defineEmits<{
  blur: [e: FocusEvent]
  focus: [e: FocusEvent]
}>()

const attrs = useAttrs()
const model = defineModel<V>()
const start = defineModel<V>('start')
const end = defineModel<V>('end')

const locale = inject(X_LOCALE_CONFIG)
const { t } = useLocale(locale)

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
  <ElConfigProvider :locale="locale">
    <ElDatePicker
      v-bind="{
        disabled,
        disabledDate,
        type,
        valueFormat,
        placeholder: placeholder ?? t('el.datepicker.placeholder'),
        startPlaceholder: placeholder ?? t('el.datepicker.startPlaceholder'),
        endPlaceholder: placeholder ?? t('el.datepicker.endPlaceholder'),
        shortcuts,
        ...attrs,
      }"
      v-model="modelValue"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
  </ElConfigProvider>
</template>
