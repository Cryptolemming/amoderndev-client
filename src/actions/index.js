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
