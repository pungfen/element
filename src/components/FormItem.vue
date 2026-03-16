<script setup lang="tsx" generic="D extends object">
import type { VNodeChild } from 'vue'
import { ElFormItem } from 'element-plus'
import { inject, provide, ref } from 'vue'
import { X_ELEMENT_IN_TAB_PANE, X_ELEMENT_IN_TABS, X_FORM_ITEM_VALIDATION, X_FORM_VALIDATIONS, X_TAB_PANE_NAME, X_TABS_MODEL_UPDATE_HOOK } from '../constants'

export interface XFormItemProps {
  content?: () => VNodeChild
  label?: string
  prop?: string
  required?: boolean
  validator?: () => string | void
}

export interface XFormItemValidation {
  clearValidate: () => void
  label?: string
  required?: boolean
  validate: () => boolean
  validator?: () => string | void
}

const { content, label, required, validator } = defineProps<XFormItemProps>()

defineSlots<{
  default: () => VNodeChild
  label: () => VNodeChild
}>()

const validations = inject(X_FORM_VALIDATIONS, undefined)
const inTabs = inject(X_ELEMENT_IN_TABS)
const inTabPane = inject(X_ELEMENT_IN_TAB_PANE)
const tabPaneName = inject(X_TAB_PANE_NAME)
const tabsUpdateModelHook = inject(X_TABS_MODEL_UPDATE_HOOK)

const error = ref<string | undefined>()

const validation: XFormItemValidation = {
  clearValidate() {
    error.value = undefined
  },
  label,
  required,
  validate() {
    error.value = validation.validator?.() ?? undefined

    if (error.value && inTabs && inTabPane && tabPaneName) {
      tabsUpdateModelHook?.trigger(tabPaneName)
    }

    return !error.value
  },
  validator
}

validations?.push(validation)

defineExpose({ ...validation })

provide(X_FORM_ITEM_VALIDATION, validation)

const Content = () => content?.()
</script>

<template>
  <ElFormItem v-bind="{ label, prop, required, error }">
    <Content />
    <template v-if="'label' in $slots">
      <slot name="label" />
    </template>
  </ElFormItem>
</template>
