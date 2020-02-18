import React from 'react'

const EntryTile = ({ entry }) => {
  return(
    <li>
      {entry.title}
      {entry.body}
    </li>
  )
}

export default EntryTile
