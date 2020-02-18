import React, { Component } from 'react';
import './Comments.css';
import { connect } from 'react-redux';
import { fetchComments } from '../../actions';
import CommentItem from './CommentItem';

export class Comments extends Component {

  static defaultProps = {
    comments: []
  }

  componentDidMount() {
    const { dispatch, postId } = this.props;
    dispatch(fetchComments(postId))
  }

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
    const { comments } = this.props;

    return Object.entries(comments).map(([id, comment]) => {
      console.log(comment)
      return <CommentItem
              key={id}
              {...comment}
            />
    })
  }

}

const mapStateToProps = state => ({
  comments: state.comments || []
})

export default connect(mapStateToProps)(Comments);
