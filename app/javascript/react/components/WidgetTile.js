import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd'

import Widget from './pojos/widget'

const WidgetTile = ({ type, mod, handleDelete, editMode, moveWidget, index }) => {
  let wid = Widget.load(type, mod, index)
  let deleteButtonClass = "fas fa-times-circle remove-widget-icon"
  if (editMode) deleteButtonClass += " edit-active"
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: 'WidgetChild',
    drop(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.parentIndex
      const hoverIndex = index
      if (dragIndex === hoverIndex || dragIndex === null) {
        return
      }
      moveWidget(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'WidgetChild', index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div className={"widget-tile"} ref={ref}>
      <i onClick={handleDelete} className={deleteButtonClass}></i>
      {wid}
    </div>
  )
}

export default WidgetTile;
