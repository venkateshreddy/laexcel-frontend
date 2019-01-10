import { API_GET, API_POST, API_DELETE, API_PUT } from './APIMethods';
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

export const createAcademicYear = (academicYear) => {
  const url = `${AcademicYearURL.FETCH_ACADEMIC_YEARS}`;
  return async dispatch => {
    try {
      const result = await API_POST(url, academicYear);
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

export const updateAcademicYear = (id, obj) => {
  const url = `${AcademicYearURL.FETCH_ACADEMIC_YEARS}/${id}`;
  return async dispatch => {
    try {
      const result = await API_PUT(url, obj);
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

export const deleteAcademicYear = (id) => {
  const url = `${AcademicYearURL.FETCH_ACADEMIC_YEARS}/${id}`;
  return async dispatch => {
    try {
      const result = await API_DELETE(url);
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
