import React, { Component } from 'react';
import './Home.css';
import PostList from './PostList';

export default class Home extends Component {

  render() {
    return (
      <section className='home'>
        Home
        <PostList posts={this.props.posts} />
      </section>
    )
  }

}
