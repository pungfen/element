<script setup lang="tsx" generic="V extends string | string[]">
import type { UploadProps } from 'element-plus'

import type { Component } from 'vue'
import { ElUpload } from 'element-plus'
import { computed, inject } from 'vue'

import { X_FORM_ITEM_VALIDATION } from '../constants'

export interface XUploadProps {
  action?: string
  data?: UploadProps['data']
  disabled?: boolean
  limit?: number
  multiple?: boolean
  showFileList?: boolean
  drag?: boolean
  accept?: string
  listType?: 'picture' | 'picture-card' | 'text'
  beforeUpload?: UploadProps['beforeUpload']
  onSuccess?: UploadProps['onSuccess']
  onPreview?: UploadProps['onPreview']
}
const props = withDefaults(defineProps<XUploadProps>(), { disabled: undefined, maxSize: Infinity, showFileList: true })

defineSlots<{ default?: Component, file?: Component, tip?: Component }>()

const model = defineModel<V>()

const fileList = computed(() =>
  ([] as string[])
    .concat(model.value ?? [])
    .reverse()
    .map(it => ({
      name: it.split('/').findLast(() => true)!,
      url: it,
      uid: Number(
        it
          .slice(0, it.lastIndexOf('/'))
          .split('/')
          .findLast(() => true)!
      )
    }))
)

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { validator, label } = formItemValidation
  formItemValidation.validator = () => {
    if (
      !model.value
      || (Array.isArray(model.value) && model.value.length === 0)
    ) {
      return `请上传${label}`
    }
    return validator?.()
  }
}
</script>

<template>
  <ElUpload
    v-bind="{ ...props, fileList }"
  >
    <template #file="{ file }">
      <slot name="file" :file="file"></slot>
    </template>

    <slot></slot>

    <template #tip>
      <slot name="tip"></slot>
    </template>
  </ElUpload>
</template>
