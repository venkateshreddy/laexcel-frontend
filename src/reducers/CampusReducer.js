import { Campus } from '../actions/ActionType';

const initialState = {
  campuses: []
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
    default:
      return state;
  }
}
