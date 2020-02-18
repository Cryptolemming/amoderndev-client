import React, { Component } from 'react';
import './ActivityCommentItem.css';
import uuid from 'uuid/v4';
import { postControlIcons } from '../../constants';
import { getTimePassed } from '../../helpers';
import { Link } from 'react-router-dom';

export default ({id, user, post, date_created, content, handleDelete}) => {
  const date = getTimePassed(date_created)

  const controls = () => {
    return <span
      key={uuid()}
      className='activity-comment-control-item'>
      {postControlIcons['f']}
    </span>
  })

  const mods = () => {
    return <span
              key={uuid()}
              className='activity-post-control-item'
              onClick={this.handleDelete(post, id)}
            >
              {postControlIcons['d']}
            </span>
  }

  return (
      <li className='activity-comment-item'>
        <div className='activity-comment'>
            <Link to={`/posts/${post}`}>
              <p className='activity-comment-content'>
                {content}
              </p>
              <p className='activity-comment-date'>
                {date}
              </p>
            </Link>
        </div>
        <div className='activity-comment-controls'>
          {controls}
          {mods}
        </div>
      </li>
  )
}
