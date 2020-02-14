import React, { Component } from 'react';
import './AModernDev.css';
import Header from './header/Header';
import Home from './home/Home';
import AccountDashboard from './account-dashboard/AccountDashboard';
import Post from './post/Post';
import Topics from './topics/Topics';
import Topic from './topics/Topic';
import Follow from './follow/Follow';
import Activity from './activity/Activity';
import Authenticate from './authenticate/Authenticate';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, fetchTopics, fetchUserFromToken } from '../actions';
import { removeJWTToken } from '../helpers/auth';
import PrivateRoute from './private-route/PrivateRoute'

export class AModernDev extends Component {

  componentDidMount() {
    this.props.dispatch(fetchPosts())
    this.props.dispatch(fetchTopics())
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

            <PrivateRoute path='/dashboard'>
              <AccountDashboard />
            </PrivateRoute>

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
              path='/topics/:topic'
              component={Topic}
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
