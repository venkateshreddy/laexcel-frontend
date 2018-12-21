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
import building from './BuildingReducer';
import codesAndTypes from './CodesAndTypesReducer';
import employee from './employee';
import preAdmissions from './PreAdmissionReducer';
import responseType from './ResponseTypeReducer';
import program from './programreducer';
import course from './coursereducer';
import courseDuration from './courseDurationReducer';
import batch from './batchReducer';
import feeCode from './feeCodeReducer';
import gstRates from './gstRatesReducer';
import feeStructure from './feeStructureReducer';

export default combineReducers({
  locale,
  login,
  program,
  course,
  courseDuration,
  feeCode,
  batch,
  gstRates,
  dashboard,
  employee,
  branch,
  feeStructure,
  cities,
  states,
  organisations,
  campus,
  room,
  building,
  codesAndTypes,
  preAdmissions,
  responseType
});
