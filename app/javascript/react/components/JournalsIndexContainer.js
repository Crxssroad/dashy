import React, { useState, useEffect } from 'react';

import JournalTile from './JournalTile';

const JournalsIndexContainer = () => {
  const [journals, setJournals] = useState([])

  useEffect(() => {
    fetch('/api/v1/stashes')
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      setJournals(parsedBody.journals)
    })
    .catch(error => console.error(`Error in stash fetch ${error.message}`))
  }, [])

  const journalTiles = journals.map(journal => {
    return(
      <JournalTile
        key={journal.id}
        journal={journal}
      />
    )
  })

  return(
    <ul className="journals-index-container">
      {journalTiles}
    </ul>
  )
}

export default JournalsIndexContainer;
