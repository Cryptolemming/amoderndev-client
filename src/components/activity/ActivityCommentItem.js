import React, { Component } from 'react';
import './ActivityCommentItem.css';
import uuid from 'uuid/v4';
import { postControlIcons } from '../../constants';
import { getTimePassed } from '../../helpers';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addFavourite, deleteFavourite, deleteComment } from '../../actions';

export class ActivityCommentItem extends Component {

  handleClickFavourite = () => {
    const { id: commentId, favouritesUsers = [], user, dispatch, history, comments } = this.props;
    // if there's a user
    if (user) {
      favouritesUsers.includes(user.id)
        ? dispatch(deleteFavourite('comment', parseInt(commentId)))
        : dispatch(addFavourite('comment', parseInt(commentId)))
    }
    else {
      history.push('/authenticate/login')
    }
  }

  render() {
    const date = getTimePassed(date_created)
    const { id, user, username, date_created, content, mods,
            handleDelete, favouritesUsers, post } = this.props;

    const controlsJSX = this.generateControlsJSX();
    const modsJSX = this.generateModsJSX(mods, id, post, handleDelete);

    return (
        <li className='activity-comment-item'>
          <div className='activity-comment'>
              <Link to={`/posts/${post}`}>
                <p className='activity-comment-date'>
                  {date}
                </p>
                <p className='activity-comment-content'>
                  {content}
                </p>
              </Link>
          </div>
          <div className='activity-comment-controls'>
            {controlsJSX}
            {modsJSX}
          </div>
        </li>
    )
  }

  generateModsJSX = (mods, id, post, handleDelete) => {
    return mods ? <span
                key={uuid()}
                className='activity-comment-control-item'
                onClick={() => handleDelete(post, id)}
              >
                {postControlIcons['d']}
              </span> : '';
  }

  generateControlsJSX = () => {
    const { favouritesUsers = [], user, controls } = this.props;

    const counts = {
      'f': favouritesUsers.length
    }
    const activeClass = {
      'f': user && favouritesUsers.includes(user.id) ? 'active' : 'inactive',
    }

    console.log(user.id, favouritesUsers)

    const controlsJSX = controls ? <span
        key={uuid()}
        onClick={this.handleClickFavourite}
        className='activity-comment-control-item'>
        <span className={`post-controls-text-item control-${activeClass['f']}`}>
          <span className='activity-control-count'>{favouritesUsers.length}</span>
          {postControlIcons['f']}
        </span>
      </span> : ''

     return controlsJSX;
  }

}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(ActivityCommentItem)
