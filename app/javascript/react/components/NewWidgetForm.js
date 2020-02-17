import React, { Fragment, useState, useEffect } from 'react'

import ModalForm from './ModalForm'
import ErrorList from './ErrorList'
import WidgetForm from './pojos/widgetForm'

const NewWidgetForm = ({ addWidget, errors }) => {
  const defaultWidget = {
    position: "",
    modulable_type: "",
    modulable_id: ""
  }
  const [widget, setWidget] = useState(defaultWidget)
  const [fetchedStash, setFetchedStash] = useState([])
  const stashableWidgets = ["Journal"]
  const optionalSettingsWidgets = ["WeatherSetting", "RssFeed"]

  const clearForm = () => {
    setWidget(defaultWidget)
  }

  const updateFetchedStash = (newItem) => {
    setFetchedStash([...fetchedStash, newItem])
  }

  const handleInput = event => {
    setWidget({
      ...widget,
      [event.currentTarget.name]: event.currentTarget.value
    })

    if (event.currentTarget.name === "modulable_type" && stashableWidgets.includes(event.currentTarget.value)) {
      const controller = event.currentTarget.value[0].toLowerCase() + event.currentTarget.value.slice(1) + "s"
      fetch(`/api/v1/${controller}/`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`${response.status} ${response.statusText}`);
        }
      })
      .then(parsedBody => {
        setFetchedStash(parsedBody)
      })
      .catch(error => console.error(`Error in journal fetch ${error.message}`));
    }
  }

  const handleSubmit = event => {
    event.preventDefault()
    addWidget(widget, clearForm)
  }

  const errorList = <ErrorList errors={errors} />

  let addButton, options, subOptions

  if (stashableWidgets.includes(widget.modulable_type)) {

    const selectOptions = fetchedStash.map(item => {
      return(
        <option key={item.id} value={item.id}>{item.title}</option>
      )
    })
    const selectBox = <select onChange={handleInput} className="custom-select" name="modulable_id">
        <option defaultValue>(none)</option>
        {selectOptions}
      </select>
    const dynamicWidgetForm = WidgetForm.load_stashable(widget.modulable_type, updateFetchedStash, addWidget)
    options = <div className="form-group">
      <p className="modalform-text">Select a {widget.modulable_type}</p>
      {selectBox}
    </div>
    subOptions = <Fragment>
      <p className="modalform-text">or create a new one!</p>
      {dynamicWidgetForm}
    </Fragment>
    addButton = <input
      className="btn btn-primary btn-lg btn-block login-btn"
      type="submit"
      value="Add"
    />
  }

  if (optionalSettingsWidgets.includes(widget.modulable_type)) {
    const dynamicWidgetForm = WidgetForm.load_optional(widget.modulable_type, addWidget)
    subOptions = <Fragment>
      {dynamicWidgetForm}
    </Fragment>
  }

  return (
    <Fragment>
      <div className="text-center">
       <a href="#widgetModal" data-toggle="modal">
        <i className="fas fa-plus-circle"></i>
       </a>
      </div>
      <ModalForm type="widget">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <select onChange={handleInput} className="custom-select" name="modulable_type">
              <option defaultValue>Select a widget type</option>
              <option value="Journal">Journal</option>
              <option value="WeatherSetting">Weather</option>
              <option value="RssFeed">RSS</option>
            </select>
          </div>
          {options}
          {addButton}
        </form>
        {errorList}
        {subOptions}
      </ModalForm>
    </Fragment>
  )
}

export default NewWidgetForm
