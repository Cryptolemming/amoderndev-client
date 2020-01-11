import React, { Component } from 'react';
import './Home.css';
import PostsList from './PostsList';

export default class Home extends Component {

  render() {
    return (
      <section className='home'>
        <PostsList />
      </section>
    )
  }

}


state = {
  athletes: {
    1: {
      ...athleteData,
      ...liftData
    }
  }
}
