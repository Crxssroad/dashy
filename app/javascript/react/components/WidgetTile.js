import React from 'react';

import Widget from './pojos/widget'

const WidgetTile = ({ type, mod }) => {
  let wid = Widget.load(type, mod)
  return(
    <div className="widget-tile">
      {wid}
    </div>
  )
}

export default WidgetTile;
