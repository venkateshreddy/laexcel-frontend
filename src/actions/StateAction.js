import { API_GET, API_POST } from './APIMethods';
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

export const createState = (data, callBack) => {
  const url = `${StatesURL.CREATE_STATE}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: States.CREATE_STATE,
          payload: result.payload
        });
      }
      callBack({ error: result.error, message: result.message });
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};
