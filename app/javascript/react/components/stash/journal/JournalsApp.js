import React, { useState, useEffect } from 'react';

import JournalTile from './JournalTile';
import JournalNewForm from './JournalNewForm';
import EntrySidebar from './entry/EntrySidebar'
import EntryPage from './entry/EntryPage';

const JournalsApp = () => {
  const [journals, setJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState({});
  const [entries, setEntries] = useState([]);
  const [entry, setEntry] = useState({title: "", body: ""})
  const [errors, setErrors] = useState([]);
  const [newClicked, setNewClicked] = useState(false);
  const [journalsVisible, setJournalsVisible] = useState(true);
  const [entriesVisible, setEntriesVisible] = useState(true);

  useEffect(() => {
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
    })
    .catch(error => console.error(`Error in stash fetch ${error.message}`));
  }, []);

  // Journal actions
  const addNewJournal = (payload) => {
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
        setNewClicked(false)
      } else {
        setErrors(parsedBody)
      }
    })
    .catch(error => console.error(`Error in journal post fetch ${error.message}`))
  }

  const journalTiles = journals.map(journal => {
    const populateEntries = () => {
      setSelectedJournal(journal)
      setEntries(journal.entries)
    }
    let selected
    if (journal.id === selectedJournal.id) selected = true
    return(
      <JournalTile
        key={journal.id}
        journal={journal}
        populateEntries={populateEntries}
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

  const handleFormDisplay = () => {
    setNewClicked(!newClicked)
  }

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

  return(
    <div className="journals-index-container">
        <section className={sidebarAreaClass}>
        </section>
        <EntrySidebar
          journal={selectedJournal}
          entries={entries}
          selectedEntry={entry}
          setEntry={setEntry}
          addEntry={addEntry}
          entriesClass={entriesClass}
        />
        <div id="journals-sidebar" className={journalsClass}>
          <h2 className="sidebar-hdr">Journals</h2>
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
