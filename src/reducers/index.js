import * as ACTIONS from '../actions';

const initialState = {
  posts: {},
  comments: {},
  user: false
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ACTIONS.FETCH_POSTS_SUCCESS:
    console.log(action.posts)
      const posts = action.posts.reduce((acc, post) => {
        acc[post.id] = post;
        return acc;
      }, {})
      return Object.assign({}, state, { posts })
    default:
      return state;
  }
}
