import React from 'react'

import JournalWidgetNewForm from '../dashboard/widgets/JournalWidgetNewForm'
import WeatherWidgetNewForm from '../dashboard/widgets/WeatherWidgetNewForm'
import RSSWidgetNewForm from '../dashboard/widgets/RSSWidgetNewForm'
import NoteWidgetNewForm from '../dashboard/widgets/NoteWidgetNewForm'

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
    if (type === "Note") {
      return <NoteWidgetNewForm addWidget={addWidget} />
    }
  }
}

export default WidgetForm
