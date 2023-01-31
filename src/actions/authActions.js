import {
  USER_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  EDIT_USER_SUCCESS,
} from '../constants/actions';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const editUser = (user_id, data) => async (dispatch) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  try {
    const response = await axios({
      url: `http://localhost:5003/api/users/${user_id}`,
      method: 'PUT',
      headers,
      data,
    });
    if (response.status === 200) {
      dispatch({
        type: EDIT_USER_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const getUser = async (dispatch) => {
  dispatch(setUserLoading);

  try {
    const response = await axios({
      url: 'http://localhost:5003/api/users/current_user',
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

export const authenticateUser = (username, password) => async (dispatch) => {
  dispatch(setUserLoading);

  let body = {
    email: username,
    password,
  };

  try {
    let response = await axios({
      method: 'POST',
      url: 'http://localhost:5003/api/users/login',
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

export const logoutUser = () => async (dispatch) => {
  dispatch(setUserLoading);
  try {
    let response = await axios({
      method: 'GET',
      url: 'http://localhost:5003/api/users/logout',
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
