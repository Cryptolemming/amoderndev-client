import React, { Component } from 'react';
import './Authenticate.css';

export default class Authenticate extends Component {

  state = {
    selected: 'register'
  }

  render() {

    return (
      <section className='authenticate'>
        Authenticate
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
        inputs: ['username', 'password'],
      },
      'login': {
        inputs: ['username', 'email', 'password', 'repeat password']
      }
    }

    return formProps[selected]
  }

}
