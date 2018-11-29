import axios from 'axios';
import { DashboardType, PopupType, ErrorType } from './ActionType';
import { Configs } from './ActionConfigs';
import AppConfig from '../config';

export const getHeaderCount = () => dispatch => {
  axios
    .get(`${AppConfig.BASE_URL}status/fejlettchannel`, Configs.GLOBALCONFIG)
    .then(response => {
      if (response.status === 200 && response.data.chaincodeCount) {
        dispatch({
          type: DashboardType.GET_HEADER_COUNT,
          data: response.data
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const fetchAnimalsDashBoardData = () => dispatch => {
  axios
    .get(`${AppConfig.API_BASE_URL}animals/fetchAnimalsDashBoardData`, Configs.GLOBALCONFIG)
    .then(response => {
      if (response.status === 200) {
        dispatch({
          type: DashboardType.UPDATE_SPECIES_STATS,
          data: response.data
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const getAllTransactions = () => dispatch => {
  axios
    .get(`${AppConfig.BASE_URL}txList/fejlettchannel/0/0`, Configs.GLOBALCONFIG)
    .then(response => {
      if (response.status === 200 && response.data.rows.length > 0) {
        dispatch({
          type: DashboardType.GET_ALL_TRANSACTIONS,
          data: response.data.rows
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const getAllBlocks = () => dispatch => {
  axios
    .get(
      `${AppConfig.BASE_URL}blockAndTxList/fejlettchannel/0`,
      Configs.GLOBALCONFIG
    )
    .then(response => {
      if (response.status === 200 && response.data.rows.length > 0) {
        dispatch({
          type: DashboardType.GET_ALL_BLOCKS,
          data: response.data.rows
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const getChartsData = () => dispatch => {
  axios
    .get(`${AppConfig.BASE_URL}txByOrg/fejlettchannel`, Configs.GLOBALCONFIG)
    .then(response => {
      if (response.status === 200 && response.data.rows.length > 0) {
        dispatch({
          type: DashboardType.GET_CHART_DATA,
          data: response.data.rows
        });
      }
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
};

export const getAllDashboardData = () => dispatch => {
  dispatch(getHeaderCount());
  dispatch(getAllTransactions());
  dispatch(getAllBlocks());
  dispatch(getChartsData());
};

export const showTransactionDetails = data => ({
  type: DashboardType.SHOW_TRANSACTIONS_MODAL,
  data
});

export const hideTransactionDetails = () => ({
  type: DashboardType.HIDE_TRANSACTIONS_MODAL
});

export const showBlockDetails = data => ({
  type: DashboardType.SHOW_BLOCKS_MODAL,
  data
});

export const hideBlockDetails = () => ({
  type: DashboardType.HIDE_BLOCKS_MODAL
});

// export const sendSearchResult = (data, obj) =>
//   function (dispatch) {
//     dispatch({
//       type: DashboardType.SEND_SEARCH_RESULT,
//       payload: { data, obj }
//     });
//   };

export const globalSearchText = text =>
  function (dispatch) {
    dispatch({
      type: DashboardType.GLOBAL_SEARCH_TEXT,
      payload: text
    });
  };
// export const toggleGridView = value =>
//   function (dispatch) {
//     dispatch({ type: DashboardType.TOGGLE_GRID_VIEW, payload: value });
//   };

export const toggleDataView = name =>
  function (dispatch) {
    dispatch({ type: DashboardType.TOGGLE_GRID_VIEW, payload: name });
  };

export const togglePopupView = name =>
  function (dispatch) {
    dispatch({ type: PopupType.TOGGLE_POPUP_VIEWS, payload: name });
  };

export const handleSnackBar = snackBarData =>
  function (dispatch) {
    dispatch({ type: DashboardType.HANDLE_SNACKBAR, payload: snackBarData });
  };

