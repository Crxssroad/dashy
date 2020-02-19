import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import JournalTile from './JournalTile'

Enzyme.configure({ adapter: new Adapter() })

describe("JournalTile", () => {
  let wrapper, populateEntries
  let customJournal = {
    title: "Legion",
    description: "We were many."
  }

  beforeEach(() => {
    populateEntries = jest.fn()
    wrapper = mount(
      <JournalTile
        journal={customJournal}
        populateEntries={populateEntries}
        selected={true}
      />
    )
  })

  it("should have a list element with an 'item selected' class when given a selected prop of true", () => {
    expect(wrapper.find("li").first().props().className).toBe('item selected')
  })

  it("should return a list element containing a journal title", () => {
    expect(wrapper.find("li").first().text().includes("Legion")).toBe(true)
  })

  it('should invoke the onClick function from props when clicked', () => {
    wrapper.simulate('click');
    expect(populateEntries).toHaveBeenCalled()
  })
})
