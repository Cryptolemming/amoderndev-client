import React, { Component } from 'react';
import './FeaturedList.css';
import FeaturedItem from './FeaturedItem';

export default class FeaturedList extends Component {

  render() {

    const list = this.generateList();

    return (
      <section className='featured-list-container'>
        <h3 className='home-list-title'>Featured</h3>
        <span className='left-arrow'>
          &lArr;
        </span>
        <ul className='featured-list'>
          {list}
        </ul>
        <span className='right-arrow'>
          &rArr;
        </span>
      </section>
    )
  }

  generateList = () => {
    return Object.entries(this.props.posts).map(([id, post]) => {
      return <FeaturedItem key={id} {...post} />
    })
  }

}
