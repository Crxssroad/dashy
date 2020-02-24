import React from 'react'

import JournalWidget from '../dashboard/widgets/JournalWidget'
import WeatherWidget from '../dashboard/widgets/WeatherWidget'
import RSSWidget from '../dashboard/widgets/RSSWidget'
import NoteWidget from '../dashboard/widgets/NoteWidget'

import WeatherExpandedWidget from '../dashboard/widgets/WeatherExpandedWidget'
import NoteExpandedWidget from '../dashboard/widgets/NoteExpandedWidget'

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
    if (type === "note") {
      return <NoteWidget content={content} setExpandedWidget={setExpandedWidget} />
    }
  }

  static expand(widget, closeModal) {
    if (widget.type === "Weather") {
      return <WeatherExpandedWidget content={widget.content} closeModal={closeModal} />
    }
    if (widget.type === "Note") {
      return <NoteExpandedWidget content={widget.content} closeModal={closeModal} />
    }
  }
}

export default Widget
