// import { API_GET, API_POST, API_PUT } from './APIMethods';
import { Admission } from './ActionType';
// import { AdmissionURL } from './ActionURL';
// import { Configs } from './ActionConfigs';
// import AppConfig from '../config';

export const changeAddressInformation = (form, errors) => dispatch =>
  dispatch({ type: Admission.SETSTATE_ADDRESS_INFORMATION, form, errors });
export const changeAddressInformationErrors = errors => dispatch =>
  dispatch({
    type: Admission.SETSTATE_ADDRESS_INFORMATION_ERRORS,
    errors
  });
export const changeEducationalInformation = (form, errors) => dispatch =>
  dispatch({ type: Admission.SETSTATE_EDUCATION_INFORMATION, form, errors });
