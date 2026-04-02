<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { computed, inject } from 'vue'

import { XButton, type XButtonProps } from '@/basic'
import { X_ELEMENT_IN_TABLE } from '@/constants'

export interface XButtonAsyncProps extends XButtonProps {
  action?: () => PromiseLike<unknown> | unknown
}

const { action, type = 'primary', link = undefined } = defineProps<XButtonAsyncProps>()

const click = useDebounceFn(async () => {
  try {
    await action?.()
  } catch (e) {
    console.log(e)
  }
})

const inTable = inject(X_ELEMENT_IN_TABLE, undefined)
const _link = computed(() => link ?? inTable)
</script>

<template>
  <XButton v-bind="{ disabled, icon, type, link: _link, size, text }" @click="click">
    <slot></slot>
  </XButton>
</template>
