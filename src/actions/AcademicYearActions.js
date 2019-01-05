import { API_GET } from './APIMethods';
import { AcademicYear, ErrorType } from './ActionType';
import { AcademicYearURL } from './ActionURL';

export const fetchAcademicYears = () => {
  const url = `${AcademicYearURL.FETCH_ACADEMIC_YEARS}`;
  return async dispatch => {
    try {
      const result = await API_GET(url);
      if (result.error !== undefined && !result.error) {
        dispatch({
          type: AcademicYear.FETCH_ACADEMIC_YEARS,
          payload: result.payload
        });
      }
    } catch (error) {
      dispatch({ type: ErrorType.ERROR_LOG, message: error.message });
    }
  };
};

export const setCurrentAcademicYear = academicYear => ({
  type: AcademicYear.SET_CURRENT_ACADEMIC_YEAR,
  payload: academicYear
});
