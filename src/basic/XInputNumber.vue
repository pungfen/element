<script setup lang="tsx" generic="V extends number">
import type { InputNumberProps } from 'element-plus'
import { inject } from 'vue'

import { X_FORM_ITEM_VALIDATION } from '../constants'

export interface XInputNumberProps {
  placeholder?: string
  disabled?: boolean
  align?: InputNumberProps['align']
  size?: InputNumberProps['size']
  step?: number
  max?: number
  min?: number
  controls?: boolean
  precision?: number
  stepStrictly?: boolean
}

const props = withDefaults(defineProps<XInputNumberProps>(), {
  align: 'left',
  disabled: undefined,
  placeholder: '请输入'
})
const emit = defineEmits<{ blur: [] }>()
const model = defineModel<V>()

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { validator, label } = formItemValidation
  formItemValidation.validator = () => {
    if (model.value === undefined) {
      return `请输入${label}`
    }
    return validator?.()
  }
}

const blur = () => {
  formItemValidation?.validate()
  emit('blur')
}
</script>

<template>
  <ElInputNumber v-bind="props" v-model="model" @blur="blur" />
</template>
