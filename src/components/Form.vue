<script setup lang="tsx" generic="D extends object">
import type { VNodeChild } from 'vue'
import type { XFormItemValidation } from './FormItem.vue'
import { ElForm } from 'element-plus'
import { provide } from 'vue'
import { X_ELEMENT_IN_FORM, X_FORM_VALIDATIONS } from '../constants'

export interface XFormProps<D> {
  content?: (scope: { data: D }) => VNodeChild
  data?: D
  disabled?: boolean
  inline?: boolean
  labelPosition?: 'left' | 'right' | 'top'
  labelSuffix?: string
  labelWidth?: number | string
}

const { content, data, disabled = undefined } = defineProps<XFormProps<D>>()

const Content = () => content?.({ data: data ?? {} } as { data: D })

provide(X_ELEMENT_IN_FORM, true)

const validations = [] as XFormItemValidation[]
provide(X_FORM_VALIDATIONS, validations)
const validate = () => validations.every(item => item.validate())
const clearValidate = () => validations.forEach(it => it.clearValidate())

defineExpose({ clearValidate, data, validate })
</script>

<template>
  <ElForm
    v-bind="{
      model: data,
      disabled,
      inline,
      labelPosition,
      labelWidth,
      labelSuffix,
    }"
  >
    <Content />
  </ElForm>
</template>
