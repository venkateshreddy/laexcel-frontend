import { API_POST, API_GET } from './APIMethods';
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
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
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
