import { findIndex } from 'lodash';
import { PreAdmission } from '../actions/ActionType';

const initialState = {
  admissions: []
};

const updatePreAdmission = (state, action) => {
  const admissions = [...state.admissions];
  const index = findIndex(admissions, { id: action.payload.id });
  if (index >= 0) {
    admissions[index] = action.payload;
  }
  return { ...state, admissions };
};

const deletePreAdmission = (state, action) => {
  const admissions = state.admissions.filter(
    admission => !action.payload.ids.includes(admission.id)
  );
  return { ...state, admissions };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PreAdmission.CREATE_PREADMISSION: {
      const admissions = [...state.admissions];
      admissions.unshift(action.payload);
      return { ...state, admissions };
    }

    case PreAdmission.FETCH_PREADMISSION_DATA: {
      return { ...state, admissions: action.payload };
    }

    case PreAdmission.UPDATE_PREADMISSION: {
      return updatePreAdmission(state, action);
    }

    case PreAdmission.DELETE_PREADMISSION: {
      return deletePreAdmission(state, action);
    }

    default:
      return state;
  }
}
