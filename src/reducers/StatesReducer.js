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
    case States.FETCH_STATES_CITIES: {
      return { ...state, states: action.payload.statesDB.payload };
    }
    case States.UPDATE_STATE: {
      const states = [...state.states];
      const statesClone = [];
      let statesCloneObj = {};
      states.map(org => {
        statesCloneObj = { ...org };
        if (org.id === action.payload.id) {
          statesCloneObj = { ...action.payload };
        }
        statesClone.push(statesCloneObj);
        return null;
      });
      return { ...state, states: statesClone };
    }
    default:
      return state;
  }
}
