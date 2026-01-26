<script lang="tsx">
import type { FormInstance } from 'element-plus'
import type { VNodeChild } from 'vue'
import { ElForm, ElFormItem, ElMessage } from 'element-plus'
import { defineComponent, inject, provide, ref } from 'vue'

import {
  X_FORM_ITEM_LABEL,
  X_FORM_ITEM_VALIDATION,
  X_FORM_TAB_UPDATE_HOOK,
  X_FORM_VALIDATIONS,
  X_TAB_PANE
} from '../constants'

export interface XFormItemProps {
  content?: () => VNodeChild
  label?: string
  labelPosition?: '' | 'left' | 'right' | 'top'
  labelWidth?: number | string
  required?: boolean
  tooltip?: { type?: 'success' | 'warning', content?: string }
}

export interface XFormItemValidation {
  label: string
  required: boolean
  clearValidate: () => void
  validate: () => boolean
  validator?: () => string | void
}

export const XFormItem = defineComponent(
  (props: XFormItemProps, { expose }) => {
    const tabPane = inject(X_TAB_PANE, undefined)
    const formTabUpdateHook = inject(X_FORM_TAB_UPDATE_HOOK, undefined)

    const error = ref<string | undefined>()
    const validation = {
      label: props.label,
      required: props.required,
      clearValidate() {
        error.value = undefined
      },
      validate() {
        error.value = validation.validator?.() ?? undefined
        if (error.value && tabPane?.name) {
          ElMessage({ plain: true, type: 'warning', message: error.value })
          formTabUpdateHook?.trigger(tabPane.name)
        }
        return !error.value
      }
    } as XFormItemValidation
    const validations = inject(X_FORM_VALIDATIONS, undefined)
    validations?.push(validation)
    provide(X_FORM_ITEM_VALIDATION, validation)
    expose({ ...validation })
    provide(X_FORM_ITEM_LABEL, props.label)
    return () => (
      <ElFormItem
        {...{
          label: props.label,
          labelPosition: props.labelPosition,
          labelWidth: props.labelWidth,
          required: props.required
        }}
        error={error.value}
      >
        {{
          label: () => props.label,
          default: () => props.content?.()
        }}
      </ElFormItem>
    )
  },
  {
    props: ['label', 'required', 'content', 'tooltip']
  }
)
</script>

<script setup lang="tsx" generic="D extends object">
export interface XFormItemConfig<D> extends Omit<
  XFormItemProps,
  'content' | 'label'
> {
  content?: (scope: { data: D }) => VNodeChild
  label: string
}

export interface XFormProps<D> {
  content?: (scope: { data: D }) => VNodeChild
  data?: D
  disabled?: boolean
  inline?: boolean
  labelWidth?: number | string
  labelPosition?: 'left' | 'right' | 'top'
  statusIcon?: boolean
}

const {
  data = () => {},
  content,
  inline,
  disabled,
  labelWidth,
  labelPosition,
  statusIcon = true
} = defineProps<XFormProps<D>>()

const form = ref<FormInstance | null>()

const validations = [] as XFormItemValidation[]
provide(X_FORM_VALIDATIONS, validations)
const validate = () => validations.every(item => item.validate())

const resetFields = () => {
  form.value?.resetFields()
  validations.forEach(item => item.clearValidate())
}

defineExpose({ data, validate, resetFields })

const Content = () => content?.({ data } as { data: D })
</script>

<template>
  <ElForm
    ref="form"
    v-bind="{
      inline,
      disabled,
      labelWidth,
      model: data,
      labelPosition,
      statusIcon,
    }"
  >
    <Content />
  </ElForm>
</template>
