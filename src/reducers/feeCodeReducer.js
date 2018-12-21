import { FeeCode } from '../actions/ActionType';

const initialState = {
  feeCode: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FeeCode.FETCH_FEE_CODE:
      return { ...state, feeCode: action.payload };
    default:
      return state;
  }
}
