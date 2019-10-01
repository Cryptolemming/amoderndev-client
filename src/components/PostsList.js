import React, { Component } from 'react';
import PostItem from './PostItem';
import './PostsList.css';
import uuid from 'uuid/v4';
import APIContext from '../context/APIContext';

export default class PostsList extends Component {
  static contextType = APIContext;

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
    return Object.values(this.context.posts).map(post => {
      return <PostItem key={uuid()} {...post} />
    })
  }

}
