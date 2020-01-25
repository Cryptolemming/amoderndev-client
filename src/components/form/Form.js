import React, { Component } from 'react';
import './Form.css';
import Input from './Input';
import uuid from 'uuid/v4';

export default class Form extends Component {

  state = {
    inputs: this.props.[this.props.type]
  }

  onChangeInput = e => {
    const { inputs } = this.state;

    const updatedInputs = {...inputs, {
      [this.props.type]: e.target.value
    }}

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
        </fieldset>
      </form>
    )
  }

  generateInputJSX = () => {
    return Object.entries(this.state.inputs).map(([input, value]) => {
      const inputProps = {
        key: uuid(),
        onChange: this.onChangeInput,
        name: input,
        value
      };

      return (
        <label htmlFor={input}>
          <Input {...inputProps} />
        </label>
      );
    })
  }

}
