import { handleJWTToken, removeJWTToken, getJWTToken} from '../helpers/auth';

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

export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS,
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

export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const deletePostSuccess = postId => ({
  type: DELETE_POST_SUCCESS,
  postId
})

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const fetchCommentsSuccess = comments => ({
  type: FETCH_COMMENTS_SUCCESS,
  comments
})

export const FETCH_COMMENTS_ERROR = 'FETCH_COMMENTS_ERROR';
export const fetchCommentsError = err => ({
  type: FETCH_COMMENTS_ERROR,
  err
})

export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const deleteCommentSuccess = (postId, commentId) => ({
  type: DELETE_COMMENT_SUCCESS,
  info: {postId, commentId}
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
      console.log(user, token)
      dispatch(loginUserSuccess(user))
      handleJWTToken(token)
      return user;
    })
    .catch(err => console.log(err))
}

export const logoutUser = () => dispatch => {
  removeJWTToken();
  dispatch(logoutUserSuccess());
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
        throw 'Could not fetch posts'
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

export const deletePost = (postId, history) => (dispatch) => {
  return fetch(`http://localhost:8000/api/posts/${postId}`, {
    type: 'DELETE',
    headers: {
      'Authorization': `bearer ${getJWTToken()}`
    }
  })
  .then(res => {
    if (!res.ok) {
      throw 'Could not delete post'
    }
    return;
  })
  .then(() => {
    dispatch(deletePostSuccess(postId))
    history.push('/activity')
  })
  .catch(err => {
    console.log(err)
  })
}

export const fetchComments = postId => (dispatch) => {
  return fetch(`http://localhost:8000/api/comments/${postId}`)
    .then(res => {
      if (!res.ok) {
        throw 'Could not fetch comments'
      }

      return res.json()
    })
    .then(comments => {
      dispatch(fetchCommentsSuccess(comments))
    })
    .catch(err => {
      console.log(err)
      dispatch(fetchCommentsError(err))
    })
}

export const deleteComment = (postId, commentId, history) => (dispatch) => {
  return fetch(`http://localhost:8000/api/comments/${postId}`, {
    type: 'DELETE',
    body: {
      comment_id: commentId
    },
    headers: {
      'Authorization': `bearer ${getJWTToken()}`
    }
  })
  .then(res => {
    if (!res.ok) {
      throw 'Could not delete comment'
    }
    return;
  })
  .then(() => {
    dispatch(deleteCommentSuccess(postId, commentId))
  })
  .catch(err => {
    console.log(err)
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
