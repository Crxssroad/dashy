import React, {Fragment} from 'react'
import ReactAnimatedWeather from 'react-animated-weather'

const WeatherExpandedWidget = ({content, closeModal}) => {
  const dailyWeather = content.daily.data.slice(1)

  const weatherTiles = dailyWeather.map((day, index) => {
    const icon = day.icon.toUpperCase().replace(/-/g, '_')
    const dayOfTheWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ][(new Date(day.time * 1000)).getDay()]
    let skycon = <ReactAnimatedWeather
      icon={icon}
      color={'white'}
      size={50}
      animate={true}
    />
  const formatPrecipitation = (type, probability) => {
    const ICONS = {
      "snow": <i className="fas fa-snowflake"></i>,
      "rain": <i className="fas fa-cloud-rain"></i>,
      "hail": <i class="fas fa-cloud-hail"></i>
    }
    return <Fragment>{ICONS[type]} {probability * 100}%</Fragment>
  }
  const precipitation = formatPrecipitation(day.precipType, day.precipProbability)
  const sunRise = new Date(day.sunriseTime * 1000)
  const sunDown = new Date(day.sunsetTime * 1000)
    return (
      <div className="weather-tile" key={index}>
        <div className="left">
          <p>{dayOfTheWeek}</p>
          <p>{skycon}</p>
          <p>{day.summary}</p>
        </div>
        <div className="right">
          <p>{precipitation}</p>
          <p>High: {Math.round(day.temperatureHigh)}°F</p>
          <p>Low:  {Math.round(day.temperatureLow)}°F</p>
          <p><i className="fas fa-sun"></i><i className="fas fa-arrow-up"></i> {sunRise.getHours()}:{sunRise.getMinutes()}AM</p>
          <p><i className="fas fa-sun"></i><i className="fas fa-arrow-down"></i> {sunDown.getHours() - 12}:{sunDown.getMinutes()}PM</p>
        </div>
      </div>
    )
  })
  return (
    <div className="expanded">
      <div className="expanded-weather">
        <div className="close-modal-area" onClick={closeModal}></div>
        <div className="tile-area">{weatherTiles}</div>
      </div>
    </div>
  )
}

export default WeatherExpandedWidget
