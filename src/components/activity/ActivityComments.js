import React, { Component } from 'react';
import './ActivityComments.css';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ActivityCommentItem from './ActivityPostItem';
import { deleteComment } from '../../actions';

export class ActivityComments extends Component {

  handleDelete = (postId, commentId) => {
    const { dispatch, history } = this.props;
    dispatch(deleteComment(postId, commentId, history))
  }

  render() {
    const { user, comments } = this.props;

    const commentsEntries = Object.entries(this.props.comments).filter(([id, comment]) => comment.user === user.username)
    const commentsJSX = this.generateCommentsJSX(commentsEntries)

    return (
      <section className='activity-comments'>
        <ul className='activity-comments-list'>
          {commentsJSX}
        </ul>
      </section>
    )
  }

  generateCommentsJSX =comments => {
    return comments.map(comment => {
      return <ActivityCommentItem
        handleDelete={this.handleDelete}
        key={comment[1].id}
      {...comment[1]} />
    })
  }

}

const mapStateToProps = state => ({
  comments: state.comments
})

export default connect(mapStateToProps)(withRouter(ActivityComments))
