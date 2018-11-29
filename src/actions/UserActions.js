import { UsersType, ErrorType } from './ActionType';
import { UsersUrl } from './ActionURL';
import {
  API_GET,
  API_POST
  // API_PUT
  // API_PUT
} from './APIMethods';

// login form submitted
export const fetchUsers = () => {
  const url = `${UsersUrl.FETCH_USERS}`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      if (!result.error) {
        dispatch({ type: UsersType.FETCHED_USERS, payload: result.data });
      }
      return result;
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
      return { error: true, networkError: true };
    }
  };
};

// update roles to users
export const updateRolesOfUsers = (users, roles, callback) => {
  const url = `${UsersUrl.UPDATE_ROLES}`;
  const body = {
    users,
    roles
  };
  return async dispatch => {
    try {
      const result = await API_POST(url, body);
      if (!result.error) {
        dispatch({ type: UsersType.FETCHED_USERS, payload: result.data });
        callback();
      }
      return result;
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
      return { error: true, networkError: true };
    }
  };
};

export const createUser = (dataObj, callback) => {
  const url = `${UsersUrl.ADD_USER}`;
  const body = dataObj;
  return async dispatch => {
    try {
      const result = await API_POST(url, body);
      if (!result.error) {
        dispatch({ type: UsersType.ADDED_USER, payload: result.data });
      }
      callback(result);
      return result;
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
      return { error: true, networkError: true };
    }
  };
};

// delete user
export const deleteUser = (data, callback) => {
  const url = `${UsersUrl.DELETE_USER}`;
  const body = data;
  return async dispatch => {
    try {
      const result = await API_POST(url, body);
      if (!result.error) {
        dispatch({ type: UsersType.DELETED_USERS, payload: data });
      }
      callback(result);
      return result;
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
      return { error: true, networkError: true };
    }
  };
};
