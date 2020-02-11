import React, { useState, useEffect, Fragment } from 'react';

import JournalNewForm from './JournalNewForm';
import JournalDetails from './JournalDetails';

const JournalShowContainer = props => {
  const [journal, setJournal] = useState({});
  const [errors, setErrors] = useState([]);
  const [editClicked, setEditClicked] = useState(false);

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

  const handleFormDisplay = () => {
    setEditClicked(!editClicked)
  }

  let display = <Fragment>
    <JournalDetails journal={journal} />
    <input type="button" onClick={handleFormDisplay} value="Edit" />
    <input type="button" onClick={handleFormDisplay} value="Delete" />
  </Fragment>
  if (editClicked) {
    display = <JournalNewForm
      handleFormDisplay={handleFormDisplay}
      editJournal={editJournal}
      oldJournal={journal}
      errors={errors}
    />
  }

  return(
    <div className="journal-show-container">
      {display}
    </div>
  )
}

export default JournalShowContainer;
