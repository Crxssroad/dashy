import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from './Dashboard'
import Stash from './Stash'
import JournalsIndexContainer from './JournalsIndexContainer'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route exact path='/dash' component={Dashboard}/>
        <Route exact path='/stash' component={Stash}/>
        <Route exact path='/stash/journals' component={JournalsIndexContainer}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
