import React from 'react';
import { Link } from 'react-router-dom'

const Sidebar = ({ activePath }) => {
  let dashClass = "side-bar-icon"
  let stashClass = "side-bar-icon"
  if(activePath === "dash" || activePath === "") dashClass+= " active-icon"
  if(activePath === "stash") stashClass+= " active-icon"
  return (
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
    </nav>
  )
}

export default Sidebar;
