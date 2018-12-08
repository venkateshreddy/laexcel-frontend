import axios from 'axios';
import { LoginType, ErrorType } from './ActionType';
import { LoginUrl } from './ActionURL';
import { Configs } from './ActionConfigs';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import AppConfig from '../config';
// import {
// API_GET,
// API_POST
// API_PUT
// API_PUT
// } from './APIMethods';

// login form submitted
// export const submitLogin = (data, callBack) => {
//   const url = `${UsersUrl.SUBMIT_LOGIN}`;
//   return async dispatch => {
//     try {
//       const result = await API_POST(url, data);
//       if (!result.error) {
//         sessionStorage.setItem('userdata', JSON.stringify(result.data));
//         dispatch({ type: LoginType.LOGIN_SUCCESSFUL, payload: result.data });
//       } else {
//         callBack(result);
//       }
//       return result;
//     } catch (error) {
//       dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
//       return { error: true, networkError: true };
//     }
//   };
// };

export const submitLogin = ({ email, password }, callBack) => {
  const url = `${LoginUrl.AUTHENTICATE}`;
  const accessToken = { access_token: AppConfig.MASTER_TOKEN };
  const LOGINCONFIG = Configs.GLOBALCONFIG;
  LOGINCONFIG.auth = {
    username: email,
    password
  };
  return async dispatch => {
    try {
      const result = await axios.post(url, accessToken, LOGINCONFIG);
      // alert(`url result error: ${result.data.error}:: testing-Pls click OK`);
      if (result.data.error !== undefined && !result.data.error) {
        sessionStorage.setItem('token', result.data.payload.token);
        sessionStorage.setItem(
          'userdata',
          JSON.stringify(result.data.payload.user)
        );
        setAuthorizationToken(result.data.payload.token);
        dispatch({
          type: LoginType.LOGIN_SUCCESSFUL,
          payload: result.data.payload.user
        });
      }
      return result;
    } catch (error) {
      callBack({
        error: true,
        networkError: true,
        message: 'Unable to log you in. Wrong credentials.'
      });
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
      return {
        data: {
          error: true,
          networkError: true,
          message: 'Unable to log you in. Wrong credentials.'
        }
      };
    }
  };
};

export const logOutClicked = () => {
  Object.keys(sessionStorage).map(key => sessionStorage.removeItem(key));
  return function (dispatch) {
    dispatch({
      type: LoginType.LOGOUT_SUCCESSFUL,
      payload: 'logoutClicked'
    });
  };
};

export const updatePassword = (userName, oldPassword, password) => {
  const url = `${LoginUrl.CHANGE_PASSWORD}`;
  const LOGINCONFIG = Configs.GLOBALCONFIG;
  LOGINCONFIG.auth = {
    username: userName,
    password: oldPassword
  };
  return async dispatch => {
    try {
      const result = await axios.put(url, { password }, LOGINCONFIG);
      return result.data;
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
      return {
        error: true,
        networkError: true,
        message: 'Unable to update password. Please try later.'
      };
    }
  };
};
