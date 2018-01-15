import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

describe('App', () => {
  it('renders a Button', () => {
    const wrapper = shallow(<App />)

    expect(wrapper.find('WithStyles(Button)').length).toBe(1)
  })
})