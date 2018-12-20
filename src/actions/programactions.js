import axios from 'axios';
import { ErrorType, Program } from './ActionType';
import AppConfig from '../config';

export const createProgram = (employee, cb) => dispatch => {
  axios
    .post(`${AppConfig.API_BASE_URL}program`, employee)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: Program.FETCH_PROGRAM,
          payload: response.data.result
        });
        cb(response.data);
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const fetchProgram = () => dispatch => {
  axios
    .get(`${AppConfig.API_BASE_URL}program`)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: Program.FETCH_PROGRAM,
          payload: response.data.result
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};
