import axios from 'axios';
import { ErrorType, CourseDuration } from './ActionType';
import AppConfig from '../config';

export const createCourseDuration = (employee, cb) => dispatch => {
  axios
    .post(`${AppConfig.API_BASE_URL}courseDuration`, employee)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: CourseDuration.FETCH_COURSE_DURATION,
          payload: response.data.result
        });
        cb(response.data);
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const fetchCourseDuration = () => dispatch => {
  axios
    .get(`${AppConfig.API_BASE_URL}courseDuration`)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: CourseDuration.FETCH_COURSE_DURATION,
          payload: response.data.result
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const updateCourseDuration = (id, employee, cb) => dispatch => {
  axios
    .put(`${AppConfig.API_BASE_URL}courseDuration/${id}`, employee)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: CourseDuration.FETCH_COURSE_DURATION,
          payload: response.data.result
        });
        cb(response.data);
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const deleteCourseDuration = (id) => dispatch => {
  axios
    .delete(`${AppConfig.API_BASE_URL}courseDuration/${id}`)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: CourseDuration.FETCH_COURSE_DURATION,
          payload: response.data.result
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};
