import { mount } from '@vue/test-utils'
import { useDateFormat, useNow } from '@vueuse/core'
import { describe, expect, test } from 'vitest'

import { XButton, XDatePicker, XForm, XFormItem } from '@/basic'

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
