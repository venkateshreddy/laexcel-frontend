import { Cities } from '../actions/ActionType';

const initialState = {
  cities: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Cities.FETCH_CITIES: {
      return { ...state, cities: action.payload };
    }
    case Cities.CREATE_CITIES: {
      const cities = [...state.cities];
      cities.unshift(action.payload);
      return { ...state, cities };
    }
    default:
      return state;
  }
}