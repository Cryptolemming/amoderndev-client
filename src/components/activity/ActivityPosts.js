import React, { Component } from 'react';
import './ActivityPosts.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ActivityPostItem from './ActivityPostItem';

export class ActivityPosts extends Component {

  render() {
    const { user, posts } = this.props;

    const postsEntries = Object.entries(this.props.posts).filter(([id, post]) => post.user === user.username)
    const postsJSX = this.generatePostsJSX(postsEntries)

    return (
      <section className='activity-posts'>
        <ul className='activity-posts-list'>
          {postsJSX}
        </ul>
      </section>
    )
  }

  generatePostsJSX = posts => {
    return posts.map(post => {
      return <ActivityPostItem key={post[1].id} {...post[1]} />
    })
  }

}

const mapStateToProps = state => ({
  posts: state.posts,
})

export default connect(mapStateToProps)(ActivityPosts)
