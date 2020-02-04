import React, { Component } from 'react';
import './AModernDev.css';
import Header from './header/Header';
import Home from './home/Home';
import AccountDashboard from './account-dashboard/AccountDashboard';
import Post from './post/Post';
import Topics from './topics/Topics';
import Follow from './follow/Follow';
import Activity from './activity/Activity';
import Authenticate from './authenticate/Authenticate';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

export class AModernDev extends Component {

  componentDidMount() {
    this.props.dispatch(fetchPosts())
  }

  render() {

    return (
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
              path='/users/:userId'
              component={AccountDashboard}
            />

            <Route
              exact
              path='/posts/:postId'
              component={Post}
            />

            <Route
              exact
              path='/topics'
              component={Topics}
            />

            <Route
              exact
              path='/follow'
              component={Follow}
            />

            <Route
              exact
              path='/activity'
              component={Activity}
            />

            <Route
              exact
              path='/authenticate/:auth_type'
              component={Authenticate}
            />

          </main>
        </>
    );
  }

}

export default connect()(AModernDev)
