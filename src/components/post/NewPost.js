import React, { Component } from 'react';
import './NewPost.css';

export default class NewPost extends Component {

  state = {
    title: '',
    content: '',
    topics: []
  }

  render() {
    return (
      <section className='new-post'>
        <form className='new-post-form'>
          <fieldset>
            <legend>New Post</legend>

          </fieldset>
        </form>
      </section>
    )
  }

}
