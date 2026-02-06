import type { ComponentResolver } from 'unplugin-vue-components'

const names = [
  ['XButton', 'ElButton'],
  ['XCascader', 'ElCascader'],
  ['XCheckbox', 'ElCheckbox'],
  ['XColorPicker', 'ElColorPicker'],
  ['XDatePicker', 'ElDatePicker'],
  ['XDialog', 'ElDialog'],
  ['XDivider', 'ElDivider'],
  ['XForm', 'ElForm'],
  ['XFormItem', 'ElFormItem'],
  ['XImage', 'ElImage'],
  ['XInput', 'ElInput'],
  ['XInputNumber', 'ElInputNumber'],
  ['XPagination', 'ElPagination'],
  ['XScrollbar', 'ElScrollbar'],
  ['XSelect', 'ElSelect'],
  ['XSpace', 'ElSpace'],
  ['XTable', 'ElTable'],
  ['XTabs', 'ElTabs'],
  ['XTabPane', 'ElTabPane'],
  ['XTag', 'ElTag'],
  ['XText', 'ElText'],
  ['XUpload', 'ElUpload']
]

export const kebabCase = (str: string) => str.replace(/([A-Z])/g, ' $1').trim().split(' ').join('-').toLowerCase()

export default () => {
  return {
    type: 'component',
    resolve: (name) => {
      if (names.flatMap(it => it[0]).includes(name)) {
        return {
          name,
          from: '@pungfe/element',
          sideEffects: [
            'element-plus/es/components/base/style/css',
            `element-plus/es/components/${kebabCase(names.find(it => it[0] === name)![1]!.slice(2))}/style/css`
          ]
        }
      }
    }
  } as ComponentResolver
}
