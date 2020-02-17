import React, { Fragment, useState, useEffect, useCallback } from 'react';
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
  const [widgets, setWidgets] = useState([])
  const [widgetErrors, setWidgetErrors] = useState([])
  const [editMode, setEditMode] = useState(false)
  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const moveWidget = useCallback(
      (dragIndex, hoverIndex) => {
        const dragWidget = widgets[dragIndex]
        const newOrder = widgets.map((widget, index, oldOrder) => {
          if (index === hoverIndex) {
            return oldOrder[dragIndex]
          }
          if (index === dragIndex) {
            return oldOrder[hoverIndex]
          }
          return widget
        })
        const liveUpdate = () => {
          setWidgets(newOrder)
        }
        updateOrder({dragIndex: dragIndex, hoverIndex: hoverIndex}, liveUpdate)
      },
      [widgets],
  )

  const updateOrder = (payload, liveUpdate) => {
    fetch('/api/v1/widgets/reorder', {
      credentials: 'same-origin',
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      if (!Array.isArray(parsedBody)) {
        liveUpdate()
      }
    })
    .catch(error => console.error(`Error in widget order patch ${error.message}`))
  }
  const activePath = props.location.pathname;

  const addWidget = (payload, clearForm) => {
    payload.position = widgets.length
    fetch('/api/v1/widgets', {
      credentials: 'same-origin',
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(parsedBody => {
      if (!Array.isArray(parsedBody)) {
        $('#widgetModal').modal('hide')
        if (clearForm) clearForm()
        setWidgetErrors([])
        setWidgets([...widgets, parsedBody])
      } else {
        setWidgetErrors(parsedBody)
      }
    })
    .catch(error => console.error(`Error in journal post fetch ${error.message}`))
  }

  const deleteWidget = (widgetId) => {
    fetch(`/api/v1/widgets/${widgetId}`, {
      credentials: 'same-origin',
      method: "DELETE"
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(parsedBody => {
      setWidgets(widgets.filter(widget => widget.id !== parsedBody.id))
    })
    .catch(error => console.error(`Error in widget delete fetch ${error.message}`))
  }

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

    fetch('/api/v1/widgets')
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      setWidgets(parsedBody)
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
  let rightTopbarContent, leftTopbarContent, sidebar
  if(currentUser) {
    sidebar = <Sidebar activePath={activePath} addWidget={addWidget} toggleEditMode={toggleEditMode}  editMode={editMode} errors={widgetErrors} />
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
          <Route exact path='/' render={(props) => <LandingPageContainer user={currentUser} /> }/>
          <Route exact path='/welcome' render={(props) => <LandingPageContainer user={currentUser} />}/>
          <Route exact path='/dash' render={(props) => <Dashboard widgets={widgets} moveWidget={moveWidget} deleteWidget={deleteWidget} editMode={editMode} /> }/>
          <Route exact path='/stash' component={Stash}/>
          <Route exact path='/stash/journals' component={JournalsIndexContainer}/>
          <Route exact path='/stash/journals/:id' component={JournalShowContainer}/>
        </Switch>
      </section>
    </Fragment>
  )
}

export default Topbar;
