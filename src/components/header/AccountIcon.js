import React, { Component } from 'react';
import './AccountIcon.css';
import { Link } from 'react-router-dom';

export default props => {
  const { user } = props;

  return user
  ? <Link to={`/dashboard`}>
      <span className='account-icon'>account</span>
    </Link>
  : <ul className='credentials-list'>
      <Link to={`/authenticate/login`}>
        <li className='credentials-list-item'>
          login
        </li>
      </Link>
      |
      <Link to={`/authenticate/register`}>
        <li className='credentials-list-item'>
          register
        </li>
      </Link>
    </ul>
}
