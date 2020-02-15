import React from 'react';
import './PostItem.css';
import { Link } from 'react-router-dom';
import { getTimePassed } from '../../helpers';

export default ({id, user, date_created, title, content, comments}) => {
  const date = getTimePassed(date_created)

  return (
      <li className='posts-list-item'>
        <img src='data:image/jpeg;base64,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' className='posts-item-img' />
        <h4 className='posts-item-title'>{title}</h4>
        <span className='posts-item-user'>{user}</span>
        <time className='posts-item-date'>{date}</time>
        <p className='posts-item-content'>{content}</p>
        <div className='fadeout-text-post'></div>
        <Link to={`/posts/${id}`}>
            <span className='keep-reading'>-> keep reading</span>
        </Link>
      </li>
  )
}
