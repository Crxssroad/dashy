import React, { useState, useEffect, Fragment } from 'react';

import Sidebar from '../Sidebar'
import StashTile from './StashTile'

const StashContainer = () => {

  return(
    <Fragment>
      <Sidebar rootPath="/stash" />
      <div className="stash-container">
        <StashTile
          stashName="journals"
          parentClass="journal-stash"
          cardFront={<i className="fas fa-book"></i>}
          cardBack="Journals"
        />
      </div>
    </Fragment>
  )
}

export default StashContainer;
