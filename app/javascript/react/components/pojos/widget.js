import React from 'react'

import JournalWidget from '../widgets/JournalWidget'
import WeatherWidget from '../widgets/WeatherWidget'

class Widget {
  static load(type, content, parentIndex) {
    if (type === "Journal") {
      return <JournalWidget journal={content} parentIndex={parentIndex} />
    }
    if (type === "WeatherSetting") {
      return <WeatherWidget settings={content} parentIndex={parentIndex} />
    }
  }
}

export default Widget
