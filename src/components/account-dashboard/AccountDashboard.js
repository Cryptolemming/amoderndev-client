import React, { Component } from 'react';
import './AccountDashboard.css';
import { Link } from 'react-router-dom';
import uuid from 'uuid/v4';
import AccountDashboardProfile from './AccountDashboardProfile';
import AccountDashboardAccount from './AccountDashboardAccount';
import AccountDashboardTipping from './AccountDashboardTipping';

export default class AccountDashboard extends Component {

  state = {
    selected: 'Profile'
  }

  handleChangeSelected = e => {
    this.setState({
      selected: e.currentTarget.textContent
    })
  }

  render() {
    const { push } = this.props;
    const userId = window.localStorage.getItem('token')

    if (!userId) {
      push('/authenticate/login')
    }

    if (!this.context.user) {

    }

    const user = this.context.user;
    const navJSX = this.generateNavJSX();
    const infoJSX = this.generateInfoJSX();

    return (
      <section className='account-dashboard'>
        <section className='account-dashboard-nav'>
          {navJSX}
        </section>
        <section className='account-dashboard-info'>
          {infoJSX}
        </section>
      </section>
    )
  }

  generateNavJSX = () => {
    const { selected } = this.state;
    return ['Profile', 'Account', 'Tipping'].map(datum => {
      const active = selected === datum ? ' active': '';

      return <p
        key={uuid()}
        className={`dashboard-nav-text${active}`}
        onClick={this.handleChangeSelected}>
        {datum}
      </p>
    })
  }

  generateInfoJSX = () => {
    const navMap = {
      'Profile': <AccountDashboardProfile />,
      'Account': <AccountDashboardAccount />,
      'Tipping': <AccountDashboardTipping />
    }

    return navMap[this.state.selected];
  }
}
