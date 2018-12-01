import { API_GET } from './APIMethods';
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
