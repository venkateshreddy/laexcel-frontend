import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';
import login from './LoginReducer';
import branch from './Branch';
import cities from './Cities';
import states from './States';
import campus from './Campus';

export default combineReducers({
  locale,
  login,
  branch,
  cities,
  states,
  campus
});
