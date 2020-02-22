import React, { Component } from 'react';
import './ActivityPostItem.css';
import { postControlIcons } from '../../constants';
import uuid from 'uuid/v4';
import { getTimePassed } from '../../helpers';
import { Link } from 'react-router-dom';

export default ({id, user, date_created, title, content, handleDelete, comments, favourites}) => {
  const date = getTimePassed(date_created)
  const counts = {
    'c': comments.length,
    'f': favourites.length
  }

  const controls = ['c', 'f'].map(control => {
    return <span
      key={uuid()}
      className='activity-control-item'>
      <span className='activity-control-text-item'>
        <span className='activity-control-count'>{counts[control]}</span>
        {postControlIcons[control]}
      </span>
    </span>
  })

  const mods = ['d', 'e'].map(mod => {
    const actions = {
      'd': {
        onClick: () => handleDelete(id)
      },
      'e': {}
    }

    const content = mod === 'd'
      ? postControlIcons[mod]
      : <Link
          key={uuid()}
          to='/edit-post'
        >
          {postControlIcons[mod]}
        </Link>

    const span = <span
                  key={uuid()}
                  className='activity-control-item'
                  {...actions[mod]}>
                  {content}
                </span>

    return span;
  })

  return (
      <li className='activity-post-item'>
        <div className='activity-post-text'>
            <Link to={`/posts/${id}`}>
              <p className='activity-post-title'>
                {title}
              </p>
              <p className='activity-post-date'>
                {date}
              </p>
            </Link>
        </div>
        <div className='activity-post-controls'>
          {controls}
          {mods}
        </div>
      </li>
  )
}
