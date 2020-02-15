import * as ACTIONS from '../actions';

const initialState = {
  posts: {},
  topics: {},
  comments: {},
  loading: false,
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
    case ACTIONS.DELETE_POST_SUCCESS:
      const postsToDeleteFrom = Object.assign({}, state.posts)
      delete postsToDeleteFrom[action.postId]
      return Object.assign({}, state, { posts: postsToDeleteFrom })
    case ACTIONS.FETCH_TOPICS_SUCCESS:
      const topics = action.topics.reduce((acc, topic) => {
        acc[topic.id] = topic;
        return acc;
      }, {})
      return Object.assign({}, state, { topics })
    case ACTIONS.REGISTER_USER_SUCCESS:
      const { user } = action;
      return Object.assign({}, state, { user })
    case ACTIONS.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, { user: action.user })
    case ACTIONS.LOGOUT_USER_SUCCESS:
      return Object.assign({}, state, { user: false })
    case ACTIONS.FETCH_USER_LOADING:
      return Object.assign({}, state, { loading: true})
    case ACTIONS.FETCH_USER_SUCCESS:
      return Object.assign({}, state, { loading: false, user: action.user })
    default:
      return state;
  }
}
