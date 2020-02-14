import React, { Component } from 'react';
import './Activity.css';

export default class Activity extends Component {

  render() {

    const { user } = this.props;

    const navJSX = this.generateNavJSX();
    const infoJSX = this.generateInfoJSX(user);

    return (
      <section className='activity'>
        <section className='activity-nav'>
          {navJSX}
        </section>
        <section className='activity-info'>
          {infoJSX}
        </section>
      </section>
    )
  }

  generateNavJSX = () => {
    return <p>nav</p>
  }

  generateInfoJSX = user => {
    return <p>info</p>
  }
}
