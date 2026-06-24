import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import { XButton, XForm, XFormItem } from '@/basic'

describe('XButton.vue', () => {
  describe('infrastructure', () => {
    test('render', () => {
      const wrapper = mount(() => <XButton />)

      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.classes('el-button')).toBe(true)
    })

    test('props', () => {
      expect(mount(() => <XButton type="primary" />).getComponent(XButton).props('type')).toBe('primary')
      expect(mount(() => <XButton disabled />).getComponent(XButton).props('disabled')).toBe(true)
      expect(mount(() => <XButton link />).getComponent(XButton).props('link')).toBe(true)
      expect(mount(() => <XButton text />).getComponent(XButton).props('text')).toBe(true)
      expect(mount(() => <XButton size="small" />).getComponent(XButton).props('size')).toBe('small')
    })

    test('emit', async () => {
      const wrapper = mount(() => <XButton />)

      await wrapper.trigger('click')
      expect(wrapper.emitted()).toHaveProperty('click')
      expect(wrapper.emitted().click).toHaveLength(1)
    })
  })

  describe('regression', () => {
    test('in form', () => {
      const wrapper = mount(() => <XForm content={() => <XFormItem content={() => <XButton />} />} disabled size="small" />)
      expect(wrapper.findComponent(XButton).props('size')).toBe('small')
    })
  })
})
