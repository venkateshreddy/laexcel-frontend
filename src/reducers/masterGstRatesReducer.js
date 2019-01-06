import { masterGstRates } from '../actions/ActionType';

const initialState = {
  masterGstRates: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case masterGstRates.FETCH_MASTER_GST_RATES:
      return { ...state, masterGstRates: action.payload };
    default:
      return state;
  }
}
