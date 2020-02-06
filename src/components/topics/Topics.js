import React, { Component } from 'react';
import './Topics.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
      return <Link key={topic.id} to={`/topics/${topic.title}`}>
        <div key={topic.id} className='topic'>
          {topic.title}
        </div>
      </Link>
    })
  }
}

const mapStateToProps = state => ({
  topics: state.topics
})

export default connect(mapStateToProps)(Topics)
