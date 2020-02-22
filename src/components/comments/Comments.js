import React, { Component } from 'react';
import './Comments.css';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions';
import CommentItem from './CommentItem';

export class Comments extends Component {

  render() {
    const commentsJSX = this.generateCommentsJSX();

    return (
      <section className='comments'>
        <ul className='comments-list'>
          {commentsJSX}
        </ul>
      </section>
    )

  }

  generateCommentsJSX = () => {
    const { comments, comment_ids } = this.props;

    return comment_ids.map(id => {
      return <CommentItem
              key={id}
              {...comments[id]}
            />
    })
  }

}

const mapStateToProps = state => ({
  comments: state.comments
})

export default connect(mapStateToProps)(Comments);
