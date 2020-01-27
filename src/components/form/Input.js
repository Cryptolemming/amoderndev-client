import React, { Component } from 'react';
import './Input.css';

export default class Input extends Component {

  render() {

    const { type, name, value, className, onChange, placeholder, minLength, maxLength } = this.props;
    const attrs = { type, name, value, className, onChange, placeholder, minLength, maxLength }

    return (
      <input
        {...attrs}
        required
      />
    )
  }

}
