<script setup lang="ts">
import { ElPopconfirm } from 'element-plus'

export interface XReconfirmProps {
  title?: string
}

const { title = '是否执行?' } = defineProps<XReconfirmProps>()

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
      <slot></slot>
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
