import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

export default class Header extends Component {

  render() {
    return (
      <header>
        <Link to='/'><h1>a modern dev</h1></Link>
        <Link to='dashboard'><span>account</span></Link>
      </header>
    )
  }

}
