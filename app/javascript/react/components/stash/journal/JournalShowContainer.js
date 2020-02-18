import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom'

import JournalNewForm from './JournalNewForm';
import JournalDetails from './JournalDetails';
import EntryNewForm from './entry/EntryNewForm';

const JournalShowContainer = props => {
  const [journal, setJournal] = useState({});
  const [entries, setEntries] = useState([]);
  const [errors, setErrors] = useState([]);
  const [editClicked, setEditClicked] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const journalId = props.match.params.id;

  useEffect(() => {
    fetch(`/api/v1/journals/${journalId}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(parsedBody => {
      setJournal(parsedBody)
      setEntries(parsedBody.entries)
    })
    .catch(error => console.error(`Error in journal fetch ${error.message}`));
  }, []);

  const editJournal = (payload) => {
    fetch(`/api/v1/journals/${journalId}`, {
      credentials: 'same-origin',
      method: "PATCH",
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
        setJournal(parsedBody)
        setEditClicked(false)
      } else {
        setErrors(parsedBody)
      }
    })
    .catch(error => console.error(`Error in journal patch fetch ${error.message}`))
  }

  const deleteJournal = (payload) => {
    fetch(`/api/v1/journals/${journalId}`, {
      credentials: 'same-origin',
      method: "DELETE"
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(parsedBody => {
      setShouldRedirect(true)
    })
    .catch(error => console.error(`Error in journal delete fetch ${error.message}`))
  }

  const handleFormDisplay = () => {
    setEditClicked(!editClicked)
  }

  const handleDelete = () => {
    if (window.confirm(`Deleteing "${journal.title}" will delete all of its associated notes. Are you sure?`)) {
      deleteJournal();
    };
  };

  let display
  if (journal.title) {
    display = <Fragment>
      <JournalDetails journal={journal} />
      <input type="button" onClick={handleFormDisplay} value="Edit" />
      <input type="button" value="Delete" onClick={handleDelete}/>
    </Fragment>
  }
  if (editClicked) {
    display = <JournalNewForm
      handleFormDisplay={handleFormDisplay}
      editJournal={editJournal}
      oldJournal={journal}
      errors={errors}
    />
  }

  if (shouldRedirect) return <Redirect to='/stash/journals' />

  const addEntry = (payload) => {
    fetch(`/api/v1/journals/${journal.id}/entries/`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      setEntries([...entries, parsedBody])
    })
    .catch(error => console.error(`Error in entry post fetch ${error.message}`))
  }

  return(
    <div className="journal-show-container">
      {display}
      <EntryNewForm addEntry={addEntry} errors={errors} />
    </div>
  )
}

export default JournalShowContainer;
