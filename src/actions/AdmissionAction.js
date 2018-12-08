import axios from 'axios';
import { ErrorType } from './ActionType';
import { Configs } from './ActionConfigs';
import AppConfig from '../config';

export const bulkUpload = (rows) => dispatch =>
  axios
    .post(`${AppConfig.API_BASE_URL}preadmission/upload`, rows, Configs.GLOBALCONFIG)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: 'UPLOAD_SUCCESS',
          data: response.data
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
