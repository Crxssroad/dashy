import React from 'react';
import { Link } from 'react-router-dom'

const StashTile = ({ type, content }) => {
  const style = `${type}-stash stash-tile`

  const contentTiles = content.map(each => {
    return(
      <Link to={`/stash/${type}/${each.id}`} key={each.id}>
        <li className="content-tile">
          <span>•</span> {each.title}
        </li>
      </Link>
    )
  })

  return (

      <section className={style}>
        <Link to={`/stash/${type}`}>
          <h3 className="stash-tile-header">You have {content.length} {type}</h3>
        </Link>
        {contentTiles}
      </section>
  )
}

export default StashTile;
