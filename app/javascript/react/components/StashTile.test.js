import React from 'react'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import StashTile from './StashTile'

Enzyme.configure({ adapter: new Adapter() })

describe("StashTile", () => {
  let wrapper
  let type = "journals"
  let content = [
    {
      title: "Where's Waldo?",
      description: "Not entirely sure"
    },
    {
      title: "Generic Journal",
      description: "Generic Description"
    },
    {
      title: "Interesting Journal",
      description: "Very interesting description"
    },
  ]
  beforeEach(() => {
    wrapper = mount(
      <StashTile
        type={type}
        content={content}
      />
    )
  })

  it("should return an li element with a custom class", () => {
    expect(wrapper.find("li").props().className).toBe("journals-stash-tile")
  })

  it("should return a p element containing the amount of journals passed into it", () => {
    expect(wrapper.find("p").first().text()).toBe("You have 3 journals")
  })
})
