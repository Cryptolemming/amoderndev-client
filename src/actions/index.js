import { handleJWTToken } from '../helpers/auth';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const fetchPostsSuccess = posts => ({
  type: FETCH_POSTS_SUCCESS,
  posts
})

export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';
export const fetchPostsError = err => ({
  type: FETCH_POSTS_ERROR,
  err
})

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const loginUserSuccess = user => ({
  type: LOGIN_USER_SUCCESS,
  user
})

export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const loginUserError = err => ({
  type: LOGIN_USER_ERROR,
  err
})

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const registerUserSuccess = user => ({
  type: REGISTER_USER_SUCCESS,
  user
})

export const registerUser = () => (dispatch, user) => {
  return fetch('localhost:8000/users', {
      type: 'POST',
      body: JSON.stringify(user),
      headers: {
        'CONTENT-TYPE': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw 'User not registered'
      }

      return res.json()
    })
    .then(user => {
      dispatch(registerUserSuccess(user))
      dispatch(loginUser(user))
    })
    .catch(err => dispatch(loginUserError))
}

export const loginUser = (user) => (dispatch) => {
  return fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (!res.ok) {
        throw 'User not registered'
      }

      return res.json()
    })
    .then(authData => {
      const { user, authToken: token } = authData;

      dispatch(loginUserSuccess(user))
      handleJWTToken(token)
      return user;
    })
    .catch(err => console.log(err))
}

export const fetchPosts = () => (dispatch) => {
  return fetch('http://localhost:8000/api/posts')
    .then(res => {
      if (!res.ok) {
        throw 'Could not fetch'
      }

      return res.json()
    })
    .then(posts => {
      dispatch(fetchPostsSuccess(posts))
    })
    .catch(err => {
      console.log(err)
      dispatch(fetchPostsError(err))
    })
}
