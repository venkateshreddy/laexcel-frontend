import { API_GET, API_POST } from './APIMethods';
import { Admission, ErrorType } from './ActionType';
import { AdmissionURL } from './ActionURL';
// import { Configs } from './ActionConfigs';
// import AppConfig from '../config';

export const setAdmissionInformation = data => ({
  type: Admission.SET_ADMISSION_INFORMATION,
  payload: data
});

export const setGeneralInformation = data => ({
  type: Admission.SET_GENERAL_INFORMATION,
  payload: data
});

export const prefillGeneralInfo = data => ({
  type: Admission.PREFIL_GENERAL_INFORMATION,
  payload: data
});

export const fetchAllAdmissions = () => {
  const url = `${AdmissionURL.FETCH_ALL_ADMISSIONS}`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Admission.FETCH_ALL_ADMISSIONS,
          payload: result.payload
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const createAdmission = data => {
  const url = `${AdmissionURL.FETCH_ALL_ADMISSIONS}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Admission.FETCH_ALL_ADMISSIONS,
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

export const changeAddressInformation = (form, errors) => dispatch =>
  dispatch({ type: Admission.SETSTATE_ADDRESS_INFORMATION, form, errors });
export const changeAddressInformationErrors = errors => dispatch =>
  dispatch({
    type: Admission.SETSTATE_ADDRESS_INFORMATION_ERRORS,
    errors
  });
export const changeEducationalInformation = (form, errors) => dispatch =>
  dispatch({ type: Admission.SETSTATE_EDUCATION_INFORMATION, form, errors });
