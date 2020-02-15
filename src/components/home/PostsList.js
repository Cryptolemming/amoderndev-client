import React, { Component } from 'react';
import './PostsList.css';
import PostItem from './PostItem';

export default class PostsList extends Component {

  render() {


    const list = this.generateList();

    return (
      <section className='posts-list-container'>
        <h3 className='home-list-title'>Posts</h3>
        <ul className='posts-list'>
          {list}
        </ul>
      </section>
    )
  }

  generateList = () => {
    return Object.entries(this.props.posts).map(([id, post]) => {
      return <PostItem key={id} {...post} />
    })
  }

}
