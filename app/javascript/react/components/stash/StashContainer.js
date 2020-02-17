import React, { useState, useEffect, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import StashTile from './StashTile';
import Sidebar from '../Sidebar'

const StashContainer = () => {
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
    <Fragment>
      <Sidebar rootPath="/stash" />
        <ul>
          <StashTile
            type="journals"
            content={journals}
          />
        </ul>
    </Fragment>
  )
}

export default StashContainer;
