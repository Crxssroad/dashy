import React from 'react';

const JournalTile = ({ journal }) => {
  const { title, description } = journal

  return(
    <li>
      <h3>{title}</h3>
      <h4>{description}</h4>
    </li>
  )
}

export default JournalTile;
