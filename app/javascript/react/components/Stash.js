import React, { useState, useEffect } from 'react';

import StashTile from './StashTile';

const Stash = () => {
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

  return(
    <ul>
      <StashTile
        type="journals"
        content={journals}
      />
    </ul>
  )
}

export default Stash;
