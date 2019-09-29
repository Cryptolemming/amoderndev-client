import React from 'react';
import './PostItem.css';

export default ({id, user, date_created, title, content, comments}) => {
  return (
    <li>
      <p>{title}</p>
      <span>{user}</span>
    </li>
  )
}
