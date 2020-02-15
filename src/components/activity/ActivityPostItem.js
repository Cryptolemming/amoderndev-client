import React, { Component } from 'react';
import './ActivityPostItem.css';
import { postControlIcons } from '../../constants';
import uuid from 'uuid/v4';

export default ({id, user, date_created, title, content, comments}) => {
  console.log(id, user, date_created, title, content, comments)
  const date = Math.floor((Date.now() - new Date(date_created)) / 86400000)
  const controls = ['c', 'f'].map(control => {
    return <span
      key={uuid()}
      className='activity-post-control-item'>
      {postControlIcons[control]}
    </span>
  })

  return (
    <li className='activity-post-item'>
      <div className='activity-post-text'>
        <p className='activity-post-title'>
          {title}
        </p>
        <p className='activity-post-date'>
          {date} days ago
        </p>
      </div>
      <div className='activity-post-controls'>
        {controls}
      </div>
    </li>
  )
}
