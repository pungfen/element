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
      expect(mount(() => <XButton type="primary" />).findComponent(XButton).props('type')).toBe('primary')
      expect(mount(() => <XButton disabled />).findComponent(XButton).props('disabled')).toBe(true)
      expect(mount(() => <XButton link />).findComponent(XButton).props('link')).toBe(true)
      expect(mount(() => <XButton text />).findComponent(XButton).props('text')).toBe(true)
      expect(mount(() => <XButton size="small" />).findComponent(XButton).props('size')).toBe('small')
    })

    test('emit', async () => {
      const wrapper = mount(() => <XButton />)

      await wrapper.trigger('click')
      expect(wrapper.emitted()).toHaveProperty('click')
      expect(wrapper.emitted().click).toHaveLength(1)
    })
  })
})

describe('XForm.vue', () => {
  describe('infrastructure', () => {
    test('render', () => {
      const wrapper = mount(() => <XForm content={() => <XFormItem content={() => <XButton />} />} />)
      expect(wrapper.findComponent(XButton).exists()).toBe(true)
    })
  })
})
