import axios from 'axios';
import { ErrorType, Batch } from './ActionType';
import AppConfig from '../config';

export const createBatch = (employee, cb) => dispatch => {
  axios
    .post(`${AppConfig.API_BASE_URL}batch`, employee)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: Batch.FETCH_BATCH,
          payload: response.data.result
        });
        cb(response.data);
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const fetchBatch = () => dispatch => {
  axios
    .get(`${AppConfig.API_BASE_URL}batch`)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: Batch.FETCH_BATCH,
          payload: response.data.result
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};
