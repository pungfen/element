import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'

import { XButton } from '@/basic'

describe('XButton.vue', () => {
  describe('render', () => {
    test('xx', () => {
      const wrapper = mount(XButton)
      expect(wrapper.text()).toBe('')
    })
  })
})
