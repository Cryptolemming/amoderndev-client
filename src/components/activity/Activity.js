import React, { Component } from 'react';
import './Activity.css';
import { Link } from 'react-router-dom';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';
import ActivityPosts from './ActivityPosts';
import ActivityComments from './ActivityComments';
import ActivityFavorites from './ActivityFavorites';
import { fetchCommentsByUser, fetchFavouritesByUser } from '../../actions';

export class Activity extends Component {

  componentDidMount() {
    const { dispatch, user } = this.props;

    dispatch(fetchCommentsByUser(user.id))
    dispatch(fetchFavouritesByUser())
  }

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
          {this.generateNewPostJSX()}
          {infoJSX}
        </section>
      </section>
    )
  }

  generateNewPostJSX = () => {
    const { selected } = this.state;

    return selected === 'Posts'
      ? <Link to='/new-post'>
          <p className='new-post-link'>New Post</p>
        </Link>
      : '';
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
    const navMap = {
      'Posts': <ActivityPosts user={user} />,
      'Comments': <ActivityComments user={user} />,
      'Favorites': <ActivityFavorites user={user} />
    }

    return navMap[this.state.selected];
  }
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps)(Activity)
