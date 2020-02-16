import React, { Fragment, useState, useEffect } from 'react';

import WidgetTile from './WidgetTile'

const Dashboard = ({ widgets, deleteWidget, editMode }) => {
  const widgetTiles = widgets.map(widget => {
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
      />
    )
  })

  return (
    <Fragment>
      <div className="dashboard-container">{widgetTiles}</div>
    </Fragment>
  )
}

export default Dashboard;
