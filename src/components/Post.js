import React from 'react';
import './Post.css';

export default ({id, user, date_created, title, content, comments}) => {
  return (
    <li>
      <p>{title}</p>
      <span>{user}</span>
    </li>
  )
}
