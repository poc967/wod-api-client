import authReducer from './authReducer';
import { combineReducers } from '@reduxjs/toolkit';
import wodReducer from './wodReducer';

export default combineReducers({
  auth: authReducer,
  wod: wodReducer,
});
