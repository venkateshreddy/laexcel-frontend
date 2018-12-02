import { Organisations } from '../actions/ActionType';

const initialState = {
  organisations: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Organisations.FETCH_ORGANISATIONS: {
      return { ...state, organisations: action.payload };
    }
    case Organisations.CREATE_ORGANISATION: {
      const organisations = [...state.organisations];
      organisations.unshift(action.payload);
      return { ...state, organisations };
    }
    default:
      return state;
  }
}
