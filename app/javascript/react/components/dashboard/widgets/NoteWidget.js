import React, { useState } from 'react'

const NoteWidget = ({ content, setExpandedWidget }) => {
  const [note, setNote] = useState(content)

  const updateNote = (formPayload, closeModal) => {
    fetch(`/api/v1/notes/${note.id}`, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formPayload)
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      setNote(parsedBody)
      closeModal()
    })
    .catch(error => console.error(`Error in notes patch fetch ${error.message}`))
  }

  const expandWidget = () => {
    const payload = {
      note: note,
      updateNote: updateNote
    }
    setExpandedWidget({type: "Note", content: payload})
  }

  return(
    <div className="widget-child note-widget" onClick={expandWidget} >
      <h4 className="hdr">Note<i className="fas fa-sticky-note"></i></h4>
      <p>{note.body}</p>
    </div>
  )
}

export default NoteWidget
