import React, { Component } from 'react';
import './Form.css';
import Input from './Input';
import uuid from 'uuid/v4';

export default class Form extends Component {

  state = {
    inputs: this.props.inputs
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
    console.log(this.state.inputs)
    const inputs = this.generateInputJSX()

    return (
      <form className={this.props.class}>
        <fieldset>
          {inputs}
          <input type='submit' onSubmit={this.onSubmitForm}/>
        </fieldset>
      </form>
    )
  }

  generateInputJSX = () => {
    console.log(this.state.inputs)
    return Object.entries(this.state.inputs).map(([input, value]) => {
      const inputProps = {
        key: uuid(),
        onChange: this.onChangeInput,
        className: `${this.props.class}-input`,
        name: input,
        value
      };

      return (
        <label key={uuid()} htmlFor={input}>
          <Input {...inputProps} />
        </label>
      );
    })
  }

}
