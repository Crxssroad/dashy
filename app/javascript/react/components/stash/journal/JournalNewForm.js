import React, { useState } from 'react';

import ErrorList from '../../ErrorList';

const JournalNewForm = ({ handleFormDisplay, errors, addNewJournal, editJournal, oldJournal }) => {
  let defaultJournal = {
    title: "",
    description: ""
  }
  if (editJournal) defaultJournal = oldJournal;
  const [journal, setJournal] = useState(defaultJournal)

  const handleInput = event => {
    setJournal({
      ...journal,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if(addNewJournal) addNewJournal(journal)
    if(editJournal) editJournal(journal)
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
        <textarea name="description" onChange={handleInput}>{journal.description}</textarea>
      </label>

      <input type="submit" value={addNewJournal ? 'Create' : 'Save'} />
      <input type="button" value="Cancel" onClick={handleFormDisplay}/>
    </form>
  )
}

export default JournalNewForm;
