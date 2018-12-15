import axios from 'axios';
import { API_GET, API_POST } from './APIMethods';
import { PreAdmission, ErrorType } from './ActionType';
import { PreAdmissionURL } from './ActionURL';
import { Configs } from './ActionConfigs';
import AppConfig from '../config';

export const bulkUpload = rows => dispatch =>
  axios
    .post(
      `${AppConfig.API_BASE_URL}preadmission/upload`,
      rows,
      Configs.GLOBALCONFIG
    )
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: 'UPLOAD_SUCCESS',
          data: response.data
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });

export const createPreAdmission = data => {
  const url = `${PreAdmissionURL.CREATE_PREADMISSION_DATA}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: PreAdmission.CREATE_PREADMISSION,
          payload: result.payload
        });
      }
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

export const fetchPreAdmissionData = () => {
  const url = `${PreAdmissionURL.FETCH_PREADMISSION_DATA}`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: PreAdmission.FETCH_PREADMISSION_DATA,
          payload: result.payload
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const fetchStudentsBasedOnFilter = data => {
  const url = `${PreAdmissionURL.FETCH_PREADMISSION_DATA}basedOnEquiryDate`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: PreAdmission.FETCH_STUDENTS_BASEDON_FILTER,
          payload: result.result
        });
      }
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

export const allocateEmployeeToEnquires = data => {
  const url = `${PreAdmissionURL.ALLOCATE_EMPLOYEE}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
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
