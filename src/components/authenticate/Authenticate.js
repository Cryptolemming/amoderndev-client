import React, { Component } from 'react';
import './Authenticate.css';

export default class Authenticate extends Component {

  static defaultProps = {
    match: {
      params: {}
    }
  }

  render() {

    return (
      <section className='authenticate'>
        Authenticate
      </section>
    )
  }
}
