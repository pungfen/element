<script setup lang="tsx" generic="MV extends string | number">
import type { InputProps } from 'element-plus'
import type { VNode } from 'vue'
import { ElInput, useLocale } from 'element-plus'
import { inject } from 'vue'

import { X_FORM_ITEM_VALIDATION, X_LOCALE_CONFIG } from '../constants'

export interface XInputProps {
  clearable?: InputProps['clearable']
  disabled?: InputProps['disabled']
  size?: InputProps['size']
  type?: InputProps['type']
  showPassword?: InputProps['showPassword']
  autocomplete?: InputProps['autocomplete']
  autosize?: InputProps['autosize']
  placeholder?: InputProps['placeholder']
}

defineProps<XInputProps>()
defineEmits<{
  blur: [e: FocusEvent]
  focus: [e: FocusEvent]
}>()
defineSlots<{
  append: () => VNode
  prefix: () => VNode
  prepend: () => VNode
  suffix: () => VNode
}>()
const model = defineModel<MV>()

const locale = inject(X_LOCALE_CONFIG)

const { t } = useLocale(locale)

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
</script>

<template>
  <ElInput
    v-bind="{
      disabled,
      type,
      size,
      clearable,
      showPassword,
      autocomplete,
      autosize,
      placeholder: placeholder ?? t('el.input.placeholder'),
    }"
    v-model="model"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
  >
    <template v-if="'append' in $slots" #append>
      <slot name="append" />
    </template>
    <template v-if="'prepend' in $slots" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="'prefix' in $slots" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="'suffix' in $slots" #suffix>
      <slot name="suffix" />
    </template>
  </ElInput>
</template>
