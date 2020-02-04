import React, { Component } from 'react';
import './Home.css';
import PostsList from './PostsList';
import FeaturedList from './FeaturedList';
import { connect } from 'react-redux';

export class Home extends Component {

  render() {

    const { posts } = this.props;

    return (
      <section className='home-container'>
        <FeaturedList posts={posts} />
        <PostsList posts={posts} />
      </section>
    )
  }

}

const mapStateToProps = state => ({
  posts: state.posts
})

export default connect(mapStateToProps)(Home);
