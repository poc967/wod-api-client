import {
  USER_LOGIN_SUCCESS,
  USER_LOADING,
  USER_LOGIN_FAIL,
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
          id: action.payload.id,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
        },
      };
    case USER_LOADING:
      return {
        ...state,
        fetching: true,
      };
    case USER_LOGIN_FAIL:
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
