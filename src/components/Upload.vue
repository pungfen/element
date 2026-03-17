<script setup lang="tsx" generic="MV extends string | string[]">
import type { UploadFile, UploadProps } from 'element-plus'

import type { VNodeChild } from 'vue'
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

defineSlots<{
  default: () => VNodeChild
  file: (scope: { file: UploadFile, index: number }) => VNodeChild
  tips: () => VNodeChild
}>()

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

    <template v-if="'file' in $slots" #file>
      <slot name="file" />
    </template>
    <template v-if="'tips' in $slots" #tips>
      <slot name="tips" />
    </template>
  </ElUpload>
</template>
