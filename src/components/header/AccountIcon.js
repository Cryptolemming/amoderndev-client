import React, { Component } from 'react';
import './AccountIcon.css';

export default props => {
  return props.user
  ? <Link to={`/users/${user.id}`}>
      <span className='account-icon'>account</span>
    </Link>
  : <ul className='credentials-list'>
      <li className='credentials-list-item'>
        <Link to={`/authenticate/login`}></Link>
      </li>
      <li className='credentials-list-item'>
        <Link to={`/authenticate/register`}></Link>
      </li>
    </ul>
}
