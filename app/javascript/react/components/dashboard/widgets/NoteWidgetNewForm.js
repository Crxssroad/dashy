import React, { useState } from 'react'

const RSSWidgetNewForm = ({ addWidget }) => {

  const addNote = () => {
    fetch('/api/v1/notes', {
      credentials: 'same-origin',
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
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
          modulable_type: "Note",
          modulable_id: parsedBody.id
        })
      } else {
        setErrors(parsedBody)
      }
    })
    .catch(error => console.error(`Error in note post fetch ${error.message}`))
  }

  const handleSubmit = event => {
    event.preventDefault()
    addNote()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className="btn btn-block" type="submit" value="Add New Note" />
    </form>
  )
}

export default RSSWidgetNewForm
