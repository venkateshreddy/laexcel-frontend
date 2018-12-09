import { API_POST, API_GET, API_PUT } from './APIMethods';
import { Branch, ErrorType } from './ActionType';
import { BranchURL } from './ActionURL';

export const createBranch = data => {
  const url = `${BranchURL.CREATE_BRANCH}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Branch.CREATE_BRANCH,
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

export const fetchBranches = data => {
  const url = `${BranchURL.FETCH_BRANCHES}`;
  return async dispatch => {
    try {
      const result = await API_GET(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Branch.FETCH_BRANCHES,
          payload: result.payload
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const updateBranch = (id, data) => {
  const url = `${BranchURL.UPDATE_BRANCHES}/${id}/update`;
  return async dispatch => {
    try {
      const result = await API_PUT(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Branch.UPDATE_BRANCH,
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

export const deleteBranches = data => {
  const url = `${BranchURL.DELETE_BRANCHES}`;
  return async dispatch => {
    try {
      const result = await API_PUT(url, data);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: Branch.DELETE_BRANCHES,
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
