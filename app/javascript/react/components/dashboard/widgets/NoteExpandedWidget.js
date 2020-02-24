import React, { useState } from 'react'

const NoteExpandedWidget = ({content, closeModal}) => {
  const { updateNote } = content

  const [note, setNote] = useState(content.note)

  const handleInput = event => {
    setNote({
      ...note,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSave = event => {
    updateNote(note, closeModal)
  }

  return (
    <div className="expanded">
      <div className="expanded-note">
        <div className="close-modal-area" onClick={handleSave}></div>
        <div className="note-area">
          <textarea autoFocus name="body" value={note.body} onChange={handleInput} />
        </div>
      </div>
    </div>
  )
}

export default NoteExpandedWidget
