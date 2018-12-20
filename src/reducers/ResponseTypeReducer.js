import { ResponseType } from '../actions/ActionType';

const initialState = {
  responseTypes: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ResponseType.FETCH_RESPONSE_TYPES: {
      return { ...state, responseTypes: action.payload };
    }

    default:
      return state;
  }
}
