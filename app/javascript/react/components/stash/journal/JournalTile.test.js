import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import JournalTile from './JournalTile'

Enzyme.configure({ adapter: new Adapter() })

describe("JournalTile", () => {
  let wrapper
  let customJournal = {
    title: "Legion",
    description: "We were many."
  }

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <JournalTile
          journal={customJournal}
          />
      </BrowserRouter>
    )
  })

  it("should return a h3 element containing a journal title", () => {
    expect(wrapper.find("h3").first().text()).toBe("Legion")
  })

  it("should return a h4 element containing a journal description", () => {
    expect(wrapper.find("h4").first().text()).toBe("We were many.")
  })
})
