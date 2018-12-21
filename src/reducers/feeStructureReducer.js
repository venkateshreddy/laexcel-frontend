import { FeeStructure } from '../actions/ActionType';

const initialState = {
  feeStructure: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FeeStructure.FETCH_FEE_STRUCTURE:
      return { ...state, feeStructure: action.payload };
    default:
      return state;
  }
}
