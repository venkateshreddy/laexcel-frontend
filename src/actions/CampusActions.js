import { API_POST, API_GET, API_PUT } from './APIMethods';
import { Campus, ErrorType } from './ActionType';
import { CampusURL } from './ActionURL';

export const createCampus = data => {
  const url = `${CampusURL.CREATE_CAMPUS}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Campus.CREATE_CAMPUS,
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

export const fetchCampuses = data => {
  const url = `${CampusURL.FETCH_CAMPUSES}`;
  return async dispatch => {
    try {
      const result = await API_GET(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Campus.FETCH_CAMPUSES,
          payload: result.payload
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const updateCampus = (id, data) => {
  const url = `${CampusURL.UPDATE_CAMPUSES}/${id}/update`;
  return async dispatch => {
    try {
      const result = await API_PUT(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Campus.UPDATE_CAMPUS,
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

export const deleteCampuses = data => {
  const url = `${CampusURL.DELETE_CAMPUSES}`;
  return async dispatch => {
    try {
      const result = await API_PUT(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Campus.DELETE_CAMPUSES,
          payload: data
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
