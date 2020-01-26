import React, { Component } from 'react';
import './Input.css';

export default class Input extends Component {

  render() {

    const { type, name, value, className, onChange } = this.props;
    const attrs = { type, name, value, className, onChange }

    return <input {...attrs} />
  }

}
