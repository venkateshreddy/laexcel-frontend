import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';
import login from './LoginReducer';
import dashboard from './DashboardReducer';
import protocolReducer from './ProtocolReducer';
import branch from './Branch';

export default combineReducers({
  locale,
  login,
  dashboard,
  protocolReducer,
  branch
});
