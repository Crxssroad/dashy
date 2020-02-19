import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ErrorList from './ErrorList'

Enzyme.configure({ adapter: new Adapter() })

describe("ErrorList", () => {
  let wrapper
  let customErrors = [
    "Title can't be blank",
    "Description can be blank, but this is a test",
    "An array of errors"
  ]

  beforeEach(() => {
    wrapper = mount(
      <ErrorList
        errors={customErrors}
      />
    )
  })

  it("should return an li element containing an error", () => {
    expect(wrapper.find("li").first().text().includes("Title can't be blank")).toBe(true)
  })

  it("should return all of the errors provided", () => {
    expect(wrapper.find("li").length).toBe(3);
  })
})
