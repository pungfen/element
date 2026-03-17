import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import XTable from '../src/components/Table.vue'

const wrapper = mount(XTable)

describe('table', () => {
  it('render', () => {
    expect(wrapper.find('div').exists()).toBe(true)
  })
})
