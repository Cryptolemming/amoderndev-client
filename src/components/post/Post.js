import React, { Component } from 'react';
import './Post.css';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { Link, withRouter } from 'react-router-dom';
import { postControlIcons } from '../../constants';
import { getTimePassed } from '../../helpers';
import Comments from '../comments/Comments';

export class Post extends Component {

  postRef = React.createRef();
  commentRef = React.createRef();

  focusComments = () => {
    this.commentRef.scrollIntoView({
      behavior: "smooth"
    });
  }

  focusPost = () => {
    this.postRef.scrollIntoView({
      behavior: "smooth"
    })
  }

  render() {
    const postId = this.props.location.pathname.split('/')[2];

    const { title, user, date_created, content, topics, favourites, comments } = this.props.posts[postId] || {
      title: '',
      user: '',
      date_created: 0,
      content: '',
      topics: [],
      comments: [],
      favourites: []
    }
    console.log(favourites.length, comments.length)
    const date = getTimePassed(date_created)
    const commentCounts = comments.length;
    const favouriteCounts = favourites.length;
    const topicJSX = this.generateTopicsJSX(topics)
    const controlsJSX = this.generateControlsJSX(favourites.length, comments.length)

    return (
      <>
        <span onClick={this.focusPost} className='post-top-return'>
          <i className="fas fa-chevron-up"></i>
        </span>
        <article ref={article => this.postRef = article} className='post'>
          <h3 className='post-title'>{title}</h3>
          <span className='post-user'>{user}</span>
          <time className='post-date'>{date}</time>
          <ul className='post-topic-list'>
            {topicJSX}
          </ul>
          <section className='post-controls'>
            <ul className='post-controls-list'>
              {controlsJSX}
            </ul>
          </section>
          <p className='post-content'>{content+content+content+content+content+content+content}</p>
        </article>
        <div ref={div => this.commentRef = div} className='post-comment-separator'></div>
        <Comments  comment_ids={comments} />
      </>
    )
  }

  generateTopicsJSX = (topics) => {
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

  generateControlsJSX = (commentCounts, favouriteCounts) => {
    const navMap = {
      'kp': () => {},
      'f': () => {},
      'b': () => {},
      'c': this.focusComments
    }

    const counts = {
      'f': favouriteCounts,
      'c': commentCounts
    }

    return ['kp', 'f', 'b', 'c'].map(control => {
      const count = counts[control] !== undefined
        ? <span className='control-count'>{counts[control]}</span>
        : '';

      return <li
        key={uuid()}
        onClick={navMap[control]}
        className='post-controls-list-item'>
        <span className='post-controls-text-item'>
          {count}
          {postControlIcons[control]}
        </span>
      </li>
    })
  }
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps)(withRouter(Post))
