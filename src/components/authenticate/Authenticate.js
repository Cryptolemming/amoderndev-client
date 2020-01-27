import React, { Component } from 'react';
import './Authenticate.css';
import Form from '../form/Form';
import { Link } from 'react-router-dom';

export default class Authenticate extends Component {

  render() {

    const { auth_type: authType } = this.props.match.params

    const form = this.generateAuthForm(authType);

    return (
      <section className='authenticate'>
        Authenticate
        {form}
        <div className='auth-selection'>
          <Link to='login'>
            <button value='login' className='auth-selection-button login-button' onClick={this.handleChangeSelected}>Login</button>
          </Link>
          <Link to='register'>
            <button value='register' className='auth-selection-button register-button' onClick={this.handleChangeSelected}>Register</button>
          </Link>
        </div>
      </section>
    )
  }

  generateAuthForm = authType => {
    const authFormProps = this.generateAuthFormProps(authType)

    return <Form class='auth-form' type={authType} {...authFormProps} />
  }

  generateAuthFormProps = authType => {
    const formProps = {
      'login': {
        inputs: {
          username: '',
          password: ''
        }
      },
      'register': {
        inputs: {
          username: '',
          email: '',
          password: '',
          'confirm password': ''
        }
      },
    }

    return formProps[authType]
  }

}
