import React, { Component } from 'react';
import './Post.css';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

export class Post extends Component {

  render() {

    const { postId } = this.props.match.params;

    const { title, user, date_created, content, topics } = this.props.posts[postId] || {
      title: '',
      user: '',
      date_created: 0,
      content: '',
      topics: []
    }

    const date = Math.floor((Date.now() - new Date(date_created)) / 86400000)
    const topicJSX = this.generateTopicsJSX(topics)

    return (
      <article className='post'>
        <h3 className='post-title'>{title}</h3>
        <span className='post-user'>{user}</span>
        <time className='post-date'>{date}</time>
        <ul className='post-topic-list'>
          {topicJSX}
        </ul>
        <p className='post-content'>{content}</p>
      </article>
    )
  }

  generateTopicsJSX = topics => {
    return topics.map((topic, idx, arr) => {
      return <li key={uuid()} className='post-topic-list-item'>
        <img
          src='https://us.123rf.com/450wm/quickshooting/quickshooting1706/quickshooting170600006/81160992-stock-illustration-illustration-atom-with-energy-rays.jpg?ver=6'
          className='post-topic-img'
          alt={topic}
        />
        <span className='post-topic-text'>
          {topic}
        </span>
      </li>
    })
  }

}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps)(Post)
