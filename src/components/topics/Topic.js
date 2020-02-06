import React, { Component } from 'react';
import './Topics.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostItem from '../home/PostItem';

export class Topic extends Component {

  render() {
    console.log(this.props.posts)
    const { topic } = this.props.match.params;
    const postKeys = Object.keys(this.props.posts);
    const posts = postKeys.length > 0 ? postKeys.reduce((acc, key) => {
      const post = this.props.posts[key]
      if (post.topics.includes(topic)) {
        acc.push(post)
      }
      return acc;
    }, []) : [];
    const postsJSX = this.generatePostsJSX(posts);
    const topicRender = topic[0].toUpperCase() + topic.slice(1);
    console.log(posts)
    return (
      <section className='posts-list-container'>
        <h3 className='home-list-title'>{topicRender}</h3>
        <ul className='posts-list'>
          {postsJSX}
        </ul>
      </section>
    )
  }

  generatePostsJSX = posts => {
    return posts.map(post => {
      return <PostItem key={post.id} {...post} />
    })
  }
}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps)(Topic)
