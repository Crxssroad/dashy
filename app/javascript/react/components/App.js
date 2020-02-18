import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
JavascriptTimeAgo.locale(en)

import Topbar from './Topbar'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Route path='/' component={Topbar} />
    </BrowserRouter>
  )
}

export default App
