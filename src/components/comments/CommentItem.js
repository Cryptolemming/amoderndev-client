import React, { Component } from 'react';
import './CommentItem.css';
import { getTimePassed } from '../../helpers';

export default ({id, user, username, post, content, date_created}) => {
  const date = getTimePassed(date_created);

  return (
    <li className='comment-item'>
      <p className='comment-details'>
        by
        <span className='comment-username'>{username}</span>
        <span className='comment-date'>{date}</span>
      </p>
      <p className='comment-content'>
        {content}
      </p>
    </li>
  )

}
