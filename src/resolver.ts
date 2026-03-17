import type { ComponentResolver } from 'unplugin-vue-components'

const base = ['element-plus/es/components/base/style/css']

const XResolve: Record<string, string[]> = {
  XButton: [...base, 'element-plus/es/components/button/style/css'],
  XButtonPopconfirm: [...base, 'element-plus/es/components/button/style/css', 'element-plus/es/components/popconfirm/style/css'],
  XConfigProvider: [],
  XDatePicker: [...base, 'element-plus/es/components/date-picker/style/css'],
  XDialog: [...base, 'element-plus/es/components/dialog/style/css'],
  XForm: [...base, 'element-plus/es/components/form/style/css'],
  XFormItem: [...base, 'element-plus/es/components/form-item/style/css'],
  XInput: [...base, 'element-plus/es/components/input/style/css'],
  XInputNumber: [...base, 'element-plus/es/components/input-number/style/css'],
  XPagination: [...base, 'element-plus/es/components/pagination/style/css'],
  XSelect: [...base, 'element-plus/es/components/select/style/css'],
  XTable: [...base, 'element-plus/es/components/table/style/css', 'element-plus/es/components/table-column/style/css'],
  XTabs: [...base, 'element-plus/es/components/tabs/style/css'],
  XTabPane: [...base, 'element-plus/es/components/tab-pane/style/css'],
  XUpload: [...base, 'element-plus/es/components/upload/style/css']
}

export default () => {
  return {
    type: 'component',
    resolve: (name) => {
      if (name in XResolve) {
        return {
          name,
          from: '@pungfe/element',
          sideEffects: XResolve[name]
        }
      }
    }
  } as ComponentResolver
}
