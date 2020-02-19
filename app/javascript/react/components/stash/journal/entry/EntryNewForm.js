import React, { useState } from 'react';

import ErrorList from '../../../ErrorList';

const EntryNewForm = ({ addEntry, errors }) => {
  let defaultEntry = {
    title: "",
    body: ""
  }
  const [entry, setEntry] = useState(defaultEntry)

  const handleInput = event => {
    setEntry({
      ...entry,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    addEntry(entry)
  }

  return (
    <form onSubmit={handleSubmit}>
      <ErrorList errors={errors} />
      <label>
        <input placeholder="Untitled" name="title" type="text" onChange={handleInput} value={entry.title}/>
      </label>

      <label>
        <textarea name="body" value={entry.body} onChange={handleInput} />
      </label>

      <input type="submit" value="Save" />
    </form>
  )
}

export default EntryNewForm;
