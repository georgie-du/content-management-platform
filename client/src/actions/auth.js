import * as api from "../api/index.js";
import { AUTH } from '../constants/actionTypes';

export const login = (formInfo, navigate) => async (dispatch) => {
  try {
    // login user
    const { data } = await api.login(formInfo);
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    console.log(error);
  }
}

export const register = (formInfo, navigate) => async (dispatch) => {
  try {
    // register user
    const { data } = await api.register(formInfo);
    dispatch({ type: AUTH, data });

    navigate('/');
  } catch (error) {
    console.log(error);
  }
}