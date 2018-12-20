import { CourseDuration } from '../actions/ActionType';

const initialState = {
  courseDuration: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CourseDuration.FETCH_COURSE_DURATION:
      return { ...state, courseDuration: action.payload };
    default:
      return state;
  }
}
