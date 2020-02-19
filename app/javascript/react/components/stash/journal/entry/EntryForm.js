import React, { useState } from 'react';

const EntryForm = ({ addEntry, errors }) => {
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
      <label>
        <input placeholder="Untitled" name="title" type="text" onChange={handleInput} value={entry.title}/>
      </label>

      <label>
        <textarea name="body" onChange={handleInput}>{entry.body}</textarea>
      </label>

      <input type="submit" value="Save" />
    </form>
  )
}

export default EntryForm;
