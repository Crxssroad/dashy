import React from 'react'

import JournalWidgetNewForm from '../widgets/JournalWidgetNewForm'
import WeatherWidgetNewForm from '../widgets/WeatherWidgetNewForm'
import RSSWidgetNewForm from '../widgets/RSSWidgetNewForm'

class WidgetForm {
  static load_stashable(type, updateFetchedStash, addWidget) {
    if (type === "Journal") {
      return <JournalWidgetNewForm updateFetchedStash={updateFetchedStash} addWidget={addWidget} />
    }
  }
  static load_optional(type, addWidget) {
    if (type === "WeatherSetting") {
      return <WeatherWidgetNewForm addWidget={addWidget} />
    }
    if (type === "RssFeed") {
      return <RSSWidgetNewForm addWidget={addWidget} />
    }
  }
}

export default WidgetForm
