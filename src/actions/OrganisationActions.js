import { API_GET, API_POST, API_PUT } from './APIMethods';
import { Organisations, ErrorType } from './ActionType';
import { OrganisationsURL } from './ActionURL';

export const fetchOrganisations = () => {
  const url = `${OrganisationsURL.FETCH_ORGANISATIONS}`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Organisations.FETCH_ORGANISATIONS,
          payload: result.payload
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const createOrg = (data, callBack) => {
  const url = `${OrganisationsURL.CREATE_ORGANISATION}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Organisations.CREATE_ORGANISATION,
          payload: result.payload
        });
      }
      callBack({ error: result.error, message: result.message });
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const deleteOrg = (data, callBack) => {
  const url = `${OrganisationsURL.DELETE_ORGANISATION}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Organisations.FETCH_ORGANISATIONS,
          payload: result.payload
        });
      }
      callBack({ error: result.error, message: result.message });
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const updateOrg = (id, data, callBack) => {
  const url = `${OrganisationsURL.UPDATE_ORGANISATION}/${id}`;
  return async dispatch => {
    try {
      const result = await API_PUT(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Organisations.UPDATE_ORGANISATION,
          payload: result.payload
        });
      }
      callBack({ error: result.error, message: result.message });
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const setCurrentOrganisation = organisation => ({
  type: Organisations.SET_CURRENT_ORGANISATION,
  payload: organisation
});
