<script setup lang="ts">
import { ElPopconfirm, useLocale } from 'element-plus'
import { computed, inject } from 'vue'

import { XButton, type XButtonProps } from '@/basic'
import { X_ELEMENT_IN_TABLE, X_LOCALE_CONFIG } from '@/constants'

export interface XButtonConfirmProps extends XButtonProps {
  title?: string
}

const locale = inject(X_LOCALE_CONFIG, undefined)
const { t } = useLocale(locale)

const { link = undefined } = defineProps<XButtonConfirmProps>()

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()

const inTable = inject(X_ELEMENT_IN_TABLE, undefined)
const _link = computed(() => link ?? inTable)
</script>

<template>
  <ElPopconfirm
    :title="title ?? t('el.common.confirmExecute')"
    width="auto"
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
          text
        }"
      >
        <slot></slot>
      </XButton>
    </template>
    <template #actions="{ confirm, cancel }">
      <XButton size="small" :disabled="false" @click="cancel">{{ t('el.common.cancel') }}</XButton>
      <XButton type="danger" :disabled="false" size="small" @click="confirm">{{
        t('el.common.confirm')
      }}</XButton>
    </template>
  </ElPopconfirm>
</template>
