import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Topbar from './Topbar'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Route path='/' component={Topbar} />
    </BrowserRouter>
  )
}

export default App
