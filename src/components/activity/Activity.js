import React, { Component } from 'react';
import './Activity.css';

export default class Activity extends Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }

  render() {

    return (
      <section className='activity'>
        Activity
      </section>
    )
  }
}
