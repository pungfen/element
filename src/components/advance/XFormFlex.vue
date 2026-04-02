<script setup lang="tsx" generic="D extends object">
import { ElScrollbar } from 'element-plus'
import { useTemplateRef } from 'vue'

import { XForm, type XFormProps } from '@/basic'

export interface XFormFlexProps<D> extends XFormProps<D> {}

const { content, data } = defineProps<XFormFlexProps<D>>()

const form = useTemplateRef('form')

const validate = () => form.value?.validate()
const clearValidate = () => form.value?.clearValidate()

defineExpose({ validate, clearValidate })

const Content = () => content?.({ data: data ?? {} } as { data: D })
</script>

<template>
  <div class="flex-1 overflow-hidden">
    <ElScrollbar>
      <XForm ref="form" v-bind="$props" :content="Content" />
    </ElScrollbar>
  </div>
</template>
