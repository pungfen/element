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
  'XImage',
  'XInput',
  'XInputNumber',
  'XPagination',
  'XScrollbar',
  'XSelect',
  'XSpace',
  'XTable',
  'XTabs',
  'XTag',
  'XText',
  'XUpload'
]

export const resolver = () => {
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
