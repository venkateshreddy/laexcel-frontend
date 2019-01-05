import { AcademicYear } from '../actions/ActionType';

const initialState = {
  academicYears: [],
  currentAcademicYear: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AcademicYear.FETCH_ACADEMIC_YEARS: {
      return { ...state, academicYears: action.payload };
    }

    case AcademicYear.SET_CURRENT_ACADEMIC_YEAR: {
      return { ...state, currentAcademicYear: action.payload };
    }

    default:
      return state;
  }
}
