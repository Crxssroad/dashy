import React from 'react'

import EntryTile from './EntryTile'

const EntryList = ({ entries }) => {
  const tiles = entries.map(entry => {
    return (
      <EntryTile
        key={entry.id}
        entry={entry}
      />
    )
  })
  return(
    <div>
      {tiles}
    </div>
  )
}

export default EntryList
