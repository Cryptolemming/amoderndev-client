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
import NewPost from './post/NewPost';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPosts, fetchTopics, fetchUserFromToken, fetchComments } from '../actions';
import { removeJWTToken } from '../helpers/auth';
import PrivateRoute from './private-route/PrivateRoute'
import PublicRoute from './public-route/PublicRoute'

export class AModernDev extends Component {

  componentDidMount() {
    this.props.dispatch(fetchPosts())
    this.props.dispatch(fetchComments())
    this.props.dispatch(fetchTopics())
  }

  render() {

    return (
        <>
          <Header />

          <main>
            <Switch>

              <PublicRoute exact path='/'>
                <Home />
              </PublicRoute>

              <PrivateRoute exact path='/dashboard'>
                <AccountDashboard />
              </PrivateRoute>

              <PublicRoute exact path='/posts/:postId'>
                <Post />
              </PublicRoute>

              <PublicRoute exact path='/topics'>
                <Topics />
              </PublicRoute>

              <PublicRoute exact path='/topics/topic'>
                <Topic />
              </PublicRoute>

              <PrivateRoute exact path='/follow'>
                <Follow />
              </PrivateRoute>

              <PrivateRoute exact path='/activity'>
                <Activity />
              </PrivateRoute>

              <PrivateRoute exact path='/new-post'>
                <NewPost />
              </PrivateRoute>

              <Route
                exact
                path='/authenticate/:auth_type'
                component={Authenticate}
              />

            </Switch>
          </main>
        </>
    );
  }

}

export default connect()(AModernDev)
