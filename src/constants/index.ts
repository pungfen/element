import type { EventHook } from '@vueuse/core'

import type { InjectionKey } from 'vue'

import type { XFormItemValidation } from '../basic/XForm.vue'
import type { XTabPaneInstance } from '../basic/XTabs.vue'

export const X_FORM_ITEM_LABEL = Symbol('X_FORM_ITEM_LABEL') as InjectionKey<
  string | undefined
>
export const X_FORM_VALIDATIONS = Symbol('X_FORM_VALIDATIONS') as InjectionKey<
  XFormItemValidation[]
>
export const X_FORM_ITEM_VALIDATION = Symbol(
  'X_FORM_ITEM_VALIDATION'
) as InjectionKey<XFormItemValidation>
export const X_FORM_TAB_UPDATE_HOOK = Symbol(
  'X_FORM_TAB_UPDATE_HOOK'
) as InjectionKey<EventHook>

export const X_TAB_PANES = Symbol('X_TAB_PANES') as InjectionKey<
  XTabPaneInstance[]
>
export const X_TAB_PANE = Symbol('X_TAB_PANE') as InjectionKey<XTabPaneInstance>

export const X_TABLE_QUERY_UPDATE_HOOK = Symbol(
  'X_TABLE_QUERY_UPDATE_HOOK'
) as InjectionKey<EventHook>
export const X_TABLE_QUERY_EXECUTE_HOOK = Symbol(
  'X_TABLE_QUERY_EXECUTE_HOOK'
) as InjectionKey<EventHook>
