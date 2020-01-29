import React from 'react';
import './PostItem.css';
import { Link } from 'react-router-dom';

export default ({id, user, date_created, title, content, comments}) => {
  console.log(id, user, title)

  return (
    <Link to={`/posts/${id}`}>
      <li className='posts-list-item'>
        <p>{title}</p>
        <span>{user}</span>
        <span>{date_created}</span>
      </li>
    </Link>
  )
}
