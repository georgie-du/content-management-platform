import { FETCH_USER } from '../constants/actionTypes';

const userReducer = (state = { isLoading: true }, action) => {
  switch (action.type) {
    case FETCH_USER:
      return { ...state, user: action.payload };
    case START_SPINNER:
      return { ...state, isLoading: true }
    case STOP_SPINNER:
      return { ...state, isLoading: false }
    default:
      return state;
  }
}
export default userReducer;