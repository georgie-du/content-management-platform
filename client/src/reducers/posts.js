import { FETCH_POSTS, FETCH_POST, FETCH__FROM_SEARCH, CREATE, UPDATE, DELETE, START_SPINNER, STOP_SPINNER } from '../constants/actionTypes'

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case START_SPINNER:
      return { ...state, isLoading: true }
    case STOP_SPINNER:
      return { ...state, isLoading: false }
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case FETCH__FROM_SEARCH:
      return { ...state, posts: action.payload };
    case FETCH_POST:
      return { ...state, post: action.payload };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    default:
      return state;
  }
};
