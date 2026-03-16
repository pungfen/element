<script setup lang="tsx" generic="MV extends string | string[]">
import type { UploadProps } from 'element-plus'

import { ElUpload } from 'element-plus'
import { computed, inject } from 'vue'

import { X_FORM_ITEM_VALIDATION } from '../constants'

export interface XUploadProps {
  accept?: UploadProps['accept']
  data?: UploadProps['data']
  disabled?: UploadProps['disabled']
  limit?: UploadProps['limit']
  showFileList?: UploadProps['showFileList']
}

defineProps<XUploadProps>()

const model = defineModel<MV>()

const fileList = computed(() => [...[] as string[], ...model.value || []].reverse().map(item => ({ name: item.split('/').findLast(() => true)!, url: item })))

const formItemValidation = inject(X_FORM_ITEM_VALIDATION, undefined)
if (formItemValidation?.required) {
  const { label, validator } = formItemValidation
  formItemValidation.validator = () => {
    if (!model.value || (Array.isArray(model.value) && model.value.length === 0)) {
      return `请选择${label}`
    }
    return validator?.()
  }
}
</script>

<template>
  <ElUpload v-bind="{ disabled, accept, data, limit, fileList, showFileList }">
    <slot />
  </ElUpload>
</template>
