import React, { Component } from 'react';
import './Follow.css';

export default class Follow extends Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }

  render() {

    return (
      <section className='follow'>
        Follow
      </section>
    )
  }
}
