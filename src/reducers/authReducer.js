import {
  USER_LOGIN_SUCCESS,
  USER_LOADING,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../constants/actions';

const initialState = {
  is_authenticated: false,
  fetching: false,
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
  },
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        is_authenticated: true,
        fetching: false,
        user: {
          id: action.payload.data.id,
          firstName: action.payload.data.first_name,
          lastName: action.payload.data.last_name,
          email: action.payload.data.email,
        },
      };
    case USER_LOADING:
      return {
        ...state,
        fetching: true,
      };
    case USER_LOGIN_FAIL:
    case USER_LOGOUT:
      return {
        is_authenticated: false,
        fetching: false,
        user: {
          id: null,
          firstName: null,
          lastName: null,
          email: null,
        },
      };
    default:
      return state;
  }
}

export default authReducer;
