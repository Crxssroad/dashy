import React, { useState, useEffect } from 'react';

import WidgetTile from './WidgetTile'

const Dashboard = () => {
  const [widgets, setWidgets] = useState([])

  useEffect(() => {
    fetch('/api/v1/widgets')
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      setWidgets(parsedBody)
    })
    .catch(error => `Error in fetch ${error.message}`)
  }, [])

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
    <h1>{widgetTiles}</h1>
  )
}

export default Dashboard;
