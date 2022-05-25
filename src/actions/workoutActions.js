import axios from 'axios';
import {
  CREATE_WORKOUT_FAIL,
  CREATE_WORKOUT_SUCCESS,
} from '../constants/actions';

axios.defaults.withCredentials = true;
