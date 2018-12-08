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
    case Organisations.UPDATE_ORGANISATION: {
      const organisations = [...state.organisations];
      const organisationsClone = [];
      let organisationsCloneObj = {};
      organisations.map(org => {
        organisationsCloneObj = { ...org };
        if (org.id === action.payload.id) {
          organisationsCloneObj = { ...action.payload };
        }
        organisationsClone.push(organisationsCloneObj);
        return null;
      });
      return { ...state, organisations: organisationsClone };
    }
    default:
      return state;
  }
}
