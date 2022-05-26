import axios from 'axios';
import {
  CREATE_WORKOUT_FAIL,
  CREATE_WORKOUT_SUCCESS,
  CREATE_WORKOUT_REQUESTED,
} from '../constants/actions';

axios.defaults.withCredentials = true;

export const createWorkoutRequested = (dispatch) => {
  dispatch({
    type: CREATE_WORKOUT_REQUESTED,
  });
};

export const createWorkOut = (data) => async (dispatch) => {
  console.log('running...');
  dispatch(createWorkoutRequested);
  try {
    let response = await axios({
      method: 'POST',
      url: 'http://localhost:5000/api/wod',
      data,
    });

    if (response.status === 201) {
      dispatch({
        type: CREATE_WORKOUT_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_WORKOUT_FAIL,
    });
    // TODO: return error with an error reducer here
  }
};
