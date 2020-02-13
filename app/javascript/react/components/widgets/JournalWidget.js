import React from 'react'

const JournalWidget = ({ journal }) => {
  return(
    <div className="journal-widget">
      <h4>
        {journal.title}
        <i className="fas fa-book"></i>
      </h4>
      <div>
        <p>{journal.description}</p>
      </div>
    </div>
  )
}

export default JournalWidget
