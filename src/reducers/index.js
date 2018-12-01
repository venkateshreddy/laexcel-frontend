import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';
import login from './LoginReducer';
import dashboard from './DashboardReducer';
import protocolReducer from './ProtocolReducer';
import branch from './Branch';
import cities from './Cities';
import states from './States';

export default combineReducers({
  locale,
  login,
  dashboard,
  protocolReducer,
  branch,
  cities,
  states
});
