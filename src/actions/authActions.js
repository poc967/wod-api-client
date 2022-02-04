import {
  USER_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from '../constants/actions';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getUser = async (dispatch) => {
  dispatch(setUserLoading);

  try {
    const response = await axios({
      url: 'http://localhost:5000/api/users/current_user',
      method: 'GET',
    });
    if (response.status === 200) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
    });
    throw new Error(error);
  }
};

export const setUserLoading = (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
};
