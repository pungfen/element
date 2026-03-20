import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { XTable } from '@/components/basic'

const wrapper = mount(XTable)

describe('table', () => {
  it('render', () => {
    expect(wrapper.find('div').exists()).toBe(true)
  })
})
