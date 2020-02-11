import React, { useState, useEffect } from 'react';

import JournalTile from './JournalTile';
import JournalNewForm from './JournalNewForm';

const JournalsIndexContainer = () => {
  const [journals, setJournals] = useState([]);
  const [errors, setErrors] = useState([]);
  const [newClicked, setNewClicked] = useState(false);

  useEffect(() => {
    fetch('/api/v1/stashes')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(parsedBody => {
      setJournals(parsedBody.journals)
    })
    .catch(error => console.error(`Error in stash fetch ${error.message}`));
  }, []);

  const addNewJournal = (payload) => {
    fetch('/api/v1/journals', {
      credentials: 'same-origin',
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(parsedBody => {
      if (!Array.isArray(parsedBody)) {
        setJournals([...journals, parsedBody])
        setNewClicked(false)
      } else {
        setErrors(parsedBody)
      }
    })
    .catch(error => console.error(`Error in journal post fetch ${error.message}`))
  }

  const journalTiles = journals.map(journal => {
    return(
      <JournalTile
        key={journal.id}
        journal={journal}
      />
    );
  });

  const handleFormDisplay = () => {
    setNewClicked(!newClicked)
  }

  let form = <input type="button" onClick={handleFormDisplay} value="Create Journal" />
  if (newClicked) {
    form = <JournalNewForm
      handleFormDisplay={handleFormDisplay}
      addNewJournal={addNewJournal}
      errors={errors}
    />
  }

  return(
    <div className="journals-index-container">
      {form}
      <ul >
        {journalTiles}
      </ul>
    </div>
  )
}

export default JournalsIndexContainer;
