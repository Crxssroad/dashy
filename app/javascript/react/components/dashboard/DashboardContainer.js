import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

import Sidebar from '../Sidebar'
import WidgetTile from './WidgetTile'

const DashboardContainer = () => {
  const [widgets, setWidgets] = useState([])
  const [widgetErrors, setWidgetErrors] = useState([])
  const [editMode, setEditMode] = useState(false)

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

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const moveWidget = useCallback(
      (dragIndex, hoverIndex, dragId, hoverId) => {
        const dragWidget = widgets[dragIndex]
        const newOrder = widgets.map((widget, index, oldOrder) => {
          if (index === hoverIndex) {
            return oldOrder[dragIndex]
          }
          if (index === dragIndex) {
            return oldOrder[hoverIndex]
          }
          return widget
        })
        const liveUpdate = () => {
          setWidgets(newOrder)
        }
        updateOrder({
            dragIndex: dragIndex,
            hoverIndex: hoverIndex,
            dragId: dragId,
            hoverId: hoverId
          },
          liveUpdate
        )
      },
      [widgets],
  )

  const updateOrder = (payload, liveUpdate) => {
    fetch('/api/v1/widgets/reorder', {
      credentials: 'same-origin',
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(`${response.status} ${response.statusText}`)
      }
    })
    .then(parsedBody => {
      if (!Array.isArray(parsedBody)) {
        liveUpdate()
      }
    })
    .catch(error => console.error(`Error in widget order patch ${error.message}`))
  }

  const addWidget = (payload, clearForm) => {
    payload.position = widgets.length
    fetch('/api/v1/widgets', {
      credentials: 'same-origin',
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(parsedBody => {
      if (!Array.isArray(parsedBody)) {
        $('#widgetModal').modal('hide')
        if (clearForm) clearForm()
        setWidgetErrors([])
        setWidgets([...widgets, parsedBody])
      } else {
        setWidgetErrors(parsedBody)
      }
    })
    .catch(error => console.error(`Error in journal post fetch ${error.message}`))
  }

  const deleteWidget = (widgetId) => {
    fetch(`/api/v1/widgets/${widgetId}`, {
      credentials: 'same-origin',
      method: "DELETE"
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then(parsedBody => {
      setWidgets(widgets.filter(widget => widget.id !== parsedBody.id))
    })
    .catch(error => console.error(`Error in widget delete fetch ${error.message}`))
  }

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
        widgetId={widget.id}
      />
    )
  })

  return (
    <Fragment>
      <Sidebar rootPath="/dash" addWidget={addWidget} errors={widgetErrors} editMode={editMode} toggleEditMode={toggleEditMode} />
      <DndProvider backend={Backend} >
        <div className="dashboard-container">{widgetTiles}</div>
      </DndProvider>
    </Fragment>
  )
}

export default DashboardContainer;
