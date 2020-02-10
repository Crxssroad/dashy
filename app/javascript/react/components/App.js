import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from './Dashboard'
import Stash from './Stash'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/dash' component={Dashboard}/>
        <Route path='/stash' component={Stash}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
