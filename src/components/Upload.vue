<script setup lang="tsx" generic="MV extends string | string[]">
import type { UploadFile, UploadProps } from 'element-plus'

import type { VNodeChild } from 'vue'
import { ElUpload } from 'element-plus'
import { inject } from 'vue'

import { X_FORM_ITEM_VALIDATION } from '../constants'

export interface XUploadProps {
  accept?: UploadProps['accept']
  data?: UploadProps['data']
  disabled?: UploadProps['disabled']
  limit?: UploadProps['limit']
  showFileList?: UploadProps['showFileList']
  fileList?: UploadProps['fileList']
}

defineProps<XUploadProps>()

defineSlots<{
  default: () => VNodeChild
  file: (scope: { file: UploadFile, index: number }) => VNodeChild
  tip: () => VNodeChild
  trigger: () => VNodeChild
}>()

const model = defineModel<MV>()

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { label, validator } = formItemValidation
  formItemValidation.validator = () => {
    if (!model.value || (Array.isArray(model.value) && model.value.length === 0)) {
      return `请上传${label}`
    }
    return validator?.()
  }
}
</script>

<template>
  <ElUpload v-bind="{ disabled, accept, data, limit, fileList, showFileList }">
    <slot />

    <template v-if="'file' in $slots" #file="{ file, index }">
      <slot name="file" :file="file" :index="index" />
    </template>
    <template v-if="'tip' in $slots" #tip>
      <slot name="tip" />
    </template>
    <template v-if="'trigger' in $slots" #trigger>
      <slot name="trigger" />
    </template>
  </ElUpload>
</template>
