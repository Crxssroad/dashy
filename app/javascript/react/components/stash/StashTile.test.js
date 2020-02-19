import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import StashTile from './StashTile'

Enzyme.configure({ adapter: new Adapter() })

describe("StashTile", () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <BrowserRouter>
        <StashTile
          stashName="journals"
          parentClass="journal-stash"
          cardFront={<i className="journal"></i>}
          cardBack="Journals"
        />
      </BrowserRouter>
    )
  })

  it("should return a section element with a custom class", () => {
    expect(wrapper.find("section").props().className).toBe("journal-stash")
  })

  it("should return Link component leading to its specific index container", () => {
    expect(wrapper.find("Link").first().props().to).toBe("/stash/journals")
  })

  it("should return a h1 element containing the passed down title", () => {
    expect(wrapper.find("h1").first().text()).toBe("Journals")
  })
})
