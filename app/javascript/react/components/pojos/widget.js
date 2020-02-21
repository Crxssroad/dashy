import React from 'react'

import JournalWidget from '../dashboard/widgets/JournalWidget'
import WeatherWidget from '../dashboard/widgets/WeatherWidget'
import RSSWidget from '../dashboard/widgets/RSSWidget'

import WeatherExpandedWidget from '../dashboard/widgets/WeatherExpandedWidget'

class Widget {
  static load(type, content, parentIndex, setExpandedWidget) {
    if (type === "journal") {
      return <JournalWidget journal={content} />
    }
    if (type === "weather_setting") {
      return <WeatherWidget settings={content} setExpandedWidget={setExpandedWidget} />
    }
    if (type === "rss_feed") {
      return <RSSWidget settings={content} parentIndex={parentIndex} />
    }
  }

  static expand(widget, closeModal) {
    if (widget.type === "Weather") {
      return <WeatherExpandedWidget content={widget.content} closeModal={closeModal} />
    }
  }
}

export default Widget
