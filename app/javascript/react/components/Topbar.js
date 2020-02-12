import React, { Fragment, useState, useEffect } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

import Dashboard from './Dashboard'
import Stash from './Stash'
import JournalsIndexContainer from './journal/JournalsIndexContainer'
import JournalShowContainer from './journal/JournalShowContainer'
import SignUpContainer from './SignUpContainer'
import LoginContainer from './LoginContainer'

const Topbar = props => {
  const [currentUser, setCurrentUser] = useState({})
  const [shouldLogout, setShouldLogout] = useState(false)
  const activePage = props.location.pathname.slice(1);

  let dashClass = "nav-item"
  let stashClass = "nav-item"
  if(activePage === "dash") dashClass+= " active"
  if(activePage === "stash") stashClass+= " active"

  const logout = () => {
    const csrfToken = $('meta[name="csrf-token"]').attr('content');
    fetch('users/logout',
      {
        credentials: 'same-origin',
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': csrfToken
        }
    })
    .then(() => setShouldLogout(true))
  }

  if (shouldLogout && props.history.action !== "REPLACE") {
    window.location.replace("/users/login")
  }

  return (
    <Fragment>
      <nav className="navbar navbar-expand-md navbar-light top-bar-bg">
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              <ul className="navbar-nav mr-auto">
                <li className={dashClass}>
                  <Link to="#" className="nav-link" to="/dash">Home</Link>
                </li>
                <li className={stashClass}>
                  <Link to="#" className="nav-link" to="/stash">My Stash</Link>
                </li>
              </ul>
          </div>
          <div className="mx-auto order-0">
              <Link to="#" className="navbar-brand mx-auto" href="#">Dashy</Link>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="#" className="nav-link" onClick={logout}>Logout</Link>
                </li>
              </ul>
          </div>
      </nav>

      <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route exact path='/dash' component={Dashboard}/>
        <Route exact path='/stash' component={Stash}/>
        <Route exact path='/users/signup' component={SignUpContainer}/>
        <Route exact path='/users/login' component={LoginContainer}/>
        <Route exact path='/stash/journals' component={JournalsIndexContainer}/>
        <Route exact path='/stash/journals/:id' component={JournalShowContainer}/>
      </Switch>
    </Fragment>
  )
}

export default Topbar;
