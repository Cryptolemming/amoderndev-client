import React, { Component } from 'react';
import './NewPost.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { topics } from '../../constants';
import uuid from 'uuid/v4';
import { addPost } from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export class NewPost extends Component {

  state = {
    title: '',
    content: '',
    topics: new Array(5).fill({id: '', value: ''})
  }

  handleChangeTitle = e => {
    this.setState({
      title: e.target.value
    })
  }

  handleChangeContent = data => {
    this.setState({
      content: data
    })
  }

  handleChangeTopics = e => {
    // get the index from the event select option
    const value = e.target.value;
    const selectIdx = e.target.name[e.target.name.length-1] - 1;
    const optionIdx = e.target.options.selectedIndex;
    const option = e.target.options[optionIdx];
    const updatedTopic = {
      id: option.id,
      value: value
    }
    const topicsSelected = [...this.state.topics]
    topicsSelected[selectIdx] = updatedTopic
    this.setState({
      topics: topicsSelected
    })
  }

  handleSubmitNewPost = e => {
    e.preventDefault();
    const{ title, topics, content } = this.state;
    const selectedTopicIds = topics.reduce((acc, topic) => {
      if (topic.value !== '') {
        acc.push(parseInt(topic.id))
      }
      return acc;
    }, [])

    this.props.dispatch(addPost(title, selectedTopicIds, content, this.props.history))
  }

  render() {

    const topicsJSX = this.generateTopicsJSX()
  ;
    return (
      <section className='new-post'>
        <form onSubmit={this.handleSubmitNewPost} className='new-post-form'>
          <fieldset>
            <legend>`Speak your mind`</legend>
            <label htmlFor='title'>
              <p>title:</p>
            </label>
            <input
              type='text'
              name='title'
              placeholder='enter a title'
              value={this.state.title}
              onChange={this.handleChangeTitle}
            />
            <label htmlFor='topic-1'>
              <p>topics (up to 5):</p>
            </label>
            {topicsJSX}
            <label htmlFor='content'>
              <p>content:</p>
            </label>
            <CKEditor
              editor={ ClassicEditor }
              data=""
              onInit={ editor => {
                  console.log( 'Editor is ready to use!', editor );
              } }
              onChange={ ( event, editor ) => {
                  const data = editor.getData();
                  this.handleChangeContent(data)
              } }
              onBlur={ ( event, editor ) => {
              } }
              onFocus={ ( event, editor ) => {
              } }
            />
            <input type='submit' />
          </fieldset>
        </form>
      </section>
    )
  }

  generateTopicsJSX = () => {
    const { topics } = this.props;

    const options = Object.entries(topics).map(([id, topic]) => {
      return <option key={topic.id} id={topic.id} value={topic.title}>
        {topic.title}
      </option>
    })
    options.unshift(<option key={uuid()} value='--'>
      --
    </option>)

    return this.state.topics.map((value, idx) => {
      return <select key={uuid()}
        name={`topic-${idx+1}`}
        className='topic-select'
        onChange={this.handleChangeTopics}
        value={value.value}
        >
        {options}
      </select>
    })
  }

}

// get topics from store so can also get their ids.
const mapStateToProps = state => ({
  topics: state.topics
})

export default connect(mapStateToProps)(withRouter(NewPost));
