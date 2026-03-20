export interface Paging { pageIndex: number, pageSize: number, itemCount: number }

export interface TableColumnField {
  code: string
  width?: number
  visible?: boolean
  label?: string
  prop?: string
  search?: boolean
}

export interface OssInfo {
  accessId?: string
  accessSecret?: string
  host?: string
  dir?: string
  policy?: string
  expire?: number
  signature?: string
  accessKeyId?: string
  accessKeySecret?: string
}

declare module 'vue' {
  export interface GlobalComponents {
    XButton: typeof import('@/components/basic/Button.vue')['default']
    XCheckbox: typeof import('@/components/basic/Checkbox.vue')['default']
    XConfigProvider: typeof import('@/components/basic/ConfigProvider.vue')['default']
    XDatePicker: typeof import('@/components/basic/DatePicker.vue')['default']
    XDialog: typeof import('@/components/basic/Dialog.vue')['default']
    XForm: typeof import('@/components/basic/Form.vue')['default']
    XFormItem: typeof import('@/components/basic/FormItem.vue')['default']
    XInput: typeof import('@/components/basic/Input.vue')['default']
    XInputNumber: typeof import('@/components/basic/InputNumber.vue')['default']
    XPagination: typeof import('@/components/basic/Pagination.vue')['default']
    XSelect: typeof import('@/components/basic/Select.vue')['default']
    XTable: typeof import('@/components/basic/Table.vue')['default']
    XTabPane: typeof import('@/components/basic/TabPane.vue')['default']
    XTabs: typeof import('@/components/basic/Tabs.vue')['default']
    XUpload: typeof import('@/components/basic/Upload.vue')['default']

    XButtonAsync: typeof import('@/components/advance/XButtonAsync.vue')['default']
    XButtonConfirm: typeof import('@/components/advance/XButtonConfirm.vue')['default']
    XFormFlex: typeof import('@/components/advance/XFormFlex.vue')['default']
    XFormRequestNext: typeof import('@/components/advance/XFormRequestNext.vue')['default']
    XRequest: typeof import('@/components/advance/XRequest.vue')['default']
    XTableFlex: typeof import('@/components/advance/XTableFlex.vue')['default']
    XTableRequestNext: typeof import('@/components/advance/XTableRequestNext.vue')['default']
    XTableRequestConfigNext: typeof import('@/components/advance/XTableRequestConfigNext.vue')['default']
  }
}
