import { States } from '../actions/ActionType';

const initialState = {
  states: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case States.FETCH_STATES: {
      return { ...state, states: action.payload };
    }
    case States.CREATE_STATE: {
      const states = [...state.states];
      states.unshift(action.payload);
      return { ...state, states };
    }
    default:
      return state;
  }
}
