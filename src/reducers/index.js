import * as ACTIONS from '../actions';

const initialState = {
  posts: {},
  topics: {},
  comments: {},
  commentsByUser: {},
  favoritesByUser: {},
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
    case ACTIONS.FETCH_COMMENTS_SUCCESS:
      const comments = action.comments.reduce((acc, comment) => {
        acc[comment.id] = comment;
        return acc;
      }, {})
      return Object.assign({}, state, { comments })
    case ACTIONS.FETCH_COMMENTS_BY_USER_SUCCESS:
      const commentsByUser = action.comments.reduce((acc, comment) => {
        acc[comment.id] = comment;
        return acc;
      }, {})
      return Object.assign({}, state, { commentsByUser })
    case ACTIONS.FETCH_FAVOURITES_SUCCESS:
      console.log(action.favourites)
      return Object.assign({}, state, { favouritesByUser: action.favourites })
    case ACTIONS.DELETE_COMMENT_SUCCESS:
      const commentsToDeleteFrom = Object.assign({}, state.comments)
      delete commentsToDeleteFrom[action.info.postId][action.info.commentId]
      return Object.assign({}, state, { comments: commentsToDeleteFrom })
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
