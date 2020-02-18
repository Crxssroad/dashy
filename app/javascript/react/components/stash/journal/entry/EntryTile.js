import React from 'react'
import ReactTimeAgo from 'react-time-ago'

const EntryTile = ({ entry, populateEntryPage, selected }) => {
  let itemClass = "item"
  if (selected) itemClass += " selected"
  return(
    <li className={itemClass} onClick={populateEntryPage}>
      <h6>{entry.title}</h6>
      <p>{entry.body}</p>
      <span><ReactTimeAgo date={Date.parse(entry.updated_at)} /></span>
    </li>
  )
}

export default EntryTile
