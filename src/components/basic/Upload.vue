<script setup lang="tsx">
import type { UploadFile, UploadProps } from 'element-plus'
import type { VNodeChild } from 'vue'

import { ElUpload } from 'element-plus'
import { inject } from 'vue'

import { X_FORM_ITEM_VALIDATION } from '@/constants'

export interface XUploadProps {
  accept?: UploadProps['accept']
  action?: UploadProps['action']
  beforeUpload?: UploadProps['beforeUpload']
  data?: UploadProps['data']
  disabled?: UploadProps['disabled']
  fileList?: UploadProps['fileList']
  limit?: UploadProps['limit']
  multiple?: UploadProps['multiple']
  onPreview?: UploadProps['onPreview']
  onRemove?: UploadProps['onRemove']
  onSuccess?: UploadProps['onSuccess']
  showFileList?: UploadProps['showFileList']
}

const {
  multiple,
  onPreview,
  onRemove,
  onSuccess,
  showFileList = undefined,
} = defineProps<XUploadProps>()

defineSlots<{
  default: () => VNodeChild
  file: (scope: { file: UploadFile, index: number }) => VNodeChild
  tip: () => VNodeChild
  trigger: () => VNodeChild
}>()

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { validator } = formItemValidation
  formItemValidation.validator = () => {
    return validator?.()
  }
}

const success: UploadProps['onSuccess'] = (_, uploadFile, uploadFiles) => {
  onSuccess?.(_, uploadFile, uploadFiles)
}

const remove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  onRemove?.(uploadFile, uploadFiles)
}

const preview: UploadProps['onPreview'] = (uploadFile) => {
  onPreview?.(uploadFile)
}
</script>

<template>
  <ElUpload
    v-bind="{
      action,
      disabled,
      accept,
      data,
      limit,
      fileList,
      showFileList,
      multiple,
      beforeUpload,
      onPreview: preview,
      onSuccess: success,
      onRemove: remove
    }"
  >
    <slot />

    <template
      v-if="'file' in $slots"
      #file="{ file, index }"
    >
      <slot
        name="file"
        :file="file"
        :index="index"
      />
    </template>

    <template
      v-if="'tip' in $slots"
      #tip
    >
      <slot name="tip" />
    </template>

    <template
      v-if="'trigger' in $slots"
      #trigger
    >
      <slot name="trigger" />
    </template>
  </ElUpload>
</template>
