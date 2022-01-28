import { USER_LOADING } from '../constants/actions';

export const getUser = (dispatch) => {
  dispatch(USER_LOADING);
};
