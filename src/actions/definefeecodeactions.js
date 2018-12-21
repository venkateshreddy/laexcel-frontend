import axios from 'axios';
import { ErrorType, FeeCode } from './ActionType';
import AppConfig from '../config';

export const createFeeCode = (employee, cb) => dispatch => {
  axios
    .post(`${AppConfig.API_BASE_URL}feecode`, employee)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: FeeCode.FETCH_FEE_CODE,
          payload: response.data.result
        });
        cb(response.data);
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const fetchFeeCode = () => dispatch => {
  axios
    .get(`${AppConfig.API_BASE_URL}feecode`)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: FeeCode.FETCH_FEE_CODE,
          payload: response.data.result
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};
