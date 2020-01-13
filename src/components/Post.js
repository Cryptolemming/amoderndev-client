import React, { Component } from 'react';
import './Post.css';
import { connect } from 'react-redux';

export class Post extends Component {

  render() {

    const { postId } = this.props.match.params;

    const post = this.props.posts[postId] || {
      title: '',
      user: '',
      date_created: '',
      content: ''
    }

    return (
      <div className='post'>
        <h3>{post.title}</h3>
        <span>{post.user}</span>
        <span>{post.date_created}</span>
        <p>{post.content}</p>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps)(Post)
