import React, { Component } from 'react';
import './Topics.css';

export default class Topics extends Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }

  render() {

    return (
      <section className='topics'>
        Topics
      </section>
    )
  }
}
