import React, { Component } from 'react';
import './Activity.css';
import { Link } from 'react-router-dom';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import ActivityPosts from './ActivityPosts';
import ActivityComments from './ActivityComments';
import ActivityFavorites from './ActivityFavorites';

export class Activity extends Component {

  state = {
    selected: 'Posts'
  }

  handleChangeSelected = e => {
    this.setState({
      selected: e.currentTarget.textContent
    })
  }

  render() {
    const { user } = this.props;

    const navJSX = this.generateNavJSX();
    const infoJSX = this.generateInfoJSX(user);

    return (
      <section className='activity'>
        <section className='activity-nav'>
          {navJSX}
        </section>
        <section className='activity-info'>
          {infoJSX}
        </section>
      </section>
    )
  }

  generateNavJSX = () => {
    const { selected } = this.state;
    return ['Posts', 'Comments', 'Favorites'].map(datum => {
      const active = selected === datum ? ' active': '';

      return <p
        key={uuid()}
        className={`dashboard-nav-text${active}`}
        onClick={this.handleChangeSelected}>
        {datum}
      </p>
    })
  }

  generateInfoJSX = user => {
    return <ActivityPosts user={user} />
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Activity)
