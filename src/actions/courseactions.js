import axios from 'axios';
import { ErrorType, Course } from './ActionType';
import AppConfig from '../config';

export const createCourse = (employee, cb) => dispatch => {
  axios
    .post(`${AppConfig.API_BASE_URL}course`, employee)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: Course.FETCH_COURSE,
          payload: response.data.result
        });
        cb(response.data);
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const updateCourse = (id, employee, cb) => dispatch => {
  axios
    .put(`${AppConfig.API_BASE_URL}course/${id}`, employee)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: Course.FETCH_COURSE,
          payload: response.data.result
        });
        cb(response.data);
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const fetchCourse = () => dispatch => {
  axios
    .get(`${AppConfig.API_BASE_URL}course`)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: Course.FETCH_COURSE,
          payload: response.data.result
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const deleteCourse = (id) => dispatch =>
  axios
    .delete(`${AppConfig.API_BASE_URL}course/${id}`)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: Course.FETCH_COURSE,
          payload: response.data.result
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
