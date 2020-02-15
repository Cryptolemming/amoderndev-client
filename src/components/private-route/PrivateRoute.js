import React, { Component } from 'react';
import './PrivateRoute.css';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserFromToken } from '../../actions';
import Loading from '../loading/Loading';

export class PrivateRoute extends Component {

  componentDidMount() {
    const { user } = this.props;
    const token = window.localStorage.getItem('token')

    if (!token) {
      this.props.history.push('/authenticate/login')
      return;
    }

    if (!user) {
      this.fetchUser(token)
    }
  }

  fetchUser = token => {
    const { dispatch, history } = this.props;
    dispatch(fetchUserFromToken(token, history))
  }

  render() {

    const { user, loading, path, children } = this.props;

    return (
      <Route
        to={path}
        render={() => {
          return (
            loading
            ? <Loading />
            : user
                ? children
                : <Loading />
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
