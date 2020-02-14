import React from 'react'

import JournalWidgetNewForm from '../widgets/JournalWidgetNewForm'

class WidgetForm {
  static load(type, updateFetchedStash, addWidget) {
    if (type === "Journal") {
      return <JournalWidgetNewForm updateFetchedStash={updateFetchedStash} addWidget={addWidget} />
    }
  }
}

export default WidgetForm
