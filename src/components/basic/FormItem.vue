<script setup lang="tsx" generic="D extends object">
import { ElFormItem } from 'element-plus'
import { inject, onMounted, onUnmounted, provide, ref, useId } from 'vue'

import {
  X_ELEMENT_IN_TAB_PANE,
  X_ELEMENT_IN_TABS,
  X_FORM_ITEM_VALIDATION,
  X_FORM_VALIDATIONS,
  X_TAB_PANE_NAME,
  X_TABS_MODEL_UPDATE_HOOK
} from '@/constants'

import type { VNodeChild } from 'vue'

export interface XFormItemProps {
  content?: () => VNodeChild
  label?: string
  required?: boolean
  validator?: () => string | void
}

export interface XFormItemValidation {
  id?: string
  clearValidate: () => void
  label?: string
  required?: boolean
  validate: () => boolean
  validator?: () => string | void
}

const { content, label, required } = defineProps<XFormItemProps>()

defineSlots<{
  default: () => VNodeChild
  label: () => VNodeChild
}>()

const validations = inject(X_FORM_VALIDATIONS, undefined)
const inTabs = inject(X_ELEMENT_IN_TABS, undefined)
const inTabPane = inject(X_ELEMENT_IN_TAB_PANE, undefined)
const tabPaneName = inject(X_TAB_PANE_NAME, undefined)
const tabsUpdateModelHook = inject(X_TABS_MODEL_UPDATE_HOOK, undefined)

const error = ref<string | undefined>()

const id = useId()
const validation: XFormItemValidation = {
  id,
  clearValidate: () => (error.value = undefined),
  label,
  required,
  validate: () => {
    error.value = validation.validator?.() ?? undefined

    if (error.value && inTabs && inTabPane && tabPaneName) {
      tabsUpdateModelHook?.trigger(tabPaneName)
    }

    return !error.value
  }
}
provide(X_FORM_ITEM_VALIDATION, validation)

onMounted(() => {
  const exist = validations?.some((it) => it.id === id)
  if (!exist) {
    validations?.push(validation)
  }
})

onUnmounted(() => {
  const index = validations?.findIndex((it) => it.id === id)
  if (index && index > -1) {
    validations?.splice(index, 1)
  }
})

const Content = () => content?.()
</script>

<template>
  <ElFormItem :label="label" :required="required" :error="error">
    <slot>
      <Content />
    </slot>
    <template v-if="'label' in $slots" #label>
      <slot name="label"></slot>
    </template>
  </ElFormItem>
</template>
