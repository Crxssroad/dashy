import React from 'react';
import { Link } from 'react-router-dom'

const StashTile = ({ type, content }) => {
  const style = `${type}-stash-tile`

  return (
    <Link to={`/stash/${type}`}>
      <li className={style}>
        <p>You have {content.length} journals</p>
      </li>
    </Link>
  )
}

export default StashTile;
