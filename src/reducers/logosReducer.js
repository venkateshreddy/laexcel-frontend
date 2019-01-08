import { Logos } from '../actions/ActionType';

const initialState = {
  Logos: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Logos.FETCH_LOGOS:
      return { ...state, Logos: action.payload };
    default:
      return state;
  }
}
