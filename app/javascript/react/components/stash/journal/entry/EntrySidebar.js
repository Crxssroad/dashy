import React from 'react'

import EntryTile from './EntryTile'

const EntrySidebar = ({ entries, journal, setEntry, selectedEntry, addEntry, entriesClass }) => {

  const tiles = entries.map(entry => {
    const populateEntryPage = () => {
      setEntry(entry)
    }
    let selected = false
    if (selectedEntry.id === entry.id) selected = true
    return (
      <EntryTile
        key={entry.id}
        entry={entry}
        populateEntryPage={populateEntryPage}
        selected={selected}
      />
    )
  })
  return(
    <div id="entries-sidebar" className={entriesClass}>
      <div className="sidebar-hdr">
        <h5><i className="fas fa-book"></i> {journal.title}</h5>
        <i className="fas fa-plus-circle" onClick={addEntry}></i>
        <p>{entries.length} entries</p>
      </div>
      <ul>
        {tiles}
      </ul>
    </div>
  )
}

export default EntrySidebar
