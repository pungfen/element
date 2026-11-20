<script setup lang="tsx" generic="D extends object">
import type { VNodeChild } from 'vue'

import { ElForm, type FormProps } from 'element-plus'
import { computed, provide, useTemplateRef } from 'vue'

import { X_ELEMENT_IN_FORM, X_FORM_VALIDATIONS } from '@/constants'

import type { XFormItemValidation } from './FormItem.vue'

export interface XFormProps<D> extends FormProps {
  content?: (scope: { data: D }) => VNodeChild
  data?: D
}

const props = withDefaults(defineProps<XFormProps<D>>(), {
  disabled: undefined,
  hideRequiredAsterisk: undefined,
  inline: undefined,
  inlineMessage: undefined,
  scrollIntoViewOptions: undefined,
  scrollToError: undefined,
  showMessage: undefined,
  statusIcon: undefined,
  validateOnRuleChange: undefined,
})

const formProps = computed(() => Object.fromEntries(
  Object.entries(props).filter(([key]) => key !== 'content' && key !== 'data' && key !== 'model'),
))

const form = useTemplateRef('form')

const Content = () => props.content?.({ data: (props.data ?? {}) as D })

provide(X_ELEMENT_IN_FORM, true)

const validations = [] as XFormItemValidation[]
provide(X_FORM_VALIDATIONS, validations)
const validate = () => validations.every(item => item.validate())
const clearValidate = () => validations.forEach(it => it.clearValidate())
const resetFields = () => {
  clearValidate()
  form.value?.resetFields()
}

defineExpose({ clearValidate, data: computed(() => props.data), resetFields, validate })
</script>

<template>
  <ElForm
    ref="form"
    v-bind="formProps"
    :model="props.data"
    @submit.prevent
  >
    <Content />
  </ElForm>
</template>
