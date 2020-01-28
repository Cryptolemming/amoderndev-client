import React, { Component } from 'react';
import './Authenticate.css';
import Form from '../form/Form';
import { Link } from 'react-router-dom';
import { registerUser, loginUser } from '../../actions';

export default class Authenticate extends Component {

  render() {

    const { auth_type: authType } = this.props.match.params

    const form = this.generateAuthForm(authType);
    const formHeader = authType === 'login' ? 'Login' : 'Register';

    return (
      <section className='authenticate'>
        {formHeader}
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

    return <Form
      class='auth-form'
      type={authType}
      push={this.props.history.push}
      {...authFormProps}
    />
  }

  generateAuthFormProps = authType => {
    const formProps = {
      'login': {
        inputs: {
          username: '',
          password: ''
        },
        onSubmit: loginUser,
      },
      'register': {
        inputs: {
          username: '',
          email: '',
          password: '',
          'confirm password': ''
        },
        onSubmit: registerUser,
      },
    }

    return formProps[authType]
  }

}
