import React, { Component } from 'react';
import './PrivateRoute.css';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserFromToken } from '../../actions';
import Loading from '../loading/Loading';

export class PrivateRoute extends Component {

  fetchUser = token => {
    const { dispatch, history } = this.props;
    dispatch(fetchUserFromToken(token, history))
    return <Loading />
  }

  render() {

    const { path, user, push, loading, children } = this.props;
    const token = window.localStorage.getItem('token')

    if (!token) {
      push('/authenticate/login')
    }

    return (
      <Route
        exact
        to={path}
        render={() => {
          return (
            loading
            ? <Loading />
            : user
                ? children
                : this.fetchUser(token)
          )
        }}
      />
    )
  }

}


const mapStateToProps = state => ({
  user: state.user,
  loading: state.loading
})

export default connect(mapStateToProps)(withRouter(PrivateRoute))
