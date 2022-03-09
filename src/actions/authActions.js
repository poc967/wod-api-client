import {
  USER_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
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
    console.log(response.data, response.status);
    if (response.status === 200) {
      console.log('test');
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

export const authenticateUser = (username, password) => async (dispatch) => {
  dispatch(setUserLoading);

  let body = {
    email: username,
    password,
  };

  try {
    let response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/users/login',
      data: body,
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

export const logoutUser = async (dispatch) => {
  try {
    let response = await axios({
      method: 'GET',
      url: 'http://localhost:5000/api/users/logout',
    });

    if (response.status === 200) {
      dispatch({
        type: USER_LOGOUT,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const setUserLoading = (dispatch) => {
  dispatch({
    type: USER_LOADING,
  });
};
