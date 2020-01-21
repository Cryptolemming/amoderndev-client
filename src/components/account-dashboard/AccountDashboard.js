import React, { Component } from 'react';
import './AccountDashboard.css';

export default class AccountDashboard extends Component {

  static defaultProps = {
    match: {
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
      <section className='account-dashboard'>
        Account Dashboard
      </section>
    )
  }
}
