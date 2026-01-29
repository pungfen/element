<script setup lang="tsx" generic="V extends string | string[]">
import type { UploadFile, UploadFiles, UploadRawFile } from 'element-plus'

import { ElMessage, ElUpload } from 'element-plus'
import { computed, inject } from 'vue'

import { X_FORM_ITEM_VALIDATION } from '../constants'

export interface XUploadProps {
  action?: string
  data?: () => Record<string, unknown>
  disabled?: boolean
  limit?: number
  multiple?: boolean
  showFileList?: boolean
  drag?: boolean
  accept?: string
  listType?: 'picture' | 'picture-card' | 'text'
  maxSize?: number
}
const {
  limit,
  disabled = undefined,
  maxSize = Infinity,
  showFileList = true
} = defineProps<XUploadProps>()

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

const beforeUpload = (rawFile: UploadRawFile) => {
  if (rawFile.size > maxSize) {
    ElMessage.warning('文件过大,请重新选择')
  }
  return rawFile.size < maxSize
}
const preview = (uploadFile: UploadFile) => window.open(uploadFile.url)
const remove = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  model.value = (
    Array.isArray(model.value) ? uploadFiles.map(it => it.url) : undefined
  ) as V
}
</script>

<template>
  <ElUpload
    v-bind="{
      limit,
      disabled,
      data,
      maxSize,
      showFileList,
      fileList,
      beforeUpload,
      onPreview: preview,
      onRemove: remove,
    }"
  >
    <template #file="{ file }">
      <slot name="file" :file="file"></slot>
    </template>

    <slot></slot>
  </ElUpload>
</template>
