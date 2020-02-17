import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'

import NewWidgetForm from './dashboard/NewWidgetForm'

const Sidebar = ({ rootPath, addWidget, toggleEditMode, editMode, errors }) => {
  let dashClass = "side-bar-icon"
  let stashClass = "side-bar-icon"

  let addAWidgetButton, toggleEditButton

  if(rootPath === "/dash") {
    dashClass+= " active-icon"
    addAWidgetButton = <li className="side-bar-icon">
        <NewWidgetForm addWidget={addWidget} errors={errors} />
        <div className="iconTextHover">Add a widget</div>
      </li>
    toggleEditButton = <li className="side-bar-icon" onClick={toggleEditMode}>
      <i className="fas fa-lock"></i>
      <div className="iconTextHover">Toggle Edit Mode</div>
    </li>

    if(editMode) {
      toggleEditButton = <li className="side-bar-icon" onClick={toggleEditMode}>
        <i className="fas fa-lock-open"></i>
        <div className="iconTextHover">Toggle Edit Mode</div>
      </li>
    }
  }
  if(rootPath === "/stash") stashClass+= " active-icon"
  return (
    <Fragment>
      <nav id="side-bar">
        <Link to="/dash">
          <li className={dashClass}>
            <i className="fas fa-chalkboard"></i>
            <div className="iconTextHover">Dash</div>
          </li>
        </Link>
        <Link to="/stash">
          <li className={stashClass}>
            <i className="fas fa-briefcase"></i>
            <div className="iconTextHover">Stash</div>
          </li>
        </Link>
        {addAWidgetButton}
        {toggleEditButton}
      </nav>
    </Fragment>
  )
}

export default Sidebar;
