import React, { Component } from 'react';
import './AModernDev.css';
import Header from './Header';
import Home from './Home';
import Dashboard from './Dashboard';
import Post from './Post';
import { Route } from 'react-router-dom';

export default class AModernDev extends Component {

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
              component={Dashboard}
            />

            <Route
              exact
              path='/posts/:postId'
              component={Post}
            />

          </main>
        </>
    );
  }

}
