import React, { Component } from 'react';
import './Topics.css';
import { connect } from 'react-redux';

export class Topics extends Component {

  render() {

    const topicsJSX = this.props.topics ? this.generateTopicsJSX() : '';

    return (
      <section className='topics'>
        {topicsJSX}
      </section>
    )
  }

  generateTopicsJSX = () => {
    return Object.entries(this.props.topics).map(([id, topic]) => {
      return <div key={topic.id} className='topic'>
        {topic.title}
      </div>
    })
  }
}

const mapStateToProps = state => ({
  topics: state.topics
})

export default connect(mapStateToProps)(Topics)
