<script setup lang="tsx">
import { ElInputNumber, useLocale } from 'element-plus'
import { inject } from 'vue'

import { X_FORM_ITEM_VALIDATION, X_LOCALE_CONFIG } from '@/constants'

import type { InputNumberProps } from 'element-plus'
import type { VNode } from 'vue'

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

const { disabled = undefined } = defineProps<XInputNumberProps>()

const emit = defineEmits<{
  blur: [e: FocusEvent]
  focus: [e: FocusEvent]
}>()

defineSlots<{
  prefix: () => VNode
  suffix: () => VNode
}>()

const model = defineModel<number>()

const locale = inject(X_LOCALE_CONFIG)
const { t } = useLocale(locale)

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { label, validator } = formItemValidation
  formItemValidation.validator = () => {
    if (label && !model.value) {
      return t('el.validation.inputNumber', { label })
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
    v-bind="{
      align,
      controls,
      disabled,
      inputmode,
      max,
      min,
      placeholder: placeholder ?? t('el.inputNumber.placeholder'),
      precision,
      size,
      step,
      stepStrictly
    }"
    v-model="model"
    @blur="blur"
    @focus="focus"
  >
    <template v-if="'prefix' in $slots" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="'suffix' in $slots" #suffix>
      <slot name="suffix" />
    </template>
  </ElInputNumber>
</template>
