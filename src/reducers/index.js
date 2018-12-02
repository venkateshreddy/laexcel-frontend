import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';
import login from './LoginReducer';
import dashboard from './DashboardReducer';
import branch from './BranchReducer';
import cities from './CitiesReducer';
import states from './StatesReducer';
import organisations from './Organisations';
import campus from './CampusReducer';
import room from './RoomReducer';

export default combineReducers({
  locale,
  login,
  dashboard,
  branch,
  cities,
  states,
  organisations,
  campus,
  room
});
