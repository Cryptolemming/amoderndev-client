import React, { Component } from 'react';
import './ActivityPostItem.css';
import { postControlIcons } from '../../constants';
import uuid from 'uuid/v4';
import { getTimePassed } from '../../helpers';
import { Link } from 'react-router-dom';

export default ({id, user, date_created, title, content, controls, mods,
                handleDelete, comments, favouritesUsers, commentsUsers}) => {

  const date = getTimePassed(date_created)
  const counts = {
    'c': comments.length,
    'f': favouritesUsers.length
  }

  const activeClass = {
    'f': user && favouritesUsers.includes(user.id) ? 'active' : 'inactive',
    'c': user && commentsUsers.includes(user.id) ? 'active' : 'inactive'
  }

  const controlsJSX = controls.map(control => {
    return <span
      key={uuid()}
      className='activity-control-item'>
      <span className={`post-controls-text-item control-${activeClass[control]}`}>
        <span className='control-count'>{counts[control]}</span>
        {postControlIcons[control]}
      </span>
    </span>
  })

  const modsJSX = mods.map(mod => {
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
          {controlsJSX}
          {modsJSX}
        </div>
      </li>
  )
}
