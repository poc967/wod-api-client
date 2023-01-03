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
  dispatch(createWorkoutRequested);
  try {
    let response = await axios({
      method: 'POST',
      url: 'http://localhost:5003/api/wod',
      data,
    });

    if (response.status === 201) {
      dispatch({
        type: CREATE_WORKOUT_SUCCESS,
        payload: response.data,
      });
      return {
        success: true,
        message: 'Workout Created Successfully',
      };
    }
  } catch (error) {
    dispatch({
      type: CREATE_WORKOUT_FAIL,
    });
    return {
      success: false,
      message: error,
    };
  }
};
