import React, { Fragment, useState, useEffect } from 'react';

import WidgetTile from './WidgetTile'

const Dashboard = ({ widgets }) => {

  const widgetTiles = widgets.map(widget => {
    return(
      <WidgetTile
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
