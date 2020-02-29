import * as ACTIONS from '../actions';

const initialState = {
  posts: {},
  topics: {},
  comments: {},
  commentsByUser: {},
  favouritesByUser: {},
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
    case ACTIONS.ADD_POST_SUCCESS:
      return Object.assign({}, state.posts, { ...state.posts, [action.post.id]: action.post })
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
      return Object.assign({}, state, { favouritesByUser: action.favourites })
    case ACTIONS.ADD_FAVOURITE_SUCCESS:
      if (action.favouriteType === 'post') {
        const postsToAddFavourite = Object.assign({}, state.posts);
        postsToAddFavourite[action.id].favouritesUsers = [...postsToAddFavourite[action.id].favouritesUsers, state.user.id]
        return Object.assign({}, state, {
          posts: postsToAddFavourite
        })
      } else {
        const commentsToAddFavourite = Object.assign({}, state.comments);
        commentsToAddFavourite[action.id].favouritesUsers = [...commentsToAddFavourite[action.id].favouritesUsers, state.user.id]
        const commentsToAddFavouriteByUser = Object.assign({}, state.commentsByUser);
        commentsToAddFavouriteByUser[action.id].favouritesUsers = commentsToAddFavourite[action.id].favouritesUsers;
        return Object.assign({}, state, {
          comments: commentsToAddFavourite,
          commentsByUser: commentsToAddFavouriteByUser
        })
      }
    case ACTIONS.DELETE_FAVOURITE_SUCCESS:
      if (action.favouriteType === 'post') {
        const postsToDeleteFavourite = Object.assign({}, state.posts);
        postsToDeleteFavourite[action.id].favouritesUsers = postsToDeleteFavourite[action.id].favouritesUsers.filter(userId => userId !== state.user.id)
        return Object.assign({}, state, {
          posts: postsToDeleteFavourite
        })
      } else {
        const commentsToDeleteFavourite = Object.assign({}, state.comments);
        commentsToDeleteFavourite[action.id].favouritesUsers = commentsToDeleteFavourite[action.id].favouritesUsers.filter(userId => userId !== state.user.id)
        const commentsToDeleteFavouriteByUser = Object.assign({}, state.commentsByUser);
        commentsToDeleteFavouriteByUser[action.id].favouritesUsers = commentsToDeleteFavourite[action.id].favouritesUsers;
        return Object.assign({}, state, {
          comments: commentsToDeleteFavourite,
          commentsByUser: commentsToDeleteFavouriteByUser
        })
      }
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
