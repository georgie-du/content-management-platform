import * as api from "../api";
import { FETCH_POSTS, CREATE, UPDATE, DELETE } from '../constants/actionTypes'

// action creators

export const getBlogs = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createBlog = (post) => async (dispatch) => {
  try {
    const { data } = await api.createBlog(post);
    dispatch({ type: CREATE, payload: data });
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