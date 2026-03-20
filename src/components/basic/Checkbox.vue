<script setup lang="tsx">
import type { CheckboxProps, CheckboxValueType } from 'element-plus'
import { ElCheckbox } from 'element-plus'
import { inject } from 'vue'

import { X_FORM_ITEM_VALIDATION } from '@/constants'

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

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { label, validator } = formItemValidation
  formItemValidation.validator = () => {
    if (!model.value) {
      return `请选择${label}`
    }
    return validator?.()
  }
}
</script>

<template>
  <ElCheckbox v-bind="{ disabled }" v-model="model" />
</template>
