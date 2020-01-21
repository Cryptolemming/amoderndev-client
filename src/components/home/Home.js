import React, { Component } from 'react';
import './Home.css';
import PostsList from './PostsList';
import FeaturedList from './FeaturedList';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions';

export class Home extends Component {

  componentDidMount() {
    this.props.dispatch(fetchPosts())
  }

  render() {

    const { posts } = this.props;

    return (
      <>
        <FeaturedList posts={posts} />
        <PostsList posts={posts} />
      </>
    )
  }

}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps)(Home);
