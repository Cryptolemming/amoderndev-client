import React, { Component } from 'react';
import './CommentItem.css';
import { getTimePassed } from '../../helpers';

export default ({id, user, post, content, date_created}) => {
  const date = getTimePassed(date_created);

  return (
    <li className='comment-item'>
      <p className='comment-user'>
        by {user} {date}
      </p>
      <p className='comment-content'>
        {content}
      </p>
    </li>
  )

}
