import React, { Fragment, useState } from 'react'
import ErrorList from '../../ErrorList'

const CreateJournalButton = ({ addNewJournal, errors }) => {
  const defaultNewJournal = {
    title: "",
    description: ""
  }
  const [newJournal, setNewJournal] = useState(defaultNewJournal)
  const [formVisible, setFormVisible] = useState(false)

  const handleInput = event => {
    setNewJournal({
      ...newJournal,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleCancel = () => {
    setNewJournal(defaultNewJournal)
    setFormVisible(false)
  }

  const handleSubmit = event => {
    event.preventDefault()
    addNewJournal(newJournal, handleCancel)
  }

  let form
  let displayButton = <input type="button" value="Create Journal" className="create-journal" onClick={(() => {setFormVisible(true)})}/>
  if (formVisible) {
    form = <form onSubmit={handleSubmit}>
      <input name="title" value={newJournal.title} onChange={handleInput} placeholder="Title" />
      <input name="description" value={newJournal.description} onChange={handleInput} placeholder="Description (optional)" />
      <input className="create" type="submit" value="Create"/>
      <input className="create" type="button" value="Cancel" onClick={handleCancel}/>
      <ErrorList errors={errors} />
    </form>
    displayButton = undefined
  }
  return (
    <Fragment>
      {displayButton}
      {form}
    </Fragment>
  )
}

export default CreateJournalButton
