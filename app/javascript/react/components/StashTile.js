import React from 'react';

const StashTile = ({ type, content }) => {
  const style = `${type}-stash-tile`

  return (
    <li className={style}>
      <p>You have {content.length} journals</p>
    </li>
  )
}

export default StashTile;
