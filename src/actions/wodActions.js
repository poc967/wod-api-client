import { GET_WODS_REQUESTED, GET_WODS_SUCCESS } from '../constants/actions';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getWods = () => async (dispatch) => {
  let today = Math.floor(Date.now() / 1000);
  dispatch(setIsLoading);

  try {
    const response = await axios({
      url: `http://localhost:5003/api/wod/${today}`,
      method: 'GET',
    });
    if (response.status === 200) {
      dispatch({
        type: GET_WODS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const setIsLoading = (dispatch) => {
  dispatch({
    type: GET_WODS_REQUESTED,
  });
};
