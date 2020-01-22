import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import navLinks from '../helpers/nav-links';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import AccountIcon from './AccountIcon';

export class Header extends Component {

  render() {

    const user = this.props.user;
    const navLinksJSX = this.generateNavLinks();

    return (
      <header>
        <section className='auth-nav'>
          <Link to='/'><h1>AMD</h1></Link>
          <AccountIcon />
        </section>
        <nav>
          <ul className='nav-links'>
            {navLinksJSX}
          </ul>
        </nav>
      </header>
    )
  }

  generateNavLinks = () => {
    return navLinks.map(link => {
      return (
        <li key={uuid()} className='nav-links-item'>
          <Link to={`${link}`}>{link}</Link>
        </li>
      )
    })
  }

}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Header);
