import axios from 'axios';
import { ErrorType, Logos } from './ActionType';
import AppConfig from '../config';

export const createLogo = (employee, cb) => dispatch => {
  axios
    .post(`${AppConfig.API_BASE_URL}/logos`, employee)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: Logos.FETCH_LOGOS,
          payload: response.data.result
        });
        cb(response.data);
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const updateLogo = (employee, id, cb) => dispatch => {
  axios
    .put(`${AppConfig.API_BASE_URL}logos/${id}`, employee)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: Logos.FETCH_LOGOS,
          payload: response.data.result
        });
        cb(response.data);
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const fetchLogo = () => dispatch => {
  axios
    .get(`${AppConfig.API_BASE_URL}/logos`)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: Logos.FETCH_LOGOS,
          payload: response.data.result
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};
