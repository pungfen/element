<script setup lang="tsx" generic="D extends object">
import type { VNodeChild } from 'vue'

import { ElForm, type FormProps } from 'element-plus'
import { provide, useTemplateRef } from 'vue'

import { X_ELEMENT_IN_FORM, X_FORM_VALIDATIONS } from '@/constants'

import type { XFormItemValidation } from './FormItem.vue'

export interface XFormProps<D> {
  content?: (scope: { data: D }) => VNodeChild
  data?: D
  disabled?: boolean
  inline?: boolean
  labelPosition?: 'left' | 'right' | 'top'
  labelSuffix?: string
  labelWidth?: number | string
  size?: FormProps['size']
}

const { content, data, disabled = undefined } = defineProps<XFormProps<D>>()

const form = useTemplateRef('form')

const Content = () => content?.({ data: data ?? {} } as { data: D })

provide(X_ELEMENT_IN_FORM, true)

const validations = [] as XFormItemValidation[]
provide(X_FORM_VALIDATIONS, validations)
const validate = () => validations.every((item) => item.validate())
const clearValidate = () => validations.forEach((it) => it.clearValidate())
const resetFields = () => {
  clearValidate()
  form.value?.resetFields()
}

defineExpose({ clearValidate, data, resetFields, validate })
</script>

<template>
  <ElForm
    ref="form"
    v-bind="{
      model: data,
      disabled,
      inline,
      labelPosition,
      labelWidth,
      labelSuffix,
      size
    }"
  >
    <Content />
  </ElForm>
</template>
