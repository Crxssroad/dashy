import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import StashTile from './StashTile'

Enzyme.configure({ adapter: new Adapter() })

describe("StashTile", () => {
  let wrapper
  let type = "journals"
  let content = [
    {
      id: 1,
      title: "Where's Waldo?",
      description: "Not entirely sure"
    },
    {
      id: 2,
      title: "Generic Journal",
      description: "Generic Description"
    },
    {
      id: 3,
      title: "Interesting Journal",
      description: "Very interesting description"
    },
  ]
  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <StashTile
          type={type}
          content={content}
          />
      </BrowserRouter>
    )
  })

  it("should return a section element with a custom class", () => {
    expect(wrapper.find("section").props().className).toBe("journals-stash stash-tile")
  })

  it("should return Link component leading to its specific index container", () => {
    expect(wrapper.find("Link").first().props().to).toBe("/stash/journals")
  })

  it("should return Link component leading to its specific index container", () => {
    expect(wrapper.find("Link").first().props().to).toBe("/stash/journals")
  })

  it("should return a p element containing the amount of journals passed into it", () => {
    expect(wrapper.find("h3").first().text()).toBe("You have 3 journals")
  })

  it("should return 3 li elements", () => {
    expect(wrapper.find("li").length).toBe(3)
  })
})
