<script setup lang="tsx">
import { ElCheckbox, useLocale } from 'element-plus'
import { inject } from 'vue'

import { X_FORM_ITEM_VALIDATION, X_LOCALE_CONFIG } from '@/constants'

import type { CheckboxProps, CheckboxValueType } from 'element-plus'

export interface XCheckboxProps {
  disabled?: boolean
  size?: CheckboxProps['size']
  label?: CheckboxProps['label']
  trueValue?: CheckboxProps['trueValue']
  falseValue?: CheckboxProps['falseValue']
}

const { disabled = undefined } = defineProps<XCheckboxProps>()

defineEmits<{
  blur: [e: FocusEvent]
  focus: [e: FocusEvent]
}>()

const model = defineModel<CheckboxValueType>()

const locale = inject(X_LOCALE_CONFIG)
const { t } = useLocale(locale)

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { label, validator } = formItemValidation
  formItemValidation.validator = () => {
    if (label && !model.value) {
      return t('el.validation.input', { label })
    }
    return validator?.()
  }
}
</script>

<template>
  <ElCheckbox v-bind="{ disabled }" v-model="model" />
</template>
