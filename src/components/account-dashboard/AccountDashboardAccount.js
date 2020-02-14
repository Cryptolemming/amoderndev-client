import React, { Component } from 'react';
import './AccountDashboardAccount.css';
import { connect } from 'react-redux';

export default class AccountDashboardAccount extends Component {

  render() {

    const { user } = this.props;

    return (
      <section className='account-dashboard-account'>
        <ul className='account-account-list'>
          <li>
            <span className='account-account-type'>username:</span>
            <span className='account-account-value'>{user.username}</span>
          </li>
        </ul>
      </section>
    )
  }

}
