import { API_GET, API_POST } from './APIMethods';
import { Cities, ErrorType } from './ActionType';
import { CitiesURL } from './ActionURL';

export const fetchCities = () => {
  const url = `${CitiesURL.FETCH_CITIES}`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Cities.FETCH_CITIES,
          payload: result.payload
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const createCity = (data, callBack) => {
  const url = `${CitiesURL.CREATE_CITIES}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Cities.CREATE_CITIES,
          payload: result.payload
        });
      }
      callBack({ error: result.error, message: result.message });
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const deleteCities = (data, callBack) => {
  const url = `${CitiesURL.DELETE_CITIES}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Cities.FETCH_CITIES,
          payload: result.payload
        });
      }
      callBack({ error: result.error, message: result.message });
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};
