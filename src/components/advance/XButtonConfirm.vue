<script setup lang="ts">
import type { XButtonProps } from '@/components/basic/Button.vue'
import { ElPopconfirm } from 'element-plus'
import { computed, inject } from 'vue'
import { XButton } from '@/components/basic'

import { X_ELEMENT_IN_TABLE } from '@/constants'

export interface XButtonConfirmProps extends XButtonProps {
  title?: string
}

const { title = '是否执行?', link = undefined } = defineProps<XButtonConfirmProps>()

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()

const inTable = inject(X_ELEMENT_IN_TABLE, undefined)
const _link = computed(() => link ?? inTable)
</script>

<template>
  <ElPopconfirm
    :title="title"
    @cancel="() => emit('cancel')"
    @confirm="() => emit('confirm')"
  >
    <template #reference>
      <XButton
        v-bind="{
          disabled,
          icon,
          type,
          link: _link,
          size,
          text,
        }"
      >
        <slot></slot>
      </XButton>
    </template>
    <template #actions="{ confirm, cancel }">
      <XButton size="small" :disabled="false" @click="cancel">
        取消
      </XButton>
      <XButton type="danger" :disabled="false" size="small" @click="confirm">
        确定
      </XButton>
    </template>
  </ElPopconfirm>
</template>
