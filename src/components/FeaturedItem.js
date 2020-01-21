import React from 'react';
import './FeaturedItem.css';
import { Link } from 'react-router-dom';

export default ({id, user, date_created, title, content}) => {

  return (
    <Link to={`/posts/${id}`}>
      <li className='featured-item'>
        <p>{title}</p>
        <span>{user}</span>
        <span>{date_created}</span>
      </li>
    </Link>
  )
}
