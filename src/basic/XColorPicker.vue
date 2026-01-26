<script setup lang="tsx" generic="D, V extends string">
import { ElColorPicker } from 'element-plus'
import { inject } from 'vue'

import {
  X_FORM_ITEM_LABEL,
  X_FORM_ITEM_VALIDATION,
  X_TABLE_QUERY_EXECUTE_HOOK,
  X_TABLE_QUERY_UPDATE_HOOK
} from '../constants'

export interface XColorPickerProps {
  clearable?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<XColorPickerProps>(), {
  disabled: undefined
})

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
</script>

<template>
  <ElColorPicker v-bind="props" v-model="model" />
</template>
