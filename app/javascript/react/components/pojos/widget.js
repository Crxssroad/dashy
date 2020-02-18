import React from 'react'

import JournalWidget from '../dashboard/widgets/JournalWidget'
import WeatherWidget from '../dashboard/widgets/WeatherWidget'
import RSSWidget from '../dashboard/widgets/RSSWidget'

class Widget {
  static load(type, content, parentIndex) {
    if (type === "journal") {
      return <JournalWidget journal={content} parentIndex={parentIndex} />
    }
    if (type === "weather_setting") {
      return <WeatherWidget settings={content} parentIndex={parentIndex} />
    }
    if (type === "rss_feed") {
      return <RSSWidget settings={content} parentIndex={parentIndex} />
    }
  }
}

export default Widget
