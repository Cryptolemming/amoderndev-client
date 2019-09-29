import React, { Component } from 'react';
import './Home.css';
import PostsList from './PostsList';

export default class Home extends Component {

  render() {
    return (
      <section className='home'>
        Home
        <PostsList />
      </section>
    )
  }

}
