import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { XButton } from '@/basic'

describe('XButton.vue', () => {
  it('render', () => {
    const wrapper = mount(XButton, { slots: { default: () => 'xx' } })
    expect(wrapper.text()).toContain('xx')
  })
})
