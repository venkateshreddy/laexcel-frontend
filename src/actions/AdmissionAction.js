import axios from 'axios';
import { API_GET, API_POST, API_PUT } from './APIMethods';
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
      dispatch({
        type: PreAdmission.ALLOCATE_TO_EMPLOYEE,
        payload: data.selection
      });
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

export const acceptOrRejectEnquiry = data => {
  const url = `${PreAdmissionURL.ACCEPT_REJECT_ENQUIRY}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      dispatch({
        type: PreAdmission.ACCEPT_OR_REJECT_ENQUIRY,
        payload: data
      });
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

export const fetchAdmissionsByEmp = (id, data) => {
  const url = `${PreAdmissionURL.FETCH_PREADMISSION_DATA}${id}/employee`;
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

export const fetchAssignedAdmissions = data => {
  const url = `${PreAdmissionURL.FETCH_PREADMISSION_DATA}assigned`;
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

export const updatePreAdmissionData = (id, data) => {
  const url = `${PreAdmissionURL.FETCH_PREADMISSION_DATA}${id}`;
  return async dispatch => {
    try {
      const result = await API_PUT(url, data);
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

export const fetchEnquiresByStudent = data => {
  const url = `${PreAdmissionURL.FETCH_PREADMISSION_DATA}student`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: PreAdmission.FETCH_STUDENTS_BASEDON_FILTER,
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

export const updateResponseAndEnquiredOn = (id, data) => {
  const url = `${PreAdmissionURL.FETCH_PREADMISSION_DATA}${id}/clarifications`;
  return async dispatch => {
    try {
      const result = await API_PUT(url, data);
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

export const setDemoClassDate = data => {
  const url = `${PreAdmissionURL.SET_DEMO_CLASS}`;
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

export const fetchAllAssignedEnquiries = data => {
  const url = `${PreAdmissionURL.FETCH_ALL_ASSIGNED_ENQUIRIES}`;
  return async dispatch => {
    try {
      const result = await API_GET(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: PreAdmission.FETCH_ALL_ASSIGNED_ENQUIRIES,
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

export const updateResponseTypeAndRemarks = (id, data) => {
  const url = `${PreAdmissionURL.FETCH_PREADMISSION_DATA}${id}/employee`;
  return async dispatch => {
    try {
      const result = await API_PUT(url, data);
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

export const fetchLogsById = id => {
  const url = `${PreAdmissionURL.FETCH_PREADMISSION_DATA}${id}/logs`;
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
