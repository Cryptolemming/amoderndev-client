import React, { Component } from 'react';
import './Dashboard.css';

export default class Dashboard extends Component {

  static defaultProps = {
    matchL: {
      params: {}
    }
  }

  render() {

    const userId = this.props.match.params.userId;
    console.log(userId)
    const user = this.context.users[userId] || {
      id: '',
      username: '',
    }

    return (
      <section className='dashboard'>
        <p>{user.id}</p>
        <p>{user.username}</p>
        <p>posts here</p>
        <p>comments here</p>
      </section>
    )
  }
}
