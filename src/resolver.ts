import type { ComponentResolver } from 'unplugin-vue-components'

const base = ['element-plus/es/components/base/style/css']

const XBasicResolve: Record<string, string[]> = {
  XButton: [...base, 'element-plus/es/components/button/style/css'],
  XButtonPopconfirm: [
    ...base,
    'element-plus/es/components/button/style/css',
    'element-plus/es/components/popconfirm/style/css'
  ],
  XCascader: [...base, 'element-plus/es/components/cascader/style/css'],
  XCheckbox: [...base, 'element-plus/es/components/checkbox/style/css'],
  XConfigProvider: [],
  XDatePicker: [...base, 'element-plus/es/components/date-picker/style/css'],
  XDialog: [...base, 'element-plus/es/components/dialog/style/css'],
  XForm: [...base, 'element-plus/es/components/form/style/css'],
  XFormItem: [...base, 'element-plus/es/components/form-item/style/css'],
  XInput: [...base, 'element-plus/es/components/input/style/css'],
  XInputNumber: [...base, 'element-plus/es/components/input-number/style/css'],
  XPagination: [...base, 'element-plus/es/components/pagination/style/css'],
  XSelect: [...base, 'element-plus/es/components/select/style/css'],
  XTable: [
    ...base,
    'element-plus/es/components/table/style/css',
    'element-plus/es/components/table-column/style/css'
  ],
  XTabPane: [...base, 'element-plus/es/components/tab-pane/style/css'],
  XTabs: [...base, 'element-plus/es/components/tabs/style/css'],
  XUpload: [...base, 'element-plus/es/components/upload/style/css']
}

const XAdvanceResolve: Record<string, string[]> = {
  XButtonAsync: [...XBasicResolve.XButton],
  XButtonConfirm: [...XBasicResolve.XButton],
  XCascaderRequest: [...XBasicResolve.XCascader],
  XFormFlex: [...XBasicResolve.XForm],
  XFormRequestNext: [...XBasicResolve.XForm],
  XRequest: [],
  XSelectRequest: [...XBasicResolve.XSelect],
  XTableConfig: [...XBasicResolve.XSelect],
  XTableFlex: [...XBasicResolve.XTable],
  XTableRequestConfigNext: [
    ...XBasicResolve.XTable,
    ...XBasicResolve.XPagination,
    ...XBasicResolve.XForm,
    ...XBasicResolve.XFormItem
  ],
  XTableRequestNext: [...XBasicResolve.XTable, ...XBasicResolve.XPagination],
  XUploadOssNext: [...XBasicResolve.XUpload]
}

export default (options?: { advance?: boolean }): ComponentResolver[] => {
  return [
    {
      resolve: (name) => {
        if (name in XBasicResolve) {
          return {
            from: '@pungfe/element/basic',
            name,
            sideEffects: XBasicResolve[name]
          }
        } else if (options?.advance && name in XAdvanceResolve) {
          return {
            from: '@pungfe/element/advance',
            name,
            sideEffects: XAdvanceResolve[name]
          }
        }
      },
      type: 'component'
    }
  ]
}
