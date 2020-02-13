import React from 'react'

import JournalWidget from '../widgets/JournalWidget'

class Widget {
  static load(type, content) {
    if (type === "Journal") {
      return <JournalWidget journal={content} />
    }
  }
}

export default Widget
