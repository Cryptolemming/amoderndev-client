import React, { Component } from 'react';
import './Post.css';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { Link, withRouter } from 'react-router-dom';
import { postControlIcons } from '../../constants';
import { getTimePassed } from '../../helpers';
import Comments from '../comments/Comments';

export class Post extends Component {

  commentRef = React.createRef();

  focusComments = () => {
    console.log(this.commentRef)
    this.commentRef.scrollIntoView({
      behavior: "smooth"
    });
  }

  render() {
    const postId = this.props.location.pathname.split('/')[2];

    const { title, user, date_created, content, topics } = this.props.posts[postId] || {
      title: '',
      user: '',
      date_created: 0,
      content: '',
      topics: []
    }

    const date = getTimePassed(date_created)
    const topicJSX = this.generateTopicsJSX(topics)

    return (
      <>
        <article className='post'>
          <h3 className='post-title'>{title}</h3>
          <span className='post-user'>{user}</span>
          <time className='post-date'>{date}</time>
          <ul className='post-topic-list'>
            {topicJSX}
          </ul>
          <section className='post-controls'>
            <ul className='post-controls-list'>
              {this.generateControlsJSX()}
            </ul>
          </section>
          <p className='post-content'>{content+content+content+content+content+content+content}</p>
        </article>
        <div ref={div => this.commentRef = div} className='post-comment-separator'></div>
        <Comments postId={postId} />
      </>
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
    const navMap = {
      'kp': () => {},
      'f': () => {},
      'b': () => {},
      'c': this.focusComments
    }

    return ['kp', 'f', 'b', 'c'].map(control => {
      return <li
        key={uuid()}
        onClick={navMap[control]}
        className='post-controls-list-item'>
        <span className='post-controls-text-item'>{postControlIcons[control]}</span>
      </li>
    })
  }
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps)(withRouter(Post))
