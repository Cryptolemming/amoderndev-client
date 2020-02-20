import React, { Component } from 'react';
import './ActivityFavorites.css';
import { connect } from 'react-redux';
import ActivityCommentItem from './ActivityCommentItem';
import ActivityPostItem from './ActivityPostItem';

export class ActivityFavorites extends Component {

  state = {
    selected: 'posts'
  }

  handleSelected= e => {
    this.setState({
      selected: e.target.textContent
    })
  }

  render() {

    const favoritesJSX = this.generateFavoritesJSX();

    return (
      <section className='activity-favorites'>
        <div className='activity-favorites-buttons'>
          <button
            onClick={this.handleSelected}
            className={`activity-favorites-button${this.getSelectedClassName('posts')}`}>
            posts
          </button>
          <button
            onClick={this.handleSelected}
            className={`activity-favorites-button${this.getSelectedClassName('comments')}`}>
            comments
          </button>
        </div>
        <ul className='activity-favorites-list'>
          {favoritesJSX}
        </ul>
      </section>
    )

  }

  getSelectedClassName = type => {
    return this.state.selected === type ? ' activity-button-selected' : ''
  }

  generateFavoritesJSX = () => {
    const { posts, comments } = this.props;
    const { selected } = this.state;

    return selected === 'posts'
      ? Object.entries(posts).map(([id, post]) => {
        return <ActivityPostItem key={post.id} {...post}/>
      })
      : Object.entries(comments).map(([id, comment]) => {
        return <ActivityCommentItem key={comment.id} {...comment} />
      })

  }

}

const mapStateToProps = state  => ({
  posts: state.posts,
  comments: state.comments
})

export default connect(mapStateToProps)(ActivityFavorites)
