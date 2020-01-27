import React, { Component } from 'react';
import './Form.css';
import Input from './Input';
import uuid from 'uuid/v4';

export default class Form extends Component {

  state = {
    type: this.props.type,
    inputs: this.props.inputs
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

    const updatedInputs = {...inputs,
      [this.props.type]: e.target.value
    }

    this.setState = state => ({
        inputs: updatedInputs
    })
  }

  onSubmitForm = e => {

  }

  render() {
    const inputs = this.generateInputJSX()

    return (
      <form className={this.props.class}>
        <fieldset>
          {inputs}
          <input
            type='submit'
            onSubmit={this.onSubmitForm}
            className={`${this.props.class}-submit`}
            value='submit'
          />
        </fieldset>
      </form>
    )
  }

  generateInputJSX = () => {
    return Object.entries(this.state.inputs).map(([input, value]) => {
      const inputProps = {
        key: uuid(),
        onChange: this.onChangeInput,
        className: `${this.props.class}-input`,
        type: input === 'confirm password' ? 'password': input,
        name: input,
        placeholder: input,
        minLength: input === 'login' ? 3 : 8,
        maxLength: 64,
        value
      };

      return (
        <label key={uuid()} htmlFor={input}>
          {input}
          <Input {...inputProps} />
        </label>
      );
    })
  }

}
