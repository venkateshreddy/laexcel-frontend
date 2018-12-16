import { Program } from '../actions/ActionType';

const initialState = {
  program: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Program.FETCH_PROGRAM:
      return { ...state, program: action.payload };
    default:
      return state;
  }
}
