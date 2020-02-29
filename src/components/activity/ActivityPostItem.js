import React, { Component } from 'react';
import './ActivityPostItem.css';
import { postControlIcons } from '../../constants';
import uuid from 'uuid/v4';
import { getTimePassed } from '../../helpers';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFavourite, deleteFavourite, deletePost } from '../../actions';

export class PostItem extends Component {

  handleClickFavourite = () => {
    console.log('click favourite')
    const { id: postId, user, dispatch, history, posts } = this.props;
    const favouritesUsers = posts ? posts[postId].favouritesUsers : [];
    // if there's a user
    if (user) {
      favouritesUsers.includes(user.id)
        ? dispatch(deleteFavourite('post', parseInt(postId)))
        : dispatch(addFavourite('post', parseInt(postId)))
    }
    else {
      history.push('/authenticate/login')
    }
  }

  render() {
    const date = getTimePassed(date_created)
    const { id, user, date_created, title, content, controls, mods,
            handleDelete, comments, favouritesUsers, commentsUsers } = this.props;

    const controlsJSX = this.generateControlsJSX(controls);
    const modsJSX = this.generateModsJSX(mods);

      return (
          <li className='activity-post-item'>
            <div className='activity-post-text'>
                <Link to={`/posts/${id}`}>
                  <p className='activity-post-title'>
                    {title}
                  </p>
                  <p className='activity-post-date'>
                    {date}
                  </p>
                </Link>
            </div>
            <div className='activity-post-controls'>
              {controlsJSX}
              {modsJSX}
            </div>
          </li>
      )
  }

  generateModsJSX = (mods, id) => {
    const modsJSX = mods.map(mod => {
      const actions = {
        'd': {
          onClick: () => this.props.dispatch(deletePost(id))
        },
        'e': {}
      }

      const content = mod === 'd'
        ? postControlIcons[mod]
        : <Link
            key={uuid()}
            to='/edit-post'
          >
            {postControlIcons[mod]}
          </Link>

      const span = <span
                    key={uuid()}
                    className='activity-control-item'
                    {...actions[mod]}>
                    {content}
                  </span>

      return span;
    })

    return modsJSX;
  }

  generateControlsJSX = () => {
    const { comments, favouritesUsers, commentsUsers, user, controls } = this.props;

    const navMap = {
      'kp': () => {},
      'f': this.handleClickFavourite,
      'b': () => {},
      'c': () => {}
    }

    const counts = {
      'c': comments.length,
      'f': favouritesUsers.length
    }

    const activeClass = {
      'f': user && favouritesUsers.includes(user.id) ? 'active' : 'inactive',
      'c': user && commentsUsers.includes(user.id) ? 'active' : 'inactive'
    }

    const controlsJSX = controls.map(control => {
      return <span
        key={uuid()}
        onClick={navMap[control]}
        className='activity-control-item'>
        <span className={`post-controls-text-item control-${activeClass[control]}`}>
          <span className='control-count'>{counts[control]}</span>
          {postControlIcons[control]}
        </span>
      </span>
    })

    return controlsJSX;
  }

}

const mapStateToProps = state => ({
  user: state.user,
  posts: state.posts
})

export default connect(mapStateToProps)(withRouter(PostItem))
