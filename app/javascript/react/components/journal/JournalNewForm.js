import React, { useState } from 'react';

import ErrorList from '../ErrorList';

const JournalNewForm = ({ handleFormDisplay, errors, addNewJournal }) => {
  const emptyJournal = {
    title: "",
    description: ""
  }
  const [journal, setJournal] = useState(emptyJournal)

  const handleInput = event => {
    setJournal({
      ...journal,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    addNewJournal(journal)
  }

  return (
    <form onSubmit={handleSubmit}>
      <ErrorList errors={errors} />
      <label>
        Title
        <input name="title" type="text" onChange={handleInput} value={journal.title}/>
      </label>

      <label>
        Description
        <textarea name="description" onChange={handleInput} value={journal.description}/>
      </label>

      <input type="submit" value="Create" />
      <input type="button" value="Cancel" onClick={handleFormDisplay}/>
    </form>
  )
}

export default JournalNewForm;
