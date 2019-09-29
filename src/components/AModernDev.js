import React, { Component } from 'react';
import './AModernDev.css';
import Header from './Header';
import Home from './Home';
import Dashboard from './Dashboard';
import PostsList from './PostsList';
import Post from './Post';
import { Route } from 'react-router-dom';
import APIContext from '../context/APIContext';

const mockData = {
  users: {
    1: {
      id: 1,
      username: 'a',
      posts: [1,2],
      comments: [3,4]
    },
    2: {
      id: 2,
      username: 'b',
      posts: [3],
      comments: [1,2]
    },
    3: {
      id: 3,
      username: 'c',
      posts: [4],
      comments: [5]
    }
  },
  posts: {
    1: {
      id: 1,
      user: 1,
      date_created: '2019-09-25T20:00:03.877Z',
      title: 'abc',
      content: 'test content',
      comments: [1,2]
    },
    2: {
      id: 2,
      user: 1,
      date_created: '2019-09-01T20:00:03.877Z',
      title: 'def',
      content: 'test content',
      comments: [5]
    },
    3: {
      id: 3,
      user: 2,
      date_created: '2019-08-01T20:00:03.877Z',
      title: 'ghi',
      content: 'test content',
      comments: [3]
    },
    4: {
      id: 4,
      user: 3,
      date_created: '2019-05-01T20:00:03.877Z',
      title: 'jkl',
      content: 'test content',
      comments: [4]
    }
  },
  comments: {
    1: {
      id: 1,
      user: 2,
      date_created: '2019-09-05T20:00:03.877Z',
      content: 'text comment'
    },
    2: {
      id: 2,
      user: 2,
      date_created: '2019-09-11T20:00:03.877Z',
      content: 'text comment'
    },
    3: {
      id: 3,
      user: 1,
      date_created: '2019-09-12T20:00:03.877Z',
      content: 'text comment'
    },
    4: {
      id: 4,
      user: 1,
      date_created: '2019-09-19T20:00:03.877Z',
      content: 'text comment'
    },
    5: {
      id: 5,
      user: 3,
      date_created: '2019-09-22T20:00:03.877Z',
      content: 'text comment'
    }
  }
}

export default class AModernDev extends Component {

  state = {
    users: {},
    posts: {},
    comments: {}
  }

  componentDidMount() {
    this.setState({
      users: mockData.users,
      posts: mockData.posts,
      comments: mockData.comments
    })
  }

  render() {

    const { users, posts, comments } = this.state;

    const value = { users, posts, comments };

    return (
      <APIContext.Provider value={value}>
        <>
          <Header />

          <main>
            <Route
              exact
              path='/'
              component={Home}
            />

            <Route
              exact
              path='/user/:userId'
              component={Dashboard}
            />

            <Route
              exact
              path='/posts'
              component={PostsList}
            />

            <Route
              exact
              path='/posts/:postId'
              component={Post}
            />
          </main>
        </>
      </APIContext.Provider>
    );
  }

}
