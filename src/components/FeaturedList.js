import React, { Component } from 'react';
import './FeaturedList.css';
import FeaturedItem from './FeaturedItem';

export default class FeaturedList extends Component {

  render() {

    const list = this.generateList();

    return (
      <ul className='featured-list'>
        {list}
      </ul>
    )
  }

  generateList = () => {
    return Object.entries(this.props.posts).map(([id, post]) => {
      return <FeaturedItem key={id} {...post} />
    })
  }

}
