import React from 'react'

import JournalWidget from '../widgets/JournalWidget'
import WeatherWidget from '../widgets/WeatherWidget'

class Widget {
  static load(type, content) {
    if (type === "Journal") {
      return <JournalWidget journal={content} />
    }
    if (type === "Weather") {
      return <WeatherWidget settings={content} />
    }
  }
}

export default Widget
