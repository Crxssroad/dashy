import React, { Fragment, useState, useEffect } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

import Dashboard from './Dashboard'
import Stash from './Stash'
import JournalsIndexContainer from './journal/JournalsIndexContainer'
import JournalShowContainer from './journal/JournalShowContainer'
import Sidebar from './Sidebar'
import ModalForm from './ModalForm'
import LandingPageContainer from './LandingPageContainer'

const Topbar = props => {
  const [currentUser, setCurrentUser] = useState(null)
  const [shouldLogout, setShouldLogout] = useState(false)
  const activePath = props.location.pathname.slice(1);

  useEffect(() => {
    fetch('/api/v1/users/current')
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      setCurrentUser(parsedBody)
    })
    .catch(error => `Error in fetch ${error.message}`)
  }, [])

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
    window.location.replace("/welcome")
  }

  let togglerIcon =
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
    <span className="navbar-toggler-icon"></span>
  </button>
  let dashClass = "nav-item navbar-text navbar-sidebar"
  let stashClass = "nav-item navbar-text navbar-sidebar"
  if(activePath === "dash" || activePath === "") dashClass+= " active"
  if(activePath === "stash") stashClass+= " active"
  let rightTopbarContent, leftTopbarContent, sidebar
  if(currentUser) {
    sidebar = <Sidebar activePath={activePath} />
    togglerIcon =
    <button className="navbar-toggler" style={{padding:0, border:'none'}} type="button" data-toggle="collapse" data-target=".dual-collapse2">
      <img className="top-bar-profile-photo" src={currentUser.profilePhoto} />
    </button>
    leftTopbarContent =
      <Fragment>
        <li className={dashClass}>
          <i className="fas fa-chalkboard"></i>
          <Link to="#" className="nav-link" to="/dash">Dash</Link>
        </li>
        <li className={stashClass}>
          <i className="fas fa-briefcase"></i>
          <Link to="#" className="nav-link" to="/stash">My Stash</Link>
        </li>
        <Link to="#" className="nav-link" onClick={logout}>Logout</Link>
      </Fragment>
    rightTopbarContent =
      <Fragment>
        <li className="nav-item navbar-text">
          <span className="navbar-text">Welcome back, {currentUser.username}</span>
        </li>
        <li className="nav-item">
          <img className="top-bar-profile-photo" src={currentUser.profilePhoto} />
        </li>
      </Fragment>
  } else {
    leftTopbarContent =
      <Fragment>
        <li className="nav-item">
          <Link to="/users/login" className="nav-link">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/users/signup" className="nav-link">Sign Up</Link>
        </li>
      </Fragment>
  }

  return (
    <Fragment>
      <nav className="navbar navbar-expand-md navbar-light top-bar-bg">
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              <ul className="navbar-nav mr-auto">
                {leftTopbarContent}
              </ul>
          </div>
          <div className="mx-auto order-0">
              <Link to="#" className="navbar-brand mx-auto" href="#">Dashy</Link>
          </div>
          {togglerIcon}
          <div className="navbar-collapse collapse w-100 order-3">
              <ul className="navbar-nav ml-auto">
                {rightTopbarContent}
              </ul>
          </div>
      </nav>
      <section className="display-area">
        {sidebar}
        <Switch>
          <Route exact path='/welcome' component={LandingPageContainer}/>
          <Route exact path='/' component={Dashboard}/>
          <Route exact path='/dash' component={Dashboard}/>
          <Route exact path='/stash' component={Stash}/>
          <Route exact path='/stash/journals' component={JournalsIndexContainer}/>
          <Route exact path='/stash/journals/:id' component={JournalShowContainer}/>
        </Switch>
      </section>
    </Fragment>
  )
}

export default Topbar;
