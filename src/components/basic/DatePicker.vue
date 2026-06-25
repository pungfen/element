<script setup lang="tsx" generic="V extends string">
import type { DatePickerProps } from 'element-plus'

import { ElDatePicker, useLocale } from 'element-plus'
import { computed, inject } from 'vue'

import { useXConfig } from '@/composables/useXConfig'
import { X_FORM_ITEM_VALIDATION, X_LOCALE_CONFIG } from '@/constants'

export interface XDateConfig {
  teleported?: boolean
  valueFormat?: DatePickerProps['valueFormat']
}

export interface XDatePickerProps extends XDateConfig {
  disabled?: boolean
  disabledDate?: DatePickerProps['disabledDate']
  endPlaceholder?: DatePickerProps['endPlaceholder']
  placeholder?: DatePickerProps['placeholder']
  shortcuts?: DatePickerProps['shortcuts']
  size?: DatePickerProps['size']
  startPlaceholder?: DatePickerProps['startPlaceholder']
  type?: DatePickerProps['type']
}

const { disabled = undefined, teleported = true, type = 'date', valueFormat } = defineProps<XDatePickerProps>()

defineEmits<{ blur: [e: FocusEvent], focus: [e: FocusEvent] }>()

const model = defineModel<V>()
const start = defineModel<V>('start')
const end = defineModel<V>('end')

const locale = inject(X_LOCALE_CONFIG, undefined)
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
      start.value = value[0]
      end.value = value[1]
    }
    else {
      model.value = value as V
    }
  },
})

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { label, validator } = formItemValidation
  formItemValidation.validator = () => {
    if (label && type.includes('range') && (!start.value || !end.value)) {
      return t('el.validation.datepicker', { label })
    }
    else if (label && !type.includes('range') && !model.value) {
      return t('el.validation.datepicker', { label })
    }
    return validator?.()
  }
}

const config = useXConfig('datePicker')
const _valueFormat = computed(() => valueFormat ?? config.value?.valueFormat)
</script>

<template>
  <ElDatePicker
    v-bind="{
      disabled,
      disabledDate,
      type,
      valueFormat: _valueFormat,
      placeholder: placeholder ?? t('el.datepicker.placeholder'),
      startPlaceholder: startPlaceholder ?? placeholder ?? t('el.datepicker.startPlaceholder'),
      endPlaceholder: endPlaceholder ?? placeholder ?? t('el.datepicker.endPlaceholder'),
      shortcuts,
      size,
      teleported
    }"
    v-model="modelValue"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  />
</template>
