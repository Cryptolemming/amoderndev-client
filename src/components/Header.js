import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import APIContext from '../context/APIContext';

export default class Header extends Component {

  static contextType = APIContext;

  render() {

    const user = this.context.user

    return (
      <header>
        <Link to='/'><h1>a modern dev</h1></Link>
        <Link to={`/users/${user}`}><span>account</span></Link>
      </header>
    )
  }

}
