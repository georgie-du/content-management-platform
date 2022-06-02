import { AUTH, LOGOUT, AUTH_ERROR } from '../constants/actionTypes';

const authReducer = (state = { authData: null, isError: false, authFailure: '' }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data, isError: false };
    case AUTH_ERROR:
      return { ...state, authFailure: action.payload, isError: true }
    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
}
export default authReducer;