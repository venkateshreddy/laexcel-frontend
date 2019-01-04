import { findIndex } from 'lodash';
import { PreAdmission } from '../actions/ActionType';

const initialState = {
  admissions: [],
  assignedAdmissions: []
};

const updatePreAdmission = (state, action) => {
  const admissions = [...state.admissions];
  const index = findIndex(admissions, { id: action.payload.id });
  if (index >= 0) {
    admissions[index] = action.payload;
  }
  return { ...state, admissions };
};

const updatePreAdmissionsList = (state, { payload }) => {
  const admissions = state.admissions.filter(
    admission => !payload.includes(admission.id)
  );
  return { ...state, admissions };
};

const deletePreAdmission = (state, action) => {
  const admissions = state.admissions.filter(
    admission => !action.payload.ids.includes(admission.id)
  );
  return { ...state, admissions };
};

const acceptOrRejectEnquiry = (state, action) => {
  if (action.payload.status === 'return') {
    return updatePreAdmissionsList(state, {
      payload: action.payload.selection
    });
  }
  const admissions = state.admissions.map(admission => {
    if (action.payload.selection.includes(admission.id)) {
      const updatedAdmission = { ...admission };
      updatedAdmission.isAcceptedByEmp = true;
      return updatedAdmission;
    }
    return admission;
  });
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

    case PreAdmission.ALLOCATE_TO_EMPLOYEE: {
      return updatePreAdmissionsList(state, action);
    }

    case PreAdmission.ACCEPT_OR_REJECT_ENQUIRY: {
      return acceptOrRejectEnquiry(state, action);
    }

    case PreAdmission.FETCH_STUDENTS_BASEDON_FILTER: {
      return { ...state, admissions: action.payload };
    }

    case PreAdmission.FETCH_ALL_ASSIGNED_ENQUIRIES: {
      return { ...state, assignedAdmissions: action.payload };
    }
    default:
      return state;
  }
}
