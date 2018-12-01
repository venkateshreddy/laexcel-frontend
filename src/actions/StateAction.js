import { API_GET } from './APIMethods';
import { States, ErrorType } from './ActionType';
import { StatesURL } from './ActionURL';

export const fetchStates = () => {
  const url = `${StatesURL.FETCH_STATES}`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: States.FETCH_STATES,
          payload: result.payload
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};
