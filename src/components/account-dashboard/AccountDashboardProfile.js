import React, { Component } from 'react';
import './AccountDashboardProfile.css';

export default class AccountDashboardProfile extends Component {

  render() {
    return (
      <section className='account-dashboard-profile'>
        <ul className='account-profile-list'>
          <li>
            <span className='account-profile-type'>picture:</span>
            <img className='account-profile-img' alt='' src='#' />
          </li>
          <li>
            <span className='account-profile-type'>location:</span>
            <span className='account-profile-value'>Montreal, Quebec</span>
          </li>
          <li>
            <span className='account-profile-type'>signature:</span>
            <p className='account-profile-signature'>this is a signature</p>
          </li>
        </ul>
      </section>
    )
  }

}
