import React from 'react'
import { Link } from 'react-router-dom'

const JournalWidget = ({ journal }) => {
  const entries = journal.entries.map(entry => {
    return(
      <li key={entry.id} className="entry"><Link to={`/stash/journals/${journal.id}/entries/${entry.id}`}><i className="fas fa-pen-square"></i> {entry.title}</Link></li>
    )
  })
  let entryInfo = <p><i className="fas fa-book"></i> {journal.title} has no entries yet. <Link to={`/stash/journals/${journal.id}`}>Click me</Link> to get started.</p>
  if (entries.length === 1) entryInfo = <p>1 Entry</p>
  if (entries.length > 1) entryInfo = <p>{entries.length} Entries</p>
  return(
    <div className="journal-widget widget-child"
    >
      <h4>
        <Link to={`/stash/journals/${journal.id}`}>{journal.title}</Link>
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
