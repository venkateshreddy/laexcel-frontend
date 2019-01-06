import axios from 'axios';
import { ErrorType, gstRates } from './ActionType';
import AppConfig from '../config';

export const createGstRate = (employee, cb) => dispatch => {
  axios
    .post(`${AppConfig.API_BASE_URL}gstRates`, employee)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: gstRates.FETCH_GST_RATE,
          payload: response.data.result
        });
        cb(response.data);
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const updateGstRate = (id, employee, cb) => dispatch => {
  axios
    .put(`${AppConfig.API_BASE_URL}gstRates/${id}`, employee)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: gstRates.FETCH_GST_RATE,
          payload: response.data.result
        });
        cb(response.data);
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const fetchGstRate = () => dispatch => {
  axios
    .get(`${AppConfig.API_BASE_URL}gstRates`)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: gstRates.FETCH_GST_RATE,
          payload: response.data.result
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const deleteGstRates = (id) => dispatch => {
  axios
    .delete(`${AppConfig.API_BASE_URL}/employee/${id}`)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: gstRates.FETCH_GST_RATE,
          payload: response.data.result
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};
