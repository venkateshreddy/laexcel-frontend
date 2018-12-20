import { API_GET } from './APIMethods';
import { ResponseType, ErrorType } from './ActionType';
import { ResponseTypeURL } from './ActionURL';

export const fetchResponseTypes = () => {
  const url = `${ResponseTypeURL.FETCH_RESPONSE_TYPES}`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: ResponseType.FETCH_RESPONSE_TYPES,
          payload: result.payload
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};
