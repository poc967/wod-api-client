import { USER_LOGIN_SUCCESS, USER_LOADING } from '../constants/actions';

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
        },
      };
    case USER_LOADING:
      return {
        ...state,
        fetching: true,
      };
    default:
      return state;
  }
}

export default authReducer;
