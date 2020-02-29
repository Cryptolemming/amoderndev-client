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
    console.log(this.props.posts)
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
    const { posts, comments, favouritesByUser } = this.props;
    const { selected } = this.state;
    console.log(comments)
    return selected === 'posts'
      ? favouritesByUser.posts.map(postId => {
        return <ActivityPostItem
          controls={['f']}
          mods={[]}
          key={postId}
          {...posts[postId]}
        />
      })
      : favouritesByUser.comments.map(commentId => {
        return <ActivityCommentItem
          controls={true}
          mods={false}
          key={commentId}
          {...comments[commentId]}
        />
      })

  }

}

const mapStateToProps = state  => ({
  posts: state.posts,
  comments: state.comments,
  favouritesByUser: state.favouritesByUser
})

export default connect(mapStateToProps)(ActivityFavorites)
