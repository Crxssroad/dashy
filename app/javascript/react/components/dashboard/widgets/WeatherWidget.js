import React, { useState, useEffect, Fragment } from 'react'
import ReactAnimatedWeather from 'react-animated-weather'

import WeatherExpandedWidget from './WeatherExpandedWidget'

const WeatherWidget = ({ settings, setExpandedWidget }) => {
  const [weatherRecord, setWeatherRecord] = useState(null)

  let display = <p className="ellipsis">Loading<span>.</span><span>.</span><span>.</span></p>
  let weather, expandedView
  if (weatherRecord) {
    weather = weatherRecord.data
    let current = weather.currently
    if (current) {
      const icon = current.icon.toUpperCase().replace(/-/g, '_')
      let skycon = <ReactAnimatedWeather
        icon={icon}
        color={'white'}
        size={100}
        animate={true}
      />
      const translateWindBearing = (windBearing) => {
        let direction
        if (windBearing) {
          if (windBearing > 22.5 && windBearing <= 67.5) {
            direction = "NE"
          } else if (windBearing > 67.5 && windBearing <= 112.5) {
            direction = "E"
          } else if (windBearing > 112.5 && windBearing <= 157.5) {
            direction = "SE"
          } else if (windBearing > 157.5 && windBearing <= 202.5) {
            direction = "S"
          } else if (windBearing > 202.5 && windBearing <= 247.5) {
            direction = "SW"
          } else if (windBearing > 247.5 && windBearing <= 292.5) {
            direction = "W"
          } else if (windBearing > 292.5 && windBearing <= 337.5) {
            direction = "NW"
          } else {
            direction = "N"
          }
          direction += " at"
        }
        return direction
      }

      display = <Fragment>
        <section style={{marginBottom:"1rem"}} >
          <span><i className="fas fa-map-marker-alt"></i> {weatherRecord.location.address.city}</span>
          <span style={{float:"right"}}>{Math.round(current.temperature)}°F</span>
        </section>
        <section style={{marginBottom:"3.4rem", textAlign:"center"}} onClick={() => {
            setExpandedWidget({type: "Weather", content: weather})
          }}>
          {skycon}
          <p>{current.summary}</p>
        </section>
        <section>
          <section style={{float:"left"}}>
            <p>Feels like:</p>
            <p>{Math.round(current.apparentTemperature)}°F</p>
          </section>
          <p style={{float:"right"}}><i className="fas fa-wind"></i> {translateWindBearing(current.windBearing)} {current.windSpeed} mph</p>
        </section>
      </Fragment>
    } else {
      display = <p>There was an error retrieving the weather data. Try again later.</p>
    }
  }

  useEffect(() => {
    const success = (position) => {
      const latitude  = position.coords.latitude
      const longitude = position.coords.longitude

      getWeatherData({latitude: latitude, longitude: longitude})
    }

    const error = () => {
      display = <p>Unable to retrieve your location</p>
    }

    if (!navigator.geolocation) {
      display = <p>Geolocation is not supported by your browser</p>
    } else {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }, [])

  const getWeatherData = (formPayload) => {
    fetch('/api/v1/weathers', {
      credentials: 'same-origin',
      method: "POST",
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
      setWeatherRecord(parsedBody)
    })
    .catch(error => console.error(`Error in weather post fetch ${error.message}`))
  }

  return (
    <div className="weather-widget widget-child">
      {display}
    </div>
  )
}

export default WeatherWidget
