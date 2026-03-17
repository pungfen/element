import XButton from '@/components/Button.vue'
import XButtonPopconfirm from '@/components/ButtonPopconfirm.vue'
import XConfigProvider from '@/components/ConfigProvider.vue'
import XDatePicker from '@/components/DatePicker.vue'
import XDialog from '@/components/Dialog.vue'
import XForm from '@/components/Form.vue'
import XFormItem from '@/components/FormItem.vue'
import XInput from '@/components/Input.vue'
import XInputNumber from '@/components/InputNumber.vue'
import XPagination from '@/components/Pagination.vue'
import XSelect from '@/components/Select.vue'
import XTable from '@/components/Table.vue'
import XTabPane from '@/components/TabPane.vue'
import XTabs from '@/components/Tabs.vue'
import XUpload from '@/components/Upload.vue'

export {
  XButton,
  XButtonPopconfirm,
  XConfigProvider,
  XDatePicker,
  XDialog,
  XForm,
  XFormItem,
  XInput,
  XInputNumber,
  XPagination,
  XSelect,
  XTable,
  XTabPane,
  XTabs,
  XUpload
}

export * from '@/components/Button.vue'
export * from '@/components/ButtonPopconfirm.vue'
export * from '@/components/ConfigProvider.vue'
export * from '@/components/DatePicker.vue'
export * from '@/components/Dialog.vue'
export * from '@/components/Form.vue'
export * from '@/components/FormItem.vue'
export * from '@/components/Input.vue'
export * from '@/components/InputNumber.vue'
export * from '@/components/Pagination.vue'
export * from '@/components/Select.vue'
export * from '@/components/Table.vue'
export * from '@/components/TabPane.vue'
export * from '@/components/Tabs.vue'
export * from '@/components/Upload.vue'

declare module 'vue' {
  export interface GlobalComponents {
    XButton: typeof XButton
    XButtonPopconfirm: typeof XButtonPopconfirm
    XConfigProvider: typeof XConfigProvider
    XDatePicker: typeof XDatePicker
    XDialog: typeof XDialog
    XForm: typeof XForm
    XFormItem: typeof XFormItem
    XInput: typeof XInput
    XInputNumber: typeof XInputNumber
    XPagination: typeof XPagination
    XSelect: typeof XSelect
    XTable: typeof XTable
    XTabPane: typeof XTabPane
    XTabs: typeof XTabs
    XUpload: typeof XUpload
  }
}
