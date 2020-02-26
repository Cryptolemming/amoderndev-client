import React, { Component } from 'react';
import './ActivityComments.css';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ActivityCommentItem from './ActivityCommentItem';
import { deleteComment } from '../../actions';

export class ActivityComments extends Component {

  handleDelete = (postId, commentId) => {
    const { dispatch, history } = this.props;
    dispatch(deleteComment(postId, commentId, history))
  }

  render() {

    const commentsJSX = this.generateCommentsJSX()

    return (
      <section className='activity-comments'>
        <ul className='activity-comments-list'>
          {commentsJSX}
        </ul>
      </section>
    )
  }

  generateCommentsJSX = () => {
    const { user, comments } = this.props;

    return Object.entries(comments).reduce((acc, [id, comment]) => {
      console.log(comment.user, user.id)
      if (comment.user === user.id) {
        return <ActivityCommentItem
                  controls={true}
                  mods={true}
                  handleDelete={this.handleDelete}
                  key={id}
                  {...comment}
                />
      }
    }, [])
  }

}

const mapStateToProps = state => ({
  comments: state.commentsByUser
})

export default connect(mapStateToProps)(withRouter(ActivityComments))
