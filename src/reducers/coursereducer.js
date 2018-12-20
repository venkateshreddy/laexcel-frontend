import { Course } from '../actions/ActionType';

const initialState = {
  course: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Course.FETCH_COURSE:
      return { ...state, course: action.payload };
    default:
      return state;
  }
}
