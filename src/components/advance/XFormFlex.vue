<script setup lang="tsx" generic="D extends object">
import type { XFormProps } from '@/components/basic'
import { useElementSize } from '@vueuse/core'
import { ElScrollbar } from 'element-plus'
import { useTemplateRef } from 'vue'

import { XForm } from '@/components/basic'

export interface XFormFlexProps<D> extends XFormProps<D> {}

const { content, data } = defineProps<XFormFlexProps<D>>()

const container = useTemplateRef('container')
const size = useElementSize(container)

const form = useTemplateRef('form')

const validate = () => form.value?.validate()
const clearValidate = () => form.value?.clearValidate()

defineExpose({ validate, clearValidate })

const Content = () => (
  <ElScrollbar height={size.height.value}>
    {content?.({ data: data ?? {} } as { data: D })}
  </ElScrollbar>
)
</script>

<template>
  <div ref="container" class="flex-1 overflow-hidden">
    <XForm ref="form" v-bind="$props" :content="Content" />
  </div>
</template>
