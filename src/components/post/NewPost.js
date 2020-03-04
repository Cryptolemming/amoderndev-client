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
    topics: new Array(5).fill({id: '', title: ''})
  }

  componentDidUpdate(prevProps, prevState) {
    const { posts, topics } = this.props;
    // if editing, populate state with current post data
    const path = this.props.location.pathname.split('/')
    const location = path[1];
    const postId = parseInt(path[2])
    console.log(location, postId)
    if (((prevProps.posts !== posts && topics) || (prevProps.topics !== topics && posts)) && location === 'edit-post') {
      const currentPost = Object.values(posts)
        .find(post => post.id === postId)
      console.log(posts, currentPost, topics)
      const { title, content, postTopics } = Object.assign(
        {},
        currentPost,
        {
          topics: this.state.topics.map((topic, idx) => {
                    return {
                      id: currentPost.topics[idx] ? currentPost.topics[idx].id : '',
                      title: currentPost.topics[idx] ? currentPost.topics[idx].title : ''
                    }
                  })
        })

      console.log(title, content, postTopics)
      this.setState((state, props) => ({
        title, content, topics: postTopics
      }))
      console.log(this.state)
    }
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
    const title = e.target.value;
    const selectIdx = e.target.name[e.target.name.length-1] - 1;
    const optionIdx = e.target.options.selectedIndex;
    const option = e.target.options[optionIdx];
    const updatedTopic = {
      id: option.id,
      title
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
    console.log(this.state)
    const topicsJSX = this.generateTopicsJSX();

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

    return this.state.topics.map((topic, idx) => {
      return <select key={uuid()}
        name={`topic-${idx+1}`}
        className='topic-select'
        onChange={this.handleChangeTopics}
        value={topic.title}
        >
        {options}
      </select>
    })
  }

}

// get topics from store so can also get their ids.
const mapStateToProps = state => ({
  posts: state.posts,
  topics: state.topics
})

export default connect(mapStateToProps)(withRouter(NewPost));
