import { findIndex } from 'lodash';
import { Campus } from '../actions/ActionType';

const initialState = {
  campuses: []
};

const updateCampus = (state, action) => {
  const campuses = [...state.campuses];
  const index = findIndex(campuses, { id: action.payload.id });
  if (index >= 0) {
    campuses[index] = action.payload;
  }
  return { ...state, campuses };
};

const deleteCampuses = (state, action) => {
  const campuses = state.campuses.filter(
    campus => !action.payload.ids.includes(campus.id)
  );
  return { ...state, campuses };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Campus.CREATE_CAMPUS: {
      const campuses = [...state.campuses];
      campuses.unshift(action.payload);
      return { ...state, campuses };
    }
    case Campus.FETCH_CAMPUSES: {
      return { ...state, campuses: action.payload };
    }
    case Campus.UPDATE_CAMPUS: {
      return updateCampus(state, action);
    }

    case Campus.DELETE_CAMPUSES: {
      return deleteCampuses(state, action);
    }
    default:
      return state;
  }
}
