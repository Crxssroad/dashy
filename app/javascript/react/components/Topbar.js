import React, { Fragment, useState, useEffect } from 'react';
import { Route, Switch, Link, Redirect } from 'react-router-dom';

import DashboardContainer from './dashboard/DashboardContainer'
import StashContainer from './stash/StashContainer'
import ModalForm from './ModalForm'
import LandingPageContainer from './LandingPageContainer'
import LoginForm from './LoginForm'
import JournalsApp from './stash/journal/JournalsApp'
import Widget from './pojos/widget'

const Topbar = props => {
  const [currentUser, setCurrentUser] = useState(null)
  const [shouldLogout, setShouldLogout] = useState(false)
  const [expandedWidget, setExpandedWidget] = useState(null)
  const activePath = props.location.pathname;

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
  if(activePath === "/dash") dashClass+= " active"
  if(activePath === "/stash") stashClass+= " active"
  let brandLink = "#"
  let rightTopbarContent, leftTopbarContent
  if(currentUser) {
    brandLink = "/dash"
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
          <span className="navbar-text">{currentUser.username}</span>
        </li>
        <li className="nav-item">
          <img className="top-bar-profile-photo" src={currentUser.profilePhoto} />
        </li>
      </Fragment>
  }
  let widgetOverlay
  if (expandedWidget) {
    const closeModal = () => {
      setExpandedWidget(null)
    }
    widgetOverlay = Widget.expand(expandedWidget, closeModal)
  }

  return (
    <Fragment>
      {widgetOverlay}
      <nav className="navbar navbar-expand-md navbar-light top-bar-bg">
          <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              <ul className="navbar-nav mr-auto">
                {leftTopbarContent}
              </ul>
          </div>
          <div className="mx-auto order-0">
              <Link to={brandLink} className="navbar-brand mx-auto" href="#">Dashy</Link>
          </div>
          {togglerIcon}
          <div className="navbar-collapse collapse w-100 order-3">
              <ul className="navbar-nav ml-auto">
                {rightTopbarContent}
              </ul>
          </div>
      </nav>
      <section className="display-area">
        <Switch>
          <Route exact path='/' render={(props) => <LandingPageContainer user={currentUser} /> }/>
          <Route exact path='/welcome' render={(props) => <LandingPageContainer user={currentUser} />}/>
          <Route exact path='/dash' render={(props) => <DashboardContainer setExpandedWidget={setExpandedWidget} /> }/>
          <Route exact path='/users/login' render={(props) => <LandingPageContainer user={currentUser} />}   />
          <Route exact path='/stash' component={StashContainer} />
          <Route exact path='/stash/journals' component={JournalsApp}/>
          <Route exact path='/stash/journals/:journalId' component={JournalsApp}/>
          <Route exact path='/stash/journals/:journalId/entries/:entryId' component={JournalsApp}/>
        </Switch>
      </section>
    </Fragment>
  )
}

export default Topbar;
