import axios from 'axios';
import { ErrorType, Employee } from './ActionType';
import AppConfig from '../config';
import { API_GET } from './APIMethods';

export const createEmployee = (employee, cb) => dispatch => {
  axios
    .post(`${AppConfig.API_BASE_URL}/employee`, employee)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: Employee.FETCH_EMPLOYEE,
          payload: response.data.result
        });
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
        dispatch({
          type: Employee.FETCH_EMPLOYEE,
          payload: response.data.result
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const fetchEmployeesByRole = role => {
  const url = `${AppConfig.API_BASE_URL}/employee/${role}/role`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      return result;
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
      return {
        error: true,
        networkError: true,
        message: 'Internal server error!'
      };
    }
  };
};
