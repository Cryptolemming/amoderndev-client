import React, { Component } from 'react';
import './AccountDashboard.css';
import { Link, withRouter } from 'react-router-dom';
import uuid from 'uuid/v4';
import AccountDashboardProfile from './AccountDashboardProfile';
import AccountDashboardAccount from './AccountDashboardAccount';
import AccountDashboardTipping from './AccountDashboardTipping';
import { connect } from 'react-redux';
import { fetchUserFromToken } from '../../actions';

export class AccountDashboard extends Component {

  state = {
    selected: 'Profile'
  }

  handleChangeSelected = e => {
    this.setState({
      selected: e.currentTarget.textContent
    })
  }

  componentDidMount() {
    const { user, push, dispatch } = this.props;
    const token = window.localStorage.getItem('token')

    if (!token) {
      push('/authenticate/login')
    }

    if (!user) {
      dispatch(fetchUserFromToken(token, this.props.history))
    }
  }

  render() {
    const { user } = this.props;

    const navJSX = this.generateNavJSX();
    const infoJSX = this.generateInfoJSX(user);

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

  generateInfoJSX = user => {
    const navMap = {
      'Profile': <AccountDashboardProfile user={user} />,
      'Account': <AccountDashboardAccount user={user} />,
      'Tipping': <AccountDashboardTipping user={user} />
    }

    return navMap[this.state.selected];
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(withRouter(AccountDashboard))
