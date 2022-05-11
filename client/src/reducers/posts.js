import { FETCH_POSTS, FETCH__FROM_SEARCH, CREATE, UPDATE, DELETE } from '../constants/actionTypes'

export default (blogs = [], action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return action.payload;
    case FETCH__FROM_SEARCH:
      return action.payload;
    case CREATE:
      return [...blogs, action.payload];
    case UPDATE:
      return blogs.map((blog) => blog._id === action.payload._id ? action.payload : blog);
    case DELETE:
      return blogs.filter((blog) => blog._id !== action.payload)
    default:
      return blogs;
  }
};
