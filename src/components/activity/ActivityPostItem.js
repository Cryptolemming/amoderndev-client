import React, { Component } from 'react';
import './ActivityPostItem.css';
import { postControlIcons } from '../../constants';
import uuid from 'uuid/v4';
import { getTimePassed } from '../../helpers';
import { Link } from 'react-router-dom';

export default ({id, user, date_created, title, content, comments, handleDelete}) => {
  const date = getTimePassed(date_created)
  console.log(id)
  const controls = ['c', 'f'].map(control => {
    return <span
      key={uuid()}
      className='activity-post-control-item'>
      {postControlIcons[control]}
    </span>
  })

  const mods = ['d', 'e'].map(mod => {
    const actions = {
      'd': {
        onClick: () => handleDelete(id)
      },
      'e': {}
    }

    const span = <span
                  key={uuid()}
                  className='activity-post-control-item'
                  {...actions[mod]}>
                  {postControlIcons[mod]}
                </span>

    return mod === 'd'
      ? span
      : <Link
          key={uuid()}
          className='activity-post-control-item'
          to='/edit-post'
        >
          {span}
        </Link>
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
