import React, { Component } from 'react';
import './PublicRoute.css';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserFromToken } from '../../actions';

export class PublicRoute extends Component {

  componentDidMount() {
    const { user } = this.props;
    const token = window.localStorage.getItem('token')

    if (token && !user) {
      this.fetchUser(token)
    }
  }

  fetchUser = token => {
    const { dispatch, history } = this.props;
    dispatch(fetchUserFromToken(token, history))
  }

  render() {

    const { user, path, children } = this.props;

    return (
      <Route
        to={path}
        render={() => {
          return children
        }}
      />
    )
  }

}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(mapStateToProps)(withRouter(PublicRoute))
