import * as ACTIONS from '../actions';

const initialState = {
  posts: {},
  comments: {},
  user: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ACTIONS.FETCH_POSTS_SUCCESS:
      const posts = action.posts.reduce((acc, post) => {
        acc[post.id] = post;
        return acc;
      }, {})
      return Object.assign({}, state, { posts })
    case ACTIONS.REGISTER_USER_SUCCESS:
      const { user } = action;
      return Object.assign({}, state, { user })
    case ACTIONS.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, { user: action.user })
    default:
      return state;
  }
}
