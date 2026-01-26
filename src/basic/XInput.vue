<script setup lang="tsx" generic="V extends string">
import type { InputProps } from 'element-plus'
import { ElInput } from 'element-plus'
import { inject } from 'vue'

import {
  X_FORM_ITEM_LABEL,
  X_FORM_ITEM_VALIDATION,
  X_TABLE_QUERY_EXECUTE_HOOK,
  X_TABLE_QUERY_UPDATE_HOOK
} from '../constants'

export interface XInputProps {
  clearable?: boolean
  placeholder?: string
  disabled?: boolean
  size?: InputProps['size']
  type?: InputProps['type']
  showPassword?: boolean
  autosize?: InputProps['autosize']
}

const props = withDefaults(defineProps<XInputProps>(), {
  disabled: undefined,
  placeholder: '请输入'
})
const emit = defineEmits<{ blur: [], change: [value: V] }>()

const model = defineModel<V>()

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { validator, label } = formItemValidation
  formItemValidation.validator = () => {
    if (!model.value) {
      return `请输入${label}`
    }
    return validator?.()
  }
}

const formItemLabel = inject(X_FORM_ITEM_LABEL, undefined)
const tableQueryUpdateHook = inject(X_TABLE_QUERY_UPDATE_HOOK, undefined)
const tableQueryExecuteHook = inject(X_TABLE_QUERY_EXECUTE_HOOK, undefined)
tableQueryUpdateHook?.on(
  ([label, value]) =>
    formItemLabel === label && value === undefined && (model.value = undefined)
)
tableQueryExecuteHook?.on(
  () =>
    formItemLabel && tableQueryUpdateHook?.trigger([formItemLabel, model.value])
)

const change = (value: string | undefined) => emit('change', value as V)
const blur = () => {
  formItemValidation?.validate()
  emit('blur')
}
</script>

<template>
  <ElInput v-bind="props" v-model="model" @blur="blur" @change="change" />
</template>
