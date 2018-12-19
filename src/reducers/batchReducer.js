import { Batch } from '../actions/ActionType';

const initialState = {
  batch: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Batch.FETCH_BATCH:
      return { ...state, batch: action.payload };
    default:
      return state;
  }
}
