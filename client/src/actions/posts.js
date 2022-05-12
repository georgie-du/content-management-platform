import * as api from "../api";
import { FETCH_POSTS, FETCH_POST, FETCH__FROM_SEARCH, CREATE, UPDATE, DELETE, START_SPINNER, STOP_SPINNER } from '../constants/actionTypes'

// action creators

export const getBlogs = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_SPINNER });
    const { data } = await api.fetchPosts(page);

    console.log(data);
    dispatch({ type: FETCH_POSTS, payload: data });
    dispatch({ type: STOP_SPINNER });
  } catch (error) {
    console.log(error);
  }
};

export const getBlog = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_SPINNER });
    const { data } = await api.fetchPost(id);

    console.log(data);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: STOP_SPINNER });
  } catch (error) {
    console.log(error);
  }
};


export const getBlogsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_SPINNER });
    const { data: { data } } = await api.fetchBlogsBySearch(searchQuery);
    dispatch({ type: FETCH__FROM_SEARCH, payload: data });
    dispatch({ type: STOP_SPINNER });
  } catch (error) {
    console.log(error);
  }
}

export const createBlog = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_SPINNER });
    const { data } = await api.createBlog(post);
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: STOP_SPINNER });
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

