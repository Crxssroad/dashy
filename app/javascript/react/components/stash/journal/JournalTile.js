import React from 'react';
import { Link } from 'react-router-dom';

const JournalTile = ({ journal, selected, populateEntries }) => {
  const { title, description, entries } = journal
  let tileClassName = "item"
  if (selected) tileClassName += " selected"
  return(
    <li className={tileClassName} onClick={populateEntries}>
      <i className="fas fa-book"></i> {title}
    </li>
  )
}

export default JournalTile;
