import { gstRates } from '../actions/ActionType';

const initialState = {
  gstRates: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case gstRates.FETCH_GST_RATE:
      return { ...state, gstRates: action.payload };
    default:
      return state;
  }
}
