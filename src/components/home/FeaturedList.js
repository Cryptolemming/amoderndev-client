import React, { Component } from 'react';
import './FeaturedList.css';
import FeaturedItem from './FeaturedItem';

export default class FeaturedList extends Component {

  render() {

    const list = this.generateList();

    return (
      <section className='featured-list-container'>
        <h3 className='home-list-title'>Featured</h3>
        <section className='horizontal-container'>
          <span className='arrow'>
            &lArr;
          </span>
          <div className='fadeout-featured ff-left'>
          </div>
          <ul className='featured-list'>
            {list}
          </ul>
          <div className='fadeout-featured ff-right'>
          </div>
          <span className='arrow'>
            &rArr;
          </span>
        </section>
      </section>
    )
  }

  generateList = () => {
    return Object.entries(this.props.posts).map(([id, post]) => {
      return <FeaturedItem key={id} {...post} />
    })
  }

}
