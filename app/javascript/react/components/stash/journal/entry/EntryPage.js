import React, { useState } from 'react'

const EntryPage = ({ entry, journal, handleEntryInput, updateEntry, deleteEntry, journalsVisible, toggleJournalsSidebar, entriesVisible, toggleEntriesSidebar }) => {
  const [headerEditMode, setHeaderEditMode] = useState(false)
  const [initialEntry, setInitialEntry] = useState(entry)
  const [initialJournal, setInitialJournal] = useState(journal)
  if (initialEntry.id !== entry.id) {
    setInitialEntry(entry)
    setInitialJournal(journal)
  }
  const updatesMade = () => {
    return entry.title !== initialEntry.title || entry.body !== initialEntry.body
  }
  const handleSave = () => {
    if(updatesMade()) {
      updateEntry(initialJournal)
      setInitialEntry(entry)
    }
    setHeaderEditMode(false)
  }

  const handleDelete = () => {
    if(confirm("Are you sure you want to delete this entry? The data cannot be recovered.")) {
      deleteEntry(entry)
    }
  }
  let header = <h2 onClick={() => setHeaderEditMode(true)}>{entry.title}</h2>
  if (headerEditMode) header =  <input name="title" onChange={handleEntryInput} value={entry.title} />
  let saveState
  if (updatesMade()) saveState = <span className="red">You have unsaved changes! </span>

  let toggleJournalsBtn, toggleEntriesBtn
  if (entriesVisible && journalsVisible) {
    toggleEntriesBtn = <input type="button" onClick={toggleEntriesSidebar} value={`<`} />
  }
  if (journalsVisible && !entriesVisible) {
    toggleJournalsBtn = <input type="button" onClick={toggleJournalsSidebar} value={`<`} />
    toggleEntriesBtn = <input type="button" onClick={toggleEntriesSidebar} value={`>`} />
  }

  if (!journalsVisible) {
    toggleJournalsBtn = <input type="button" onClick={toggleJournalsSidebar} value={`>`} />
  }

  return (
    <section className="entry-page">
      <section className="toggle-buttons">
        {toggleJournalsBtn}
        {toggleEntriesBtn}
      </section>
      <section className="entry-topbar">
        <div className="left">
          <span className="entry-journal"><i className="fas fa-book"></i> {initialJournal.title}</span>
        </div>
        <div className="right">
          {saveState}
          <span><i className="fas fa-save" onClick={handleSave}></i></span>
          <span><i className="fas fa-trash" onClick={handleDelete}></i></span>
        </div>
      </section>
      <section className="entry-hdr">
        {header}
      </section>
      <section className="content-area">
        <textarea autoFocus className="entry-content" name="body" onChange={handleEntryInput} value={entry.body} />
      </section>
    </section>
  )
}

export default EntryPage
