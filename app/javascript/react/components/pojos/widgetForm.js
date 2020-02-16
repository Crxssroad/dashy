import React from 'react'

import JournalWidgetNewForm from '../widgets/JournalWidgetNewForm'
import WeatherWidgetNewForm from '../widgets/WeatherWidgetNewForm'

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
  }
}

export default WidgetForm
