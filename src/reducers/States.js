import { States } from '../actions/ActionType';

const initialState = {
  states: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case States.FETCH_STATES: {
      return { ...state, states: action.payload };
    }
    default:
      return state;
  }
}
