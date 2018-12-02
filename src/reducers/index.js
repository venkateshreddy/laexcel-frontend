import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';
import login from './LoginReducer';
import dashboard from './DashboardReducer';
import branch from './Branch';
import cities from './Cities';
import states from './States';
import organisations from './Organisations';
import campus from './Campus';

export default combineReducers({
  locale,
  login,
  dashboard,
  branch,
  cities,
  states,
  organisations,
  campus
});
