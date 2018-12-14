import { API_GET, API_POST, API_PUT } from './APIMethods';
import { SourceType, AgencyCode, ErrorType } from './ActionType';
import { sourcetypeURL, agencycodesURL } from './ActionURL';

export const fetchSourceCodes = () => {
  const url = `${sourcetypeURL.FETCH_SOURCETYPES}`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: SourceType.FETCH_SOURCETYPES,
          payload: result.payload
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const createSourceCode = (data, callBack) => {
  const url = `${sourcetypeURL.CREATE_SOURCETYPE}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: SourceType.CREATE_SOURCETYPE,
          payload: result.payload
        });
      }
      callBack({ error: result.error, message: result.message });
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const updateSourceType = (id, data, callBack) => {
  const url = `${sourcetypeURL.UPDATE_SOURCETYPE}/${id}`;
  return async dispatch => {
    try {
      const result = await API_PUT(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: SourceType.UPDATE_SOURCETYPE,
          payload: result.payload
        });
      }
      callBack({ error: result.error, message: result.message });
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const fetchAgencyCodes = () => {
  const url = `${agencycodesURL.FETCH_AGENCYCODES}`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: AgencyCode.FETCH_AGENCYCODES,
          payload: result.payload
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const createAgency = (data, callBack) => {
  const url = `${agencycodesURL.CREATE_AGENCY}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: AgencyCode.CREATE_AGENCY,
          payload: result.payload
        });
      }
      callBack({ error: result.error, message: result.message });
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const updateAgency = (id, data, callBack) => {
  const url = `${agencycodesURL.UPDATE_AGENCY}/${id}`;
  return async dispatch => {
    try {
      const result = await API_PUT(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: AgencyCode.UPDATE_AGENCY,
          payload: result.payload
        });
      }
      callBack({ error: result.error, message: result.message });
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};
