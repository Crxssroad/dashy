import React from 'react';

import Widget from './pojos/widget'

const WidgetTile = ({ type, mod, handleDelete, editMode }) => {
  let wid = Widget.load(type, mod)
  let deleteButtonClass = "fas fa-times-circle remove-widget-icon"
  if (editMode) deleteButtonClass += " edit-active"
  return(
    <div className={"widget-tile"}>
      <i onClick={handleDelete} className={deleteButtonClass}></i>
      {wid}
    </div>
  )
}

export default WidgetTile;
