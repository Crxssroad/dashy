import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from './Dashboard'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/dash' component={Dashboard}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
