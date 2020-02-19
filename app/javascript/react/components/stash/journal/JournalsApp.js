import React, { useState, useEffect } from 'react';

import JournalTile from './JournalTile';
import CreateJournalButton from './CreateJournalButton'
import EntrySidebar from './entry/EntrySidebar'
import EntryPage from './entry/EntryPage';

const JournalsApp = (props) => {
  const [journals, setJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [entries, setEntries] = useState([]);
  const [entry, setEntry] = useState({title: "", body: ""})
  const [errors, setErrors] = useState([]);
  const [journalsVisible, setJournalsVisible] = useState(true);
  const [entriesVisible, setEntriesVisible] = useState(true);

  useEffect(() => {
    const journalId = Number(props.match.params.journalId)
    const entryId = Number(props.match.params.entryId)
    fetch('/api/v1/journals')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(parsedBody => {
      setJournals(parsedBody)
      let initialJournal = null
      let initialEntries = []
      let initialEntry = {}
      if (journalId) {
        initialJournal = parsedBody[parsedBody.findIndex(journal => journal.id === journalId)]
        initialEntries = initialJournal.entries
        if (entryId) {
          initialEntry = initialEntries[initialEntries.findIndex(entry => entry.id === entryId)]
        }
      } else if (parsedBody[0]) {
        initialJournal = parsedBody[0]
        initialEntries = initialJournal.entries
      } else {
        setEntriesVisible(false)
      }
      setSelectedJournal(initialJournal)
      setEntries(initialEntries)
      setEntry(initialEntry)
    })
    .catch(error => console.error(`Error in journals initial fetch ${error.message}`));
  }, []);

  // Journal actions
  const addNewJournal = (payload, closeForm) => {
    fetch('/api/v1/journals', {
      credentials: 'same-origin',
      method: "POST",
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
        setJournals([...journals, parsedBody])
        closeForm()
      } else {
        setErrors(parsedBody)
      }
    })
    .catch(error => console.error(`Error in journal post fetch ${error.message}`))
  }

  const deleteJournal = (trashedJournal) => {
    fetch(`/api/v1/journals/${trashedJournal.id}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      let newJournals = journals.filter(journal => {
        return journal.id !== parsedBody.id
      })
      setJournals(newJournals)
      setSelectedJournal(null)
      setEntry({})
    })
    .catch(error => console.error(`Error in journals delete fetch ${error.message}`))
  }

  const journalTiles = journals.map(journal => {
    const populateEntries = () => {
      setSelectedJournal(journal)
      setEntries(journal.entries)
    }
    const trashJournal = () => {
      deleteJournal(journal)
    }
    let selected
    if (selectedJournal && journal.id === selectedJournal.id) selected = true
    return(
      <JournalTile
        key={journal.id}
        journal={journal}
        populateEntries={populateEntries}
        trashJournal={trashJournal}
        selected={selected}
      />
    );
  });

  // Entry actions
  const addEntry = () => {
    fetch(`/api/v1/journals/${selectedJournal.id}/entries`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({title:"", body: ""})
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      setEntry(parsedBody)
      setEntries([...entries, parsedBody])
      const journalsCopy = journals.slice()
      journalsCopy[journals.findIndex(journal => journal.id === selectedJournal.id)].entries.push(parsedBody)
      setJournals(journalsCopy)
    })
    .catch(error => console.error(`Error in entries post fetch ${error.message}`))
  }
  const handleEntryInput = event => {
    setEntry({
      ...entry,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const updateEntry = (entryJournal) => {
    fetch(`/api/v1/journals/${entryJournal.id}/entries/${entry.id}`, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(entry)
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      setEntry(parsedBody)
      const entriesCopy = entries.slice()
      entriesCopy[entries.findIndex(entry => entry.id === parsedBody.id)] = parsedBody
      setEntries(entriesCopy)
      const journalsCopy = journals.slice()
      journalsCopy[journals.findIndex(journal => journal.id === entryJournal.id)].entries = entriesCopy
      setJournals(journalsCopy)
    })
    .catch(error => console.error(`Error in entries patch fetch ${error.message}`))
  }

  const deleteEntry = (trashedEntry) => {
    fetch(`/api/v1/journals/${selectedJournal.id}/entries/${trashedEntry.id}`, {
      method: 'DELETE',
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      let newEntries = entries.filter(entry => {
        return entry.id !== parsedBody.id
      })
      setEntries(newEntries)
      const journalsCopy = journals.slice()
      journalsCopy[journals.findIndex(journal => journal.id === selectedJournal.id)].entries = newEntries
      setJournals(journalsCopy)
    })
    .catch(error => console.error(`Error in entry delete fetch ${error.message}`))
  }

  const toggleJournalsSidebar = () => {
    setJournalsVisible(!journalsVisible)
  }

  const toggleEntriesSidebar = () => {
    setEntriesVisible(!entriesVisible)
  }

  let entryPage
  if (entry.id) entryPage =
    <EntryPage
      journal={selectedJournal}
      handleEntryInput={handleEntryInput}
      updateEntry={updateEntry}
      deleteEntry={deleteEntry}
      entry={entry}
      journalsVisible={journalsVisible}
      toggleJournalsSidebar={toggleJournalsSidebar}
      entriesVisible={entriesVisible}
      toggleEntriesSidebar={toggleEntriesSidebar}
    />

  let sidebarAreaClass = "sidebar-area";
  let journalsClass, entriesClass
  if (!journalsVisible) {
    journalsClass = " hide"
  }
  if (!entriesVisible && journalsVisible) {
    sidebarAreaClass+= " hide-one"
    entriesClass= " hide"
  }
  if (!journalsVisible && !entriesVisible) {
    sidebarAreaClass+= " hide-two"
    entriesClass = " hide-two"
  }

  let entrySidebar

  if (selectedJournal) {
    entrySidebar = <EntrySidebar
      journal={selectedJournal}
      entries={entries}
      selectedEntry={entry}
      setEntry={setEntry}
      addEntry={addEntry}
      entriesClass={entriesClass}
    />
  }

  return(
    <div className="journals-index-container">
        <section className={sidebarAreaClass}>
        </section>
        {entrySidebar}
        <div id="journals-sidebar" className={journalsClass}>
          <h2 className="sidebar-hdr">Journals</h2>
          <CreateJournalButton addNewJournal={addNewJournal} errors={errors} />
          <ul>
            {journalTiles}
          </ul>
        </div>
      <section className="entry-area">
        {entryPage}
      </section>
    </div>
  )
}

export default JournalsApp;
