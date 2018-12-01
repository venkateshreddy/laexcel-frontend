import { Cities } from '../actions/ActionType';

const initialState = {
  cities: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Cities.FETCH_CITIES: {
      return { ...state, cities: action.payload };
    }
    default:
      return state;
  }
}
