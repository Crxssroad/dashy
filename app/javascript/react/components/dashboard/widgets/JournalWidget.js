import React from 'react'

const JournalWidget = ({ journal, parentIndex }) => {
  const entries = journal.entries.map(entry => {
    return(
      <li key={entry.id}>{entry.title}</li>
    )
  })
  return(
    <div className="journal-widget widget-child"
    >
      <h4>
        {journal.title}
        <i className="fas fa-book"></i>
      </h4>
      <div>
        <p>{journal.description}</p>
        <ul>{entries}</ul>
      </div>
    </div>
  )
}

export default JournalWidget
