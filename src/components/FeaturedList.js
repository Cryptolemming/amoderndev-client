import React, { Component } from 'react';
import './FeaturedList.css';

export default class FeaturedList extends Component {

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
    return Object.values(this.state.posts).map(post => {
      return <FeaturedItem key={post.id} {...post} />
    })
  }

}
