import axios from 'axios';
import { ErrorType, Employee } from './ActionType';
import AppConfig from '../config';

export const createEmployee = (employee, cb) => dispatch => {
  axios
    .post(`${AppConfig.API_BASE_URL}/employee`, employee)
    .then(response => {
      if (response.status === 200) {
        dispatch({ type: Employee.FETCH_EMPLOYEE, payload: response.data.result });
        cb(response.data);
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const fetchEmployees = () => dispatch => {
  axios
    .get(`${AppConfig.API_BASE_URL}/employee`)
    .then(response => {
      if (response.status === 200) {
        dispatch({ type: Employee.FETCH_EMPLOYEE, payload: response.data.result });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};
