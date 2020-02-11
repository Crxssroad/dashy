import React from 'react';
import { Link } from 'react-router-dom';

const JournalTile = ({ journal }) => {
  const { title, description } = journal

  return(
    <li>
      <Link to={`/stash/journals/${journal.id}`}>
        <h3>{title}</h3>
      </Link>
      <h4>{description}</h4>
    </li>
  )
}

export default JournalTile;
