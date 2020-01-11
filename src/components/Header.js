import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class Header extends Component {

  render() {

    const user = this.props.user

    return (
      <header>
        <Link to='/'><h1>a modern dev</h1></Link>
        <Link to={`/users/${user}`}><span>account</span></Link>
      </header>
    )
  }

}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Header);
