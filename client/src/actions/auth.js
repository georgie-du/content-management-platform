import * as api from "../api/index.js";
import { AUTH, AUTH_ERROR } from '../constants/actionTypes';

export const login = (formInfo, navigate) => async (dispatch) => {
  try {
    // login user
    const { data } = await api.login(formInfo);

    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    const errorMsg = error.response.data.message || 'Something went wrong';
    dispatch({ type: AUTH_ERROR, payload: errorMsg })
    // console.log(errorMsg);
  }
}

export const register = (formInfo, navigate) => async (dispatch) => {
  try {
    // register user
    const { data } = await api.register(formInfo);
    dispatch({ type: AUTH, data });

    navigate('/');
  } catch (error) {
    dispatch({ type: AUTH_ERROR, data: error.response.data.message || 'Something went wrong' })
    console.log(error);
    const errorMsg = error.response.data.message || 'Something went wrong';
    dispatch({ type: AUTH_ERROR, payload: errorMsg })
  }
}