import React, { Component } from 'react';
import './Form.css';
import Input from './Input';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';

export class Form extends Component {

  state = {
    type: this.props.type,
    inputs: this.props.inputs,
    passwordMatch: true
  }

  componentDidUpdate = prevProps => {
    if (prevProps.type !== this.props.type) {
      this.setState({
        inputs: this.props.inputs
      })
    }
  }

  onChangeInput = e => {
    const { inputs } = this.state;

    const updatedInputs = {
      ...inputs,
      [e.target.name]: e.target.value
    }

    this.setState({
      inputs: updatedInputs
    })
  }

  onSubmitForm = e => {
    e.preventDefault();
    console.log(this.state.type)
    const { type, inputs } = this.state;
    if (type === 'register' && !this.isMatchingPassword(inputs['password'], inputs['confirm password'])) {
      this.informPasswordMismatch()
    } else {
      this.sendFormRegistration()
    }
  }

  sendFormRegistration = () => {
    const { inputs } = this.state;
    const {dispatch, onSubmit, push } = this.props;

    dispatch(onSubmit(inputs))
      .then(user => {
        console.log(user)
        push(`/`)
      })
  }

  informPasswordMismatch = () => {
    this.setState({
      passwordMatch: false
    })
  }

  render() {
    const inputs = this.generateInputJSX();
    const passwordMismatch = this.generateMatchingPasswordJSX();

    return (
      <form onSubmit={this.onSubmitForm} className={this.props.class}>
        <fieldset>
          {inputs}
          {passwordMismatch}
          <input
            type='submit'
            className={`${this.props.class}-submit`}
            value='submit'
          />
        </fieldset>
      </form>
    )
  }

  generateInputJSX = () => {
    return Object.entries(this.state.inputs).map(([input, value], idx) => {
      const inputProps = {
        onChange: this.onChangeInput,
        className: `${this.props.class}-input`,
        type: input === 'confirm password' ? 'password' : input,
        name: input,
        placeholder: input,
        minLength: input === 'password' ? 8 : 3,
        maxLength: 64,
        value
      };

      return (
        <label key={`${input}-idx`} htmlFor={input}>
          {input}
          <Input {...inputProps} />
        </label>
      );
    })
  }

  generateMatchingPasswordJSX = () => {
    const { passwordMatch } = this.state;
    return passwordMatch ? '' : <span className='password-mismatch'>passwords do not match</span>
  }

  isMatchingPassword = (passwordOne, passwordTwo) => {
    return passwordOne === passwordTwo;
  }

}

export default connect()(Form)
