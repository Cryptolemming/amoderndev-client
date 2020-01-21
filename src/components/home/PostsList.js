import React, { Component } from 'react';
import PostItem from './PostItem';
import './PostsList.css';

export default class PostsList extends Component {

  render() {

    const list = this.generateList();
    console.log(list)
    return (
      <ul>
        {list}
      </ul>
    )
  }

  generateList = () => {
    return Object.entries(this.props.posts).map(([id, post]) => {
      return <PostItem key={id} {...post} />
    })
  }

}
