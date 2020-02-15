import React, { Component } from 'react';
import './Header.css';
import { Link, withRouter } from 'react-router-dom';
import { navLinks } from '../../constants';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import AccountIcon from './AccountIcon';
import { logoutUser } from '../../actions';

export class Header extends Component {

  onClickLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser())
    this.props.history.push('/')
  }

  render() {

    const user = this.props.user;
    const navLinksJSX = this.generateNavLinks(user);

    return (
      <header>
        <section className='auth-nav'>
          <h1><Link to='/'>AMD</Link></h1>
          <AccountIcon user={user} />
        </section>
        <nav>
          <ul className='nav-links'>
            {navLinksJSX}
          </ul>
        </nav>
      </header>
    )
  }

  generateNavLinks = user => {
    let navLinksJSX = navLinks.map(link => {
      return (
        <li key={uuid()} className='nav-links-item'>
          <Link to={`/${link}`}>{link}</Link>
        </li>
      )
    })

    if (user) {
      navLinksJSX.push(this.addLogout(user))
    }

    return navLinksJSX;
  }

  addLogout = user => {
    return user
      ? <li
        className='nav-links-item'
        onClick={this.onClickLogout}
        key={uuid()}>
          logout
      </li>
      : '';
  }

}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(withRouter(Header));
