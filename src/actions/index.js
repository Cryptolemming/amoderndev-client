import { handleJWTToken, removeJWTToken } from '../helpers/auth';

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

export const FETCH_USER_LOADING = 'FETCH_USER_LOADING';
export const fetchUserLoading = token => ({
  type: FETCH_USER_LOADING,
  token
})

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  user
})

export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS';
export const fetchTopicsSuccess = topics => ({
  type: FETCH_TOPICS_SUCCESS,
  topics
})

export const FETCH_TOPICS_ERROR = 'FETCH_TOPICS_ERROR';
export const fetchTopicsError = err => ({
  type: FETCH_TOPICS_ERROR,
  err
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

export const fetchUserFromToken = (token, history) => (dispatch) => {
  dispatch(fetchUserLoading);

  return fetch('http://localhost:8000/users', {
    headers: {
      'Authorization': `bearer ${token}`
    }
  })
  .then(res => {
    if (!res.ok) {
      throw 'Unable to fetch the user'
    }

    return res.json()
  })
  .then(user => {
    dispatch(fetchUserSuccess(user))
  })
  .catch(err => {
    console.log(err)
    removeJWTToken()
    history.push('/authenticate/login')
  })
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

export const fetchTopics = () => (dispatch) => {
  return fetch('http://localhost:8000/api/topics')
    .then(res => {
      if (!res.ok) {
        throw 'Could not fetch'
      }

      return res.json()
    })
    .then(topics => {
      dispatch(fetchTopicsSuccess(topics))
    })
    .catch(err => {
      console.log(err)
      dispatch(fetchTopicsError(err))
    })
}
