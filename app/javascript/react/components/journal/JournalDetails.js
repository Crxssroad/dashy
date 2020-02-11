import React, { Fragment } from 'react';

const JournalDetails = ({ journal }) => {
  return(
    <Fragment>
      <h1>{journal.title}</h1>
      <h2>{journal.description}</h2>
    </Fragment>
  )
}

export default JournalDetails;
