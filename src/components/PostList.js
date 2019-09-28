import React from 'react';
import Post from './Post';
import './PostList.css';
import uuid from 'uuid/v4';

export default ({ posts }) => {

  const list = Object.values(posts).map(post => {
    return <Post key={uuid()} {...post} />
  })

  return (
    <ul>
      {list}
    </ul>
  )
}
