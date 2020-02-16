import React, { useState } from 'react'

import ErrorList from '../ErrorList'

const WeatherWidgetNewForm = ({ updateFetchedStash, addWidget }) => {
  let defaultWeatherSettings = {
    custom: false
  }
  const [weatherSettings, setWeatherSettings] = useState(defaultWeatherSettings)
  const [errors, setErrors] = useState([])

  const addNewWeatherSettings = () => {
    fetch('/api/v1/weather_settings', {
      credentials: 'same-origin',
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(weatherSettings)
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
          modulable_type: "WeatherSetting",
          modulable_id: parsedBody.id
        })
        setWeatherSettings(defaultWeatherSettings)
      } else {
        setErrors(parsedBody)
      }
    })
    .catch(error => console.error(`Error in weather settings post fetch ${error.message}`))
  }

  const handleInput = event => {
    setWeatherSettings({
      ...weatherSettings,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    addNewWeatherSettings()
  }

  return (
    <form onSubmit={handleSubmit}>
      <ErrorList errors={errors} />
      <input className="btn btn-block" type="submit" value="Add Weather Widget" />
    </form>
  )
}

export default WeatherWidgetNewForm
