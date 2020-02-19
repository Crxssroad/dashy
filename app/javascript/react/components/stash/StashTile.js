import React from 'react';
import { Link } from 'react-router-dom'

const StashTile = ({ parentClass, cardFront, cardBack, stashName }) => {

  return (
    <section className={parentClass}>
      <Link to={`/stash/${stashName}`}>
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              {cardFront}
            </div>
            <div className="flip-card-back">
              <h1>{cardBack}</h1>
            </div>
          </div>
        </div>
      </Link>
    </section>
  )
}

export default StashTile;
