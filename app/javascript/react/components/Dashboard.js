import React, { Fragment, useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import WidgetTile from './WidgetTile'

const Dashboard = ({ widgets, deleteWidget, editMode, moveWidget }) => {
  const widgetTiles = widgets.map((widget, index) => {
    const handleDelete = () => {
      deleteWidget(widget.id)
    }
    return(
      <WidgetTile
        handleDelete={handleDelete}
        editMode={editMode}
        key={widget.id}
        type={widget.modulable_type}
        mod={widget.module}
        index={index}
        moveWidget={moveWidget}
      />
    )
  })

  return (
    <Fragment>
      <DndProvider backend={Backend} >
        <div className="dashboard-container">{widgetTiles}</div>
      </DndProvider>
    </Fragment>
  )
}

export default Dashboard;
