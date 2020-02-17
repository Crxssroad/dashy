import React from 'react'
import { useDrag } from 'react-dnd'

const JournalWidget = ({ journal, parentIndex }) => {
  const [{isDragging}, drag] = useDrag({
    item: { type: 'WidgetChild', parentIndex: parentIndex },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return(
    <div className="journal-widget widget-child"
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <h4>
        {journal.title}
        <i className="fas fa-book"></i>
      </h4>
      <div>
        <p>{journal.description}</p>
      </div>
    </div>
  )
}

export default JournalWidget
