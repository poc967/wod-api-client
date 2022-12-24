import { GET_WODS_REQUESTED, GET_WODS_SUCCESS } from '../constants/actions';

const initialState = {
  wods: [],
  fetchingWods: false,
};

function wodReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WODS_SUCCESS:
      return {
        wods: [...action.payload.data],
        fetchingWods: false,
      };
    case GET_WODS_REQUESTED:
      return {
        ...state,
        fetchingWods: true,
      };
    default:
      return state;
  }
}

export default wodReducer;
