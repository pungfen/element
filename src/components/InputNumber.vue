<script setup lang="tsx">
import type { InputNumberProps } from 'element-plus'
import type { VNode } from 'vue'
import { ElInputNumber } from 'element-plus'
import { inject } from 'vue'

import { X_FORM_ITEM_VALIDATION } from '../constants'

export interface XInputNumberProps {
  align?: InputNumberProps['align']
  controls?: InputNumberProps['controls']
  disabled?: InputNumberProps['disabled']
  inputmode?: InputNumberProps['inputmode']
  max?: InputNumberProps['max']
  min?: InputNumberProps['min']
  placeholder?: InputNumberProps['placeholder']
  precision?: InputNumberProps['precision']
  size?: InputNumberProps['size']
  step?: InputNumberProps['step']
  stepStrictly?: InputNumberProps['stepStrictly']
}

const { disabled = false } = defineProps<XInputNumberProps>()

const emit = defineEmits<{
  blur: [e: FocusEvent]
  focus: [e: FocusEvent]
}>()

defineSlots<{
  prefix: () => VNode
  suffix: () => VNode
}>()

const model = defineModel<number>()

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { label, validator } = formItemValidation
  formItemValidation.validator = () => {
    if (!model.value) {
      return `请输入${label}`
    }
    return validator?.()
  }
}

const focus = (e: FocusEvent) => {
  emit('focus', e)
}

const blur = (e: FocusEvent) => {
  emit('blur', e)
}
</script>

<template>
  <ElInputNumber
    v-bind="{ ...$props, disabled }"
    v-model="model"
    @blur="blur"
    @focus="focus"
  >
    <template
      v-if="'prefix' in $slots"
      #prefix
    >
      <slot name="prefix" />
    </template>
    <template
      v-if="'suffix' in $slots"
      #suffix
    >
      <slot name="suffix" />
    </template>
  </ElInputNumber>
</template>
