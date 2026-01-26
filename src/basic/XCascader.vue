<script setup lang="tsx" generic="D, V extends string">
import type { CascaderProps } from 'element-plus'
import { ElCascader } from 'element-plus'
import { inject } from 'vue'

import {
  X_FORM_ITEM_LABEL,
  X_FORM_ITEM_VALIDATION,
  X_TABLE_QUERY_EXECUTE_HOOK,
  X_TABLE_QUERY_UPDATE_HOOK
} from '../constants'

export interface XCascaderProps {
  clearable?: boolean
  placeholder?: string
  disabled?: boolean
  props?: CascaderProps
}

const props = withDefaults(defineProps<XCascaderProps>(), {
  disabled: undefined,
  placeholder: '请选择'
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

const blur = () => {
  formItemValidation?.validate()
  emit('blur')
}
</script>

<template>
  <ElCascader v-bind="props" v-model="model" @blur="blur" />
</template>
