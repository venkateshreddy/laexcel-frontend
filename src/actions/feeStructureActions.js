import axios from 'axios';
import { ErrorType, FeeStructure } from './ActionType';
import AppConfig from '../config';

export const createFeeStructure = (employee, cb) => dispatch => {
  axios
    .post(`${AppConfig.API_BASE_URL}feestructure`, employee)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: FeeStructure.FETCH_FEE_STRUCTURE,
          payload: response.data.result
        });
        cb(response.data);
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const fetchFeeStructure = () => dispatch => {
  axios
    .get(`${AppConfig.API_BASE_URL}feestructure`)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: FeeStructure.FETCH_FEE_STRUCTURE,
          payload: response.data.result
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const deleteFeeStructure = (id) => dispatch => {
  axios
    .delete(`${AppConfig.API_BASE_URL}/feestructure/${id}`)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: FeeStructure.FETCH_FEE_STRUCTURE,
          payload: response.data.result
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const updateFeeStructure = (id, employee, cb) => dispatch => {
  axios
    .put(`${AppConfig.API_BASE_URL}feestructure/${id}`, employee)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: FeeStructure.FETCH_FEE_STRUCTURE,
          payload: response.data.result
        });
        cb(response.data);
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};
