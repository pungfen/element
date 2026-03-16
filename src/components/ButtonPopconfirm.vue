<script setup lang="ts">
import type { XButtonProps } from './Button.vue'
import { ElPopconfirm } from 'element-plus'
import XButton from './Button.vue'

export interface XButtonPopconfirmProps extends XButtonProps {
  title?: string
}

const { title = '是否执行?' } = defineProps<XButtonPopconfirmProps>()

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()
</script>

<template>
  <ElPopconfirm
    :title="title"
    @cancel="() => emit('cancel')"
    @confirm="() => emit('confirm')"
  >
    <template #reference>
      <XButton v-bind="{ disabled, type, text, size, link }">
        <slot></slot>
      </XButton>
    </template>
    <template #actions="{ confirm, cancel }">
      <XButton size="small" @click="cancel">
        取消
      </XButton>
      <XButton type="danger" size="small" @click="confirm">
        确定
      </XButton>
    </template>
  </ElPopconfirm>
</template>
