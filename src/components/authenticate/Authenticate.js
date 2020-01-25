import React, { Component } from 'react';
import './Authenticate.css';

export default class Authenticate extends Component {

  state = {
    selected: 'register'
  }

  handleChangeSelected = e => {
    this.setState = () => ({
      selected: e.target.value
    })
  }

  render() {

    return (
      <section className='authenticate'>
        Authenticate
        <div className='auth-selection'>
          <button className='auth-selection-button login-button' onClick={this.handleChangeSelected}>Login</button>
          <button className='auth-selection-button register-button' onClick={this.handleChangeSelected}>Register</button>
        </div>
      </section>
    )
  }

  generateAuthForm = () => {
    const { selected } = this.state;
    const formProps = this.generateFormProps(selected)
    return <Form type={selected} {...formProps} />
  }

  generateFormProps = selected => {
    const formProps = {
      'register': {
        inputs: {
          username: '',
          password: ''
        }
      },
      'login': {
        inputs: {
          username: '',
          email: '',
          password: '',
          'confirm password': ''
        }
      },
      class: 'auth-form'
    }

    return formProps[selected]
  }

}
