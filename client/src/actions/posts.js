import * as api from "../api";
import { FETCH_POSTS_BY_PAGE, FETCH_POST, FETCH__FROM_SEARCH, CREATE, UPDATE, DELETE, START_SPINNER, STOP_SPINNER, COMMENT } from '../constants/actionTypes'

// action creators

export const getBlogs = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_SPINNER });
    const { data } = await api.fetchPosts(page);

    dispatch({ type: FETCH_POSTS_BY_PAGE, payload: data });
    dispatch({ type: STOP_SPINNER });
  } catch (error) {
    console.log(error);
  }
};

export const getBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_SPINNER });
    const { data } = await api.fetchPost(id);

    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: STOP_SPINNER });
  } catch (error) {
    console.log(error);
  }
};

export const getBlogsBySearch = (params) => async (dispatch) => {
  try {
    dispatch({ type: START_SPINNER });
    const { data: { data } } = await api.fetchBlogsBySearch(params);

    dispatch({ type: FETCH__FROM_SEARCH, payload: data });
    dispatch({ type: STOP_SPINNER });
  } catch (error) {
    console.log(error);
  }
}

export const createBlog = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_SPINNER });
    const { data } = await api.createBlog(post);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: STOP_SPINNER });
    navigate(`/posts/${data._id}`);
  } catch (error) {
    console.log(error);
  }
}

export const updateBlog = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updateBlog(id, post);

    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error);
  }
}

export const deleteBlog = (id) => async (dispatch) => {
  try {
    await api.deleteBlog(id);
    dispatch({ type: DELETE, payload: id })
  } catch (error) {
    console.log(error);
  }
}

export const likeBlog = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeBlog(id);
    dispatch({ type: UPDATE, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const postComment = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    console.log(data)
    dispatch({ type: COMMENT, payload: data })
    return data.comments;
  } catch (error) {
    console.log(error)
  }
}

