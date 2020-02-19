import React from 'react'

const JournalWidget = ({ journal, parentIndex }) => {
  const entries = journal.entries.map(entry => {
    return(
      <li key={entry.id} className="entry"><i className="fas fa-pen-square"></i> {entry.title}</li>
    )
  })
  let entryInfo = <p><i className="fas fa-book"></i> {journal.title} has no entries yet.</p>
  if (entries.length === 1) entryInfo = <p>1 Entry</p>
  if (entries.length > 1) entryInfo = <p>{entries.length} Entries</p>
  return(
    <div className="journal-widget widget-child"
    >
      <h4>
        {journal.title}
        <i className="fas fa-book"></i>
      </h4>
      <p className="description">{journal.description}</p>
      <div>
        {entryInfo}
        <ul>{entries}</ul>
      </div>
    </div>
  )
}

export default JournalWidget
