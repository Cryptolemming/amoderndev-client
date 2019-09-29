import React, { Component } from 'react';
import APIContext from '../context/APIContext';
import './Post.css';

export default class Post extends Component {

  static contextType = APIContext;

  render() {

    const { postId } = this.props.match.params;
    const post = this.context.posts[postId] || {
      title: '',
      user: '',
      date: '',
      content: ''
    }

    return (
      <div className='post'>
        <h3>{post.title}</h3>
        <span>{post.user}</span>
        <span>{post.date}</span>
        <p>{post.content}</p>
      </div>
    )
  }

}
