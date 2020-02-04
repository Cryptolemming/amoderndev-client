import React, { Component } from 'react';
import './Post.css';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { Link } from 'react-router-dom';

const icons = {
  'kp': <i class="fas fa-bullseye"></i>,
  'f': <i class="fas fa-heart"></i>,
  'b': <i class="fas fa-bookmark"></i>,
  'c': <i class="fas fa-comment"></i>
}

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
        <time className='post-date'>{date} days ago</time>
        <ul className='post-topic-list'>
          {topicJSX}
        </ul>
        <section className='post-controls'>
          <ul className='post-controls-list'>
            {this.generateControlsJSX()}
          </ul>
        </section>
        <p className='post-content'>{content+content+content+content+content}</p>
      </article>
    )
  }

  generateTopicsJSX = topics => {
    return topics.map((topic, idx, arr) => {
      return <Link to={`/topics/${topic}`} key={uuid()}>
        <li key={uuid()} className='post-topic-list-item'>
          <img
            src='https://us.123rf.com/450wm/quickshooting/quickshooting1706/quickshooting170600006/81160992-stock-illustration-illustration-atom-with-energy-rays.jpg?ver=6'
            className='post-topic-img'
            alt={topic}
          />
          <span className='post-topic-text'>
            {topic}
          </span>
        </li>
      </Link>
    })
  }

  generateControlsJSX = () => {
    return ['kp', 'f', 'b', 'c'].map(control => {
      return <li
        key={uuid()}
        className='post-controls-list-item'>
        <span className='post-controls-text-item'>{icons[control]}</span>
      </li>
    })
  }
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps)(Post)
