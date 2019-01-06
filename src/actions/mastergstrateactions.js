import axios from 'axios';
import { ErrorType, masterGstRates } from './ActionType';
import AppConfig from '../config';

export const createMasterGstRates = (employee, cb) => dispatch => {
  axios
    .post(`${AppConfig.API_BASE_URL}mastergstrates`, employee)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: masterGstRates.FETCH_MASTER_GST_RATES,
          payload: response.data.result
        });
        cb(response.data);
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const fetchMasterGstRates = () => dispatch => {
  axios
    .get(`${AppConfig.API_BASE_URL}mastergstrates`)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: masterGstRates.FETCH_MASTER_GST_RATES,
          payload: response.data.result
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const updateMasterGstRates = (id, data, cb) => dispatch => {
  axios
    .put(`${AppConfig.API_BASE_URL}mastergstrates/${id}`, data)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: masterGstRates.FETCH_MASTER_GST_RATES,
          payload: response.data.result
        });
        cb(response.data);
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const deleteGstRates = (id) => dispatch => {
  axios
    .delete(`${AppConfig.API_BASE_URL}/mastergstrates/${id}`)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: masterGstRates.FETCH_MASTER_GST_RATES,
          payload: response.data.result
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};
