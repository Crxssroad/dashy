import React, { useState } from 'react'

import ErrorList from '../ErrorList'

const JournalWidgetNewForm = ({ updateFetchedStash, addWidget }) => {
  let defaultJournal = {
    title: "",
    description: ""
  }
  const [journal, setJournal] = useState(defaultJournal)
  const [errors, setErrors] = useState([])

  const addNewJournal = () => {
    fetch('/api/v1/journals', {
      credentials: 'same-origin',
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(journal)
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
        addWidget({
          modulable_type: "Journal",
          modulable_id: parsedBody.id
        })
        setJournal(defaultJournal)
      } else {
        setErrors(parsedBody)
      }
    })
    .catch(error => console.error(`Error in journal post fetch ${error.message}`))
  }

  const handleInput = event => {
    setJournal({
      ...journal,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    addNewJournal()
  }

  return (
    <form onSubmit={handleSubmit}>
      <ErrorList errors={errors} />
      <div className="form-group">
        <input placeholder="Title" className="form-control" name="title" type="text" onChange={handleInput} value={journal.title}/>
      </div>
      <div className="form-group">
        <textarea placeholder="Description" className="form-control" name="description" onChange={handleInput} value={journal.description} />
      </div>

      <input className="btn btn-block" type="submit" value="Add New Journal" />
    </form>
  )
}

export default JournalWidgetNewForm
