import type { EventHook } from '@vueuse/core'
import type { Language } from 'element-plus/es/locale'
import type { InjectionKey, Ref } from 'vue'

import type { XFormItemValidation } from '@/components/basic/FormItem.vue'

import type { ElementConfig } from '@/types'

export const X_LOCALE_CONFIG: InjectionKey<Ref<Language>> = Symbol('X_LOCALE_CONFIG')
export const X_ELEMENT_CONFIG: InjectionKey<ElementConfig> = Symbol('X_ELEMENT_CONFIG')
export const X_ELEMENT_INSTALLED = Symbol('X_ELEMENT_INSTALLED')

export const X_ELEMENT_IN_TABLE: InjectionKey<boolean> = Symbol('X_ELEMENT_IN_TABLE')
export const X_ELEMENT_IN_TABLE_COLUMN: InjectionKey<boolean> = Symbol('X_ELEMENT_IN_TABLE_COLUMN')
export const X_ELEMENT_IN_FORM: InjectionKey<boolean> = Symbol('X_ELEMENT_IN_FORM')
export const X_ELEMENT_IN_FORM_ITEM: InjectionKey<boolean> = Symbol('X_ELEMENT_IN_FORM_ITEM')
export const X_ELEMENT_IN_TABS: InjectionKey<boolean> = Symbol('X_ELEMENT_IN_TABS')
export const X_ELEMENT_IN_TAB_PANE: InjectionKey<boolean> = Symbol('X_ELEMENT_IN_TAB_PANE')

export const X_FORM_VALIDATIONS: InjectionKey<XFormItemValidation[]> = Symbol('X_FORM_VALIDATIONS')
export const X_FORM_ITEM_VALIDATION: InjectionKey<XFormItemValidation> = Symbol('X_FORM_ITEM_VALIDATION')

export const X_TAB_PANE_NAME: InjectionKey<string | number | undefined> = Symbol('X_TAB_PANE')

export const X_TABS_MODEL_UPDATE_HOOK: InjectionKey<EventHook> = Symbol('X_TABS_MODEL_UPDATE_HOOK')
