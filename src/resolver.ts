import type { ComponentResolver } from 'unplugin-vue-components'

const names = [
  'XButton',
  'XCascader',
  'XCheckbox',
  'XColorPicker',
  'XDatePicker',
  'XDialog',
  'XDivider',
  'XForm',
  'XFormItem',
  'XImage',
  'XInput',
  'XInputNumber',
  'XPagination',
  'XScrollbar',
  'XSelect',
  'XSpace',
  'XTable',
  'XTabs',
  'XTabPane',
  'XTag',
  'XText',
  'XUpload'
]

export default () => {
  return {
    type: 'component',
    resolve: (name) => {
      if (names.includes(name)) {
        return {
          name,
          from: '@pungfe/element'
        }
      }
    }
  } as ComponentResolver
}
