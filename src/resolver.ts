import type { ComponentResolver } from 'unplugin-vue-components'

const XResolve: Record<string, string[]> = {
  XButton: ['element-plus/es/components/button/style/css'],
  XButtonPopconfirm: ['element-plus/es/components/button/style/css', 'element-plus/es/components/popconfirm/style/css'],
  XInput: ['element-plus/es/components/input/style/css'],
  XInputNumber: ['element-plus/es/components/input-number/style/css'],
  XTable: ['element-plus/es/components/table/style/css'],
  XForm: ['element-plus/es/components/form/style/css'],
  XFormItem: ['element-plus/es/components/form-item/style/css'],
  XTabs: ['element-plus/es/components/tabs/style/css'],
  XTabPane: ['element-plus/es/components/tab-pane/style/css']
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
