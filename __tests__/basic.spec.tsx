import { mount } from '@vue/test-utils'
import { useDateFormat, useNow } from '@vueuse/core'
import { ElButton, ElDialog, ElForm } from 'element-plus'
import { describe, expect, test } from 'vitest'

import { XButton, XDatePicker, XDialog, XForm, XFormItem } from '@/basic'

describe('XButton.vue', () => {
  test('render', async () => {
    const wrapper = mount(XButton)

    expect(wrapper.classes('el-button')).toBe(true)

    await wrapper.setProps({ type: 'primary' })
    expect(wrapper.classes('el-button--primary')).toBe(true)

    await wrapper.setProps({ disabled: true })
    expect(wrapper.classes('is-disabled')).toBe(true)
  })

  test('emit', async () => {
    const wrapper = mount(XButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted().click).toHaveLength(1)
  })

  test('forwards additional props and preserves unspecified defaults', async () => {
    const wrapper = mount(XButton, { props: { loading: true, plain: true } })
    const button = wrapper.findComponent(ElButton)

    expect(button.props('loading')).toBe(true)
    expect(button.props('plain')).toBe(true)
    expect(button.props('autoInsertSpace')).toBeUndefined()
    await wrapper.setProps({ loading: false })
    expect(button.props('loading')).toBe(false)
  })
})

describe('XDialog.vue', () => {
  test('forwards additional props without overriding dialog defaults', async () => {
    const wrapper = mount(XDialog, { props: { fullscreen: true } })
    const dialog = wrapper.findComponent(ElDialog)

    expect(dialog.props('fullscreen')).toBe(true)
    expect(dialog.props('modal')).toBe(true)
    expect(dialog.props('lockScroll')).toBe(true)
    await wrapper.setProps({ modal: false })
    expect(dialog.props('modal')).toBe(false)
  })
})

describe('XForm.vue props', () => {
  test('forwards additional props and retains the data model', async () => {
    const data = { name: 'test' }
    const wrapper = mount(XForm, { props: { data, inlineMessage: true } })
    const form = wrapper.findComponent(ElForm)

    expect(form.props('model')).toEqual(data)
    expect(form.props('inlineMessage')).toBe(true)
    expect(form.props('showMessage')).toBe(true)
    expect(form.props('validateOnRuleChange')).toBe(true)
    expect(form.props('scrollIntoViewOptions')).toBe(true)
    await wrapper.setProps({ showMessage: false })
    expect(form.props('showMessage')).toBe(false)
  })
})

describe('XDatePicker.vue', () => {
  test('render', async () => {
    const wrapper = mount(XDatePicker)

    // expect(wrapper.classes('el-date-editor')).toBe(true)

    await wrapper.setProps({ modelValue: useDateFormat(useNow(), 'YYYY-MM-DD').value })
    expect(wrapper.findComponent(XDatePicker).exists()).toBe(true)
  })

  test('model', async () => {
    const wrapper = mount(XDatePicker)

    await wrapper.setProps({ 'onUpdate:modelValue': modelValue => wrapper.setProps({ modelValue }), 'valueFormat': 'YYYY-MM-DD' })

    const input = wrapper.find('input')
    await input.setValue(useDateFormat(useNow(), 'YYYY-MM-DD').value)
    expect(wrapper.props('modelValue')).toBe(useDateFormat(useNow(), 'YYYY-MM-DD').value)
  })
})

describe.todo('XForm.vue', () => {
  describe('infrastructure', () => {
    test('render', () => {
      const wrapper = mount(() => <XForm content={() => <XFormItem content={() => <XButton />} />} />)
      expect(wrapper.findComponent(XButton).exists()).toBe(true)
    })
  })
})
