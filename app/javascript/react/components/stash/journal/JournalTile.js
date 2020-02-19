import React from 'react';
import { Link } from 'react-router-dom';

const JournalTile = ({ journal, selected, populateEntries, trashJournal }) => {
  const { title, description, entries } = journal
  let tileClassName = "item"
  if (selected) tileClassName += " selected"
  return(
    <li className={tileClassName} onClick={populateEntries}>
      <i className="fas fa-book"></i> {title}
      <i className="fas fa-trash" onClick={trashJournal}></i>
    </li>
  )
}

export default JournalTile;
