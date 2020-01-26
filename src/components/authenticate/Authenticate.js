import React, { Component } from 'react';
import './Authenticate.css';
import Form from '../form/Form';

export default class Authenticate extends Component {

  state = {
    selected: 'register'
  }

  handleChangeSelected = e => {
    this.setState({
      selected: e.target.value
    })
  }

  render() {

    const form = this.generateAuthForm();

    return (
      <section className='authenticate'>
        Authenticate
        {form}
        <div className='auth-selection'>
          <button value='login' className='auth-selection-button login-button' onClick={this.handleChangeSelected}>Login</button>
          <button value='register' className='auth-selection-button register-button' onClick={this.handleChangeSelected}>Register</button>
        </div>
      </section>
    )
  }

  generateAuthForm = () => {
    const { selected } = this.state;
    const formProps = this.generateFormProps(selected)
    console.log(formProps)
    return <Form type={selected} {...formProps} />
  }

  generateFormProps = selected => {
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

    return formProps[selected]
  }

}
